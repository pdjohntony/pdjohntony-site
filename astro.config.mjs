// @ts-check

import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCallouts from 'rehype-callouts'
import remarkAdmonitionToBlockquoteCallout from 'remark-admonition-to-blockquote-callout'

import { rehypeTitlelessCallouts, remarkTitlelessCallouts } from './src/lib/markdown-callouts.ts'
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
  integrations: [mdx(), sitemap()],
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
      ],
      remarkPlugins: [remarkTitlelessCallouts, remarkAdmonitionToBlockquoteCallout],
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
