
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'

// Validate Stripe configuration
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userId } = await request.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']
    })

    if (session.payment_status === 'paid' && session.subscription) {
      const subscription = session.subscription as Stripe.Subscription
      
      // Store subscription data in Firebase
      await adminDb.collection('users').doc(userId).set({
        subscription: {
          id: subscription.id,
          customerId: session.customer,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          priceId: subscription.items.data[0].price.id,
          plan: 'pro'
        },
        updatedAt: new Date()
      }, { merge: true })
      
      return NextResponse.json({ 
        success: true, 
        customerId: session.customer,
        subscriptionId: session.subscription 
      })
    }

    return NextResponse.json({ success: false })
  } catch (error) {
    console.error('Error verifying session:', error)
    return NextResponse.json(
      { error: 'Error verifying session' },
      { status: 500 }
    )
  }
}
