
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!endpointSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`)
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancellation(deletedSubscription)
        break

      case 'invoice.payment_succeeded':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoice = event.data.object as any;
        if (typeof invoice.subscription === 'string') {
          const sub = await stripe.subscriptions.retrieve(invoice.subscription);
          await handleSubscriptionUpdate(sub);
        }
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        await handlePaymentFailure(failedInvoice)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Find user by customer ID
  const usersRef = adminDb.collection('users')
  const query = await usersRef.where('subscription.customerId', '==', customerId).get()
  
  if (!query.empty) {
    const userDoc = query.docs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sub = subscription as any;
    await userDoc.ref.set({
      subscription: {
        id: sub.id,
        customerId: customerId,
        status: sub.status,
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        priceId: sub.items.data[0].price.id,
        plan: 'pro'
      },
      updatedAt: new Date()
    }, { merge: true })
    
    console.log(`Updated subscription for user ${userDoc.id}`)
  }
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  const usersRef = adminDb.collection('users')
  const query = await usersRef.where('subscription.customerId', '==', customerId).get()
  
  if (!query.empty) {
    const userDoc = query.docs[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sub = subscription as any;
    await userDoc.ref.set({
      subscription: {
        id: sub.id,
        customerId: customerId,
        status: 'canceled',
        currentPeriodEnd: new Date(sub.current_period_end * 1000),
        priceId: sub.items.data[0].price.id,
        plan: 'free'
      },
      updatedAt: new Date()
    }, { merge: true })
    
    console.log(`Cancelled subscription for user ${userDoc.id}`)
  }
}

async function handlePaymentFailure(invoice: Stripe.Invoice) {
  console.log(`Payment failed for invoice ${invoice.id}`)
  // You could send an email notification or take other actions here
}
