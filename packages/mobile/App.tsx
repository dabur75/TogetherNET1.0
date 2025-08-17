import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { LanguageProvider } from './src/contexts/LanguageContext'
import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  return (
    <LanguageProvider>
      <StatusBar style='auto' />
      <AppNavigator />
    </LanguageProvider>
  )
}
