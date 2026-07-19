---
title: 'Shiki syntax highlighting examples'
description: 'A visual reference for Astro code fences, Shiki configuration, and the Code component.'
pubDate: 2026-02-11 08:00:00 -0500
tags: ['dev', 'test']
---

Astro highlights Markdown code blocks with Shiki at build time. This post collects the available ways to use and configure it. None of the rendered examples require client-side JavaScript.

## Language fences

Put a bundled language ID after the opening fence. This example uses the canonical `rust` ID:

```rust
fn main() {
    let message = "highlighted at build time";
    println!("{message}");
}
```

The same pattern works for Shiki's other bundled grammars:

```typescript
type Post = {
  title: string
  published: boolean
}

const post: Post = { title: 'Shiki examples', published: true }
```

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

```css
.code-block {
  overflow-x: auto;
  tab-size: 2;
}
```

The fence source is simply:

````markdown
```rust
fn main() {
    println!("Hello");
}
```
````

Shiki 4.3.1 includes 253 language grammars. The current list is available in the [Shiki language reference](https://shiki.style/languages).

## Language aliases

Many languages have shorter aliases. For example, `rs` maps to Rust, `ts` maps to TypeScript, `js` maps to JavaScript, and `sh` maps to shell script.

```rs
pub fn answer() -> u8 {
    42
}
```

```ts
const answer: number = 42
```

```sh
pnpm build
```

## Plain text

Use `text` when a block should not receive token colors. `txt` and `plain` are aliases for the same behavior.

```text
This content is deliberately not parsed as a programming language.
Punctuation such as const, fn, and <html> remains plain text.
```

## ANSI terminal output

The special `ansi` language can preserve colors and styles already encoded in terminal output. It expects real ANSI escape characters, not the printable `\x1b` notation shown below.

```ansi
PASS src/example.test.ts
Tests: 3 passed, 3 total
```

This is useful when pasting colored output captured from a terminal. Ordinary terminal commands and uncolored output are usually better represented with `shell` or `shellsession`.

```shellsession
$ pnpm build
14:32:08 [build] Complete!
```

## Fence metadata

Text after the language ID is fence metadata. This site's code-block transformer recognizes `title="..."` and renders it as a caption:

```ts title="answer.ts"
const question = 'life, the universe, and everything'
const answer = 42
```

The source for that block is:

````markdown
```ts {2} title="answer.ts"
const question = 'life, the universe, and everything'
const answer = 42
```
````

Metadata does nothing by itself. A configured Shiki transformer decides what each value means. This site's transformer handles the title, but `{2}` would still need a line-highlighting transformer.

## Inline code

Single backticks render `const answer = 42` as inline code. This is Markdown styling, not Shiki syntax highlighting, so inline code does not receive language-specific token colors.

## Choosing a theme

Set one theme for every Markdown code block in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
})
```

Astro uses `github-dark` by default. Shiki also accepts an imported custom theme object in place of the theme name.

```js
import { defineConfig } from 'astro/config'
import customTheme from './src/code-theme.json'

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: customTheme,
    },
  },
})
```

## Light and dark themes

Configure two themes to make Shiki emit both sets of color variables:

```js
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
})
```

Then select the dark variables with CSS. Astro uses `.astro-code` instead of Shiki's usual `.shiki` class.

```css
@media (prefers-color-scheme: dark) {
  .astro-code,
  .astro-code span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}
```

## Wrapping long lines

The global `wrap` option controls whether Markdown code lines wrap instead of scrolling horizontally:

```js
export default defineConfig({
  markdown: {
    shikiConfig: {
      wrap: true,
    },
  },
})
```

## Custom languages and aliases

Register a custom TextMate grammar through `langs`, then give it additional fence names through `langAlias`:

```js
import { defineConfig } from 'astro/config'
import myLanguage from './src/my-language.tmLanguage.json'

export default defineConfig({
  markdown: {
    shikiConfig: {
      langs: [myLanguage],
      langAlias: {
        mylang: 'my-language',
      },
    },
  },
})
```

The grammar object must follow Shiki's custom-language format and provide the ID used by the alias.

## Transformers

Transformers can annotate lines, focus or dim code, render diffs, add classes, or interpret fence metadata. Their CSS is not included automatically.

```js
import { transformerMetaHighlight, transformerNotationDiff } from '@shikijs/transformers'
import { defineConfig } from 'astro/config'

export default defineConfig({
  markdown: {
    shikiConfig: {
      transformers: [transformerMetaHighlight(), transformerNotationDiff()],
    },
  },
})
```

With those transformers configured, metadata and notation comments can produce annotations:

````markdown
```ts {1}
const current = 'highlight this line'
const oldValue = 41 // [!code --]
const newValue = 42 // [!code ++]
```
````

## Default colors

`defaultColor` controls whether Shiki emits a default foreground and background color in addition to token colors:

```js
export default defineConfig({
  markdown: {
    shikiConfig: {
      defaultColor: false,
    },
  },
})
```

This is useful when the site's own CSS should own the code block's base colors.

## Switching or disabling the highlighter

Astro can use Prism instead, or skip syntax highlighting entirely:

```js
export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism',
  },
})
```

```js
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
  },
})
```

Prism emits CSS classes and requires a Prism stylesheet. Shiki emits the token styles during the build.

## The Code component

Astro's Shiki-powered `<Code />` component is available in `.astro` and `.mdx` files when the code is supplied as data rather than a Markdown fence:

```astro
---
import { Code } from 'astro:components'

const source = `const answer: number = 42`
---

<Code code={source} lang="ts" />
```

It supports an independent theme and wrapping:

```astro
<Code code={source} lang="ts" theme="dracula" wrap />
```

It can render inline code:

```astro
<p>The value is <Code code="const answer = 42" lang="js" inline />.</p>
```

It can load extra grammars used inside an embedded language. For example, a Vue block can opt into TSX embedded inside the component:

```astro
<Code code={vueSource} lang="vue" embeddedLangs={['tsx']} />
```

It accepts transformers and transformer metadata directly:

```astro
---
import { transformerMetaHighlight } from '@shikijs/transformers'
---

<Code
  code={source}
  lang="ts"
  meta="{1}"
  transformers={[transformerMetaHighlight()]}
/>
```

Finally, `defaultColor` controls its base color output just as it does in global Shiki configuration:

```astro
<Code code={source} lang="ts" defaultColor={false} />
```

The component does not inherit `markdown.shikiConfig`; its `theme`, `lang`, `embeddedLangs`, `transformers`, `meta`, and `defaultColor` values are passed independently.
