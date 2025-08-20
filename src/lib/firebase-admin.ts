
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let firestoreSingleton: ReturnType<typeof getFirestore> | null = null;

function buildConfig() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  const privateKey = rawKey?.replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) {
    return null; // Defer error until actually needed
  }
  return {
    credential: cert({ projectId, clientEmail, privateKey })
  };
}

export function hasFirebaseAdminConfig(): boolean {
  const cfg = buildConfig();
  return !!cfg;
}

export function getAdminDb() {
  if (firestoreSingleton) return firestoreSingleton;
  const cfg = buildConfig();
  if (!cfg) {
    throw new Error('Firebase admin configuration incomplete.');
  }
  const app = getApps().length === 0 ? initializeApp(cfg) : getApps()[0];
  firestoreSingleton = getFirestore(app);
  return firestoreSingleton;
}

export const adminDb = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(_target, prop) {
    const db = getAdminDb();
    // @ts-ignore
    return db[prop];
  }
});
