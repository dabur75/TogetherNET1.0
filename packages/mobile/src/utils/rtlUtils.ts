import { useLanguage } from '../contexts/LanguageContext'

// RTL-aware text alignment
export const getTextAlign = (isRTL: boolean) => {
  return isRTL ? 'right' : 'left'
}

// RTL-aware flex direction
export const getFlexDirection = (isRTL: boolean) => {
  return isRTL ? 'row-reverse' : 'row'
}

// RTL-aware writing direction
export const getWritingDirection = (isRTL: boolean) => {
  return isRTL ? 'rtl' : 'ltr'
}

// RTL-aware margin/padding
export const getMarginStart = (isRTL: boolean, value: number) => {
  return isRTL ? { marginRight: value } : { marginLeft: value }
}

export const getMarginEnd = (isRTL: boolean, value: number) => {
  return isRTL ? { marginLeft: value } : { marginRight: value }
}

export const getPaddingStart = (isRTL: boolean, value: number) => {
  return isRTL ? { paddingRight: value } : { paddingLeft: value }
}

export const getPaddingEnd = (isRTL: boolean, value: number) => {
  return isRTL ? { paddingLeft: value } : { paddingRight: value }
}

// RTL-aware position
export const getPositionStart = (isRTL: boolean, value: number) => {
  return isRTL ? { right: value } : { left: value }
}

export const getPositionEnd = (isRTL: boolean, value: number) => {
  return isRTL ? { left: value } : { right: value }
}

// RTL-aware transform
export const getTransform = (isRTL: boolean, scaleX: number = 1) => {
  return isRTL ? [{ scaleX: -scaleX }] : [{ scaleX }]
}

// Hook for RTL-aware styles
export const useRTLStyles = () => {
  const { isRTL } = useLanguage()

  return {
    textAlign: getTextAlign(isRTL),
    flexDirection: getFlexDirection(isRTL),
    writingDirection: getWritingDirection(isRTL),
    marginStart: (value: number) => getMarginStart(isRTL, value),
    marginEnd: (value: number) => getMarginEnd(isRTL, value),
    paddingStart: (value: number) => getPaddingStart(isRTL, value),
    paddingEnd: (value: number) => getPaddingEnd(isRTL, value),
    positionStart: (value: number) => getPositionStart(isRTL, value),
    positionEnd: (value: number) => getPositionEnd(isRTL, value),
    transform: (scaleX?: number) => getTransform(isRTL, scaleX),
  }
}
