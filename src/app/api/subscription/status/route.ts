
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Get user's subscription from Firebase
    const userDoc = await adminDb.collection('users').doc(userId).get()
    
    if (!userDoc.exists()) {
      return NextResponse.json({ 
        isPro: false, 
        subscription: null,
        message: 'User not found'
      })
    }

    const userData = userDoc.data()
    const subscription = userData?.subscription

    if (!subscription) {
      return NextResponse.json({ 
        isPro: false, 
        subscription: null,
        message: 'No subscription found'
      })
    }

    const isPro = subscription.status === 'active'
    const currentPeriodEnd = subscription.currentPeriodEnd?.toDate()
    const isExpired = currentPeriodEnd && new Date() > currentPeriodEnd

    return NextResponse.json({ 
      isPro: isPro && !isExpired,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        plan: subscription.plan,
        currentPeriodEnd: currentPeriodEnd?.toISOString(),
        priceId: subscription.priceId
      },
      message: isPro ? 'Active subscription' : 'No active subscription'
    })
  } catch (error) {
    console.error('Error checking subscription status:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
}
