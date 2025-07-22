
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

    const userDoc = await adminDb.collection('users').doc(userId).get()
    
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()
    
    return NextResponse.json({
      profile: userData.profile || {},
      subscription: userData.subscription || null,
      settings: userData.settings || {},
      createdAt: userData.createdAt,
      lastLogin: userData.lastLogin
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = headers().get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, profile, settings } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const updateData: any = {
      updatedAt: new Date()
    }

    if (profile) {
      updateData.profile = profile
    }

    if (settings) {
      updateData.settings = settings
    }

    await adminDb.collection('users').doc(userId).update(updateData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}
