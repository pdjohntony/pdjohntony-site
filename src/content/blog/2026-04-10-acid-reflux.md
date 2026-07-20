---
title: 'Acid Reflux: My First Real Health Problem'
description: 'How I ignored heartburn for months, finally saw a doctor, and learned that debugging your own body is the worst kind of debugging.'
pubDate: 2026-04-10 08:00:00 -0500
heroImage: '@blog-images/2026-04-10-acid-reflux.png'
tags: ['health', 'personal']
---

At some point in the last year, my body shipped a breaking change without updating the changelog. It started as an occasional burning in my chest after dinner, and I did what any reasonable developer does with a warning that doesn't block the build: I ignored it.

This is a post about acid reflux, which is not a topic I ever expected to write about on a blog that's mostly homelab and tech content. But it's the first real health problem I've had, and working through it taught me more than I expected, so here we are.

!!! note "Not medical advice"
    I'm a developer, not a doctor. This is just my personal experience with mild reflux. If you're dealing with chest pain, persistent heartburn, or anything that worries you, go see an actual medical professional. Chest pain in particular can be a lot of things, and some of them are emergencies.

## The symptoms I spent months explaining away

It didn't arrive all at once. First it was heartburn after big dinners, which I blamed on the dinner. Then it was a sour taste creeping up my throat when I laid down at night, which I blamed on eating too late. Then my throat started feeling scratchy in the mornings for no reason, which I blamed on allergies, dry air, and at one point, I'm pretty sure, the cat.

The pattern recognition part of my brain, the part I use professionally every single day, refused to run on my own body. Each symptom got its own one-off excuse. Nobody was correlating the logs.

The thing that finally got my attention was sleep. I'd wake up at two in the morning with a burning in my chest and that awful acid taste, and then lie there propped up on pillows trying to convince myself it was fine. When something starts costing you sleep on a recurring schedule, "it's probably nothing" gets harder to sustain.

## Actually seeing a doctor, several months later than I should have

I put off the appointment for a while, partly because it felt dramatic to see a doctor about heartburn, and partly because some part of me didn't want it to be a real thing with a real name.

It went about how these things go. The doctor asked questions, poked around, and told me what I'd already half-figured out from cautious late-night searching: this sounded like garden-variety acid reflux, the kind that shows up for a lot of people in their thirties. The valve between your esophagus and stomach gets lazy about staying closed, acid goes where it shouldn't, and everything upstream of your stomach files a complaint.

No scary tests, no dramatic diagnosis. Just a shrug, some practical advice, and a medication plan. Which was honestly a little anticlimactic after months of quietly catastrophizing.

## The boring lifestyle changes that actually worked

Here's the annoying part. The stuff that helped most was exactly the stuff you'd predict, the advice so boring I'd dismissed it before trying it:

- **Earlier, smaller dinners.** Eating a large meal at 9pm and going horizontal at 11 was, it turns out, the single biggest trigger. Wrapping up dinner a few hours before bed made a bigger difference than anything else.
- **Cutting back the trigger foods.** For me that meant less coffee, less spicy food, and retiring the late-night snack habit entirely. The coffee reduction hurt. I'm not going to pretend it didn't.
- **Elevating the head of the bed.** Not pillows, which just fold you in half. Actually raising the head of the bed frame a few inches so gravity is on your side all night. It feels ridiculous and it works.
- **Weight and stress.** Both are on the list of things that make reflux worse, and both are things I could stand to manage better. Progress here is slower and less satisfying than the other bullets, but it's real.

The doctor also put me on medication, one of the usual acid reducers, famotidine or omeprazole territory. I'll spare you the specifics partly because I'd probably get them wrong and partly because your mileage and your prescription will vary. The point is the meds helped, but the lifestyle changes are what made the difference between "managed" and "still miserable, but medicated."

## Debugging a system with no logs and a ten-day feedback loop

The tech parallel is obvious and I'm going to make it anyway, because it genuinely changed how I approached this.

Your body is a production system you cannot restart, with no stack traces, terrible observability, and a feedback loop measured in days. Change one variable, wait a week, try to remember whether you actually felt better or whether you just wanted to. I started keeping rough notes on what I ate and how I slept, which is the closest I could get to structured logging, and it's the only reason I figured out my actual triggers instead of the ones I assumed.

The other realization was less comfortable. I've spent my whole adult life treating my body like a managed service, something that just runs while I focus on more interesting problems. Reflux is a mild problem as health problems go, and I want to be clear that I know that. But it was the first notification that the service has maintenance requirements, that uptime is not guaranteed, and that "ignore and retry" stops being a viable strategy at some point in your thirties.

That's a strange thing to sit with. Not scary, exactly. Just new.

## What I'd tell past me

- Stop explaining away symptoms individually and look at the pattern. You'd never debug production one log line at a time with no correlation.
- Go to the doctor earlier. The visit was cheap, fast, and mostly reassuring. The months of low-grade worry were not.
- The boring advice is boring because it works. Earlier dinners and a raised bed frame did more for me than anything clever.

If you've got persistent heartburn and you're currently in the "it's probably the cat" phase of denial, consider this your nudge. Go get it checked out. And if you've been through this and found tricks that worked for you, I'd genuinely like to hear them.
