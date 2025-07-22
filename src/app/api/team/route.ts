
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

    // Get user's organization
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    if (!userData?.organizationId) {
      return NextResponse.json({ members: [], roles: [] })
    }

    // Get team members
    const membersSnapshot = await adminDb.collection('users')
      .where('organizationId', '==', userData.organizationId)
      .get()

    const members = membersSnapshot.docs.map(doc => ({
      id: doc.id,
      email: doc.data().email,
      profile: doc.data().profile || {},
      role: doc.data().role || 'member',
      status: doc.data().status || 'active',
      joinedAt: doc.data().createdAt,
      lastLogin: doc.data().lastLogin
    }))

    // Get available roles
    const rolesSnapshot = await adminDb.collection('roles').get()
    const roles = rolesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ members, roles })
  } catch (error) {
    console.error('Error fetching team data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
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

    const { userId, email, role } = await request.json()

    if (!userId || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify user has admin permissions
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    if (!userData?.organizationId || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Create invitation
    const invitationData = {
      organizationId: userData.organizationId,
      invitedEmail: email,
      invitedBy: userId,
      role,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }

    const invitationRef = await adminDb.collection('invitations').add(invitationData)

    // TODO: Send invitation email

    return NextResponse.json({ 
      success: true, 
      invitationId: invitationRef.id 
    })
  } catch (error) {
    console.error('Error creating invitation:', error)
    return NextResponse.json(
      { error: 'Failed to create invitation' },
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

    const { userId, memberId, updates } = await request.json()

    if (!userId || !memberId || !updates) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify user has admin permissions
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    if (userData?.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    // Update member
    await adminDb.collection('users').doc(memberId).update({
      ...updates,
      updatedAt: new Date()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}
