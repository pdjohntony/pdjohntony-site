---
title: 'Rewriting my side project for the third time'
description: "This time it's different. This time it's in Rust. (It is not different.)"
pubDate: 2026-03-14 08:00:00 -0500
heroImage: '../../assets/site-default.jpg'
tags: ['dev']
---

Every couple of years I look at my habit tracker and decide the real problem isn't my habits — it's the language it's written in. This is the story of the third rewrite, told mostly so I don't do a fourth.

If you just want the takeaway: the rewrite was worth it, but not for any of the reasons I started it. The interesting part is the gap between those two lists.

## How we got here

A brief archaeology of the repo:

1. **v1, python.** A weekend flask app. Worked fine. I got bored.
2. **v2, typescript.** "I should learn the modern stack." 14,000 lines of node_modules later, it also worked fine.
3. **v3, rust.** You are here.

> A rewrite is a vacation you take from your own decisions.
>
> — me, defending this to a coworker

## What rust fixed (and didn't)

The honest version: `cargo` is a joy, the binary deploys as one file, and I stopped thinking about runtime errors entirely. What it didn't fix is that I still don't know what the settings page should look like.

If you're rewriting to learn the language, say that out loud and enjoy it. The trouble starts when you tell yourself it's for performance.

The core loading code ended up shorter than the typescript version, which surprised me:

```rust
async fn load(&self) -> Result<Vec<Entry>> {
    let rows = sqlx::query_as!(Entry, "select * from entries order by day desc")
        .fetch_all(&self.pool)
        .await?;
    Ok(rows)
}
```

### The borrow checker phase

Weeks two through four. Everyone goes through it, everyone writes about it, and it still gets you. My advice is the same as everyone's: clone freely, feel no shame, refactor later. The compiler is not grading you.

## The numbers

Measured on the same $4 VPS, because that's the actual production environment:

| metric                         | v2 (ts) | v3 (rust)    |
| ------------------------------ | ------- | ------------ |
| idle memory                    | 118 mb  | **9 mb**     |
| cold start                     | 1.9 s   | **40 ms**    |
| deploy artifact                | 210 mb  | **6.8 mb**   |
| time to rebuild feature parity | —       | **4 months** |

That last row is the one to sit with. None of my users (me) noticed any of the first three.

## Would I do it again

Yes, and that's the problem. The rewrite scratched an itch shipping features never does. I know more Rust now, my server costs a dollar less, and the settings page is still a TODO. If there's a lesson in here, it's to [pick projects where the rewrite is the point](/projects), and keep them away from the ones you actually use.
