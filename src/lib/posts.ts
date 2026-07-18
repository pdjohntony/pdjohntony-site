import { type CollectionEntry, getCollection } from 'astro:content'

export const FIRST_PAGE = 1
export const PAGE_STEP = 1
const POSTS_PER_PAGE = 10
const LIST_START = 0

export interface BlogPageData {
  currentPage: number
  posts: CollectionEntry<'blog'>[]
  tags: string[]
  totalPages: number
}

export const getSortedPosts = async () => {
  const posts = await getCollection('blog')
  return posts.toSorted((firstPost, secondPost) => secondPost.data.pubDate.valueOf() - firstPost.data.pubDate.valueOf())
}

export const getBlogPages = async (): Promise<BlogPageData[]> => {
  const posts = await getSortedPosts()
  const tags = [...new Set(posts.flatMap((post) => post.data.tags ?? []))].toSorted()

  const chunks = [posts.slice(LIST_START, POSTS_PER_PAGE)]
  for (let start = POSTS_PER_PAGE; start < posts.length; start += POSTS_PER_PAGE) {
    chunks.push(posts.slice(start, start + POSTS_PER_PAGE))
  }

  return chunks.map((pagePosts, index) => ({
    currentPage: index + FIRST_PAGE,
    posts: pagePosts,
    tags,
    totalPages: chunks.length,
  }))
}
