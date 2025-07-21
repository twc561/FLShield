
// Test script to verify Firestore rules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKOZL2TdqleyUtbrbKHJfjObRqpBz2s28",
  authDomain: "florida-shield.firebaseapp.com",
  projectId: "florida-shield",
  storageBucket: "florida-shield.appspot.com",
  messagingSenderId: "320998993928",
  appId: "1:320998993928:web:79043e80e835f9c3eee1bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function testFirestoreRules() {
  try {
    console.log('Testing Firestore rules...');
    
    // Test 1: Try to read subscription data without auth (should fail)
    console.log('\n1. Testing unauthenticated access to subscriptions...');
    try {
      const testDoc = await getDoc(doc(db, 'subscriptions', 'test-user-id'));
      console.log('❌ FAIL: Unauthenticated read should have been denied');
    } catch (error) {
      console.log('✅ PASS: Unauthenticated access properly denied:', error.code);
    }
    
    // Test 2: Try webhook write (should succeed)
    console.log('\n2. Testing webhook write access...');
    try {
      await setDoc(doc(db, 'subscriptions', 'webhook-test'), {
        testData: 'webhook test',
        timestamp: new Date()
      });
      console.log('✅ PASS: Webhook write succeeded');
    } catch (error) {
      console.log('❌ FAIL: Webhook write failed:', error.code);
    }
    
    console.log('\n✅ Firestore rules test completed');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testFirestoreRules();
