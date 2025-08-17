import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore'
import { getFunctions, connectFunctionsEmulator, Functions } from 'firebase/functions'
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage'

// Platform detection with proper type guards
const isWeb = typeof globalThis !== 'undefined' && typeof (globalThis as any).window !== 'undefined'
const isReactNative = !isWeb && typeof globalThis !== 'undefined' && 
  typeof (globalThis as any).navigator !== 'undefined' && 
  (globalThis as any).navigator?.product === 'ReactNative'

// Environment variable helpers for cross-platform compatibility
const getEnvVar = (key: string): string | undefined => {
  if (isWeb) {
    // Vite environment variables for web
    try {
      return (import.meta as any)?.env?.[`VITE_${key}`] || (globalThis as any)?.window?.[`VITE_${key}`]
    } catch {
      return undefined
    }
  } else if (isReactNative) {
    // Expo environment variables for React Native
    return (process.env as any)?.[`EXPO_PUBLIC_${key}`]
  } else {
    // Node.js environment variables for server
    return process.env?.[key]
  }
}

// Firebase configuration with cross-platform environment support
const firebaseConfig = {
  apiKey: getEnvVar('FIREBASE_API_KEY') || 'your_api_key_here',
  authDomain: getEnvVar('FIREBASE_AUTH_DOMAIN') || 'togethernet-israel-poc.firebaseapp.com',
  projectId: getEnvVar('FIREBASE_PROJECT_ID') || 'togethernet-israel-poc',
  storageBucket: getEnvVar('FIREBASE_STORAGE_BUCKET') || 'togethernet-israel-poc.appspot.com',
  messagingSenderId: getEnvVar('FIREBASE_MESSAGING_SENDER_ID') || 'your_sender_id_here',
  appId: getEnvVar('FIREBASE_APP_ID') || 'your_app_id_here'
}

// Development environment detection
const isDevelopment = 
  getEnvVar('NODE_ENV') === 'development' ||
  getEnvVar('EXPO_PUBLIC_NODE_ENV') === 'development' ||
  (isWeb && ((import.meta as any)?.env?.DEV || (import.meta as any)?.env?.VITE_NODE_ENV === 'development'))

const useEmulator = 
  getEnvVar('USE_FIREBASE_EMULATOR') === 'true' ||
  getEnvVar('FIREBASE_USE_EMULATOR') === 'true'

// Initialize Firebase app (singleton pattern)
let app: FirebaseApp
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
  console.log('🔥 Firebase app initialized for TogetherNet')
} else {
  app = getApps()[0]
  console.log('🔥 Using existing Firebase app instance')
}

// Initialize Firebase services
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)
export const functions: Functions = getFunctions(app)
export const storage: FirebaseStorage = getStorage(app)

// Emulator connection state tracking
let emulatorsConnected = false

// Connect to emulators in development
if (isDevelopment && useEmulator && !emulatorsConnected) {
  try {
    const authEmulatorUrl = getEnvVar('EMULATOR_AUTH_URL') || 'http://localhost:9099'
    const firestoreHost = getEnvVar('EMULATOR_FIRESTORE_HOST') || 'localhost'
    const firestorePort = parseInt(getEnvVar('EMULATOR_FIRESTORE_PORT') || '8080')
    const functionsHost = getEnvVar('EMULATOR_FUNCTIONS_HOST') || 'localhost'
    const functionsPort = parseInt(getEnvVar('EMULATOR_FUNCTIONS_PORT') || '5001')
    const storageHost = getEnvVar('EMULATOR_STORAGE_HOST') || 'localhost'
    const storagePort = parseInt(getEnvVar('EMULATOR_STORAGE_PORT') || '9199')

    // Connect Auth emulator
    connectAuthEmulator(auth, authEmulatorUrl, { disableWarnings: true })
    
    // Connect Firestore emulator
    connectFirestoreEmulator(db, firestoreHost, firestorePort)
    
    // Connect Functions emulator
    connectFunctionsEmulator(functions, functionsHost, functionsPort)
    
    // Connect Storage emulator
    connectStorageEmulator(storage, storageHost, storagePort)
    
    emulatorsConnected = true
    console.log('🔥 Connected to Firebase emulators for TogetherNet development')
    console.log(`   - Auth: ${authEmulatorUrl}`)
    console.log(`   - Firestore: ${firestoreHost}:${firestorePort}`)
    console.log(`   - Functions: ${functionsHost}:${functionsPort}`)
    console.log(`   - Storage: ${storageHost}:${storagePort}`)
    
  } catch (error) {
    console.warn('⚠️ Failed to connect to Firebase emulators, using production:', error)
    console.log('   This is normal if emulators are not running')
  }
} else if (isDevelopment) {
  console.log('🔥 Using production Firebase (emulators disabled)')
} else {
  console.log('🔥 Using production Firebase')
}

// Export configuration for debugging
export const firebaseDebugInfo = {
  config: firebaseConfig,
  platform: isWeb ? 'web' : isReactNative ? 'react-native' : 'node',
  isDevelopment,
  useEmulator,
  emulatorsConnected
}

// Export Firebase app as default
export default app

// Therapeutic initialization message
if (isDevelopment) {
  console.log('💛 TogetherNet Firebase initialized - ready to rebuild self-worth through daily deposits')
}
