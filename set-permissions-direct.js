// Script to directly set permissions for your user using Firebase Admin SDK
// This bypasses the server and sets permissions directly in Firebase

import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration - you'll need to add your Firebase config to .env
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Your user ID
const USER_ID = 'BxtoE7Pi3bcaP0Km58joUQGBgG93';

// Define admin scopes
const adminScopes = [
    'add-product',
    'edit-product',
    'delete-product',
    'add-category',
    'add-user',
    'edit-user',
    'delete-user'
];

async function setPermissions() {
    try {
        console.log(`Setting admin permissions for user ${USER_ID}...`);
        
        // Set custom claims
        await admin.auth().setCustomUserClaims(USER_ID, {
            scopes: adminScopes
        });
        
        console.log('✅ SUCCESS: Admin permissions assigned directly through Firebase Admin SDK!');
        console.log('You should now see all navigation buttons on your dashboard.');
        console.log('Please refresh your dashboard page to see the changes.');
        
        // Verify the permissions were set
        const userRecord = await admin.auth().getUser(USER_ID);
        console.log('\nUser permissions:', userRecord.customClaims);
        
    } catch (error) {
        console.error('❌ ERROR setting permissions:', error.message);
        console.error('Make sure you have added your Firebase service account credentials to the .env file');
    } finally {
        // Clean up
        await admin.app().delete();
    }
}

console.log('Setting permissions for user:', USER_ID);
setPermissions();