import type { Node, RehypePlugin, RemarkPlugin } from '@astrojs/markdown-remark'

const TITLELESS_MARKER = 'TITLELESSCALLOUTMARKER'

type CalloutNode = Node & {
  children?: CalloutNode[]
  properties?: { className?: string[] }
  value?: string
}

const getText = (node: CalloutNode): string => {
  if (node.type === 'text') {
    return node.value ?? ''
  }

  return node.children?.map(getText).join('') ?? ''
}

const hasClass = (node: CalloutNode, className: string) => node.properties?.className?.includes(className) === true

export const remarkTitlelessCallouts: RemarkPlugin = () => (_tree, file) => {
  file.value = String(file).replaceAll(
    /^(?<opening>\s*!!!\s+[a-zA-Z0-9_-]+)\s+""[ \t]*$/gmu,
    `$<opening> "${TITLELESS_MARKER}"`,
  )
}

export const rehypeTitlelessCallouts: RehypePlugin = () => (tree) => {
  const removeTitles = (node: CalloutNode) => {
    if (node.children === undefined) {
      return
    }

    node.children = node.children.filter(
      (child) => !(hasClass(child, 'callout-title') && getText(child).trim() === TITLELESS_MARKER),
    )
    node.children.forEach(removeTitles)
  }

  removeTitles(tree)
}
