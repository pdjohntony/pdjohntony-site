/**
 * Browser-free, build-time Mermaid rendering:
 * - beautiful-mermaid converts Mermaid-compatible source into static SVG.
 * - unist-util-visit finds Mermaid code blocks in Astro's HAST.
 * - hast-util-to-text recovers their source after Shiki syntax highlighting.
 * - hast-util-from-html-isomorphic parses the generated SVG back into HAST.
 * - @types/hast types the plugin tree without adding runtime code.
 */
import { renderMermaidSVG } from 'beautiful-mermaid'
import type { Root } from 'hast'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { toText } from 'hast-util-to-text'
import { visit } from 'unist-util-visit'

const REPLACED_NODE_COUNT = 1

export const rehypeMermaid = () => (tree: Root) => {
  visit(tree, 'element', (node, index, parent) => {
    if (node.tagName !== 'pre' || node.properties.dataLanguage !== 'mermaid' || index === undefined || !parent) {
      return
    }

    const svg = renderMermaidSVG(toText(node), {
      accent: 'var(--color-accent)',
      bg: 'var(--color-surface)',
      border: 'var(--color-border)',
      fg: 'var(--color-text)',
      font: 'Manrope',
      line: 'var(--color-faint)',
      muted: 'var(--color-muted)',
      surface: 'var(--color-surface-hover)',
      transparent: true,
    })
    const diagram = fromHtmlIsomorphic(svg, { fragment: true })
    const diagramNode = diagram.children.find((child) => child.type === 'element')
    if (diagramNode) {
      diagramNode.properties.className = ['mermaid-diagram']
    }
    parent.children.splice(index, REPLACED_NODE_COUNT, ...diagram.children)
  })
}
