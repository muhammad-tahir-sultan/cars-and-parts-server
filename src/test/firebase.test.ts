import admin from '../config/firebase.config';

async function testFirebaseConnection() {
  try {
    // Test Firebase connection by listing users
    const userList = await admin.auth().listUsers();
    console.log(`Successfully connected to Firebase. Found ${userList.users.length} users.`);
    
    // Log the first few users (without sensitive info)
    const usersPreview = userList.users.slice(0, 3).map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }));
    
    console.log('Sample users:', usersPreview);
  } catch (error) {
    console.error('Firebase connection failed:', error);
  }
}

// Run the test
testFirebaseConnection();