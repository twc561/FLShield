
import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { headers } from 'next/headers'
import { FieldValue } from 'firebase-admin/firestore'

// Validate user ID format
function isValidUserId(userId: string): boolean {
  return /^[a-zA-Z0-9_-]{28}$/.test(userId)
}

// Sanitize profile data
function sanitizeProfileData(profile: any) {
  const allowedFields = ['firstName', 'lastName', 'displayName', 'badgeNumber', 'department', 'rank', 'phone', 'timezone']
  const sanitized: any = {}
  
  for (const field of allowedFields) {
    if (profile[field] !== undefined) {
      sanitized[field] = typeof profile[field] === 'string' ? profile[field].trim() : profile[field]
    }
  }
  
  return sanitized
}

// Sanitize settings data
function sanitizeSettingsData(settings: any) {
  const allowedSettings = [
    'emailNotifications', 'smsNotifications', 'darkMode', 'language',
    'autoSave', 'twoFactorEnabled', 'sessionTimeout', 'dataRetention'
  ]
  const sanitized: any = {}
  
  for (const setting of allowedSettings) {
    if (settings[setting] !== undefined) {
      sanitized[setting] = settings[setting]
    }
  }
  
  return sanitized
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

    if (!userId || !isValidUserId(userId)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 })
    }

    const userDoc = await adminDb.collection('users').doc(userId).get()
    
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()
    
    // Log access for audit trail
    await adminDb.collection('audit_logs').add({
      userId,
      action: 'profile_accessed',
      timestamp: FieldValue.serverTimestamp(),
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    return NextResponse.json({
      profile: userData?.profile || {},
      subscription: userData?.subscription || null,
      settings: userData?.settings || {},
      createdAt: userData?.createdAt,
      lastLogin: userData?.lastLogin,
      accountStatus: userData?.accountStatus || 'active'
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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

    const body = await request.json()
    const { userId, profile, settings } = body

    if (!userId || !isValidUserId(userId)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 })
    }

    // Check if user exists
    const userDoc = await adminDb.collection('users').doc(userId).get()
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const updateData: any = {
      updatedAt: FieldValue.serverTimestamp()
    }

    // Sanitize and validate profile data
    if (profile) {
      const sanitizedProfile = sanitizeProfileData(profile)
      if (Object.keys(sanitizedProfile).length > 0) {
        updateData.profile = sanitizedProfile
      }
    }

    // Sanitize and validate settings data
    if (settings) {
      const sanitizedSettings = sanitizeSettingsData(settings)
      if (Object.keys(sanitizedSettings).length > 0) {
        updateData.settings = sanitizedSettings
      }
    }

    // Update user document
    await adminDb.collection('users').doc(userId).update(updateData)

    // Log the update for audit trail
    await adminDb.collection('audit_logs').add({
      userId,
      action: 'profile_updated',
      timestamp: FieldValue.serverTimestamp(),
      changes: Object.keys(updateData),
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    return NextResponse.json({ 
      success: true,
      message: 'Profile updated successfully',
      updatedFields: Object.keys(updateData)
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Invalid authorization header' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId || !isValidUserId(userId)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 })
    }

    // Check if user exists
    const userDoc = await adminDb.collection('users').doc(userId).get()
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Mark account for deletion (soft delete)
    await adminDb.collection('users').doc(userId).update({
      accountStatus: 'pending_deletion',
      deletionRequestedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    })

    // Schedule actual deletion (implement with Cloud Functions or cron job)
    await adminDb.collection('deletion_queue').add({
      userId,
      requestedAt: FieldValue.serverTimestamp(),
      scheduledFor: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    })

    // Log deletion request
    await adminDb.collection('audit_logs').add({
      userId,
      action: 'account_deletion_requested',
      timestamp: FieldValue.serverTimestamp(),
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent') || 'unknown'
    })

    return NextResponse.json({ 
      success: true,
      message: 'Account deletion requested. Your account will be permanently deleted in 30 days.'
    })
  } catch (error) {
    console.error('Error requesting account deletion:', error)
    return NextResponse.json(
      { error: 'Failed to process deletion request' },
      { status: 500 }
    )
  }
}
