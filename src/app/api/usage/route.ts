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
  featuresUsed: string[]
  mostUsedFeatures: { feature: string; count: number }[]
  activeDays: number
  dailyUsage: { [date: string]: number }
  featureBreakdown: { [feature: string]: number }
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

function calculateActiveDays(dailyUsage: { [date: string]: number }): number {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  return Object.keys(dailyUsage).filter(dateStr => {
    const date = new Date(dateStr)
    return date.getMonth() === currentMonth && 
           date.getFullYear() === currentYear &&
           dailyUsage[dateStr] > 0
  }).length
}

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

    // Get user's usage data from Firebase
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.exists() ? userDoc.data() : {}
    const usage = userData?.usage || {}

    // Ensure all values are serializable
    const usageMetrics: UsageMetrics = {
      aiRequests: Number(usage.aiRequests) || 0,
      searchQueries: Number(usage.searchQueries) || 0,
      reportGenerations: Number(usage.reportGenerations) || 0,
      documentsAccessed: Number(usage.documentsAccessed) || 0,
      voiceCommands: Number(usage.voiceCommands) || 0,
      totalRequests: Number(usage.totalRequests) || 0,
      lastResetDate: usage.lastResetDate?.toDate?.()?.toISOString() || null,
      featuresUsed: Array.isArray(usage.featuresUsed) ? usage.featuresUsed : [],
      mostUsedFeatures: Array.isArray(usage.mostUsedFeatures) ? usage.mostUsedFeatures : [],
      activeDays: Number(usage.activeDays) || 0,
      dailyUsage: typeof usage.dailyUsage === 'object' ? usage.dailyUsage : {},
      featureBreakdown: typeof usage.featureBreakdown === 'object' ? usage.featureBreakdown : {}
    }

    return NextResponse.json(usageMetrics, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching usage data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
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

    const { userId, action, feature, metadata } = await request.json()

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
      currentUsage = {
        aiRequests: 0,
        searchQueries: 0,
        reportGenerations: 0,
        documentsAccessed: 0,
        voiceCommands: 0,
        totalRequests: 0,
        lastResetDate: FieldValue.serverTimestamp(),
        featuresUsed: [],
        mostUsedFeatures: [],
        activeDays: 0,
        dailyUsage: {},
        featureBreakdown: {}
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

    // Track feature usage
    if (feature) {
      if (!currentUsage.featuresUsed.includes(feature)) {
        currentUsage.featuresUsed.push(feature)
      }

      if (!currentUsage.featureBreakdown) {
        currentUsage.featureBreakdown = {}
      }
      currentUsage.featureBreakdown[feature] = (currentUsage.featureBreakdown[feature] || 0) + 1
    }

    // Track daily usage
    const today = new Date().toISOString().split('T')[0]
    if (!currentUsage.dailyUsage) {
      currentUsage.dailyUsage = {}
    }
    currentUsage.dailyUsage[today] = (currentUsage.dailyUsage[today] || 0) + 1

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
      feature: feature || 'unknown',
      timestamp: FieldValue.serverTimestamp(),
      metadata: metadata || {},
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    // Store daily aggregated data
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