// Exercise Library - Sample Daily Exercise for Development
// TogetherNet Therapeutic Platform

import { Exercise, ExerciseLibrary, LocalizedString } from '../types/Exercise'

/**
 * Sample Exercise for Development - Gratitude Category
 * This is a placeholder until real exercises are uploaded
 */
export const sampleExercise: Exercise = {
  id: 'gratitude-textures-001',
  date: '2025-01-17',
  category: 'gratitude',
  theme: 'Sensory Awareness',
  
  exercise: {
    en: 'Notice three textures that feel good today',
    he: 'שימו לב לשלושה מרקמים שמרגישים טוב היום'
  },
  
  bankerIntro: {
    en: 'Your nervous system remembers pleasure, let\'s help it notice what feels good...',
    he: 'המערכת העצבים שלך זוכרת הנאה, בוא נעזור לה לשים לב למה שמרגיש טוב...'
  },
  
  levels: {
    beginner: {
      en: 'Name one soft thing you touched today',
      he: 'תן שם לדבר רך אחד שנגעת בו היום'
    },
    intermediate: {
      en: 'Describe three different textures in detail - how they felt, where you found them',
      he: 'תאר שלושה מרקמים שונים בפירוט - איך הם הרגישו, איפה מצאת אותם'
    },
    advanced: {
      en: 'Write about how textures connect to memories and feelings of safety or comfort',
      he: 'כתוב על איך מרקמים מתחברים לזיכרונות ולתחושות של ביטחון או נוחות'
    }
  },
  
  prompts: [
    {
      en: 'What texture surprised you with its pleasantness today?',
      he: 'איזה מרקם הפתיע אותך ברכות שלו היום?'
    },
    {
      en: 'Which fabric or surface made you feel most comfortable?',
      he: 'איזה בד או משטח גרם לך להרגיש הכי נוח?'
    },
    {
      en: 'What surface reminds you of safety or being cared for?',
      he: 'איזה משטח מזכיר לך ביטחון או טיפול?'
    }
  ],
  
  timing: {
    publishTime: '06:00',
    availableUntil: '23:59',
    reminderSchedule: ['06:30', '14:00', '20:00']
  },
  
  metadata: {
    estimatedCompletionMinutes: 5,
    difficultyScore: 3,
    therapeuticFocus: ['anxiety', 'grounding', 'present-moment'],
    seasonalAdaptation: 'winter'
  },
  
  analytics: {
    completionRate: 0,
    averageWordCount: 0,
    publicShareRate: 0,
    therapeuticImpactScore: 0
  }
}

/**
 * Exercise Library Structure - Placeholder
 * Will be populated with real exercises later
 */
export const exerciseLibrary: ExerciseLibrary = {
  gratitude: [sampleExercise],
  courage: [],
  honesty: [],
  success: [],
  'self-compassion': []
}

/**
 * Get today's exercise (development helper)
 */
export const getTodaysExercise = (): Exercise => {
  return sampleExercise
}

/**
 * Banker responses for the sample exercise
 */
export const sampleBankerResponses = {
  completion: {
    en: 'Thank you for noticing texture today. Your nervous system is learning that good things exist...',
    he: 'תודה שהקשבת למרקמים היום. המערכת העצבים שלך לומדת שקיימים דברים טובים...'
  },
  encouragement: {
    en: 'Even naming one soft thing is a deposit of awareness...',
    he: 'אפילו לתת שם לדבר רך אחד זו הפקדה של מודעות...'
  }
}

/**
 * Export for use in HeartBank component
 */
export { sampleExercise as currentExercise }