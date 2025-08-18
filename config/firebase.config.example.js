// Firebase Configuration Example
// Copy this file to config/firebase.config.js and fill in your actual values

export const firebaseConfig = {
  apiKey: "your_api_key_here",
  authDomain: "togethernet-israel-poc.firebaseapp.com",
  projectId: "togethernet-israel-poc",
  storageBucket: "togethernet-israel-poc.appspot.com",
  messagingSenderId: "your_sender_id_here",
  appId: "your_app_id_here"
}

// Development Emulator Configuration
export const emulatorConfig = {
  useEmulator: true,
  auth: "localhost:9099",
  firestore: "localhost:8080",
  functions: "localhost:5001",
  storage: "localhost:9199"
}

// Environment Variables Reference
export const requiredEnvVars = {
  FIREBASE_API_KEY: "Firebase API Key from console",
  FIREBASE_AUTH_DOMAIN: "Firebase Auth Domain",
  FIREBASE_PROJECT_ID: "togethernet-israel-poc",
  FIREBASE_STORAGE_BUCKET: "Firebase Storage Bucket",
  FIREBASE_MESSAGING_SENDER_ID: "Firebase Messaging Sender ID",
  FIREBASE_APP_ID: "Firebase App ID"
}
