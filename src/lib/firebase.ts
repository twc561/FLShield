import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKOZL2TdqleyUtbrbKHJfjObRqpBz2s28",
  authDomain: "florida-shield.firebaseapp.com",
  projectId: "florida-shield",
  storageBucket: "florida-shield.firebasestorage.app",
  messagingSenderId: "320998993928",
  appId: "1:320998993928:web:79043e80e835f9c3eee1bd"
};


let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Check if all required environment variables are present
export const isFirebaseConfigured = 
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId;

if (isFirebaseConfigured) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
}

export { app, auth };
