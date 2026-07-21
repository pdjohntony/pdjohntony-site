# PDJohntony Site

My personal site built with Astro.

## Development

Requires Node.js 22.12 or newer and pnpm 11.14.0.

```sh
pnpm install
cp .env.example .env
pnpm dev -- --background
```

Set `PUBLIC_POSTHOG_PROJECT_TOKEN` in `.env` to the public project token from PostHog. The default host in `.env.example` is for PostHog US Cloud.

## Verification

```sh
pnpm fmt:check
pnpm lint
pnpm typecheck
pnpm build
```

## Deployment

The site deploys as static assets to Cloudflare Workers:

```sh
pnpm build
pnpm exec wrangler deploy
```
