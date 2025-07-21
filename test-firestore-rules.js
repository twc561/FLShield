
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, setDoc } = require('firebase/firestore');

// Firebase configuration (using environment variables or direct config)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestoreRules() {
  console.log('Testing Firestore rules...');
  
  try {
    // Test 1: Unauthenticated access to subscriptions (should fail)
    console.log('\n1. Testing unauthenticated access to subscriptions...');
    try {
      const subscriptionDoc = await getDoc(doc(db, 'subscriptions', 'test-user-id'));
      console.log('❌ FAIL: Unauthenticated read should have been denied');
    } catch (error) {
      console.log('✅ PASS: Unauthenticated read properly denied');
    }

    // Test 2: Webhook write access (should succeed)
    console.log('\n2. Testing webhook write access...');
    try {
      await setDoc(doc(db, 'webhook_logs', 'test-webhook'), {
        timestamp: new Date(),
        event: 'test_event',
        source: 'firestore-rules-test'
      });
      console.log('✅ PASS: Webhook write succeeded');
    } catch (error) {
      console.log('❌ FAIL: Webhook write failed:', error.message);
    }

    console.log('\n✅ Firestore rules test completed');
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Run the test
testFirestoreRules().catch(console.error);
