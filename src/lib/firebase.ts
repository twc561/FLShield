import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKOZL2TdqleyUtbrbKHJfjObRqpBz2s28",
    authDomain: "florida-shield.firebaseapp.com",
    projectId: "florida-shield",
    storageBucket: "florida-shield.appspot.com",
    messagingSenderId: "320998993928",
    appId: "1:320998993928:web:79043e80e835f9c3eee1bd"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
