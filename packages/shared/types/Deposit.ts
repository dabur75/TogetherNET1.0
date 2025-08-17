// Deposit Types - Mobile-First Therapeutic Deposits
// TogetherNet HeartBank System

import { DepositCategory, Language, LocalizedString } from './Exercise'

/**
 * Core Deposit Interface - Mobile-Optimized
 */
export interface Deposit {
  id: string
  userId: string
  date: Date
  category: DepositCategory
  content: string
  wordCount: number
  language: Language
  
  // Privacy settings
  isPublic: boolean
  
  // Wealth mechanics
  baseValue: number
  interestRate: number
  currentValue: number // baseValue + compound interest
  compoundingSince: Date
  
  // Exercise connection
  linkedExercise?: string // Exercise ID if created from daily exercise
  exerciseLevel?: 'beginner' | 'intermediate' | 'advanced'
  
  // Mobile context when created
  mobileContext: {
    deviceType: 'mobile' | 'tablet' | 'desktop'
    inputMethod: 'keyboard' | 'voice' | 'handwriting'
    sessionDuration: number // seconds spent writing
    interruptions: number // how many times user left and returned
    timeOfDay: string
    location: 'home' | 'work' | 'public' | 'unknown'
  }
  
  // Therapeutic analysis (server-side)
  analysis?: {
    sentimentScore: number // -1 (negative) to 1 (positive)
    emotionalDepth: number // 1-10 scale
    selfCompassionLevel: number // 1-10 scale
    growthIndicators: string[]
    crisisIndicators: string[]
  }
  
  // Community engagement
  reactions: {
    heart: number // ❤️ - "I feel you"
    trophy: number // 🏆 - "You're strong"
    hug: number // 🤗 - "Sending support"
    sparkle: number // ✨ - "This inspired me"
  }
  
  inspirationCount: number // How many users this inspired to make deposits
  commentCount: number
  
  // Metadata
  createdAt: Date
  updatedAt: Date
  version: number
}

/**
 * Deposit Input Interface - Form submission
 */
export interface DepositInput {
  category: DepositCategory
  content: string
  isPublic: boolean
  linkedExercise?: string
  exerciseLevel?: 'beginner' | 'intermediate' | 'advanced'
  language: Language
}

/**
 * Deposit Form State - Mobile form management
 */
export interface DepositFormState {
  // Content
  content: string
  selectedCategory: DepositCategory | null
  isPublic: boolean
  
  // Word counting and validation
  wordCount: number
  characterCount: number
  isValid: boolean
  validationErrors: string[]
  
  // Mobile UX state
  isExpanded: boolean // For mobile-first expanding text area
  showCategoryPicker: boolean
  showPrivacyTooltip: boolean
  keyboardHeight: number // Track mobile keyboard for layout
  
  // Auto-save and recovery
  lastSaved: Date | null
  autoSaveEnabled: boolean
  recoveredFromDraft: boolean
  
  // Submission state
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean
}

/**
 * Category Configuration - Therapeutic framework
 */
export interface CategoryConfig {
  id: DepositCategory
  name: LocalizedString
  description: LocalizedString
  icon: string
  color: string
  
  // Therapeutic purpose
  rebuilds: LocalizedString // What this category rebuilds
  healing: LocalizedString // How it promotes healing
  
  // Mobile UI configuration
  mobileOptimized: {
    swipeGesture: string // Direction for mobile category switching
    vibrationPattern: number[] // Haptic feedback pattern
    iconAnimation: string // CSS animation class
  }
  
  // Example prompts for this category
  samplePrompts: LocalizedString[]
  
  // Banker responses specific to this category
  bankerResponses: {
    encouragement: LocalizedString[]
    completion: LocalizedString[]
    milestone: LocalizedString[]
  }
}

/**
 * The Five Categories - Therapeutic Configuration
 */
