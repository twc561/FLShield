
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'

// Validate Stripe configuration
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sub = subscription as any;
      await adminDb.collection('users').doc(userId).set({
        subscription: {
          id: sub.id,
          customerId: session.customer,
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
          priceId: sub.items.data[0].price.id,
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
