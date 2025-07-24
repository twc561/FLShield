
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

interface SecurityPreferences {
  userId: string
  twoFactorEnabled: boolean
  loginNotifications: boolean
  securityAlerts: boolean
  sessionTimeout: number // minutes
  allowedIPs: string[]
  trustedDevices: string[]
  passwordPolicy: {
    requireLength: number
    requireUppercase: boolean
    requireLowercase: boolean
    requireNumbers: boolean
    requireSpecialChars: boolean
    requirePasswordChange: number // days
  }
  auditLogRetention: number // days
  updatedAt: any
}

const defaultPreferences: Omit<SecurityPreferences, 'userId' | 'updatedAt'> = {
  twoFactorEnabled: false,
  loginNotifications: true,
  securityAlerts: true,
  sessionTimeout: 480, // 8 hours
  allowedIPs: [],
  trustedDevices: [],
  passwordPolicy: {
    requireLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    requirePasswordChange: 90
  },
  auditLogRetention: 365
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

    const preferencesDoc = await adminDb
      .collection('security_preferences')
      .doc(userId)
      .get()

    let preferences: SecurityPreferences
    
    if (preferencesDoc.exists) {
      preferences = preferencesDoc.data() as SecurityPreferences
    } else {
      // Create default preferences
      preferences = {
        userId,
        ...defaultPreferences,
        updatedAt: FieldValue.serverTimestamp()
      }
      
      await adminDb
        .collection('security_preferences')
        .doc(userId)
        .set(preferences)
    }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error('Error fetching security preferences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security preferences' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid authorization header' }, { status: 401 })
    }

    const { userId, preferences } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Validate preferences
    const validatedPreferences = validateSecurityPreferences(preferences)
    
    await adminDb
      .collection('security_preferences')
      .doc(userId)
      .set({
        userId,
        ...validatedPreferences,
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true })

    // Log the preference change
    await adminDb.collection('audit_logs').add({
      userId,
      action: 'security_preferences_updated',
      category: 'security',
      severity: 'medium',
      details: { changedFields: Object.keys(preferences) },
      timestamp: FieldValue.serverTimestamp(),
      ipAddress: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating security preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update security preferences' },
      { status: 500 }
    )
  }
}

function validateSecurityPreferences(preferences: Partial<SecurityPreferences>): Partial<SecurityPreferences> {
  const validated: Partial<SecurityPreferences> = {}

  if (typeof preferences.twoFactorEnabled === 'boolean') {
    validated.twoFactorEnabled = preferences.twoFactorEnabled
  }

  if (typeof preferences.loginNotifications === 'boolean') {
    validated.loginNotifications = preferences.loginNotifications
  }

  if (typeof preferences.securityAlerts === 'boolean') {
    validated.securityAlerts = preferences.securityAlerts
  }

  if (typeof preferences.sessionTimeout === 'number' && preferences.sessionTimeout > 0) {
    validated.sessionTimeout = Math.min(preferences.sessionTimeout, 1440) // Max 24 hours
  }

  if (Array.isArray(preferences.allowedIPs)) {
    validated.allowedIPs = preferences.allowedIPs.filter(ip => 
      typeof ip === 'string' && ip.length > 0
    )
  }

  if (Array.isArray(preferences.trustedDevices)) {
    validated.trustedDevices = preferences.trustedDevices.filter(device => 
      typeof device === 'string' && device.length > 0
    )
  }

  if (preferences.passwordPolicy && typeof preferences.passwordPolicy === 'object') {
    validated.passwordPolicy = {
      requireLength: Math.max(preferences.passwordPolicy.requireLength || 8, 8),
      requireUppercase: Boolean(preferences.passwordPolicy.requireUppercase),
      requireLowercase: Boolean(preferences.passwordPolicy.requireLowercase),
      requireNumbers: Boolean(preferences.passwordPolicy.requireNumbers),
      requireSpecialChars: Boolean(preferences.passwordPolicy.requireSpecialChars),
      requirePasswordChange: Math.max(preferences.passwordPolicy.requirePasswordChange || 90, 30)
    }
  }

  if (typeof preferences.auditLogRetention === 'number' && preferences.auditLogRetention > 0) {
    validated.auditLogRetention = Math.min(preferences.auditLogRetention, 2555) // Max 7 years
  }

  return validated
}
