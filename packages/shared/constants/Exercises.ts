// Exercise Library - Sample Daily Exercise for Development
// TogetherNet Therapeutic Platform

import { Exercise, ExerciseLibrary, LocalizedString } from '../types/Exercise'

/**
 * Sample Exercise for Development - Based on Real Exercise Format
 * Real Hebrew exercise: "תרגול יומי 1 – הפקדה ראשונה"
 */
export const sampleExercise: Exercise = {
  id: 'daily-exercise-001',
  date: '2025-01-17',
  category: 'success',
  theme: 'First Deposit',
  
  title: {
    en: 'Daily Exercise 1 - First Deposit',
    he: 'תרגול יומי 1 – הפקדה ראשונה'
  },
  
  greeting: {
    en: 'Good morning 💛',
    he: 'בוקר טוב 💛'
  },
  
  introduction: {
    en: 'Today we start simple.\nStop for a moment, take a deep breath and ask yourself:',
    he: 'היום נתחיל בפשטות.\nעצור לרגע, קח נשימה עמוקה ושאל את עצמך:'
  },
  
  coreQuestion: {
    en: 'What small good thing did I do for myself or someone else in the last 24 hours?',
    he: 'איזה דבר קטן וטוב עשיתי בשבילי או בשביל מישהו אחר ב־24 השעות האחרונות?'
  },
  
  guidance: {
    en: 'It can be something really everyday. A smile you sent. A glass of water you drank on time. A brave conversation with a friend.\nIt doesn\'t need to be something big. The real value is found in the small details.',
    he: 'זה יכול להיות משהו ממש יומיומי. חיוך ששלחת. כוס מים ששתית בזמן. שיחה אמיצה עם חבר.\nלא צריך משהו גדול. הערך האמיתי נמצא דווקא בפרטים הקטנים.'
  },
  
  instruction: {
    en: '✍️ Write now one sentence in the style:',
    he: '✍️ כתוב עכשיו משפט אחד בסגנון:'
  },
  
  template: {
    en: 'I deposit in my self-worth bank that...',
    he: 'אני מפקיד בבנק הערך העצמי שלי על כך ש...'
  },
  
  bankerIntro: {
    en: 'Today we make our first gentle deposit together. Every small good action has value...',
    he: 'היום אנחנו עושים את ההפקדה העדינה הראשונה יחד. לכל פעולה קטנה וטובה יש ערך...'
  },
  
  prompts: [
    {
      en: 'What small kindness did you show someone today?',
      he: 'איזה חסד קטן הראת למישהו היום?'
    },
    {
      en: 'What moment of self-care did you give yourself?',
      he: 'איזה רגע של דאגה עצמית נתת לעצמך?'
    },
    {
      en: 'What small victory can you acknowledge from today?',
      he: 'איזה ניצחון קטן אתה יכול להכיר מהיום?'
    }
  ],
  
  timing: {
    publishTime: '06:00',
    availableUntil: '23:59',
    reminderSchedule: ['06:30', '14:00', '20:00']
  },
  
  metadata: {
    estimatedCompletionMinutes: 3,
    difficultyScore: 1,
    therapeuticFocus: ['self-worth', 'recognition', 'daily-actions'],
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