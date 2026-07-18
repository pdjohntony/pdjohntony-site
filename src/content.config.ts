import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      description: z.string(),
      heroImage: image().optional(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      tags: z.array(z.string()).optional(),
      title: z.string(),
      updatedDate: z.coerce.date().optional(),
    }),
})

export const collections = { blog }
