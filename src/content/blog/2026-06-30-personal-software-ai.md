---
title: 'Personal Software: Apps for an Audience of One'
description: 'AI coding agents broke the old build-vs-buy math. Why I now build bespoke, single-user personal software in an evening and self-host it on my homelab.'
pubDate: 2026-06-30 08:00:00 -0500
heroImage: '@blog-images/2026-06-30-personal-software-ai.png'
tags: ['ai', 'dev', 'homelab', 'thoughts']
---

I built several apps this past year that have exactly one user: me. Five years ago I would have called that a waste of time, and honestly, I would have been right.

Something changed, and it wasn't my free time or my skill level. AI coding agents like Claude Code quietly rewrote the economics of personal software, the bespoke, single-user tools you build for your own life. Ideas that sat in my notes file for a decade are now running in Docker containers on my homelab.

## The old math never worked out

Every developer has the list. Little app ideas that would make life slightly better: a tracker for this, a dashboard for that, a script that glues two services together. Mine lived in a notes file that I would open once a year, sigh at, and close.

The problem was never ability, it was arithmetic. Even a small CRUD app for one person meant a weekend of scaffolding, another weekend of UI polish and edge cases, and then upkeep forever. All of that effort for a tool that saves me two minutes a day, or replaces a $30-a-year app that mostly works. The rational move was always to close the laptop and go outside.

So like everyone else, I bent my life around off-the-shelf software instead. I tolerated the missing feature, ignored the ads, and paid for the subscription tier I didn't quite need, because the alternative was spending my limited weekends reinventing a login page.

## An evening with an agent changes what's worth building

That arithmetic broke. With a coding agent, the scaffolding weekend collapses into an hour. I describe the app, the agent stands up the project, the schema, the routes, and a UI that is 80% of the way there. My job shifts from typing every line to steering: reviewing, correcting, and making the product decisions only I can make, because I am also the entire user base.

The clearest example for me is [Watchr](/blog/2026-07-17-watchr), the self-hosted app I built to replace TV Time for tracking shows after TV Time shut down. My actual needs fit in a sentence, and two days with an agent later, one to build and one to polish, I had a replacement that does exactly what I want and nothing else. That build got its own writeup, so I'll spare you the details here.

I also built a much weirder one: [an AI tool that can figure out where I am and get a message to me](/blog/2026-05-23-ai-location-tools) on whatever device makes sense. That's also its own post. The point is that neither of these would exist under the old math. They weren't worth two months of weekends. They were absolutely worth a handful of evenings.

The agent doesn't write perfect code, and I still read what it produces. But "review and redirect" is a fundamentally cheaper activity than "write from scratch," and for an audience of one, the bar is "works for me," not "survives contact with the public internet and a million users."

## Disposable software is a feature, not an insult

Here's the mindset shift that surprised me most: when an app costs an evening, it stops being precious.

Under the old math, anything I built came with sunk-cost gravity. I would maintain it past its usefulness because I remembered what it cost me. Personal software built with an agent is malleable in a way that feels new. Want a feature? Describe it, review the diff, deploy. Hate the data model three months in? Have the agent migrate it. Outgrew the whole app? Delete it without ceremony and build the next thing.

This is closer to how I treat spreadsheets than how I was taught to treat software. Nobody agonizes over throwing away a spreadsheet. It turns out a lot of the reverence we have for application code was really reverence for the labor it took, and when the labor drops, so does the hoarding instinct.

## The homelab is the natural habitat for single-user apps

If you already run a homelab, you have the perfect deployment target, because single-user apps have hilariously easy operational requirements. No horizontal scaling, no multi-tenant auth, no cost optimization meetings. Each of mine is a container with a volume mount, sitting behind the same reverse proxy as everything else, reachable over my VPN and nowhere else.

Self-hosting also removes the failure modes that pushed me to build these apps in the first place. My personal software can't get acquired, can't pivot to short-form video, can't put my history behind a new premium tier, and can't sunset its API. The data sits in a SQLite file that my existing backup job already covers.

The homelab community has spent years assembling personal infrastructure out of other people's open source projects. Agents fill in the last mile: the apps too specific to your life for anyone else to have built.

## The honest catch: you are now the vendor

I want to be fair about the downside, because there is one. Every app I build is something I now maintain. Dependency rot is real, upstream APIs change, and a security patch doesn't apply itself. Five personal apps means five small things that can quietly break while I'm busy living my life.

Two things keep this manageable. First, I build boring on purpose: minimal dependencies, SQLite over a database server, server-rendered pages over a frontend framework, nothing exotic. Boring stacks rot slowly. Second, maintenance is exactly the kind of well-scoped task agents are good at. "Update this project to the new library version and fix what breaks" is an evening-with-coffee job, not a dreaded chore.

But I won't pretend the cost is zero. If the idea of being on the hook for your own tools sounds miserable rather than empowering, the subscription is still the right call for you, and that's fine.

## What I still pay for, and what I don't

I don't think this kills SaaS, but I think it redraws the line. Software earns my money now when it has something I genuinely can't replicate: network effects, data that isn't mine to begin with, or reliability stakes I don't want to own. I'm not self-hosting my email, and no agent is going to rebuild a community of users.

What's in trouble is the long tail of single-player CRUD apps with a subscription attached. Trackers, organizers, personal dashboards, anything whose pitch is "a form and a list, but for hobby X." Those were always charging rent on the gap between "I want this" and "I can't justify building this." That gap is closing fast, and every enshittification step, every ad injected into a paid app, now competes against "I could replace this by Sunday."

## Where to start

If any of this resonates, here's the short version:

- The build-vs-buy math for personal software has genuinely flipped: what used to cost weekends now costs an evening with an agent.
- Treat these apps as disposable and boring. Minimal stacks, SQLite, your existing homelab plumbing. The less precious they are, the more useful they become.
- You become the vendor, with everything that implies. Budget an occasional evening for maintenance and build few enough apps that you can actually keep that promise.

Open that notes file with the decade of app ideas. Pick the smallest, dumbest one, the one you could never justify. Give an agent an evening and see what happens. Mine turned out to be a TV tracker, and it's some of the most satisfying software I've ever shipped, to a user base I know personally.
