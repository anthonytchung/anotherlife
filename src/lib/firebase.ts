// Import the required Firebase services
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN-rOPb2FK-wanujDn3PdxHk569gitdtA",
  authDomain: "anotherlife-b72b4.firebaseapp.com",
  projectId: "anotherlife-b72b4",
  storageBucket: "anotherlife-b72b4.firebasestorage.app",
  messagingSenderId: "21631222809",
  appId: "1:21631222809:web:f75c5fe292a9dfc3b8d688",
  measurementId: "G-6EPPPL20E1"
};

// Initialize Firebase app (prevent multiple initializations in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
