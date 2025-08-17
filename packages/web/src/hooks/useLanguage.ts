import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

export type Language = 'en' | 'he'
export type Direction = 'ltr' | 'rtl'

export const useLanguage = () => {
  const { i18n, t } = useTranslation()
  
  const language = i18n.language as Language
  const direction: Direction = language === 'he' ? 'rtl' : 'ltr'
  const isRTL = direction === 'rtl'
  
  const switchLanguage = useCallback((newLanguage: Language) => {
    i18n.changeLanguage(newLanguage)
  }, [i18n])
  
  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'he' : 'en'
    switchLanguage(newLanguage)
  }, [language, switchLanguage])
  
  // Helper functions for RTL layout
  const getTextAlign = useCallback((align: 'start' | 'end' | 'center' = 'start') => {
    if (align === 'center') return 'center'
    if (align === 'start') return isRTL ? 'right' : 'left'
    if (align === 'end') return isRTL ? 'left' : 'right'
    return align
  }, [isRTL])
  
  const getFlexDirection = useCallback((direction: 'row' | 'row-reverse' | 'column' = 'row') => {
    if (direction === 'column') return 'column'
    if (direction === 'row' && isRTL) return 'row-reverse'
    if (direction === 'row-reverse' && isRTL) return 'row'
    return direction
  }, [isRTL])
  
  const getMargin = useCallback((side: 'left' | 'right', value: string) => {
    if (side === 'left') return isRTL ? { marginRight: value } : { marginLeft: value }
    if (side === 'right') return isRTL ? { marginLeft: value } : { marginRight: value }
    return {}
  }, [isRTL])
  
  const getPadding = useCallback((side: 'left' | 'right', value: string) => {
    if (side === 'left') return isRTL ? { paddingRight: value } : { paddingLeft: value }
    if (side === 'right') return isRTL ? { paddingLeft: value } : { paddingRight: value }
    return {}
  }, [isRTL])
  
  // Therapeutic content helpers
  const getBankerFont = useCallback(() => {
    return language === 'he' 
      ? 'system-ui, -apple-system, sans-serif' 
      : "'Quicksand', system-ui, sans-serif"
  }, [language])
  
  const getBodyFont = useCallback(() => {
    return language === 'he'
      ? 'system-ui, -apple-system, sans-serif'
      : "'Assistant', system-ui, sans-serif"
  }, [language])
  
  return {
    language,
    direction,
    isRTL,
    switchLanguage,
    toggleLanguage,
    t,
    
    // Layout helpers
    getTextAlign,
    getFlexDirection,
    getMargin,
    getPadding,
    
    // Typography helpers
    getBankerFont,
    getBodyFont,
    
    // Utility functions
    formatNumber: (num: number) => {
      return language === 'he' 
        ? num.toLocaleString('he-IL')
        : num.toLocaleString('en-US')
    },
    
    formatDate: (date: Date) => {
      return language === 'he'
        ? date.toLocaleDateString('he-IL')
        : date.toLocaleDateString('en-US')
    },
  }
}