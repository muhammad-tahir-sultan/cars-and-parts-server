const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// and place it in your project (don't commit it to version control)
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Replace with your user's UID from Firebase Authentication
const USER_UID = 'BxtoE7Pi3bcaP0Km58joUQGBgG93';

// Define the scopes/permissions you want to grant
const customClaims = {
  scopes: [
    'add-product',
    'edit-product',
    'delete-product',
    'add-category',
    'add-user',
    'edit-user',
    'delete-user'
  ]
};

// Set custom user claims
admin.auth().setCustomUserClaims(USER_UID, customClaims)
  .then(() => {
    console.log('Custom claims set successfully for user:', USER_UID);
    console.log('Granted permissions:', customClaims.scopes);
  })
  .catch((error) => {
    console.error('Error setting custom claims:', error);
  });