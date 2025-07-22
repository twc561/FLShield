
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

interface UsageMetrics {
  aiRequests: number
  searchQueries: number
  reportGenerations: number
  documentsAccessed: number
  voiceCommands: number
  totalRequests: number
  lastResetDate: any
}

interface QuotaLimits {
  aiRequests: number
  searchQueries: number
  reportGenerations: number
  documentsAccessed: number
  voiceCommands: number
}

const FREE_TIER_LIMITS: QuotaLimits = {
  aiRequests: 50,
  searchQueries: 100,
  reportGenerations: 5,
  documentsAccessed: 50,
  voiceCommands: 25
}

const PRO_TIER_LIMITS: QuotaLimits = {
  aiRequests: 1000,
  searchQueries: 2000,
  reportGenerations: 100,
  documentsAccessed: 1000,
  voiceCommands: 500
}

function getQuotaLimits(subscriptionPlan: string): QuotaLimits {
  return subscriptionPlan === 'pro' ? PRO_TIER_LIMITS : FREE_TIER_LIMITS
}

function isNewMonth(lastResetDate: any): boolean {
  if (!lastResetDate) return true
  
  const now = new Date()
  const lastReset = lastResetDate.toDate()
  
  return now.getMonth() !== lastReset.getMonth() || 
         now.getFullYear() !== lastReset.getFullYear()
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
    const period = searchParams.get('period') || 'current' // current, last30days, last90days

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get user subscription info
    const userDoc = await adminDb.collection('users').doc(userId).get()
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()
    const subscriptionPlan = userData?.subscription?.plan || 'free'
    const quotaLimits = getQuotaLimits(subscriptionPlan)

    // Get current month usage
    const usageDoc = await adminDb.collection('usage_metrics').doc(userId).get()
    let currentUsage: UsageMetrics = {
      aiRequests: 0,
      searchQueries: 0,
      reportGenerations: 0,
      documentsAccessed: 0,
      voiceCommands: 0,
      totalRequests: 0,
      lastResetDate: null
    }

    if (usageDoc.exists) {
      const data = usageDoc.data()
      
      // Check if we need to reset monthly usage
      if (isNewMonth(data.lastResetDate)) {
        // Reset usage for new month
        currentUsage = {
          aiRequests: 0,
          searchQueries: 0,
          reportGenerations: 0,
          documentsAccessed: 0,
          voiceCommands: 0,
          totalRequests: 0,
          lastResetDate: FieldValue.serverTimestamp()
        }
        
        // Update in database
        await adminDb.collection('usage_metrics').doc(userId).set(currentUsage)
      } else {
        currentUsage = data as UsageMetrics
      }
    }

    // Calculate usage percentages
    const usagePercentages = {
      aiRequests: Math.round((currentUsage.aiRequests / quotaLimits.aiRequests) * 100),
      searchQueries: Math.round((currentUsage.searchQueries / quotaLimits.searchQueries) * 100),
      reportGenerations: Math.round((currentUsage.reportGenerations / quotaLimits.reportGenerations) * 100),
      documentsAccessed: Math.round((currentUsage.documentsAccessed / quotaLimits.documentsAccessed) * 100),
      voiceCommands: Math.round((currentUsage.voiceCommands / quotaLimits.voiceCommands) * 100)
    }

    // Get historical usage data if requested
    let historicalData = []
    if (period !== 'current') {
      const days = period === 'last30days' ? 30 : 90
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const historyQuery = await adminDb
        .collection('usage_history')
        .where('userId', '==', userId)
        .where('date', '>=', startDate)
        .orderBy('date', 'desc')
        .get()

      historicalData = historyQuery.docs.map(doc => ({
        date: doc.data().date,
        ...doc.data().metrics
      }))
    }

    return NextResponse.json({
      currentUsage,
      quotaLimits,
      usagePercentages,
      subscriptionPlan,
      historicalData,
      billingCycle: {
        resetDate: currentUsage.lastResetDate,
        daysUntilReset: 30 - new Date().getDate()
      }
    })
  } catch (error) {
    console.error('Error fetching usage data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
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

    const { userId, action, metadata } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID and action required' }, { status: 400 })
    }

    const validActions = ['aiRequest', 'searchQuery', 'reportGeneration', 'documentAccess', 'voiceCommand']
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid action type' }, { status: 400 })
    }

    // Get or create usage document
    const usageRef = adminDb.collection('usage_metrics').doc(userId)
    const usageDoc = await usageRef.get()

    let currentUsage: UsageMetrics
    if (!usageDoc.exists || isNewMonth(usageDoc.data()?.lastResetDate)) {
      // Create new usage record or reset for new month
      currentUsage = {
        aiRequests: 0,
        searchQueries: 0,
        reportGenerations: 0,
        documentsAccessed: 0,
        voiceCommands: 0,
        totalRequests: 0,
        lastResetDate: FieldValue.serverTimestamp()
      }
    } else {
      currentUsage = usageDoc.data() as UsageMetrics
    }

    // Increment the appropriate counter
    const actionMap = {
      'aiRequest': 'aiRequests',
      'searchQuery': 'searchQueries',
      'reportGeneration': 'reportGenerations',
      'documentAccess': 'documentsAccessed',
      'voiceCommand': 'voiceCommands'
    }

    const field = actionMap[action as keyof typeof actionMap] as keyof UsageMetrics
    if (typeof currentUsage[field] === 'number') {
      (currentUsage[field] as number)++
      currentUsage.totalRequests++
    }

    // Check quota limits
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const subscriptionPlan = userDoc.data()?.subscription?.plan || 'free'
    const quotaLimits = getQuotaLimits(subscriptionPlan)

    const currentFieldUsage = currentUsage[field] as number
    const fieldLimit = quotaLimits[field as keyof QuotaLimits]

    if (currentFieldUsage > fieldLimit) {
      return NextResponse.json({
        success: false,
        error: 'Quota exceeded',
        quotaExceeded: true,
        usage: currentFieldUsage,
        limit: fieldLimit,
        action
      }, { status: 429 })
    }

    // Update usage metrics
    await usageRef.set(currentUsage)

    // Log detailed usage event
    await adminDb.collection('usage_events').add({
      userId,
      action,
      timestamp: FieldValue.serverTimestamp(),
      metadata: metadata || {},
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    // Store daily aggregated data
    const today = new Date().toISOString().split('T')[0]
    const dailyUsageRef = adminDb.collection('usage_history').doc(`${userId}_${today}`)
    
    await dailyUsageRef.set({
      userId,
      date: new Date(),
      metrics: currentUsage
    }, { merge: true })

    return NextResponse.json({
      success: true,
      currentUsage: currentFieldUsage,
      limit: fieldLimit,
      percentageUsed: Math.round((currentFieldUsage / fieldLimit) * 100),
      remainingQuota: fieldLimit - currentFieldUsage
    })
  } catch (error) {
    console.error('Error tracking usage:', error)
    return NextResponse.json(
      { error: 'Failed to track usage' },
      { status: 500 }
    )
  }
}
