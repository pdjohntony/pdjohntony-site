# philljohntony.com — design system

Dark, quiet, text-first. The design should feel like a well-kept terminal: everything legible, nothing decorative for its own sake.

Adapted from the design export in `.local/pdjohntony-site-claude-design/` (untracked original). This is the living copy — edit it as the design evolves.

## Palette

All colors are Tailwind `@theme` tokens defined in `src/style.css` — that file is the source of truth. Never hardcode a hex outside those definitions; use the utility classes below.

| token                   | value     | utility             | use                                                      |
| ----------------------- | --------- | ------------------- | -------------------------------------------------------- |
| `--color-bg`            | `#0a0a0c` | `bg-bg`             | page background                                          |
| `--color-surface`       | `#121216` | `bg-surface`        | cards                                                    |
| `--color-surface-hover` | `#17171d` | `bg-surface-hover`  | card hover fill                                          |
| `--color-border`        | `#1d1d24` | `border-border`     | hairline dividers                                        |
| `--color-text`          | `#ececf1` | `text-text`         | headings, primary copy                                   |
| `--color-muted`         | `#83838f` | `text-muted`        | body copy, secondary text                                |
| `--color-faint`         | `#55555f` | `text-faint`        | dates, metadata, footer                                  |
| `--color-disabled`      | `#2c2c33` | `text-disabled`     | inert controls (pagination ends)                         |
| `--color-accent`        | `#5b7cfa` | `text-accent`       | links, active nav, one highlight per view                |
| `--color-accent-hover`  | `#7d97ff` | `text-accent-hover` | hover state of any accent or link text                   |
| `--color-prose`         | `#b8b8c2` | `text-prose`        | article body copy (brighter than muted for long reading) |
| `--color-code-bg`       | `#121216` | `bg-code-bg`        | code blocks and inline code chips                        |

Rules:

- One accent. Never introduce a second hue. If something needs emphasis without accent, use weight or `text-text` on a `text-muted` baseline.
- Accent is for _interactive or current_ things (links, active nav, hover) — not decoration.
- No gradients, no glows, no colored backgrounds.

## Type

**Manrope** everywhere, self-hosted via `@fontsource-variable/manrope` and mapped to `font-sans`. Weights: 400 (body), 500 (nav/meta emphasis), 700 (post titles, subheads), 800 (hero, page titles).

| role         | size / line-height           | weight     |
| ------------ | ---------------------------- | ---------- |
| hero         | 44px / 1.1, -0.03em tracking | 800        |
| page title   | 32px / 1.15, -0.02em         | 800        |
| post title   | 19px / 1.3                   | 700        |
| body         | 17px / 1.65                  | 400, muted |
| list excerpt | 15px / 1.55                  | 400, muted |
| meta / dates | 13px                         | 400, faint |
| nav          | 15px                         | 500        |

Voice: casual, first person. Self-deprecation over hype; if a line sounds like marketing, cut it.

Casing: the site's chrome is lowercase (nav, section labels, hero, footer, project names) — it's the site's voice. Content is sentence case (post titles, excerpts, body copy) — it's your writing. Never Title Case.

## Layout

- Single column, `max-w-[680px]`, centered. `48px` horizontal padding (`px-12`, dropping to `px-6` on small screens).
- Vertical rhythm is generous: ~72px between hero and content, ~56px below nav.
- Lists separate with `1px` `border-border` hairlines, not boxes. Cards (projects only) get `bg-surface` + `14px` radius — no border. Borders in this design are hairline _dividers_ only, never boxes around things.
- Flex/grid with `gap` for all sibling groups.

## Motion — not implemented yet

Level: subtle. Nothing longer than 400ms, nothing that moves more than 12px.

- **Page transitions:** content fades in and rises 10px on every page change (`fadeUp 360ms cubic-bezier(0.22, 1, 0.36, 1)`). Stagger sections ~60ms apart via `animation-delay`.
- **Shared-element transition:** opening a post from a list morphs the clicked row's title into the article headline (380ms, same ease); the article header skips its fade when arriving this way. Disabled with the rest of motion.
- **Hover:** all text links shift to `accent-hover` (muted links jump to it too — one hover color everywhere); cards brighten their background. All at `160ms ease`. _(Hover states are implemented; the animations above are not.)_
- Never animate layout (width/height), never bounce, never loop.

## Interactive details — not implemented yet

- **⌘K palette:** ctrl/cmd+K anywhere, or the small `⌘K` chip in the footer. Searches pages + posts; ↑↓/↵/esc. Surface panel on a dimmed blurred backdrop.
- **Reading aids (post page):** 2px accent progress bar at viewport top; fixed right-margin TOC with scrollspy (hidden < 1180px); hover-revealed `#` anchor on every heading; "copy" action in code-block headers ("copied" for 1.5s).
- **Lightbox:** clicking a filled post image opens it full-size on a dimmed backdrop (esc or click to close).
- **Text selection** highlights in accent with white text. _(Implemented.)_
- Small controls keep 13px type but get ≥30px invisible hit areas (padding pulled back with negative margins).

## Components

- **Nav:** `~/phill-johntony` in 800 weight accent as home link, then blog / projects / about in muted; current page in accent. No underlines, no button chrome.
- **Post row:** title / excerpt / `date · tag` meta stacked; full-width cover image (280px tall, 10px radius) below when the post has one. Whole row is the link.
- **Project card:** 2-col grid, borderless surface, title + one-sentence description + small tech tags (faint, no pills), accent arrow top-right.
- **Footer:** github · bluesky · rss left, copyright right, faint, hairline above.

## Article (post page)

- 36px/800 title, an 18px muted dek, then a meta line (`date · tag` left, `X min read` right, 13px faint), then the hero image.
- **Prose:** 17px/1.75 in `text-prose`. Headings in `text-text`: h2 24px/800 with 52px top margin, h3 19px/700. Paragraph gap 24px. Styled via arbitrary variants on the content wrapper in `src/layouts/blog-post.astro`.
- **Code:** `ui-monospace` stack (`font-mono`), no webfont. Blocks on `bg-code-bg`; inline code as small `bg-code-bg` chips. _(Filename/language headers with a copy action: not implemented yet.)_
- **Quotes:** hairline left border, 18px muted text, faint attribution line.
- **Callouts — not implemented yet:** `bg-surface` rounded box with an uppercase accent label (note / heads up). No border, no icon. Use a blockquote in the meantime.
- **Tables:** hairline row dividers only, uppercase faint headers, key values in `text-text` 700.
- **Images:** full-column, rounded, 13px faint centered captions.
- **TOC — not implemented yet:** fixed right of the column (hidden < 1180px), uppercase faint label, 13px items (h3s indented), active section in accent via scrollspy; 2px accent reading-progress bar at viewport top.

## Don'ts

- No emoji, no icons where a word works.
- No hero images or banners — imagery lives in post thumbnails only.
- No second font, no italics for emphasis (use weight).
- Copy stays short. An excerpt is one sentence.
