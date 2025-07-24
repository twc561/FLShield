
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

interface AuditEvent {
  userId: string
  action: string
  resource?: string
  details?: any
  ipAddress: string
  userAgent: string
  timestamp: any
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'authentication' | 'authorization' | 'data_access' | 'account_changes' | 'security'
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
    const category = searchParams.get('category') || 'all'
    const limit = parseInt(searchParams.get('limit') || '100')
    const startAfter = searchParams.get('startAfter')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let query = adminDb
      .collection('audit_logs')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(limit)

    if (category !== 'all') {
      query = query.where('category', '==', category)
    }

    if (startAfter) {
      const startAfterDoc = await adminDb.collection('audit_logs').doc(startAfter).get()
      if (startAfterDoc.exists) {
        query = query.startAfter(startAfterDoc)
      }
    }

    const auditQuery = await query.get()
    const auditLogs: AuditEvent[] = []
    
    auditQuery.forEach(doc => {
      const data = doc.data()
      auditLogs.push({
        id: doc.id,
        ...data
      } as AuditEvent & { id: string })
    })

    // Log this audit access
    await logAuditEvent({
      userId,
      action: 'audit_logs_accessed',
      category: 'data_access',
      severity: 'low',
      details: { category, limit },
      ipAddress: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    return NextResponse.json({
      auditLogs,
      totalCount: auditLogs.length,
      hasMore: auditLogs.length === limit
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

    const eventData = await request.json()
    
    await logAuditEvent({
      ...eventData,
      ipAddress: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging audit event:', error)
    return NextResponse.json(
      { error: 'Failed to log audit event' },
      { status: 500 }
    )
  }
}

async function logAuditEvent(event: Omit<AuditEvent, 'timestamp'>) {
  try {
    await adminDb.collection('audit_logs').add({
      ...event,
      timestamp: FieldValue.serverTimestamp()
    })
  } catch (error) {
    console.error('Failed to log audit event:', error)
  }
}

export { logAuditEvent }
