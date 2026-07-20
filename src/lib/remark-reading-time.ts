import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export const remarkReadingTime: RemarkPlugin =
  () =>
  (tree, { data }) => {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)
    const astroData = (data.astro ??= {})

    astroData.frontmatter ??= {}
    astroData.frontmatter.minutesRead = readingTime.text
  }
