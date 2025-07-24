
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

interface SecurityAlert {
  id?: string
  userId: string
  alertType: 'suspicious_login' | 'multiple_failed_logins' | 'unusual_activity' | 'geo_anomaly' | 'device_anomaly'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  details: any
  status: 'active' | 'acknowledged' | 'resolved'
  timestamp: any
  ipAddress: string
  userAgent: string
}

interface LoginAttempt {
  userId: string
  success: boolean
  ipAddress: string
  userAgent: string
  timestamp: any
  location?: string
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
    const severity = searchParams.get('severity')
    const status = searchParams.get('status') || 'active'

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let query = adminDb
      .collection('security_alerts')
      .where('userId', '==', userId)
      .where('status', '==', status)
      .orderBy('timestamp', 'desc')
      .limit(50)

    if (severity) {
      query = query.where('severity', '==', severity)
    }

    const alertsQuery = await query.get()
    const alerts: SecurityAlert[] = []
    
    alertsQuery.forEach(doc => {
      const data = doc.data()
      alerts.push({
        id: doc.id,
        ...data
      } as SecurityAlert)
    })

    return NextResponse.json({
      alerts,
      summary: {
        total: alerts.length,
        critical: alerts.filter(a => a.severity === 'critical').length,
        high: alerts.filter(a => a.severity === 'high').length,
        medium: alerts.filter(a => a.severity === 'medium').length,
        low: alerts.filter(a => a.severity === 'low').length
      }
    })
  } catch (error) {
    console.error('Error fetching security alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security alerts' },
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

    const { action, userId, loginAttempt } = await request.json()

    if (action === 'check_login_attempt') {
      const result = await analyzeLoginAttempt(loginAttempt)
      return NextResponse.json(result)
    }

    if (action === 'acknowledge_alert') {
      const { alertId } = await request.json()
      await adminDb.collection('security_alerts').doc(alertId).update({
        status: 'acknowledged',
        acknowledgedAt: FieldValue.serverTimestamp()
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing security monitoring request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

async function analyzeLoginAttempt(attempt: LoginAttempt) {
  const alerts: SecurityAlert[] = []
  
  try {
    // Check for multiple failed login attempts in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    
    const recentFailedLogins = await adminDb
      .collection('login_attempts')
      .where('userId', '==', attempt.userId)
      .where('success', '==', false)
      .where('timestamp', '>=', oneHourAgo)
      .get()

    if (recentFailedLogins.size >= 5) {
      alerts.push({
        userId: attempt.userId,
        alertType: 'multiple_failed_logins',
        severity: 'high',
        description: `${recentFailedLogins.size} failed login attempts in the last hour`,
        details: { failedAttempts: recentFailedLogins.size },
        status: 'active',
        timestamp: FieldValue.serverTimestamp(),
        ipAddress: attempt.ipAddress,
        userAgent: attempt.userAgent
      })
    }

    // Check for logins from new devices/IPs
    const recentSuccessfulLogins = await adminDb
      .collection('login_attempts')
      .where('userId', '==', attempt.userId)
      .where('success', '==', true)
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get()

    const knownIPs = new Set()
    const knownUserAgents = new Set()
    
    recentSuccessfulLogins.forEach(doc => {
      const data = doc.data()
      knownIPs.add(data.ipAddress)
      knownUserAgents.add(data.userAgent)
    })

    if (attempt.success && !knownIPs.has(attempt.ipAddress)) {
      alerts.push({
        userId: attempt.userId,
        alertType: 'suspicious_login',
        severity: 'medium',
        description: 'Login from new IP address',
        details: { newIP: attempt.ipAddress },
        status: 'active',
        timestamp: FieldValue.serverTimestamp(),
        ipAddress: attempt.ipAddress,
        userAgent: attempt.userAgent
      })
    }

    if (attempt.success && !knownUserAgents.has(attempt.userAgent)) {
      alerts.push({
        userId: attempt.userId,
        alertType: 'device_anomaly',
        severity: 'medium',
        description: 'Login from new device',
        details: { newDevice: attempt.userAgent },
        status: 'active',
        timestamp: FieldValue.serverTimestamp(),
        ipAddress: attempt.ipAddress,
        userAgent: attempt.userAgent
      })
    }

    // Store the login attempt
    await adminDb.collection('login_attempts').add({
      ...attempt,
      timestamp: FieldValue.serverTimestamp()
    })

    // Store any alerts
    for (const alert of alerts) {
      await adminDb.collection('security_alerts').add(alert)
    }

    return {
      alertsGenerated: alerts.length,
      alerts: alerts.map(a => ({ type: a.alertType, severity: a.severity }))
    }
  } catch (error) {
    console.error('Error analyzing login attempt:', error)
    return { alertsGenerated: 0, alerts: [] }
  }
}
