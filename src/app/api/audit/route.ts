
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

interface AuditLogEntry {
  id: string
  userId: string
  action: string
  timestamp: any
  ip: string
  userAgent: string
  metadata?: any
  sessionId?: string
  risk_level?: 'low' | 'medium' | 'high'
}

const HIGH_RISK_ACTIONS = [
  'account_deletion_requested',
  'password_changed',
  'two_factor_disabled',
  'all_sessions_terminated',
  'data_export_requested'
]

const MEDIUM_RISK_ACTIONS = [
  'profile_updated',
  'settings_changed',
  'session_terminated',
  'subscription_cancelled'
]

function getRiskLevel(action: string): 'low' | 'medium' | 'high' {
  if (HIGH_RISK_ACTIONS.includes(action)) return 'high'
  if (MEDIUM_RISK_ACTIONS.includes(action)) return 'medium'
  return 'low'
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
    const action = searchParams.get('action')
    const riskLevel = searchParams.get('riskLevel')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Build query
    let query = adminDb.collection('audit_logs')
      .where('userId', '==', userId)

    if (action) {
      query = query.where('action', '==', action)
    }

    if (riskLevel) {
      query = query.where('risk_level', '==', riskLevel)
    }

    if (startDate) {
      query = query.where('timestamp', '>=', new Date(startDate))
    }

    if (endDate) {
      query = query.where('timestamp', '<=', new Date(endDate))
    }

    // Execute query with pagination
    const querySnapshot = await query
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .offset(offset)
      .get()

    const auditLogs: AuditLogEntry[] = []
    querySnapshot.forEach(doc => {
      const data = doc.data()
      auditLogs.push({
        id: doc.id,
        userId: data.userId,
        action: data.action,
        timestamp: data.timestamp,
        ip: data.ip,
        userAgent: data.userAgent,
        metadata: data.metadata,
        sessionId: data.sessionId,
        risk_level: data.risk_level || getRiskLevel(data.action)
      })
    })

    // Get total count for pagination
    const totalQuery = await adminDb.collection('audit_logs')
      .where('userId', '==', userId)
      .count()
      .get()

    const totalCount = totalQuery.data().count

    // Get summary statistics
    const summaryQuery = await adminDb
      .collection('audit_logs')
      .where('userId', '==', userId)
      .where('timestamp', '>=', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
      .get()

    const summary = {
      totalLogs: totalCount,
      last30Days: summaryQuery.size,
      riskBreakdown: {
        high: 0,
        medium: 0,
        low: 0
      },
      topActions: {} as Record<string, number>
    }

    summaryQuery.forEach(doc => {
      const data = doc.data()
      const risk = data.risk_level || getRiskLevel(data.action)
      summary.riskBreakdown[risk]++
      
      summary.topActions[data.action] = (summary.topActions[data.action] || 0) + 1
    })

    return NextResponse.json({
      auditLogs,
      totalCount,
      hasMore: offset + limit < totalCount,
      summary,
      pagination: {
        limit,
        offset,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
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

    const { userId, action, metadata, sessionId } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID and action required' }, { status: 400 })
    }

    const riskLevel = getRiskLevel(action)
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Create audit log entry
    const auditLogRef = await adminDb.collection('audit_logs').add({
      userId,
      action,
      timestamp: FieldValue.serverTimestamp(),
      ip,
      userAgent,
      metadata: metadata || {},
      sessionId: sessionId || null,
      risk_level: riskLevel
    })

    // For high-risk actions, create additional security alert
    if (riskLevel === 'high') {
      await adminDb.collection('security_alerts').add({
        userId,
        action,
        timestamp: FieldValue.serverTimestamp(),
        ip,
        userAgent,
        metadata,
        severity: 'high',
        status: 'new',
        auditLogId: auditLogRef.id
      })
    }

    // Update user's last activity
    await adminDb.collection('users').doc(userId).update({
      lastActivity: FieldValue.serverTimestamp(),
      lastActivityAction: action
    })

    return NextResponse.json({
      success: true,
      auditLogId: auditLogRef.id,
      riskLevel,
      message: 'Audit log created successfully'
    })
  } catch (error) {
    console.error('Error creating audit log:', error)
    return NextResponse.json(
      { error: 'Failed to create audit log' },
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

    const { userId, olderThan } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Default to delete logs older than 1 year
    const cutoffDate = olderThan ? new Date(olderThan) : new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)

    // Find logs to delete
    const logsToDelete = await adminDb
      .collection('audit_logs')
      .where('userId', '==', userId)
      .where('timestamp', '<', cutoffDate)
      .get()

    // Delete in batches
    const batchSize = 500
    let deletedCount = 0

    for (let i = 0; i < logsToDelete.docs.length; i += batchSize) {
      const batch = adminDb.batch()
      const batchDocs = logsToDelete.docs.slice(i, i + batchSize)
      
      batchDocs.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      await batch.commit()
      deletedCount += batchDocs.length
    }

    // Log the cleanup action
    await adminDb.collection('audit_logs').add({
      userId,
      action: 'audit_logs_cleaned',
      timestamp: FieldValue.serverTimestamp(),
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown',
      metadata: {
        deletedCount,
        cutoffDate: cutoffDate.toISOString()
      },
      risk_level: 'medium'
    })

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `${deletedCount} audit log entries deleted`
    })
  } catch (error) {
    console.error('Error cleaning audit logs:', error)
    return NextResponse.json(
      { error: 'Failed to clean audit logs' },
      { status: 500 }
    )
  }
}
