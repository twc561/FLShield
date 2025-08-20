
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { getStripe, safeHasStripe } from '@/lib/stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!endpointSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }
  const body = await request.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!safeHasStripe()) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }
  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
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
        const invoice = event.data.object as Stripe.Invoice
        if ((invoice as any).subscription && typeof (invoice as any).subscription === 'string') {
          const stripe = getStripe()
          const sub = await stripe.subscriptions.retrieve((invoice as any).subscription)
          await handleSubscriptionUpdate(sub)
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
    await userDoc.ref.set({
      subscription: {
        id: subscription.id,
        customerId: customerId,
        status: subscription.status,
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        priceId: subscription.items.data[0].price.id,
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
    await userDoc.ref.set({
      subscription: {
        id: subscription.id,
        customerId: customerId,
        status: 'canceled',
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        priceId: subscription.items.data[0].price.id,
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
