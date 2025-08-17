// Global type declarations for TogetherNet shared package

// Suppress glob type errors - we don't use glob directly
declare module 'glob' {
  export {}
}

// Environment variables for cross-platform support
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string
    FIREBASE_API_KEY?: string
    FIREBASE_AUTH_DOMAIN?: string
    FIREBASE_PROJECT_ID?: string
    FIREBASE_STORAGE_BUCKET?: string
    FIREBASE_MESSAGING_SENDER_ID?: string
    FIREBASE_APP_ID?: string
    FIREBASE_USE_EMULATOR?: string
    USE_FIREBASE_EMULATOR?: string
    EMULATOR_AUTH_URL?: string
    EMULATOR_FIRESTORE_HOST?: string
    EMULATOR_FIRESTORE_PORT?: string
    EMULATOR_FUNCTIONS_HOST?: string
    EMULATOR_FUNCTIONS_PORT?: string
    EMULATOR_STORAGE_HOST?: string
    EMULATOR_STORAGE_PORT?: string
  }
}

// Vite environment variables (for web platform)
interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY?: string
  VITE_FIREBASE_AUTH_DOMAIN?: string
  VITE_FIREBASE_PROJECT_ID?: string
  VITE_FIREBASE_STORAGE_BUCKET?: string
  VITE_FIREBASE_MESSAGING_SENDER_ID?: string
  VITE_FIREBASE_APP_ID?: string
  VITE_USE_FIREBASE_EMULATOR?: string
  VITE_NODE_ENV?: string
  VITE_EMULATOR_AUTH_URL?: string
  VITE_EMULATOR_FIRESTORE_HOST?: string
  VITE_EMULATOR_FIRESTORE_PORT?: string
  VITE_EMULATOR_FUNCTIONS_HOST?: string
  VITE_EMULATOR_FUNCTIONS_PORT?: string
  VITE_EMULATOR_STORAGE_HOST?: string
  VITE_EMULATOR_STORAGE_PORT?: string
  DEV?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global platform detection
declare const globalThis: {
  window?: Window
  navigator?: Navigator
  process?: NodeJS.Process
} & typeof global

// Expo environment variables (for React Native platform)
declare namespace ExpoPublic {
  interface Env {
    EXPO_PUBLIC_FIREBASE_API_KEY?: string
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN?: string
    EXPO_PUBLIC_FIREBASE_PROJECT_ID?: string
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET?: string
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string
    EXPO_PUBLIC_FIREBASE_APP_ID?: string
    EXPO_PUBLIC_USE_FIREBASE_EMULATOR?: string
    EXPO_PUBLIC_NODE_ENV?: string
  }
}