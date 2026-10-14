## LaunchKit Studio App

LaunchKit is a production-style starter SaaS that combines:

- a landing-page builder SaaS MVP
- a monetized digital product bundle
- Stripe checkout hooks and billing scaffolding
- a live preview/public page route for published content

## Current status

This project is in a strong MVP-ready state for an early-stage founder prototype:

- product marketing landing page
- dashboard for saved pages
- builder UI with blocks and live preview
- public page route for published pages
- checkout and billing scaffolding
- digital template bundle for sale

## Product direction

### SaaS MVP

LaunchKit helps founders create polished launch pages without needing a designer or developer.

Core value proposition:
- create landing pages from reusable blocks
- preview changes instantly
- publish live pages with a unique slug
- manage subscriptions and billing

### Digital product bundle

The repo also includes a packaged digital product under `products/launchkit-bundle` for Gumroad or Shopify sale. This is useful as a second revenue stream while the SaaS is growing.

## Repository layout

```text
.
├── apps/
│   └── web/
│       ├── app/
│       ├── lib/
│       └── package.json
├── products/
│   └── launchkit-bundle/
├── supabase/
│   └── migrations/
├── .env.local.example
├── .gitignore
├── README.md
├── README_ENV_NOTES.md
└── package.json
```

## Run locally

```bash
npm install
npm run dev --workspace=apps/web
```

Then open:
- http://localhost:3000
- http://localhost:3000/editor
- http://localhost:3000/dashboard

## Required environment variables

Copy `.env.local.example` to `.env.local` and add your real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
```

Detailed notes are in `README_ENV_NOTES.md`.

## Database setup

Run the SQL migration in your Supabase project:

```sql
-- file: supabase/migrations/001_init.sql
```

This creates:
- `customers`
- `subscriptions`
- `pages`

## Frontend routes

- `/` – product marketing page
- `/editor` – page builder interface
- `/dashboard` – page list and preview links
- `/checkout` – checkout flow
- `/settings` – billing portal entry point
- `/:slug` – public landing page route for published pages

## Launch checklist

Before going live:

- create a Supabase project and run the migration
- configure Stripe product + recurring price
- set up Stripe webhook forwarding
- sign in with magic link auth
- publish one demo landing page
- create a buyer-facing sales page for your digital bundle
- deploy to Vercel

## Recommended next step

Use this repo as the foundation for a real founder-facing SaaS MVP and sell the digital bundle while you validate demand.

## License

MIT
