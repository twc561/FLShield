
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userId } = await request.json()

    if (!sessionId || !userId) {
      return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 })
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid' && session.metadata?.userId === userId) {
      // Get the subscription from the session
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        
        // Update user's subscription in Firestore
        await adminDb.collection('users').doc(userId).set({
          subscription: {
            id: subscription.id,
            customerId: subscription.customer as string,
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            priceId: subscription.items.data[0].price.id,
            plan: 'pro'
          },
          updatedAt: new Date()
        }, { merge: true })

        return NextResponse.json({ success: true })
      }
    }

    return NextResponse.json({ success: false, error: 'Session not valid' }, { status: 400 })
  } catch (error) {
    console.error('Error verifying session:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
