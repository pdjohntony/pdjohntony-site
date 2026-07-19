// @ts-check

import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

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
  site: 'https://philljohntony.com',
  vite: {
    plugins: [tailwindcss()],
  },
})
