import React, { createContext, useContext, useEffect, useState } from 'react'
import { I18nManager } from 'react-native'

type Language = 'en' | 'he'

interface LanguageContextType {
  language: Language
  isRTL: boolean
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)

    // Force RTL for Hebrew
    if (lang === 'he' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true)
      // Reload app for RTL changes to take effect
      // In production, you'd want to show a dialog asking user to restart
    } else if (lang === 'en' && I18nManager.isRTL) {
      I18nManager.forceRTL(false)
      // Reload app for LTR changes to take effect
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en')
  }

  const isRTL = language === 'he'

  // Initialize with device language or stored preference
  useEffect(() => {
    // TODO: Load from AsyncStorage
    // For now, default to English
    setLanguageState('en')
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        language,
        isRTL,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
