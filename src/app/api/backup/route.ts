
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

interface BackupRequest {
  userId: string
  includeAuditLogs: boolean
  includeUsageData: boolean
  includeSubscriptionData: boolean
  format: 'json' | 'csv'
}

interface UserDataExport {
  profile: any
  settings: any
  subscription: any
  auditLogs?: any[]
  usageData?: any
  sessions?: any[]
  exportMetadata: {
    exportedAt: string
    exportedBy: string
    format: string
    version: string
  }
}

function sanitizeUserAgent(userAgent: string): string {
  return userAgent.replace(/[^\w\s\-\.]/g, '').substring(0, 200)
}

async function generateBackupData(userId: string, options: BackupRequest): Promise<UserDataExport> {
  // Get user profile and settings
  const userDoc = await adminDb.collection('users').doc(userId).get()
  if (!userDoc.exists) {
    throw new Error('User not found')
  }

  const userData = userDoc.data()
  const exportData: UserDataExport = {
    profile: userData?.profile || {},
    settings: userData?.settings || {},
    subscription: userData?.subscription || null,
    exportMetadata: {
      exportedAt: new Date().toISOString(),
      exportedBy: userId,
      format: options.format,
      version: '1.0'
    }
  }

  // Include audit logs if requested
  if (options.includeAuditLogs) {
    const auditLogsQuery = await adminDb
      .collection('audit_logs')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(1000) // Limit to prevent huge exports
      .get()

    exportData.auditLogs = auditLogsQuery.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }

  // Include usage data if requested
  if (options.includeUsageData) {
    const usageDoc = await adminDb.collection('usage_metrics').doc(userId).get()
    if (usageDoc.exists) {
      exportData.usageData = usageDoc.data()
    }

    // Include recent usage history
    const usageHistoryQuery = await adminDb
      .collection('usage_history')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .limit(90) // Last 90 days
      .get()

    exportData.usageData = {
      ...exportData.usageData,
      history: usageHistoryQuery.docs.map(doc => doc.data())
    }
  }

  // Include active sessions
  const sessionsQuery = await adminDb
    .collection('user_sessions')
    .where('userId', '==', userId)
    .where('isActive', '==', true)
    .get()

  exportData.sessions = sessionsQuery.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return exportData
}

function convertToCSV(data: any): string {
  // Simple CSV conversion for flat data structures
  // This is a basic implementation - you might want to use a proper CSV library
  const headers = Object.keys(data)
  const values = Object.values(data).map(v => 
    typeof v === 'object' ? JSON.stringify(v) : String(v)
  )
  
  return [headers.join(','), values.join(',')].join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid authorization header' }, { status: 401 })
    }

    const backupRequest: BackupRequest = await request.json()
    const { userId, includeAuditLogs, includeUsageData, includeSubscriptionData, format } = backupRequest

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    if (!['json', 'csv'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format. Use json or csv' }, { status: 400 })
    }

    // Check rate limiting - only allow one backup per hour per user
    const recentBackupQuery = await adminDb
      .collection('backup_requests')
      .where('userId', '==', userId)
      .where('timestamp', '>', new Date(Date.now() - 60 * 60 * 1000)) // 1 hour ago
      .limit(1)
      .get()

    if (!recentBackupQuery.empty) {
      return NextResponse.json({
        error: 'Backup rate limit exceeded. Please wait 1 hour between backup requests.'
      }, { status: 429 })
    }

    // Generate backup data
    const backupData = await generateBackupData(userId, backupRequest)

    // Log backup request
    const backupRef = await adminDb.collection('backup_requests').add({
      userId,
      timestamp: FieldValue.serverTimestamp(),
      options: {
        includeAuditLogs,
        includeUsageData,
        includeSubscriptionData,
        format
      },
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: sanitizeUserAgent(headersList.get('user-agent') || 'unknown'),
      status: 'completed'
    })

    // Create audit log entry
    await adminDb.collection('audit_logs').add({
      userId,
      action: 'data_export_requested',
      timestamp: FieldValue.serverTimestamp(),
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown',
      metadata: {
        backupId: backupRef.id,
        format,
        includeAuditLogs,
        includeUsageData,
        includeSubscriptionData
      },
      risk_level: 'high'
    })

    // Format response based on requested format
    let responseData
    let contentType
    let filename

    if (format === 'csv') {
      responseData = convertToCSV(backupData)
      contentType = 'text/csv'
      filename = `user_data_${userId}_${new Date().toISOString().split('T')[0]}.csv`
    } else {
      responseData = JSON.stringify(backupData, null, 2)
      contentType = 'application/json'
      filename = `user_data_${userId}_${new Date().toISOString().split('T')[0]}.json`
    }

    return new NextResponse(responseData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Backup-ID': backupRef.id
      }
    })
  } catch (error) {
    console.error('Error creating backup:', error)
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    )
  }
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

    // Get backup request history
    const backupHistoryQuery = await adminDb
      .collection('backup_requests')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(20)
      .get()

    const backupHistory = backupHistoryQuery.docs.map(doc => ({
      id: doc.id,
      timestamp: doc.data().timestamp,
      options: doc.data().options,
      status: doc.data().status,
      ip: doc.data().ip
    }))

    // Check if user can request a new backup
    const canRequestBackup = backupHistory.length === 0 || 
      (backupHistory[0].timestamp.toDate().getTime() < Date.now() - 60 * 60 * 1000)

    return NextResponse.json({
      backupHistory,
      canRequestBackup,
      nextAvailableBackup: canRequestBackup ? null : 
        new Date(backupHistory[0].timestamp.toDate().getTime() + 60 * 60 * 1000),
      supportedFormats: ['json', 'csv'],
      dataTypes: {
        profile: 'Basic profile information',
        settings: 'Account settings and preferences',
        subscription: 'Subscription and billing information',
        auditLogs: 'Account activity logs (last 1000 entries)',
        usageData: 'Usage metrics and history (last 90 days)',
        sessions: 'Active login sessions'
      }
    })
  } catch (error) {
    console.error('Error fetching backup info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch backup information' },
      { status: 500 }
    )
  }
}
