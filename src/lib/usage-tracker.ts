
import { auth } from '@/lib/firebase'

// Map feature names to action types
const getActionType = (feature: string): string => {
  // AI-powered features
  if (feature.includes('ai-') || feature.includes('AI') || 
      feature.includes('legal-advisor') || feature.includes('charge-assistant') ||
      feature.includes('report-writer') || feature.includes('genkit')) {
    return 'aiRequest'
  }
  
  // Search features
  if (feature.includes('search') || feature.includes('lookup') || 
      feature.includes('navigator') || feature.includes('finder')) {
    return 'searchQuery'
  }
  
  // Report generation
  if (feature.includes('report') || feature.includes('narrative') || 
      feature.includes('generator') || feature.includes('writer')) {
    return 'reportGeneration'
  }
  
  // Voice features
  if (feature.includes('voice') || feature.includes('speech') || 
      feature.includes('audio') || feature.includes('listen')) {
    return 'voiceCommand'
  }
  
  // Document access (default for guides, references, etc.)
  return 'documentAccess'
}

export async function trackUsage(feature: string, queryType?: string, metadata?: any) {
  const user = auth.currentUser
  if (!user) return

  const action = getActionType(feature)
  
  try {
    const response = await fetch('/api/usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await user.getIdToken()}`
      },
      body: JSON.stringify({
        userId: user.uid,
        action,
        feature,
        metadata: {
          queryType,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          ...metadata
        }
      })
    })

    const result = await response.json()
    
    if (!response.ok) {
      if (result.quotaExceeded) {
        console.warn(`Quota exceeded for ${action}:`, result)
        // You could show a toast notification here
      } else {
        console.error('Usage tracking failed:', result)
      }
    }
    
    return result
  } catch (error) {
    console.error('Error tracking usage:', error)
  }
}

export async function trackAuditAction(action: string, feature: string, metadata?: any) {
  const user = auth.currentUser
  if (!user) return

  try {
    await fetch('/api/audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await user.getIdToken()}`
      },
      body: JSON.stringify({
        userId: user.uid,
        action,
        feature,
        metadata: {
          timestamp: new Date().toISOString(),
          ...metadata
        }
      })
    })
  } catch (error) {
    console.error('Error tracking audit action:', error)
  }
}

// Helper function to track page visits
export async function trackPageView(pagePath: string) {
  await trackUsage(`page-view-${pagePath}`, 'page_view', { path: pagePath })
}

// Helper function to track AI queries with more context
export async function trackAIQuery(feature: string, query: string, responseTime?: number) {
  await trackUsage(feature, 'ai_query', { 
    query: query.substring(0, 100), // First 100 chars for privacy
    responseTime,
    queryLength: query.length
  })
}

// Helper function to track feature interactions
export async function trackFeatureInteraction(feature: string, interaction: string, data?: any) {
  await trackUsage(feature, interaction, data)
}
