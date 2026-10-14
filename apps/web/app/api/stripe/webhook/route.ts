import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecret) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment');
}

const stripe = new Stripe(stripeSecret, { apiVersion: '2024-08-15' });

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  if (!signature || !webhookSecret) {
    return NextResponse.json({ received: true });
  }

  const buf = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  // Handle the event types you care about
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout session completed', session.id);
      // TODO: Fulfill the purchase, create user or subscription record in DB
      break;
    case 'invoice.paid':
      // handle successful invoice payments
      break;
    case 'invoice.payment_failed':
      // handle failed payments
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
