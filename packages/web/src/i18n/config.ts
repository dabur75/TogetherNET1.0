import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
import en from './locales/en.json'
import he from './locales/he.json'

const resources = {
  en: {
    translation: en
  },
  he: {
    translation: he
  }
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    // Therapeutic platform specific
    load: 'languageOnly', // Only load 'en', 'he' without region codes
    
    react: {
      useSuspense: false, // Avoid suspense for better UX
    }
  })

// Update document direction when language changes
i18n.on('languageChanged', (lng) => {
  const direction = lng === 'he' ? 'rtl' : 'ltr'
  document.documentElement.dir = direction
  document.documentElement.lang = lng
  
  // Update HTML class for styling
  document.documentElement.classList.remove('rtl', 'ltr')
  document.documentElement.classList.add(direction)
})

export default i18n