
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get login sessions from Firebase
    const sessionsRef = adminDb.collection('user_sessions').where('userId', '==', userId)
    const sessionsSnapshot = await sessionsRef.orderBy('createdAt', 'desc').limit(10).get()

    const sessions = sessionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, device, location, userAgent } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Create new session record
    const sessionData = {
      userId,
      device: device || 'Unknown',
      location: location || 'Unknown',
      userAgent: userAgent || 'Unknown',
      createdAt: new Date(),
      isActive: true,
      lastActivity: new Date()
    }

    await adminDb.collection('user_sessions').add(sessionData)

    // Update user's last login
    await adminDb.collection('users').doc(userId).update({
      lastLogin: new Date()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    await adminDb.collection('user_sessions').doc(sessionId).update({
      isActive: false,
      endedAt: new Date()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error ending session:', error)
    return NextResponse.json(
      { error: 'Failed to end session' },
      { status: 500 }
    )
  }
}
