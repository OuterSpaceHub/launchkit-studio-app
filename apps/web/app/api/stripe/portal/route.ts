import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) throw new Error('Missing STRIPE_SECRET_KEY');
const stripe = new Stripe(stripeSecret, { apiVersion: '2024-08-15' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body || {};

    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    // Lookup stripe customer id for this user
    const { data, error } = await supabaseAdmin.from('customers').select('stripe_customer_id').eq('user_id', userId).limit(1).maybeSingle();
    if (error) throw error;
    const stripeCustomerId = (data as any)?.stripe_customer_id;
    if (!stripeCustomerId) return NextResponse.json({ error: 'No stripe customer for user' }, { status: 404 });

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: origin,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Portal error', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
