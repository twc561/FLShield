
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

interface SessionData {
  id: string
  userId: string
  deviceInfo: string
  ipAddress: string
  userAgent: string
  location?: string
  lastActivity: any
  createdAt: any
  isActive: boolean
}

// Extract device info from user agent
function extractDeviceInfo(userAgent: string): string {
  if (userAgent.includes('Mobile')) return 'Mobile Device'
  if (userAgent.includes('Tablet')) return 'Tablet'
  if (userAgent.includes('Windows')) return 'Windows PC'
  if (userAgent.includes('Mac')) return 'Mac'
  if (userAgent.includes('Linux')) return 'Linux PC'
  return 'Unknown Device'
}

// Get approximate location from IP (you could integrate with a geolocation service)
function getLocationFromIP(ip: string): string {
  // This is a placeholder - integrate with a real geolocation service
  return 'Unknown Location'
}

export async function GET(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid authorization header' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get all sessions for the user (active and inactive)
    let sessionsQuery
    try {
      sessionsQuery = await adminDb
        .collection('user_sessions')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get()
    } catch (indexError) {
      console.log('Index not ready, falling back to simpler query:', indexError.message)
      // Fallback to simpler query without ordering if index isn't ready
      sessionsQuery = await adminDb
        .collection('user_sessions')
        .where('userId', '==', userId)
        .limit(50)
        .get()
    }

    const sessions: SessionData[] = []
    sessionsQuery.forEach(doc => {
      const data = doc.data()
      sessions.push({
        id: doc.id,
        userId: data.userId,
        deviceInfo: data.deviceInfo,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        location: data.location,
        lastActivity: data.lastActivity,
        createdAt: data.createdAt,
        isActive: data.isActive
      })
    })

    // Update current session's last activity
    const currentIP = headersList.get('x-forwarded-for') || 'unknown'
    const currentUA = headersList.get('user-agent') || 'unknown'
    
    const currentSessionQuery = await adminDb
      .collection('user_sessions')
      .where('userId', '==', userId)
      .where('ipAddress', '==', currentIP)
      .where('userAgent', '==', currentUA)
      .where('isActive', '==', true)
      .limit(1)
      .get()

    if (!currentSessionQuery.empty) {
      await currentSessionQuery.docs[0].ref.update({
        lastActivity: FieldValue.serverTimestamp()
      })
    }

    return NextResponse.json({
      sessions,
      totalActiveSessions: sessions.length
    })
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
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid authorization header' }, { status: 401 })
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const userAgent = headersList.get('user-agent') || 'unknown'
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown'
    const deviceInfo = extractDeviceInfo(userAgent)
    const location = getLocationFromIP(ipAddress)

    // Check if session already exists for this device/IP combo
    const existingSessionQuery = await adminDb
      .collection('user_sessions')
      .where('userId', '==', userId)
      .where('ipAddress', '==', ipAddress)
      .where('userAgent', '==', userAgent)
      .where('isActive', '==', true)
      .limit(1)
      .get()

    if (!existingSessionQuery.empty) {
      // Update existing session
      await existingSessionQuery.docs[0].ref.update({
        lastActivity: FieldValue.serverTimestamp()
      })
      
      return NextResponse.json({ 
        success: true,
        sessionId: existingSessionQuery.docs[0].id,
        message: 'Session updated'
      })
    }

    // Create new session
    const sessionRef = await adminDb.collection('user_sessions').add({
      userId,
      deviceInfo,
      ipAddress,
      userAgent,
      location,
      createdAt: FieldValue.serverTimestamp(),
      lastActivity: FieldValue.serverTimestamp(),
      isActive: true
    })

    // Log session creation
    await adminDb.collection('audit_logs').add({
      userId,
      action: 'session_created',
      sessionId: sessionRef.id,
      timestamp: FieldValue.serverTimestamp(),
      ip: ipAddress,
      userAgent
    })

    return NextResponse.json({ 
      success: true,
      sessionId: sessionRef.id,
      message: 'Session created successfully'
    })
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
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid authorization header' }, { status: 401 })
    }

    const { sessionId, userId, terminateAll } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    if (terminateAll) {
      // Terminate all sessions for the user
      const sessionsQuery = await adminDb
        .collection('user_sessions')
        .where('userId', '==', userId)
        .where('isActive', '==', true)
        .get()

      const batch = adminDb.batch()
      sessionsQuery.forEach(doc => {
        batch.update(doc.ref, { 
          isActive: false, 
          terminatedAt: FieldValue.serverTimestamp() 
        })
      })
      await batch.commit()

      // Log mass session termination
      await adminDb.collection('audit_logs').add({
        userId,
        action: 'all_sessions_terminated',
        timestamp: FieldValue.serverTimestamp(),
        ip: headersList.get('x-forwarded-for') || 'unknown',
        sessionCount: sessionsQuery.size
      })

      return NextResponse.json({ 
        success: true,
        message: `${sessionsQuery.size} sessions terminated`
      })
    } else if (sessionId) {
      // Terminate specific session
      const sessionDoc = await adminDb.collection('user_sessions').doc(sessionId).get()
      
      if (!sessionDoc.exists) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }

      const sessionData = sessionDoc.data()
      if (sessionData?.userId !== userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
      }

      await adminDb.collection('user_sessions').doc(sessionId).update({
        isActive: false,
        terminatedAt: FieldValue.serverTimestamp()
      })

      // Log session termination
      await adminDb.collection('audit_logs').add({
        userId,
        action: 'session_terminated',
        sessionId,
        timestamp: FieldValue.serverTimestamp(),
        ip: headersList.get('x-forwarded-for') || 'unknown'
      })

      return NextResponse.json({ 
        success: true,
        message: 'Session terminated successfully'
      })
    } else {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error terminating session:', error)
    return NextResponse.json(
      { error: 'Failed to terminate session' },
      { status: 500 }
    )
  }
}
