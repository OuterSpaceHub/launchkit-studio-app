# Additional local envs required

Add the following to your `.env.local` before running: (don't share these values publicly)

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_PRICE_ID=price_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Notes
- SUPABASE_SERVICE_ROLE_KEY is required for server-side operations that modify/insert data based on Stripe webhooks.
- Run the SQL in `supabase/migrations/001_init.sql` in your Supabase SQL editor to create the customers, subscriptions, and pages tables.
