
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Validate required environment variables
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Firebase admin configuration incomplete. Missing: ' + 
    [!projectId && 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
     !clientEmail && 'FIREBASE_CLIENT_EMAIL', 
     !privateKey && 'FIREBASE_PRIVATE_KEY'].filter(Boolean).join(', '));
}

const firebaseAdminConfig = {
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  }),
}

// Initialize Firebase Admin
const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0]
export const adminDb = getFirestore(app)
