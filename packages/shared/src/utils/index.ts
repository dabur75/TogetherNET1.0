// Utilities for TogetherNet Therapeutic Platform

// RTL/Hebrew utilities
export const isRTLLanguage = (language: string): boolean => {
  return language === 'he'
}

export const getTextDirection = (language: string): 'ltr' | 'rtl' => {
  return isRTLLanguage(language) ? 'rtl' : 'ltr'
}

// Date formatting utilities
export const formatDate = (date: Date, language: string): string => {
  const locale = language === 'he' ? 'he-IL' : 'en-US'
  return date.toLocaleDateString(locale)
}

// Number formatting utilities  
export const formatNumber = (num: number, language: string): string => {
  const locale = language === 'he' ? 'he-IL' : 'en-US'
  return num.toLocaleString(locale)
}