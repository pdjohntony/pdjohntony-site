import type { APIRoute } from 'astro'

import { getSortedPosts } from '../lib/posts'

export interface SearchItem {
  keywords?: string
  kind: 'page' | 'post' | 'tag'
  label: string
  url: string
}

export const GET: APIRoute = async () => {
  const posts = await getSortedPosts()
  const tags = [...new Set(posts.flatMap((post) => post.data.tags ?? []))].toSorted()

  const items: SearchItem[] = [
    { kind: 'page', label: 'home', url: '/' },
    { kind: 'page', label: 'blog', url: '/blog' },
    { kind: 'page', label: 'projects', url: '/projects' },
    { kind: 'page', label: 'about', url: '/about' },
    ...tags.map((tag): SearchItem => ({ kind: 'tag', label: tag, url: `/tags/${tag}/` })),
    ...posts.map(
      (post): SearchItem => ({
        keywords: [post.data.description, ...(post.data.tags ?? [])].join(' '),
        kind: 'post',
        label: post.data.title,
        url: `/blog/${post.id}/`,
      }),
    ),
  ]

  return Response.json(items)
}
