import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const blog = defineCollection({
  // Each post is a folder containing an index.md and its colocated images.
  loader: glob({ base: './src/content/blog', pattern: '**/index.{md,mdx}' }),
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
