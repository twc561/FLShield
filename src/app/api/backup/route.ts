
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

    // Collect all user data
    const collections = ['users', 'notes', 'reports', 'favorites', 'usage']
    const backupData: any = {}

    for (const collection of collections) {
      if (collection === 'users') {
        const doc = await adminDb.collection(collection).doc(userId).get()
        if (doc.exists) {
          backupData[collection] = doc.data()
        }
      } else {
        const snapshot = await adminDb.collection(collection).where('userId', '==', userId).get()
        backupData[collection] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      }
    }

    // Add metadata
    backupData.metadata = {
      exportDate: new Date().toISOString(),
      userId,
      version: '1.0'
    }

    return NextResponse.json(backupData)
  } catch (error) {
    console.error('Error creating backup:', error)
    return NextResponse.json(
      { error: 'Failed to create backup' },
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

    const { userId, backupData } = await request.json()

    if (!userId || !backupData) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 })
    }

    // Validate backup data structure
    if (!backupData.metadata || backupData.metadata.userId !== userId) {
      return NextResponse.json({ error: 'Invalid backup data' }, { status: 400 })
    }

    // Restore data collections
    const batch = adminDb.batch()

    if (backupData.notes) {
      backupData.notes.forEach((note: any) => {
        const ref = adminDb.collection('notes').doc(note.id || adminDb.collection('notes').doc().id)
        batch.set(ref, { ...note, userId, restoredAt: new Date() })
      })
    }

    if (backupData.reports) {
      backupData.reports.forEach((report: any) => {
        const ref = adminDb.collection('reports').doc(report.id || adminDb.collection('reports').doc().id)
        batch.set(ref, { ...report, userId, restoredAt: new Date() })
      })
    }

    if (backupData.favorites) {
      backupData.favorites.forEach((favorite: any) => {
        const ref = adminDb.collection('favorites').doc(favorite.id || adminDb.collection('favorites').doc().id)
        batch.set(ref, { ...favorite, userId, restoredAt: new Date() })
      })
    }

    // Update user settings if included
    if (backupData.users) {
      const userRef = adminDb.collection('users').doc(userId)
      batch.set(userRef, {
        ...backupData.users,
        restoredAt: new Date(),
        updatedAt: new Date()
      }, { merge: true })
    }

    await batch.commit()

    return NextResponse.json({ success: true, message: 'Data restored successfully' })
  } catch (error) {
    console.error('Error restoring backup:', error)
    return NextResponse.json(
      { error: 'Failed to restore backup' },
      { status: 500 }
    )
  }
}
