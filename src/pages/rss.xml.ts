import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'

import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts'
import { getSortedPosts } from '@/lib/posts'

export const GET: APIRoute = async ({ site }) => {
  const posts = await getSortedPosts()
  const items = []

  for (const { data, id } of posts) {
    items.push({
      description: data.description,
      link: `/blog/${id}/`,
      pubDate: data.pubDate,
      title: data.title,
    })
  }

  return rss({
    description: SITE_DESCRIPTION,
    items,
    site: site ?? 'http://localhost',
    title: SITE_TITLE,
  })
}
