import type { ShikiTransformer } from 'shiki'

export const codeBlockTransformer: ShikiTransformer = {
  name: 'code-block-frame',
  root(node) {
    // Shiki exposes the original fence metadata through this reserved field.
    // eslint-disable-next-line no-underscore-dangle
    const rawMeta = this.options.meta?.__raw ?? ''
    const titleMatch = /(?:^|\s)title=(?:"(?<doubleQuoted>[^"]+)"|'(?<singleQuoted>[^']+)'|(?<unquoted>\S+))/u.exec(
      rawMeta,
    )
    const title = titleMatch?.groups?.doubleQuoted ?? titleMatch?.groups?.singleQuoted ?? titleMatch?.groups?.unquoted
    const children = node.children.filter((child) => child.type !== 'doctype')

    if (title !== undefined) {
      children.unshift({
        children: [{ type: 'text', value: title }],
        properties: {},
        tagName: 'figcaption',
        type: 'element',
      })
    }

    node.children = [
      {
        children,
        properties: { className: ['code-block'] },
        tagName: 'figure',
        type: 'element',
      },
    ]
  },
}
