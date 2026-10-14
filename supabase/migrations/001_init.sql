-- Supabase SQL migration: create tables for customers, subscriptions, and pages

create extension if not exists pgcrypto;

-- Customers table maps Supabase auth users to Stripe customers
create table if not exists customers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid,
  email text,
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Subscriptions table stores Stripe subscription state
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid,
  stripe_subscription_id text unique,
  status text,
  price_id text,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Pages table for the simple JSON-block page editor
create table if not exists pages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid,
  title text,
  slug text unique,
  blocks jsonb,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
