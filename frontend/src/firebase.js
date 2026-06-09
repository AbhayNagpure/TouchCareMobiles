import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// These are your secret keys that point to YOUR specific Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyD3w4s464R6qYokm2z1cqxWc3Hfca9DobA",
  authDomain: "touchcaremobiless.firebaseapp.com",
  projectId: "touchcaremobiless",
  storageBucket: "touchcaremobiless.firebasestorage.app",
  messagingSenderId: "470399814832",
  appId: "1:470399814832:web:33780e2585f1430f09ff75",
  measurementId: "G-YQ9JFHFEL9"
};

// 1. Wake up Firebase and give it your keys
const app = initializeApp(firebaseConfig);

// 2. Turn on the Authentication system so we can use it later
export const auth = getAuth(app);

// 3. Set up Google as our specific login provider
export const googleProvider = new GoogleAuthProvider();