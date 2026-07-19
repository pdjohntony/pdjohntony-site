// @ts-check

import { rehypeHeadingIds, unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
      ],
    }),
  },
  site: 'https://philljohntony.com',
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
})
