alter table customers enable row level security;
alter table subscriptions enable row level security;
alter table pages enable row level security;

-- Service role is allowed to manage all rows in server-side flows (webhooks, admin tasks)
create policy "service role can manage customers" on customers
for all
using (auth.jwt()->>'role' = 'service_role')
with check (auth.jwt()->>'role' = 'service_role');

create policy "service role can manage subscriptions" on subscriptions
for all
using (auth.jwt()->>'role' = 'service_role')
with check (auth.jwt()->>'role' = 'service_role');

create policy "service role can manage pages" on pages
for all
using (auth.jwt()->>'role' = 'service_role')
with check (auth.jwt()->>'role' = 'service_role');

-- Users can read their own customer record
create policy "users can view own customer" on customers
for select
using (auth.uid() = user_id);

-- Users can read only their own subscriptions
create policy "users can view own subscriptions" on subscriptions
for select
using (auth.uid() = user_id);

-- Published pages are public to anyone
create policy "published pages are public" on pages
for select
using (published = true);

-- Users can manage their own pages
create policy "users can manage own pages" on pages
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
