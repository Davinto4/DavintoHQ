// create-owner-user-admin.js
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Make sure your service account JSON file is in the same folder
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function createOwnerUser() {
  try {
    const userRecord = await admin.auth().createUser({
      email: 'macdinodavinto@gmail.com',
      password: '08022664487@Mac',
      emailVerified: true,
      displayName: 'Davinto Owner',
    });
    console.log('Owner user created with UID:', userRecord.uid);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('User already exists.');
    } else {
      console.error('Error creating user:', error);
    }
  }
}

createOwnerUser();