// @ts-check

import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, fontProviders } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCallouts from 'rehype-callouts'
import rehypeExternalLinks from 'rehype-external-links'
import remarkAdmonitionToBlockquoteCallout from 'remark-admonition-to-blockquote-callout'

import { rehypeTitlelessCallouts, remarkTitlelessCallouts } from './src/lib/markdown-callouts.ts'
import { remarkReadingTime } from './src/lib/remark-reading-time.ts'
import { codeBlockTransformer } from './src/lib/shiki-code-block.ts'

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      cssVariable: '--font-manrope',
      name: 'Manrope',
      provider: fontProviders.fontsource(),
      styles: ['normal'],
      subsets: ['latin'],
      weights: ['200 800'],
    },
  ],
  integrations: [mdx(), sitemap(), robotsTxt({ sitemap: true })],
  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeHeadingIds,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'prepend',
            content: { type: 'text', value: '#' },
            properties: {
              ariaLabel: 'Link to this section',
              className: ['heading-anchor'],
            },
            test: ['h2', 'h3'],
          },
        ],
        rehypeCallouts,
        rehypeTitlelessCallouts,
        [
          rehypeExternalLinks,
          {
            content: {
              children: [
                {
                  children: [],
                  properties: {
                    // eslint-disable-next-line id-length -- `d` is the SVG path data attribute.
                    d: 'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
                  },
                  tagName: 'path',
                  type: 'element',
                },
              ],
              properties: {
                fill: 'none',
                stroke: 'currentColor',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
                viewBox: '0 0 24 24',
              },
              tagName: 'svg',
              type: 'element',
            },
            contentProperties: {
              ariaHidden: 'true',
              className: ['external-link-icon'],
            },
          },
        ],
      ],
      remarkPlugins: [remarkReadingTime, remarkTitlelessCallouts, remarkAdmonitionToBlockquoteCallout],
    }),
    shikiConfig: {
      transformers: [codeBlockTransformer],
    },
  },
  site: 'https://philljohntony.com',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
})
