## Local setup (Supabase + Stripe)

1. Copy .env.local.example to `.env.local` and fill in values from your Supabase and Stripe dashboard.

2. Create a Supabase project and enable Email auth (Magic link) in the Authentication settings.

3. Create a Stripe product and price (recurring) and set STRIPE_PRICE_ID to the price ID.

4. Install dependencies and run the dev server:

```bash
npm install
npm run dev --workspace=apps/web
```

5. (Optional) Set up Stripe CLI to forward webhooks:

```bash
stripe listen --forward-to "http://localhost:3000/api/stripe/webhook"
```

Replace the webhook secret in your `.env.local` with the value printed by the CLI.
