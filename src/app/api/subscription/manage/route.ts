
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
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 })
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user's subscription from Firebase
    const userDoc = await adminDb.collection('users').doc(userId).get()
    
    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()

    if (!userData?.subscription?.customerId) {
      return NextResponse.json({ 
        error: 'No active subscription found. Please subscribe first.' 
      }, { status: 404 })
    }

    // Verify customer exists in Stripe before creating portal session
    let customer
    try {
      customer = await stripe.customers.retrieve(userData.subscription.customerId)
      if (customer.deleted) {
        throw new Error('Customer was deleted')
      }
    } catch (customerError: any) {
      console.error('Customer verification failed:', customerError)
      
      // Clean up invalid subscription data
      await adminDb.collection('users').doc(userId).update({
        'subscription.status': 'invalid',
        updatedAt: new Date()
      })
      
      return NextResponse.json({ 
        error: 'Subscription data is invalid. Please contact support or resubscribe.' 
      }, { status: 400 })
    }

    // Create Stripe customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.subscription.customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account/subscription`,
    })

    // Log successful portal session creation
    console.log(`Portal session created for user ${userId}, customer ${userData.subscription.customerId}`)

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creating portal session:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
