import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const priceId = process.env.STRIPE_PRICE_ID;

if (!stripeSecret) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment');
}
if (!priceId) {
  throw new Error('Missing STRIPE_PRICE_ID in environment');
}

const stripe = new Stripe(stripeSecret, { apiVersion: '2024-08-15' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body || {};

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: userId ?? undefined,
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
