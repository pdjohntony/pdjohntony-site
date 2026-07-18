---
title: 'Docker things that bit me this year'
description: 'A postmortem of self-inflicted wounds.'
pubDate: 2024-10-15 08:00:00 -0500
tags: ['dev']
---

An honest accounting of every docker incident in the homelab this year, all of which were my fault.

Highlights include: a volume mount that pointed at the wrong directory for three months, a `latest` tag that did exactly what `latest` tags do, and a healthcheck that reported healthy while the app served nothing but 502s. Lessons were learned. Some of them twice.
