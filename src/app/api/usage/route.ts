
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

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get usage data from Firebase
    const usageRef = adminDb.collection('usage').doc(userId)
    const usageDoc = await usageRef.get()

    if (!usageDoc.exists) {
      return NextResponse.json({
        aiQueries: 0,
        featuresUsed: 0,
        activeDays: 0,
        mostUsedFeatures: [],
        usageTrends: []
      })
    }

    const usageData = usageDoc.data()
    
    return NextResponse.json(usageData)
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
    const authHeader = headers().get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, feature, queryType } = await request.json()

    if (!userId || !feature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]
    const usageRef = adminDb.collection('usage').doc(userId)

    await adminDb.runTransaction(async (transaction) => {
      const usageDoc = await transaction.get(usageRef)
      
      if (!usageDoc.exists) {
        transaction.set(usageRef, {
          aiQueries: 1,
          featuresUsed: 1,
          activeDays: 1,
          mostUsedFeatures: [{ feature, count: 1 }],
          usageTrends: [{ date: today, queries: 1 }],
          lastUpdated: new Date()
        })
      } else {
        const data = usageDoc.data()!
        
        // Update counters
        transaction.update(usageRef, {
          aiQueries: (data.aiQueries || 0) + 1,
          featuresUsed: new Set([...(data.featuresUsed || []), feature]).size,
          activeDays: data.lastActiveDate === today ? data.activeDays : (data.activeDays || 0) + 1,
          lastActiveDate: today,
          lastUpdated: new Date()
        })

        // Update feature usage
        const featuresMap = new Map(data.mostUsedFeatures?.map((f: any) => [f.feature, f.count]) || [])
        featuresMap.set(feature, (featuresMap.get(feature) || 0) + 1)
        
        const mostUsedFeatures = Array.from(featuresMap.entries())
          .map(([feature, count]) => ({ feature, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        // Update trends
        const trendsMap = new Map(data.usageTrends?.map((t: any) => [t.date, t.queries]) || [])
        trendsMap.set(today, (trendsMap.get(today) || 0) + 1)
        
        const usageTrends = Array.from(trendsMap.entries())
          .map(([date, queries]) => ({ date, queries }))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 30)

        transaction.update(usageRef, {
          mostUsedFeatures,
          usageTrends
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating usage:', error)
    return NextResponse.json(
      { error: 'Failed to update usage' },
      { status: 500 }
    )
  }
}
