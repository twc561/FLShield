
import { auth } from '@/lib/firebase'

export async function trackUsage(feature: string, queryType?: string) {
  const user = auth.currentUser
  if (!user) return

  try {
    await fetch('/api/usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await user.getIdToken()}`
      },
      body: JSON.stringify({
        userId: user.uid,
        feature,
        queryType
      })
    })
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
        metadata
      })
    })
  } catch (error) {
    console.error('Error tracking audit action:', error)
  }
}