export const depositCategories: CategoryConfig[] = [
  {
    id: 'gratitude',
    name: {
      en: 'Gratitude',
      he: 'הכרת תודה'
    },
    description: {
      en: 'Notice abundance and goodness',
      he: 'שימו לב לשפע ולטוב'
    },
    icon: '🌱',
    color: '#4CAF50',
    rebuilds: {
      en: 'Security through abundance recognition',
      he: 'ביטחון דרך הכרה בשפע'
    },
    healing: {
      en: 'Rewires scarcity mindset',
      he: 'מחדש חיווט של חשיבה של מחסור'
    },
    mobileOptimized: {
      swipeGesture: 'right',
      vibrationPattern: [10, 50, 10],
      iconAnimation: 'gentle-grow'
    },
    samplePrompts: [
      {
        en: 'What small goodness surprised you today?',
        he: 'איזה טוב קטן הפתיע אותך היום?'
      },
      {
        en: 'What texture, taste, or sound brought you comfort?',
        he: 'איזה מרקם, טעם או צליל הביא לך נוחות?'
      }
    ],
    bankerResponses: {
      encouragement: [
        {
          en: 'Your nervous system is learning that good things exist...',
          he: 'המערכת העצבים שלך לומדת שקיימים דברים טובים...'
        }
      ],
      completion: [
        {
          en: 'Thank you for training your heart to see gifts',
          he: 'תודה שאתה מאמן את הלב שלך לראות מתנות'
        }
      ],
      milestone: [
        {
          en: 'Look how much abundance you\'ve noticed - your account is growing',
          he: 'תראה כמה שפע שמת לב - החשבון שלך גדל'
        }
      ]
    }
  },
  
  {
    id: 'courage',
    name: {
      en: 'Courage',
      he: 'אומץ'
    },
    description: {
      en: 'Acknowledge your daily braveries',
      he: 'הכר באומץ היומיומי שלך'
    },
    icon: '💪',
    color: '#FF9800',
    rebuilds: {
      en: 'Self-respect through brave action',
      he: 'כבוד עצמי דרך פעולה אמיצה'
    },
    healing: {
      en: 'Proves you\'re stronger than you think',
      he: 'מוכיח שאתה חזק יותר ממה שאתה חושב'
    },
    mobileOptimized: {
      swipeGesture: 'up',
      vibrationPattern: [20, 100, 20],
      iconAnimation: 'strength-pulse'
    },
    samplePrompts: [
      {
        en: 'What fear did you face today, however small?',
        he: 'איזה פחד התמודדת איתו היום, קטן ככל שיהיה?'
      },
      {
        en: 'When did you choose growth over comfort?',
        he: 'מתי בחרת בצמיחה על פני נוחות?'
      }
    ],
    bankerResponses: {
      encouragement: [
        {
          en: 'Every small brave act builds your courage account...',
          he: 'כל מעשה אמיץ קטן בונה את חשבון האומץ שלך...'
        }
      ],
      completion: [
        {
          en: 'The bravery in this deposit takes my breath away',
          he: 'האומץ בהפקדה הזו עוצר לי את הנשימה'
        }
      ],
      milestone: [
        {
          en: 'Look at all the fears you\'ve faced - you\'re becoming fearless',
          he: 'תראה את כל הפחדים שהתמודדת איתם - אתה הופך לחסר פחד'
        }
      ]
    }
  },
  
  {
    id: 'honesty',
    name: {
      en: 'Honesty',
      he: 'כנות'
    },
    description: {
      en: 'Practice radical truth-telling',
      he: 'תרגל אמירת אמת רדיקלית'
    },
    icon: '💎',
    color: '#2196F3',
    rebuilds: {
      en: 'Authenticity through truth-telling',
      he: 'אותנטיות דרך אמירת אמת'
    },
    healing: {
      en: 'Dissolves shame through exposure to light',
      he: 'ממיס בושה דרך חשיפה לאור'
    },
    mobileOptimized: {
      swipeGesture: 'down',
      vibrationPattern: [30, 150, 30],
      iconAnimation: 'crystal-shine'
    },
    samplePrompts: [
      {
        en: 'What truth are you finally ready to admit?',
        he: 'איזו אמת אתה סוף סוף מוכן להודות בה?'
      },
      {
        en: 'What mask did you take off today?',
        he: 'איזו מסכה הורדת היום?'
      }
    ],
    bankerResponses: {
      encouragement: [
        {
          en: 'Your willingness to be real is extraordinary...',
          he: 'הנכונות שלך להיות אמיתי היא יוצאת דופן...'
        }
      ],
      completion: [
        {
          en: 'Thank you for trusting me with this honesty',
          he: 'תודה שסמכת עליי עם הכנות הזו'
        }
      ],
      milestone: [
        {
          en: 'Your truth deposits are creating a foundation of authenticity',
          he: 'הפקדות האמת שלך יוצרות יסוד של אותנטיות'
        }
      ]
    }
  },
  
  {
    id: 'success',
    name: {
      en: 'Success',
      he: 'הצלחה'
    },
    description: {
      en: 'Celebrate what worked today',
      he: 'חגגו מה שעבד היום'
    },
    icon: '🌟',
    color: '#FFD700',
    rebuilds: {
      en: 'Self-worth through achievement recognition',
      he: 'ערך עצמי דרך הכרה בהישגים'
    },
    healing: {
      en: 'Counters failure fixation',
      he: 'נלחם בקיבעון על כישלונות'
    },
    mobileOptimized: {
      swipeGesture: 'left',
      vibrationPattern: [15, 75, 15, 75, 15],
      iconAnimation: 'victory-sparkle'
    },
    samplePrompts: [
      {
        en: 'What went better than expected today?',
        he: 'מה הלך טוב יותר מהצפוי היום?'
      },
      {
        en: 'What skill did you use successfully?',
        he: 'איזה כישור השתמשת בו בהצלחה?'
      }
    ],
    bankerResponses: {
      encouragement: [
        {
          en: 'You\'re building evidence that you can succeed...',
          he: 'אתה בונה ראיות שאתה יכול להצליח...'
        }
      ],
      completion: [
        {
          en: 'This success deposit proves your capability',
          he: 'הפקדת ההצלחה הזו מוכיחה את היכולת שלך'
        }
      ],
      milestone: [
        {
          en: 'Look at all your successes - you\'re more capable than you knew',
          he: 'תראה את כל ההצלחות שלך - אתה מסוגל יותר ממה שידעת'
        }
      ]
    }
  },
  
  {
    id: 'self-compassion',
    name: {
      en: 'Self-Compassion',
      he: 'חמלה עצמית'
    },
    description: {
      en: 'Treat yourself like your best friend',
      he: 'התיחס לעצמך כמו לחבר הכי טוב שלך'
    },
    icon: '🤗',
    color: '#E91E63',
    rebuilds: {
      en: 'Internal safety through self-kindness',
      he: 'ביטחון פנימי דרך טוב לב עצמי'
    },
    healing: {
      en: 'Develops secure internal attachment',
      he: 'מפתח התקשרות פנימית בטוחה'
    },
    mobileOptimized: {
      swipeGesture: 'circle',
      vibrationPattern: [40, 200, 40],
      iconAnimation: 'warm-embrace'
    },
    samplePrompts: [
      {
        en: 'How were you gentle with yourself today?',
        he: 'איך היית עדין עם עצמך היום?'
      },
      {
        en: 'What would you tell your best friend in your situation?',
        he: 'מה היית אומר לחבר הכי טוב שלך במצב שלך?'
      }
    ],
    bankerResponses: {
      encouragement: [
        {
          en: 'Learning to be kind to yourself is the deepest healing...',
          he: 'ללמוד להיות טוב לעצמך זה הריפוי הכי עמוק...'
        }
      ],
      completion: [
        {
          en: 'This self-compassion deposit fills my heart',
          he: 'הפקדת החמלה העצמית הזו ממלאת לי את הלב'
        }
      ],
      milestone: [
        {
          en: 'You\'re becoming your own best friend - what a gift',
          he: 'אתה הופך להיות החבר הכי טוב של עצמך - איזו מתנה'
        }
      ]
    }
  }
]

/**
 * Utility functions for deposits
 */
export const getCategory = (categoryId: DepositCategory): CategoryConfig => {
  return depositCategories.find(cat => cat.id === categoryId)!
}

export const calculateDepositValue = (content: string): number => {
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length
  const baseValue = Math.min(wordCount * 0.5, 25) // Max 25 points per deposit
  return Math.round(baseValue)
}

export const validateDeposit = (input: DepositInput): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!input.content || input.content.trim().length < 20) {
    errors.push('Deposit must be at least 20 characters')
  }
  
  if (input.content.length > 2000) {
    errors.push('Deposit must be less than 2000 characters')
  }
  
  if (!input.category) {
    errors.push('Please select a category')
  }
  
  const wordCount = input.content.trim().split(/\s+/).filter(word => word.length > 0).length
  if (wordCount < 5) {
    errors.push('Deposit must be at least 5 words')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}