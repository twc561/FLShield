
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // Here you would typically:
      // 1. Update user's subscription status in your database
      // 2. Grant access to pro features
      // 3. Send confirmation email
      
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
