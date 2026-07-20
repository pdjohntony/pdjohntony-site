---
title: 'PyCon US 2025: Python Is Getting Fast'
description: 'My first PyCon US in Pittsburgh: free threading and the JIT, the Pyrefly vs ty type checker race, Python in WebAssembly, and the talks worth watching.'
pubDate: 2025-06-01 08:00:00 -0500
heroImage: './hero.jpg'
tags: ['event', 'travel', 'dev', 'python', 'pycon']
---

I just got back from my first PyCon US, held May 14-22 in Pittsburgh, and the theme of the week was impossible to miss: Python is getting fast. Free threading, a JIT compiler, type checkers rewritten in Rust, and Python running inside WebAssembly sandboxes.

If you only take one thing from this post, take that. The language everyone loves to call slow is in the middle of a serious speed arc.

## Nine days, fully in-person, no streams

PyCon US runs longer than you'd think: nine days total, with the main conference packed into Friday through Sunday. Tutorials and summits come before, development sprints come after. I attended from the sponsored presentations on Thursday through the end of the main conference on Sunday.

One thing that surprised me: it's fully in-person, with no live streams. If you're not in the room, you're waiting for the recordings, which land on the [PyCon US 2025 playlist](https://youtube.com/playlist?list=PL2Uw4_HvXqvb98mQjN0-rYQjdDxJ_hcrs) on YouTube.

The expo hall has the usual booths and swag, but the whole event is much smaller than something like [Cisco Live](/blog/2018-06-18-cisco-live). That turns out to be a feature. The vibe is closer to a big community meetup than a corporate mega-conference.

## The maintainers just walk around like regular people

The thing nobody prepared me for: the people whose code runs your production systems are just there, in the hallway.

[Guido van Rossum](https://github.com/gvanrossum), the creator of Python, attends most talks, eats lunch with everyone, and at one point was laying down in the halls like the rest of us mortals. [Samuel Colvin](https://github.com/samuelcolvin) (creator of Pydantic) and [Marcelo Trylesinski](https://github.com/Kludex) (maintainer of Starlette and Uvicorn, the framework and server underneath FastAPI) were around and approachable. [Chad Whitacre](https://github.com/chadwhitacre) from Sentry and the Syntax.fm podcast was there too.

The Python core devs were out in force, including the Microsoft and Meta engineers behind Faster CPython, free threading, the JIT, and the Azure SDK. The Microsoft folks were very vocal about how important Microsoft's support for Python has been in recent years, and just as vocal about their disappointment with the layoffs that had hit two weeks before the conference. It was a strange thing to watch: the company funding much of Python's speed work cutting people while its engineers were on stage explaining that work.

## Free threading and the JIT, or: the GIL is on notice

The speed story has two main threads, pun fully intended.

**Free threading (no-GIL Python)** shipped as experimental in 3.13, installable with `uv python install 3.13t`. In 3.14 it's no longer labeled experimental, but it's also not yet stable or supported. What the core devs mean by that, in their own words, is "we believe free threading is the future and eventually will be the default." The realistic timeline is still one to two years out. The headline number: the single-threaded performance penalty has dropped from 40% to about 5%.

**The JIT compiler** also arrived as experimental in 3.13. It's still experimental in 3.14, but now it ships in the official binaries, so you can turn it on with nothing more than `PYTHON_JIT=1`. Results today range from 10% slower to 20% faster depending on the workload, so it's a preview of the future rather than a free win. One caveat to know: the JIT is not compatible with free threading yet.

Beyond speed, the common threads across the whole conference were agentic AI, MCP, Rust, and uv. If you had bingo-carded those four words you'd have won every session.

## The typing summit turned into a Rust-powered arms race

The [2025 Typing Summit](https://youtu.be/7uixlNTOY4s) had the best drama of the week. Meta released Pyrefly, their new Python type checker, at PyCon, exactly two weeks after Astral (the makers of Ruff and uv) released ty. Then both teams gave back-to-back presentations at the summit.

The projects are almost mirror images: both built in Rust, both still in alpha, both shipping a CLI plus LSP/IDE extensions, and both claiming 10 to 20 times faster than mypy and pyright. From what I saw and what [this comparison](https://blog.edward-li.com/tech/comparing-pyrefly-vs-ty/) found, ty is a bit faster while Pyrefly seems more thorough.

My favorite image of the conference: a Meta engineer in a Pyrefly shirt sitting in the audience, back to the camera, watching Astral present ty. And the rumor mill says Google may open-source their own Go-based Python type checker, so this space is about to get crowded in the best way.

## There's Python in my JavaScript

The track that bent my brain the most was WebAssembly. Wasm lets you run compiled binaries alongside JavaScript in the browser at near-native performance, and you don't write Wasm directly. You write C++, Rust, or even Python, and compile your code into a Wasm binary.

Enter Pyodide, a full port of CPython compiled to WebAssembly, started by Mozilla in 2019 and currently on Python 3.12. Any pure Python package just imports, many popular C-extension packages like pandas and regex have been ported, and you can call JavaScript functions from Python and vice versa. Since Wasm runs in the browser, that means you can run real Python in a browser tab.

It gets weirder. Deno, the JavaScript runtime that competes with Node.js, also supports WebAssembly, no browser required. So you can use Deno to run Wasm to run Pyodide to run Python. Why would anyone build that turducken? Because JavaScript already has a strong, battle-tested security sandbox. Running Python inside it isolates the code from the host, and it spins up faster than a VM or a container. This is exactly how ChatGPT and other LLM tools and MCP servers safely execute Python code.

## Talks worth your watch time

The recordings are up, and these are the ones I'd point a coworker at:

- [Building AI Applications the Pydantic Way](https://youtu.be/zJm5ou6tSxk)
- [Build modern Python apps on Azure](https://youtu.be/k6Vm2hakkV4)
- [Building a NoGIL Load Balancer in 30 minutes](https://youtu.be/AYSlsCz8gKM)
- [Finding 2.0](https://youtu.be/BKzv4uP8s-k)
- [Zoom, Enhance: Asyncio's New Introspection Powers](https://youtu.be/RrsVi1P6n0w)
- [What they don't tell you about building a JIT compiler for CPython](https://youtu.be/NE-Oq8I3X_w)
- [How two teams are working together to make Python better for all](https://youtu.be/-MVih3km4G4)

Special mention to the asyncio introspection talk, which was presented by talking bananas. That is not a typo, and it was one of the best talks of the conference anyway.

## Final thoughts from a first-timer

PyCon US is a great convention, and I'd go back without hesitation. A few things I learned along the way:

- Presentation rooms fill up fast. Show up early for anything you actually care about.
- The networking is the point. Talking with other developers was worth as much as the sessions.
- Consider skipping the keynotes and prioritizing open spaces instead. Keynotes get recorded; hallway conversations don't.

Python is getting fast, and its future is bright. See you in the 3.14t release notes.
