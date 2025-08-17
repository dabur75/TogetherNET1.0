import { Theme } from '@emotion/react'

// Therapeutic Color Palette
export const colors = {
  // Core Sacred Palette
  gold: '#FFD700',        // Banker, worth, wisdom, divine light
  turquoise: '#40E0D0',   // Healing, trust, emotional safety
  softWhite: '#FAFAFA',   // Space, possibility, pure potential
  warmBlack: '#1A1A1A',   // Depth, grounding, sacred darkness
  
  // Semantic Colors
  deposit: '#FFD700',     // Gold for value accumulation
  crisis: '#40E0D0',      // Calming turquoise for safety
  success: '#4CAF50',     // Growth green for achievements
  gentle: '#FFF8DC',      // Soft cream for reminders
  
  // Seasonal Adaptations
  winter: {
    primary: '#B8860B',   // Darker gold for protection
    accent: '#4682B4',    // Steel blue for resilience
  },
  spring: {
    primary: '#FFE55C',   // Lighter gold for growth
    accent: '#00CED1',    // Bright turquoise for renewal
  },
  
  // Gradients for therapeutic feeling
  gradients: {
    banker: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    healing: 'linear-gradient(135deg, #40E0D0 0%, #48CAE4 100%)',
    gentle: 'linear-gradient(135deg, #FFF8DC 0%, #FAFAFA 100%)',
    depth: 'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)',
  }
} as const

// Typography System
export const typography = {
  // Headers - always lowercase, gentle
  h1: {
    fontSize: '2rem',
    fontWeight: 400,
    textTransform: 'lowercase' as const,
    letterSpacing: '0.5px',
    color: colors.gold,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 400,
    textTransform: 'lowercase' as const,
    letterSpacing: '0.3px',
    color: colors.gold,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 500,
    letterSpacing: '0.2px',
    color: colors.warmBlack,
    lineHeight: 1.4,
  },
  
  // Banker voice - slightly handwritten, therapeutic
  banker: {
    fontFamily: "'Quicksand', system-ui, sans-serif",
    fontSize: '1.125rem',
    lineHeight: 1.75,
    color: colors.gold,
    fontStyle: 'italic' as const,
    fontWeight: 400,
  },
  
  // Body text
  body: {
    fontFamily: "'Assistant', system-ui, sans-serif",
    fontSize: '1rem',
    lineHeight: 1.6,
    color: colors.warmBlack,
    fontWeight: 400,
  },
  
  // Hebrew specific
  hebrew: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '1.125rem',
    textAlign: 'right' as const,
    direction: 'rtl' as const,
    letterSpacing: '0.2px',
  },
  
  // Exercise prompts
  prompt: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textAlign: 'center' as const,
    color: colors.warmBlack,
  },
} as const

// Spacing System (8px base)
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
} as const

// Responsive Breakpoints
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const

// Animations for therapeutic feel
export const animations = {
  // Breathing animation for banker presence
  breathing: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  
  // Gentle celebration for deposits
  celebrateDeposit: {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", damping: 15 }
    }
  },
  
  // Compound interest visualization
  wealthGrowth: {
    scale: [1, 1.02, 1],
    rotate: [0, 1, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear" as const
    }
  },
  
  // Gentle fade in
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
} as const

// Shadows for depth
export const shadows = {
  gentle: '0 2px 8px rgba(0, 0, 0, 0.1)',
  banker: '0 4px 20px rgba(255, 215, 0, 0.3)',
  healing: '0 4px 20px rgba(64, 224, 208, 0.2)',
  depth: '0 8px 32px rgba(0, 0, 0, 0.15)',
} as const

// Border radius system
export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const

// Complete therapeutic theme
export const therapeuticTheme: Theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  animations,
  shadows,
  borderRadius,
  
  // Helper functions
  mediaQueries: {
    mobile: `@media (min-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.tablet})`,
    desktop: `@media (min-width: ${breakpoints.desktop})`,
    wide: `@media (min-width: ${breakpoints.wide})`,
  },
  
  // RTL helpers
  rtl: {
    textAlign: 'right' as const,
    direction: 'rtl' as const,
    fontFamily: "'Assistant', system-ui, sans-serif",
  },
  
  // Therapeutic interaction states
  interactions: {
    hover: {
      transform: 'translateY(-2px)',
      transition: 'all 0.3s ease',
    },
    focus: {
      outline: `2px solid ${colors.turquoise}`,
      outlineOffset: '2px',
    },
    active: {
      transform: 'translateY(0)',
    },
  },
}

// Type declaration for emotion theme
declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors
    typography: typeof typography
    spacing: typeof spacing
    breakpoints: typeof breakpoints
    animations: typeof animations
    shadows: typeof shadows
    borderRadius: typeof borderRadius
    mediaQueries: {
      mobile: string
      tablet: string
      desktop: string
      wide: string
    }
    rtl: {
      textAlign: 'right'
      direction: 'rtl'
      fontFamily: string
    }
    interactions: {
      hover: {
        transform: string
        transition: string
      }
      focus: {
        outline: string
        outlineOffset: string
      }
      active: {
        transform: string
      }
    }
  }
}