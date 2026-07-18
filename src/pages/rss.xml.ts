import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('blog')
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
