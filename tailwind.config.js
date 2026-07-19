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
