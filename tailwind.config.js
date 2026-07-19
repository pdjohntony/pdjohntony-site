/* eslint-disable id-length, sort-keys */
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-prose)',
            fontSize: '17px',
            lineHeight: '1.75',
            a: {
              color: 'var(--color-accent)',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--color-accent-hover)',
              },
            },
            blockquote: {
              marginTop: '2.25rem',
              marginBottom: '2.25rem',
              borderInlineStartWidth: '2px',
              borderInlineStartColor: 'var(--color-border)',
              paddingInlineStart: '1.5rem',
              color: 'var(--color-muted)',
              fontSize: '1.125rem',
              fontWeight: '400',
              fontStyle: 'normal',
              lineHeight: '1.6',
            },
            '.callout': {
              '--callout-color': 'var(--color-callout-note)',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderRadius: '10px',
              backgroundColor: 'color-mix(in srgb, var(--callout-color) 8%, var(--color-surface))',
              padding: '1.125rem 1.375rem',
            },
            ".callout[data-callout='tip'], .callout[data-callout='hint'], .callout[data-callout='important'], .callout[data-callout='success'], .callout[data-callout='check'], .callout[data-callout='done']":
              {
                '--callout-color': 'var(--color-callout-tip)',
              },
            ".callout[data-callout='warning'], .callout[data-callout='attention'], .callout[data-callout='caution']": {
              '--callout-color': 'var(--color-callout-warning)',
            },
            ".callout[data-callout='failure'], .callout[data-callout='missing'], .callout[data-callout='fail'], .callout[data-callout='danger'], .callout[data-callout='error'], .callout[data-callout='bug']":
              {
                '--callout-color': 'var(--color-callout-danger)',
              },
            ".callout[data-callout='quote'], .callout[data-callout='cite']": {
              '--callout-color': 'var(--color-callout-quote)',
            },
            '.callout-title': {
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              color: 'var(--callout-color)',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              lineHeight: '1.25rem',
              textTransform: 'uppercase',
            },
            '.callout-title-icon': {
              display: 'flex',
              flexShrink: '0',
            },
            '.callout-title-icon svg': {
              width: '1rem',
              height: '1rem',
            },
            '.callout-content': {
              color: 'var(--color-prose)',
              fontSize: '15px',
              lineHeight: '1.65',
            },
            '.callout-content > :first-child': {
              marginTop: '0',
            },
            '.callout-content > :last-child': {
              marginBottom: '0',
            },
            'blockquote p': {
              marginBottom: '0.625rem',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
            code: {
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-code-bg)',
              padding: '0.125rem 0.4375rem',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: '400',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            figcaption: {
              paddingTop: '0.625rem',
              color: 'var(--color-faint)',
              fontSize: '13px',
              textAlign: 'center',
            },
            h2: {
              marginTop: '3.25rem',
              marginBottom: '1rem',
              color: 'var(--color-text)',
              fontSize: '1.5rem',
              fontWeight: '800',
              letterSpacing: '-0.01em',
            },
            h3: {
              marginTop: '2.25rem',
              marginBottom: '0.875rem',
              color: 'var(--color-text)',
              fontSize: '19px',
              fontWeight: '700',
            },
            'h2, h3': {
              position: 'relative',
            },
            '.heading-anchor': {
              position: 'absolute',
              insetInlineEnd: '100%',
              paddingInlineEnd: '0.5rem',
              color: 'var(--color-faint)',
              opacity: '0',
              transition: 'color 160ms ease, opacity 160ms ease',
            },
            'h2:hover .heading-anchor, h3:hover .heading-anchor, .heading-anchor:focus-visible': {
              opacity: '1',
            },
            '.heading-anchor:focus-visible': {
              color: 'var(--color-accent-hover)',
              outline: '2px solid var(--color-accent)',
              outlineOffset: '2px',
            },
            hr: {
              marginTop: '2.25rem',
              marginBottom: '2.25rem',
              borderColor: 'var(--color-border)',
            },
            img: {
              width: '100%',
              marginTop: '2.25rem',
              marginBottom: '2.25rem',
              borderRadius: '10px',
            },
            li: {
              marginBottom: '0.625rem',
              paddingInlineStart: '0.375rem',
            },
            ol: {
              marginBottom: '1.5rem',
              paddingInlineStart: '1.5rem',
              listStyleType: 'decimal',
            },
            p: {
              marginBottom: '1.5rem',
            },
            pre: {
              marginBottom: '1.5rem',
              overflowX: 'auto',
              borderRadius: '10px',
              backgroundColor: 'var(--color-code-bg)',
              padding: '1.125rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
            },
            'pre code': {
              borderRadius: '0',
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: '0.875rem',
            },
            strong: {
              color: 'var(--color-text)',
              fontWeight: '700',
            },
            table: {
              width: '100%',
              marginBottom: '1.5rem',
              borderCollapse: 'collapse',
              fontSize: '15px',
            },
            td: {
              borderTop: '1px solid var(--color-border)',
              paddingTop: '0.75rem',
              paddingRight: '0.75rem',
              paddingBottom: '0.75rem',
            },
            th: {
              paddingRight: '0.75rem',
              paddingBottom: '0.625rem',
              color: 'var(--color-faint)',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textAlign: 'left',
              textTransform: 'uppercase',
            },
            ul: {
              marginBottom: '1.5rem',
              paddingInlineStart: '1.5rem',
              listStyleType: 'disc',
            },
          },
        },
      },
    },
  },
}
