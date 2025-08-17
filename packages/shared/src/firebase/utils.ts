// Firebase utility functions for TogetherNet
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot
} from 'firebase/firestore'
import { db } from './init'
import { COLLECTIONS, type CollectionName } from './types'

// Generic Firestore helpers
export const createDocument = async <T extends DocumentData>(
  collectionName: CollectionName,
  data: T,
  customId?: string
): Promise<string> => {
  try {
    if (customId) {
      await setDoc(doc(db, collectionName, customId), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      return customId
    } else {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      return docRef.id
    }
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error)
    throw new Error(`Failed to create document: ${error}`)
  }
}

export const getDocument = async <T extends DocumentData>(
  collectionName: CollectionName,
  documentId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, documentId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as unknown as T
    } else {
      return null
    }
  } catch (error) {
    console.error(`Error getting document ${documentId} from ${collectionName}:`, error)
    throw new Error(`Failed to get document: ${error}`)
  }
}

export const updateDocument = async <T extends Partial<DocumentData>>(
  collectionName: CollectionName,
  documentId: string,
  data: T
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    console.error(`Error updating document ${documentId} in ${collectionName}:`, error)
    throw new Error(`Failed to update document: ${error}`)
  }
}

export const deleteDocument = async (
  collectionName: CollectionName,
  documentId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error(`Error deleting document ${documentId} from ${collectionName}:`, error)
    throw new Error(`Failed to delete document: ${error}`)
  }
}

// Query helpers
export const queryDocuments = async <T extends DocumentData>(
  collectionName: CollectionName,
  constraints: any[] = []
): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), ...constraints)
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as T[]
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error)
    throw new Error(`Failed to query documents: ${error}`)
  }
}

// User-specific queries
export const getUserDeposits = async (userId: string, limitCount = 50) => {
  return queryDocuments(COLLECTIONS.DEPOSITS, [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  ])
}

export const getPublicDeposits = async (limitCount = 20) => {
  return queryDocuments(COLLECTIONS.DEPOSITS, [
    where('isPublic', '==', true),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  ])
}

export const getUserHeartBankData = async (userId: string) => {
  return getDocument(COLLECTIONS.HEARTBANK, userId)
}

export const getTodaysExercise = async () => {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  return getDocument(COLLECTIONS.EXERCISES, today)
}

// Deposit utilities
export const calculateDepositValue = (content: string, category: string): number => {
  const baseValue = Math.min(content.length / 10, 50) // Max 50 points for length
  const categoryMultiplier = {
    'gratitude': 1.0,
    'courage': 1.2,
    'honesty': 1.3,
    'success': 1.0,
    'self-compassion': 1.1
  }[category] || 1.0
  
  return Math.round(baseValue * categoryMultiplier)
}

export const calculateCompoundInterest = (
  baseValue: number,
  interestRate: number,
  daysSinceDeposit: number
): number => {
  const dailyRate = interestRate / 365
  return baseValue * Math.pow(1 + dailyRate, daysSinceDeposit)
}

export const getFibonacciStreakLevel = (streak: number): number => {
  const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
  let level = 0
  
  for (let i = 0; i < fibonacci.length; i++) {
    if (streak >= fibonacci[i]) {
      level = i + 1
    } else {
      break
    }
  }
  
  return level
}

export const getStreakInterestRate = (streakLevel: number): number => {
  // Base rate of 5%, increasing by 1% per Fibonacci level
  return 0.05 + (streakLevel * 0.01)
}

// Date utilities
export const getIsraeliDate = (): string => {
  const israeliTime = new Date().toLocaleString('en-CA', {
    timeZone: 'Asia/Jerusalem',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  return israeliTime.split(',')[0] // YYYY-MM-DD format
}

export const getIsraeliTime = (): string => {
  return new Date().toLocaleString('he-IL', {
    timeZone: 'Asia/Jerusalem',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

// Validation utilities
export const validateDeposit = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!content || content.trim().length === 0) {
    errors.push('Deposit content cannot be empty')
  }
  
  if (content.length < 20) {
    errors.push('Deposit must be at least 20 characters long')
  }
  
  if (content.length > 500) {
    errors.push('Deposit cannot exceed 500 characters')
  }
  
  const wordCount = content.split(/\s+/).length
  if (wordCount < 5) {
    errors.push('Deposit must contain at least 5 words')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateComment = (content: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!content || content.trim().length === 0) {
    errors.push('Comment cannot be empty')
  }
  
  const wordCount = content.split(/\s+/).length
  if (wordCount > 50) {
    errors.push('Comments are limited to 50 words for focused witness responses')
  }
  
  if (content.length > 250) {
    errors.push('Comment is too long')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Crisis detection utilities
export const detectCrisisKeywords = (content: string, language: 'en' | 'he'): boolean => {
  const crisisKeywords = {
    en: [
      'want to die', 'kill myself', 'end it all', 'no point', 'give up',
      'worthless', 'hopeless', 'can\'t go on', 'too much pain', 'suicide'
    ],
    he: [
      'רוצה למות', 'להתאבד', 'לסיים הכל', 'אין טעם', 'לוותר',
      'חסר ערך', 'חסר תקווה', 'לא יכול להמשיך', 'יותר מדי כאב', 'התאבדות'
    ]
  }
  
  const keywords = crisisKeywords[language] || crisisKeywords.en
  const lowerContent = content.toLowerCase()
  
  return keywords.some(keyword => lowerContent.includes(keyword.toLowerCase()))
}

// Therapeutic utilities
export const getSeasonalAdaptation = (exerciseId: string, season?: string) => {
  // This would be expanded with actual seasonal adaptations
  const seasonalMessages = {
    winter: {
      en: "In winter, your nervous system needs extra gentleness...",
      he: "בחורף, המערכת העצבים שלך צריכה עדינות נוספת..."
    },
    spring: {
      en: "Spring awakens new possibilities in your nervous system...",
      he: "האביב מעיר אפשרויות חדשות במערכת העצבים שלך..."
    }
  }
  
  return seasonalMessages[season as keyof typeof seasonalMessages]
}

// Export all utilities
export {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'