import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecret) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment');
}

const stripe = new Stripe(stripeSecret, { apiVersion: '2024-08-15' });

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const webhookSecretLocal = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecretLocal) {
    console.warn('No webhook secret configured; returning 200');
    return NextResponse.json({ received: true });
  }

  const buf = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, signature, webhookSecretLocal);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const stripeCustomerId = typeof session.customer === 'string' ? session.customer : (session.customer as any)?.id;
        const clientReferenceId = session.client_reference_id ?? null; // our Supabase user id if supplied
        const email = session.customer_email ?? null;
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : (session.subscription as any)?.id;

        // Upsert customer
        await supabaseAdmin
          .from('customers')
          .upsert({ user_id: clientReferenceId, email, stripe_customer_id: stripeCustomerId }, { onConflict: 'stripe_customer_id' });

        // If there's a subscription id, fetch and store subscription details
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ['items'] });
          const priceId = subscription.items.data[0].price.id;
          const status = subscription.status;
          const currentPeriodEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;

          await supabaseAdmin.from('subscriptions').upsert(
            {
              user_id: clientReferenceId,
              stripe_subscription_id: subscription.id,
              status,
              price_id: priceId,
              current_period_end: currentPeriodEnd,
            },
            { onConflict: 'stripe_subscription_id' }
          );
        }

        console.log('Handled checkout.session.completed');
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeSubscriptionId = subscription.id;
        const status = subscription.status;
        const priceId = subscription.items.data[0]?.price?.id ?? null;
        const currentPeriodEnd = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;

        // Try to find a matching customer row by stripe_customer_id
        const stripeCustomerId = (subscription.customer as string) ?? null;
        let userId: string | null = null;
        if (stripeCustomerId) {
          const { data } = await supabaseAdmin.from('customers').select('user_id').eq('stripe_customer_id', stripeCustomerId).limit(1).maybeSingle();
          userId = (data as any)?.user_id ?? null;
        }

        await supabaseAdmin.from('subscriptions').upsert(
          {
            user_id: userId,
            stripe_subscription_id: stripeSubscriptionId,
            status,
            price_id: priceId,
            current_period_end: currentPeriodEnd,
          },
          { onConflict: 'stripe_subscription_id' }
        );

        console.log('Handled subscription event:', event.type);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err: any) {
    console.error('Error handling webhook event', err);
    return NextResponse.json({ error: 'Error handling event' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
