// This file is used to set up the firebase entry
// Call this file for any database related  

// Import the functions needed from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfrBkwMFOByDidud79ZCy5vHDLnipBC5Q",
  authDomain: "communityforum-77740.firebaseapp.com",
  projectId: "communityforum-77740",
  storageBucket: "communityforum-77740.firebasestorage.app",
  messagingSenderId: "71481870978",
  appId: "1:71481870978:web:ab08ce8bd549f9708d829b",
  measurementId: "G-4R035BJBGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };