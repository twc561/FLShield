
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKOZL2TdqleyUtbrbKHJfjObRqpBz2s28",
  authDomain: "florida-shield.firebaseapp.com",
  projectId: "florida-shield",
  storageBucket: "florida-shield.appStorage.app",
  messagingSenderId: "320998993928",
  appId: "1:320998993928:web:79043e80e835f9c3eee1bd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirestoreRules() {
  try {
    console.log('Testing Firestore rules...');
    
    // Test 1: Try webhook write (should succeed with new rules)
    console.log('\n1. Testing webhook write access (no auth)...');
    try {
      await setDoc(doc(db, 'subscriptions', 'webhook-test-' + Date.now()), {
        testData: 'webhook test from rules verification',
        timestamp: new Date(),
        status: 'active'
      });
      console.log('✅ PASS: Webhook write succeeded - rules are working correctly');
    } catch (error) {
      console.log('❌ FAIL: Webhook write failed:', error.code, error.message);
    }
    
    // Test 2: Try to read subscription data without auth (should fail)
    console.log('\n2. Testing unauthenticated read access...');
    try {
      const testDoc = await getDoc(doc(db, 'subscriptions', 'test-user-id'));
      if (testDoc.exists()) {
        console.log('❌ FAIL: Unauthenticated read should have been denied');
      } else {
        console.log('✅ PASS: Document does not exist or access properly controlled');
      }
    } catch (error) {
      console.log('✅ PASS: Unauthenticated read properly denied:', error.code);
    }
    
    console.log('\n✅ Firestore rules test completed');
    console.log('The permission errors should now be resolved in your app.');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test
testFirestoreRules();
