
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'

interface SecurityMetrics {
  activeAlerts: number
  criticalAlerts: number
  activeSessions: number
  recentLogins: number
  failedLoginAttempts: number
  suspiciousActivity: number
  passwordStrength: 'weak' | 'medium' | 'strong'
  lastPasswordChange: Date | null
  twoFactorEnabled: boolean
  trustedDeviceCount: number
  securityScore: number
}

interface SecurityInsight {
  type: 'recommendation' | 'warning' | 'info'
  title: string
  description: string
  action?: string
  priority: 'low' | 'medium' | 'high'
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

    const [metrics, insights] = await Promise.all([
      calculateSecurityMetrics(userId),
      generateSecurityInsights(userId)
    ])

    return NextResponse.json({
      metrics,
      insights,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching security dashboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security dashboard' },
      { status: 500 }
    )
  }
}

async function calculateSecurityMetrics(userId: string): Promise<SecurityMetrics> {
  const now = new Date()
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  try {
    const [
      alertsQuery,
      sessionsQuery,
      loginsQuery,
      failedLoginsQuery,
      preferencesDoc,
      userDoc
    ] = await Promise.all([
      adminDb.collection('security_alerts')
        .where('userId', '==', userId)
        .where('status', '==', 'active')
        .get(),
      
      adminDb.collection('user_sessions')
        .where('userId', '==', userId)
        .where('isActive', '==', true)
        .get(),
      
      adminDb.collection('login_attempts')
        .where('userId', '==', userId)
        .where('success', '==', true)
        .where('timestamp', '>=', last7Days)
        .get(),
      
      adminDb.collection('login_attempts')
        .where('userId', '==', userId)
        .where('success', '==', false)
        .where('timestamp', '>=', last24Hours)
        .get(),
      
      adminDb.collection('security_preferences').doc(userId).get(),
      adminDb.collection('users').doc(userId).get()
    ])

    const alerts = alertsQuery.docs.map(doc => doc.data())
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length
    const suspiciousActivity = alerts.filter(alert => 
      alert.alertType === 'suspicious_login' || alert.alertType === 'unusual_activity'
    ).length

    const preferences = preferencesDoc.exists ? preferencesDoc.data() : null
    const userData = userDoc.exists ? userDoc.data() : null

    const passwordStrength = calculatePasswordStrength(userData?.passwordMetadata)
    const securityScore = calculateSecurityScore({
      twoFactorEnabled: preferences?.twoFactorEnabled || false,
      passwordStrength,
      recentAlerts: alerts.length,
      activeSessions: sessionsQuery.size,
      failedLogins: failedLoginsQuery.size
    })

    return {
      activeAlerts: alertsQuery.size,
      criticalAlerts,
      activeSessions: sessionsQuery.size,
      recentLogins: loginsQuery.size,
      failedLoginAttempts: failedLoginsQuery.size,
      suspiciousActivity,
      passwordStrength,
      lastPasswordChange: userData?.lastPasswordChange?.toDate() || null,
      twoFactorEnabled: preferences?.twoFactorEnabled || false,
      trustedDeviceCount: preferences?.trustedDevices?.length || 0,
      securityScore
    }
  } catch (error) {
    console.error('Error calculating security metrics:', error)
    throw error
  }
}

async function generateSecurityInsights(userId: string): Promise<SecurityInsight[]> {
  const insights: SecurityInsight[] = []
  
  try {
    const [preferencesDoc, userDoc, alertsQuery] = await Promise.all([
      adminDb.collection('security_preferences').doc(userId).get(),
      adminDb.collection('users').doc(userId).get(),
      adminDb.collection('security_alerts')
        .where('userId', '==', userId)
        .where('status', '==', 'active')
        .get()
    ])

    const preferences = preferencesDoc.exists ? preferencesDoc.data() : null
    const userData = userDoc.exists ? userDoc.data() : null
    const alerts = alertsQuery.docs.map(doc => doc.data())

    // Check if 2FA is enabled
    if (!preferences?.twoFactorEnabled) {
      insights.push({
        type: 'recommendation',
        title: 'Enable Two-Factor Authentication',
        description: 'Add an extra layer of security to your account with 2FA.',
        action: 'Enable 2FA',
        priority: 'high'
      })
    }

    // Check password age
    const lastPasswordChange = userData?.lastPasswordChange?.toDate()
    if (!lastPasswordChange || 
        (Date.now() - lastPasswordChange.getTime()) > 90 * 24 * 60 * 60 * 1000) {
      insights.push({
        type: 'warning',
        title: 'Password Needs Update',
        description: 'Your password is over 90 days old. Consider changing it.',
        action: 'Change Password',
        priority: 'medium'
      })
    }

    // Check for recent security alerts
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical')
    if (criticalAlerts.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Critical Security Alerts',
        description: `You have ${criticalAlerts.length} critical security alert(s) that need attention.`,
        action: 'Review Alerts',
        priority: 'high'
      })
    }

    // Check for multiple active sessions
    const sessionsQuery = await adminDb.collection('user_sessions')
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .get()

    if (sessionsQuery.size > 3) {
      insights.push({
        type: 'info',
        title: 'Multiple Active Sessions',
        description: `You have ${sessionsQuery.size} active sessions. Review and terminate unused ones.`,
        action: 'Manage Sessions',
        priority: 'low'
      })
    }

    return insights
  } catch (error) {
    console.error('Error generating security insights:', error)
    return []
  }
}

function calculatePasswordStrength(passwordMetadata: any): 'weak' | 'medium' | 'strong' {
  if (!passwordMetadata) return 'weak'
  
  const { length = 0, hasUppercase = false, hasLowercase = false, hasNumbers = false, hasSpecialChars = false } = passwordMetadata
  
  let score = 0
  if (length >= 12) score += 2
  else if (length >= 8) score += 1
  
  if (hasUppercase) score += 1
  if (hasLowercase) score += 1
  if (hasNumbers) score += 1
  if (hasSpecialChars) score += 1
  
  if (score >= 5) return 'strong'
  if (score >= 3) return 'medium'
  return 'weak'
}

function calculateSecurityScore(factors: {
  twoFactorEnabled: boolean
  passwordStrength: 'weak' | 'medium' | 'strong'
  recentAlerts: number
  activeSessions: number
  failedLogins: number
}): number {
  let score = 100
  
  // Deduct points for security issues
  if (!factors.twoFactorEnabled) score -= 25
  if (factors.passwordStrength === 'weak') score -= 20
  else if (factors.passwordStrength === 'medium') score -= 10
  
  score -= Math.min(factors.recentAlerts * 5, 25)
  score -= Math.min(factors.failedLogins * 2, 10)
  score -= Math.min((factors.activeSessions - 1) * 3, 15)
  
  return Math.max(score, 0)
}
