# LaunchKit deployment checklist

## 1) Create Supabase project
- Create project in Supabase.
- Copy Project URL and anon key.
- Copy service role key.
- Paste into Vercel env variables.

## 2) Run DB migration
- Open Supabase SQL Editor.
- Run `supabase/migrations/001_init.sql`.
- Run `supabase/migrations/002_rls.sql`.

## 3) Create Stripe product and price
- Stripe Dashboard > Products > Add product.
- Create recurring monthly price.
- Copy price ID to `STRIPE_PRICE_ID`.

## 4) Set up Stripe webhooks
- Dashboard > Developers > Webhooks > Add endpoint.
- Endpoint: `https://<your-vercel-domain>/api/stripe/webhook`
- Listen for: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

## 5) Deploy to Vercel
- Import repo into Vercel.
- Set all variables from `.vercel.env.example`.
- Deploy the project.

## 6) Validate launch flows
- `/auth` magic link sign in
- `/editor` create and save page
- `/dashboard` preview live route
- `/checkout` completes Stripe payment in test mode
- `/settings` opens Stripe Billing Portal
- `/[slug]` renders a public page
