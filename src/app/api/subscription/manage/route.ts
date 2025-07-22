
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = await request.json()

    // Get user's subscription from Firebase
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    if (!userData?.subscription?.customerId) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 })
    }

    // Verify customer exists in Stripe before creating portal session
    try {
      await stripe.customers.retrieve(userData.subscription.customerId)
    } catch (customerError: any) {
      console.error('Customer not found in Stripe:', customerError)
      return NextResponse.json({ 
        error: 'Subscription data is invalid. Please contact support.' 
      }, { status: 400 })
    }

    // Create Stripe customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.subscription.customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account/subscription`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
