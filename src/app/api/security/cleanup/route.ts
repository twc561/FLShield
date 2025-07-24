
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid authorization header' }, { status: 401 })
    }

    const { action, retentionDays = 365 } = await request.json()

    if (action !== 'cleanup') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000)
    let totalDeleted = 0

    // Clean up old audit logs
    const oldAuditLogs = await adminDb
      .collection('audit_logs')
      .where('timestamp', '<', cutoffDate)
      .limit(500)
      .get()

    if (!oldAuditLogs.empty) {
      const batch = adminDb.batch()
      oldAuditLogs.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()
      totalDeleted += oldAuditLogs.size
    }

    // Clean up old login attempts
    const oldLoginAttempts = await adminDb
      .collection('login_attempts')
      .where('timestamp', '<', cutoffDate)
      .limit(500)
      .get()

    if (!oldLoginAttempts.empty) {
      const batch = adminDb.batch()
      oldLoginAttempts.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()
      totalDeleted += oldLoginAttempts.size
    }

    // Clean up inactive sessions older than 30 days
    const inactiveSessionCutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const inactiveSessions = await adminDb
      .collection('user_sessions')
      .where('isActive', '==', false)
      .where('terminatedAt', '<', inactiveSessionCutoff)
      .limit(500)
      .get()

    if (!inactiveSessions.empty) {
      const batch = adminDb.batch()
      inactiveSessions.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()
      totalDeleted += inactiveSessions.size
    }

    // Clean up resolved security alerts older than 90 days
    const alertCutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    const oldAlerts = await adminDb
      .collection('security_alerts')
      .where('status', '==', 'resolved')
      .where('timestamp', '<', alertCutoff)
      .limit(500)
      .get()

    if (!oldAlerts.empty) {
      const batch = adminDb.batch()
      oldAlerts.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()
      totalDeleted += oldAlerts.size
    }

    return NextResponse.json({
      success: true,
      totalDeleted,
      cutoffDate: cutoffDate.toISOString()
    })
  } catch (error) {
    console.error('Error during security cleanup:', error)
    return NextResponse.json(
      { error: 'Failed to perform cleanup' },
      { status: 500 }
    )
  }
}
