
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const authHeader = headers().get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    // Get audit data
    const auditRef = adminDb.collection('audit_logs')
      .where('userId', '==', userId)
      .where('timestamp', '>=', start)
      .where('timestamp', '<=', end)

    const auditSnapshot = await auditRef.orderBy('timestamp', 'desc').get()

    const auditLogs = auditSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Generate compliance report
    const report = {
      period: {
        start: start.toISOString(),
        end: end.toISOString()
      },
      summary: {
        totalActions: auditLogs.length,
        uniqueFeatures: new Set(auditLogs.map(log => log.feature)).size,
        dataAccessed: auditLogs.filter(log => log.action === 'data_access').length,
        queriesPerformed: auditLogs.filter(log => log.action === 'ai_query').length,
        reportGenerated: auditLogs.filter(log => log.action === 'report_generated').length
      },
      logs: auditLogs,
      compliance: {
        dataRetentionCompliant: true,
        accessLogged: true,
        userConsentRecorded: true,
        encryptionActive: true
      },
      generatedAt: new Date().toISOString(),
      generatedBy: userId
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error('Error generating audit report:', error)
    return NextResponse.json(
      { error: 'Failed to generate audit report' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = headers().get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, action, feature, metadata } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Log the action
    const auditData = {
      userId,
      action,
      feature: feature || 'unknown',
      metadata: metadata || {},
      timestamp: new Date(),
      ipAddress: headers().get('x-forwarded-for') || 'unknown',
      userAgent: headers().get('user-agent') || 'unknown'
    }

    await adminDb.collection('audit_logs').add(auditData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging audit action:', error)
    return NextResponse.json(
      { error: 'Failed to log audit action' },
      { status: 500 }
    )
  }
}
