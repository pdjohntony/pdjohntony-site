---
title: 'My AI Knows Where I Am (and When to Bug Me)'
description: 'How I gave my self-hosted AI assistant tools to see my location via Home Assistant and ping me through ntfy, plus the guardrails that keep it useful instead of creepy.'
pubDate: 2026-05-23 08:00:00 -0500
heroImage: '@blog-images/2026-05-23-ai-location-tools.png'
tags: ['ai', 'selfhosted', 'automation', 'homelab']
---

Every AI assistant I've used has the same limitation: it only exists while I'm staring at it. Close the tab and it's gone. It can't tell me a long-running job finished, and it has no idea whether I'm at my desk, in the garage, or twenty minutes from home.

So I fixed that. I gave my assistant two new abilities: it can check where I am, and it can contact me. That's it. Two tools. And they've changed how I use the thing more than any model upgrade this year.

This is another entry in my ongoing "personal software with AI" experiment (see my post [Personal Software: Apps for an Audience of One](/blog/2026-06-30-personal-software-ai) if you want the philosophy). Short version: when building software for an audience of one, you can do things that would never fly as a product. Like handing an AI your GPS coordinates.

## The whole integration is two tools

If you've built anything with MCP or plain tool calling, you know the pattern: you describe a function, the model decides when to call it. My assistant got these two:

```json
{
  "name": "get_phill_location",
  "description": "Returns Phill's current zone (home, work, away),
    whether he's driving, and how long he's been there.
    Does NOT return raw coordinates."
}
```

```json
{
  "name": "notify_phill",
  "description": "Send Phill a push notification. Use priority
    'urgent' only if he asked to be interrupted. Respects
    quiet hours automatically."
}
```

The implementation behind each one is maybe 30 lines of Python calling REST APIs I already had running. The interesting decisions aren't in the code, they're in what the tools expose and what they refuse to.

Notice the location tool returns zones, not coordinates. That was deliberate, and I'll get to why.

## Location comes from Home Assistant, because I already had it

I didn't stand up anything new for this. The Home Assistant companion app on my phone has been reporting GPS and wifi-based presence for years, powering the usual automations. Every phone in the house shows up as a `person` entity with a state like `home`, `work`, or a named zone.

So the location tool is just a call to the Home Assistant API asking for my person entity, plus a couple of sensor reads (activity detection tells me if I'm driving, and I compute time-in-zone from the state history). One HTTP request, no new database, no new app on my phone.

If you don't run Home Assistant, [OwnTracks](https://owntracks.org/) does the same job as a self-hosted location pipeline, and [Dawarich](https://dawarich.app/) is worth a look if you also want location history you own. The key property, whichever you pick: the location data never leaves your network until you deliberately hand a slice of it to the model.

## Notifications: ntfy first, phone calls someday, maybe

For the contact side I went with [ntfy](https://ntfy.sh/), self-hosted, because it's the simplest push notification system I've ever used. Publishing a notification is an HTTP POST with a text body. The tool wrapper adds three things:

- **Priority mapping.** The model picks `low`, `normal`, or `urgent`, and urgent maps to an ntfy priority that breaks through my phone's focus modes.
- **Rate limiting.** Max a handful of proactive notifications per day. The model doesn't know the exact number, which keeps it from budgeting against the limit.
- **Quiet hours.** After 10pm, everything silently downgrades to low priority no matter what the model asked for. It finds out the downgrade happened, so it can mention it next morning.

I've sketched a Twilio integration so the assistant could actually call me for genuine emergencies, like a UPS-on-battery alert while I'm traveling. I haven't shipped it. An AI with the ability to ring my phone feels like something to earn trust toward, not something to enable on day one.

## What it actually does with this

The use cases sound small written down. In practice they're the difference between a chatbot and something that feels like staff.

**"Ping me when it's done."** This is the killer feature. I kick off a long refactor or a batch job through the assistant, say "notify me when it finishes," and walk away. No more checking a terminal every ten minutes like it's a pot of water.

**Context-aware reminders.** I told it once that I needed wood screws and cable staples. Three days later I got a notification as I drove near the hardware store: a short list of the things I'd mentioned wanting. It checked my zone, saw I was moving through that part of town, and connected the dots. This one genuinely spooked me the first time, in a good way.

**Presence-aware answers.** When I ask "should I start the big Plex library scan," it checks whether anyone's home and streaming before answering. When nobody's home it's also allowed to be more aggressive with maintenance tasks, reboots, and other things that would annoy a human mid-episode.

**Arrival context.** If I'm heading home after being out all day, it can queue up a short digest: what finished, what failed, what needs a decision. Timed to land when I pull in, not while I'm driving. The driving check exists specifically so it never pings me on the highway.

## The guardrails, because this is objectively creepy without them

Let's be honest about what I built: a system where an AI knows where I am and can interrupt my day. Done carelessly, that's a horror movie premise. Here's what keeps it on the right side of the line.

**Everything is self-hosted.** Location flows from my phone to my Home Assistant box on my network. The only thing that ever reaches a model API is the coarse answer to a specific tool call, and only when the model asks. Nobody is building an advertising profile out of my grocery runs.

**Zones, not coordinates.** The tool returns `home`, `work`, `errands-northside`, or `away`. The model never sees latitude and longitude. It doesn't need that precision for anything I want it to do, and scoping the tool to what's needed is the same principle as least-privilege access anywhere else.

**No location history through the tool.** It can ask where I am now. It cannot ask where I was last Tuesday. History lives in Home Assistant for my own use; the assistant only gets the present tense.

**Proactive contact is allowlisted.** The assistant can reach out on its own only for things I've explicitly opted into: task completions, reminders I created, and alerts from monitoring. "I noticed something interesting and thought you'd want to know" is not on the list. The line I keep coming back to: proactive contact is welcome when I asked for the outcome, and creepy when the AI decided I'd want it.

**Everything is logged.** Every tool call, every notification, with timestamps, in a log I actually read. Trust, but grep.

## Where this lands

Three takeaways if you're tempted to build something similar:

- **You probably have the pieces already.** If Home Assistant or OwnTracks is running, the location tool is an afternoon of glue code, not a project.
- **Design the tool interface as a privacy boundary.** Coarse zones, no history, rate limits. The model gets a keyhole, not a window.
- **Proactive AI is only pleasant when the human defined the triggers.** Get that rule wrong and every notification feels like surveillance.

Next up in this series: giving the assistant eyes on my calendar and inboxes, which raises the exact same scoping questions with much higher stakes. If you've built your own take on AI presence tools, I'd like to hear how you drew the lines.
