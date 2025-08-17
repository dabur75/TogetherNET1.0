// Core Types for TogetherNet Therapeutic Platform

export type Language = 'en' | 'he'
export type Direction = 'ltr' | 'rtl'

// Placeholder type exports - will be expanded in HeartBank development
export interface User {
  id: string
  language: Language
  // More fields to be added
}

export interface Deposit {
  id: string
  userId: string
  content: string
  category: string
  createdAt: Date
  // More fields to be added
}