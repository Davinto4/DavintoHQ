// create-owner-user.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDT5tgWOLu3oUf7XTFsFzAuszUcERhoOTw",
  authDomain: "davintohq.firebaseapp.com",
  projectId: "davintohq",
  storageBucket: "davintohq.appspot.com",
  messagingSenderId: "156992522736",
  appId: "1:156992522736:web:7db1c51a089d9d1bad3535",
  measurementId: "G-3GXFN90T6S"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createOwnerUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "macdinodavinto@gmail.com",
      "08022664487@Mac"
    );
    console.log("Owner user created:", userCredential.user.uid);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("User already exists.");
    } else {
      console.error("Error creating user:", error.message);
    }
  }
}

createOwnerUser();