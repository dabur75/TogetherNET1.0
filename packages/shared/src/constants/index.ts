// Constants for TogetherNet Therapeutic Platform

// Therapeutic Color Palette
export const COLORS = {
  gold: '#FFD700',
  turquoise: '#40E0D0', 
  softWhite: '#FAFAFA',
  warmBlack: '#1A1A1A',
  deposit: '#FFD700',
  crisis: '#40E0D0',
  success: '#4CAF50',
  gentle: '#FFF8DC',
} as const

// Platform Configuration
export const CONFIG = {
  dailyExerciseTime: '06:00', // 6 AM Israel time
  maxDepositLength: 500,
  minDepositLength: 20,
  streakMilestones: [3, 8, 21, 55, 89], // Fibonacci sequence
} as const

// Deposit Categories
export const DEPOSIT_CATEGORIES = [
  'gratitude',
  'courage', 
  'honesty',
  'success',
  'selfCompassion'
] as const

export type DepositCategory = typeof DEPOSIT_CATEGORIES[number]