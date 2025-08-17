import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { DepositCategory, DepositInput, DepositFormState, depositCategories, getCategory, validateDeposit, calculateDepositValue } from '../../../shared/types/Deposit'

const depositFormStyles = css`
  /* Mobile-first deposit form */
  .deposit-form {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid rgba(255, 215, 0, 0.2);
    box-shadow: var(--shadow-gentle);
    transition: all 0.3s ease;
    
    &.focused {
      border-color: var(--color-gold);
      box-shadow: var(--shadow-banker);
    }
    
    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
  
  /* Form header */
  .form-header {
    margin-bottom: 1.5rem;
    text-align: center;
    
    .form-title {
      font-size: 1.25rem;
      color: var(--color-gold);
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-family: var(--font-banker);
      
      @media (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
    
    .form-subtitle {
      font-size: 0.9rem;
      color: var(--color-warm-black);
      opacity: 0.7;
      line-height: 1.4;
    }
  }
  
  /* Category selector - mobile swipe-friendly */
  .category-selector {
    margin-bottom: 1.5rem;
    
    .category-label {
      font-size: 0.9rem;
      color: var(--color-warm-black);
      margin-bottom: 0.75rem;
      font-weight: 500;
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      
      @media (min-width: 480px) {
        grid-template-columns: repeat(3, 1fr);
      }
      
      @media (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    
    .category-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0.5rem;
      border: 2px solid transparent;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.3s ease;
      touch-action: manipulation;
      position: relative;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-gentle);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      &.selected {
        border-color: var(--category-color);
        background: rgba(var(--category-color-rgb), 0.1);
        transform: scale(1.05);
      }
      
      .category-icon {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        
        @media (min-width: 768px) {
          font-size: 1.75rem;
        }
      }
      
      .category-name {
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
        line-height: 1.2;
        
        @media (min-width: 768px) {
          font-size: 0.9rem;
        }
      }
      
      /* Ripple effect for mobile touch */
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
      }
    }
  }
  
  /* Main text area - mobile optimized */
  .deposit-input-area {
    margin-bottom: 1.5rem;
    position: relative;
    
    .input-label {
      font-size: 0.9rem;
      color: var(--color-warm-black);
      margin-bottom: 0.75rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .linked-exercise-indicator {
        background: var(--color-turquoise);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        font-size: 0.7rem;
        font-weight: 600;
      }
    }
    
    .deposit-textarea {
      width: 100%;
      min-height: 120px;
      padding: 1rem;
      border: 2px solid rgba(255, 215, 0, 0.3);
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.6;
      resize: vertical;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.9);
      
      /* Mobile optimizations */
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      
      @media (min-width: 768px) {
        min-height: 150px;
        font-size: 1.1rem;
      }
      
      &:focus {
        outline: none;
        border-color: var(--color-gold);
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
        background: white;
        min-height: 160px;
        
        @media (min-width: 768px) {
          min-height: 200px;
        }
      }
      
      &::placeholder {
        color: var(--color-warm-black);
        opacity: 0.5;
        font-style: italic;
      }
      
      /* Hebrew RTL support */
      &[dir="rtl"] {
        text-align: right;
      }
    }
    
    /* Character counter overlay */
    .input-overlay {
      position: absolute;
      bottom: 0.75rem;
      right: 1rem;
      background: rgba(255, 255, 255, 0.9);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      color: var(--color-warm-black);
      opacity: 0.7;
      pointer-events: none;
      
      &.rtl {
        right: auto;
        left: 1rem;
      }
      
      &.warning {
        color: var(--color-crisis);
        opacity: 1;
      }
      
      &.error {
        color: #f44336;
        opacity: 1;
      }
    }
  }
  
  /* Privacy toggle - mobile friendly */
  .privacy-toggle {
    margin-bottom: 1.5rem;
    
    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: rgba(64, 224, 208, 0.05);
      border-radius: 0.75rem;
      border: 1px solid rgba(64, 224, 208, 0.2);
      
      .toggle-info {
        flex: 1;
        margin-right: 1rem;
        
        &.rtl {
          margin-right: 0;
          margin-left: 1rem;
        }
        
        .toggle-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-warm-black);
          margin-bottom: 0.25rem;
        }
        
        .toggle-description {
          font-size: 0.8rem;
          color: var(--color-warm-black);
          opacity: 0.7;
          line-height: 1.3;
        }
      }
      
      .toggle-switch {
        position: relative;
        width: 50px;
        height: 28px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        touch-action: manipulation;
        
        &.active {
          background: var(--color-turquoise);
        }
        
        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          
          &.active {
            transform: translateX(22px);
          }
        }
      }
    }
  }
  
  /* Form footer with stats and actions */
  .form-footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    
    .deposit-stats {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: var(--color-warm-black);
      opacity: 0.7;
      
      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        
        .stat-icon {
          font-size: 0.9rem;
        }
        
        &.value-preview {
          color: var(--color-gold);
          opacity: 1;
          font-weight: 600;
        }
      }
    }
    
    .form-actions {
      display: flex;
      gap: 0.75rem;
      
      .action-button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        touch-action: manipulation;
        font-size: 0.9rem;
        
        &:hover {
          transform: translateY(-2px);
        }
        
        &:active {
          transform: translateY(0);
        }
        
        &.primary {
          background: var(--color-gold);
          color: var(--color-warm-black);
          
          &:hover {
            background: var(--color-turquoise);
            color: white;
          }
          
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }
        }
        
        &.secondary {
          background: transparent;
          color: var(--color-warm-black);
          border: 2px solid rgba(0, 0, 0, 0.2);
          
          &:hover {
            border-color: var(--color-turquoise);
            color: var(--color-turquoise);
          }
        }
      }
    }
  }
  
  /* Validation errors */
  .validation-errors {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(244, 67, 54, 0.1);
    border: 1px solid rgba(244, 67, 54, 0.3);
    border-radius: 0.5rem;
    
    .error-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #f44336;
      margin-bottom: 0.5rem;
    }
    
    .error-list {
      list-style: none;
      margin: 0;
      padding: 0;
      
      .error-item {
        font-size: 0.8rem;
        color: #f44336;
        margin-bottom: 0.25rem;
        
        &:before {
          content: '• ';
          margin-right: 0.25rem;
        }
      }
    }
  }
  
  /* Animations */
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .gentle-fade-in {
    animation: gentle-fade-in 0.6s ease-out;
  }
  
  @keyframes gentle-fade-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

interface DepositFormProps {
  linkedExercise?: {
    id: string
    category: DepositCategory
    prompt: string
  }
  onSubmit: (deposit: DepositInput) => Promise<void>
  onSaveDraft?: (content: string, category?: DepositCategory) => void
  className?: string
}

export const DepositForm: React.FC<DepositFormProps> = ({
  linkedExercise,
  onSubmit,
  onSaveDraft,
  className = ''
}) => {
  const { t, isRTL, language } = useLanguage()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const [formState, setFormState] = useState<DepositFormState>({
    content: '',
    selectedCategory: linkedExercise?.category || null,
    isPublic: false,
    wordCount: 0,
    characterCount: 0,
    isValid: false,
    validationErrors: [],
    isExpanded: false,
    showCategoryPicker: !linkedExercise,
    showPrivacyTooltip: false,
    keyboardHeight: 0,
    lastSaved: null,
    autoSaveEnabled: true,
    recoveredFromDraft: false,
    isSubmitting: false,
    submitError: null,
    submitSuccess: false
  })
  
  // Update word count and validation
  useEffect(() => {
    const words = formState.content.trim().split(/\s+/).filter(word => word.length > 0)
    const validation = validateDeposit({
      content: formState.content,
      category: formState.selectedCategory!,
      isPublic: formState.isPublic,
      language
    })
    
    setFormState(prev => ({
      ...prev,
      wordCount: words.length,
      characterCount: formState.content.length,
      isValid: validation.isValid,
      validationErrors: validation.errors
    }))
  }, [formState.content, formState.selectedCategory, language])
  
  // Auto-save draft
  useEffect(() => {
    if (formState.autoSaveEnabled && formState.content.length > 10 && onSaveDraft) {
      const timeoutId = setTimeout(() => {
        onSaveDraft(formState.content, formState.selectedCategory || undefined)
        setFormState(prev => ({ ...prev, lastSaved: new Date() }))
      }, 2000)
      
      return () => clearTimeout(timeoutId)
    }
  }, [formState.content, formState.selectedCategory, formState.autoSaveEnabled, onSaveDraft])
  
  const handleCategorySelect = (category: DepositCategory) => {
    setFormState(prev => ({ ...prev, selectedCategory: category }))
    
    // Add haptic feedback on mobile
    if ('vibrate' in navigator) {
      const categoryConfig = getCategory(category)
      navigator.vibrate(categoryConfig.mobileOptimized.vibrationPattern)
    }
  }
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prev => ({ 
      ...prev, 
      content: e.target.value,
      isExpanded: e.target.value.length > 50
    }))
  }
  
  const handlePrivacyToggle = () => {
    setFormState(prev => ({ ...prev, isPublic: !prev.isPublic }))
  }
  
  const handleSubmit = async () => {
    if (!formState.isValid || !formState.selectedCategory) return
    
    setFormState(prev => ({ ...prev, isSubmitting: true, submitError: null }))
    
    try {
      await onSubmit({
        content: formState.content,
        category: formState.selectedCategory,
        isPublic: formState.isPublic,
        linkedExercise: linkedExercise?.id,
        language
      })
      
      setFormState(prev => ({ 
        ...prev, 
        submitSuccess: true,
        isSubmitting: false,
        content: '',
        selectedCategory: linkedExercise?.category || null
      }))
      
      // Focus back to textarea for next deposit
      setTimeout(() => {
        textareaRef.current?.focus()
        setFormState(prev => ({ ...prev, submitSuccess: false }))
      }, 2000)
      
    } catch (error) {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        submitError: error instanceof Error ? error.message : 'Something went wrong'
      }))
    }
  }
  
  const estimatedValue = calculateDepositValue(formState.content)
  const selectedCategoryConfig = formState.selectedCategory ? getCategory(formState.selectedCategory) : null
  
  return (
    <motion.div 
      css={depositFormStyles}
      className={`deposit-form ${formState.isExpanded ? 'focused' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Form Header */}
      <div className="form-header">
        <h2 className="form-title">
          {linkedExercise ? t('heartbank.exerciseDeposit') : t('heartbank.makeDeposit')}
        </h2>
        <p className="form-subtitle">
          {language === 'he' 
            ? 'שתף מה יש לך בלב היום...'
            : 'Share what\'s in your heart today...'
          }
        </p>
      </div>
      
      {/* Category Selector */}
      <AnimatePresence>
        {formState.showCategoryPicker && (
          <motion.div 
            className="category-selector"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="category-label">
              {language === 'he' ? 'בחר קטגוריה:' : 'Choose a category:'}
            </div>
            <div className="category-grid">
              {depositCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`category-button ${formState.selectedCategory === category.id ? 'selected' : ''}`}
                  style={{
                    '--category-color': category.color,
                    '--category-color-rgb': category.color.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(',') || '0,0,0'
                  } as React.CSSProperties}
                  onClick={() => handleCategorySelect(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">
                    {category.name[language]}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Input Area */}
      <div className="deposit-input-area">
        <div className="input-label">
          {language === 'he' ? 'ההפקדה שלך:' : 'Your deposit:'}
          {linkedExercise && (
            <span className="linked-exercise-indicator">
              {language === 'he' ? 'תרגיל יומי' : 'Daily Exercise'}
            </span>
          )}
        </div>
        
        <textarea
          ref={textareaRef}
          className="deposit-textarea"
          value={formState.content}
          onChange={handleContentChange}
          placeholder={
            selectedCategoryConfig
              ? selectedCategoryConfig.samplePrompts[0][language]
              : (language === 'he' 
                  ? 'כתוב כאן את ההפקדה שלך לבנק אהב...'
                  : 'Write your HeartBank deposit here...'
                )
          }
          dir={isRTL ? 'rtl' : 'ltr'}
          maxLength={2000}
        />
        
        <div className={`input-overlay ${isRTL ? 'rtl' : ''} ${formState.characterCount > 1800 ? 'warning' : ''} ${formState.characterCount > 2000 ? 'error' : ''}`}>
          {formState.wordCount} {language === 'he' ? 'מילים' : 'words'}
          {formState.wordCount < 5 && (
            <span style={{ marginLeft: '0.5rem', color: 'var(--color-turquoise)' }}>
              {language === 'he' 
                ? `(מינימום 5 מילים)`
                : `(minimum 5 words)`
              }
            </span>
          )}
        </div>
      </div>
      
      {/* Privacy Toggle */}
      <div className="privacy-toggle">
        <div className="toggle-container">
          <div className={`toggle-info ${isRTL ? 'rtl' : ''}`}>
            <div className="toggle-label">
              {formState.isPublic 
                ? (language === 'he' ? 'הפקדה ציבורית' : 'Public Deposit')
                : (language === 'he' ? 'הפקדה פרטית' : 'Private Deposit')
              }
            </div>
            <div className="toggle-description">
              {formState.isPublic
                ? (language === 'he' 
                    ? 'הקהילה יכולה לראות ולהתחבר לחוויה שלך'
                    : 'Community can see and connect with your experience'
                  )
                : (language === 'he'
                    ? 'רק אתה והבנקאי יכולים לראות את זה'
                    : 'Only you and the banker can see this'
                  )
              }
            </div>
          </div>
          
          <div 
            className={`toggle-switch ${formState.isPublic ? 'active' : ''}`}
            onClick={handlePrivacyToggle}
          >
            <div className={`toggle-thumb ${formState.isPublic ? 'active' : ''}`} />
          </div>
        </div>
      </div>
      
      {/* Form Footer */}
      <div className="form-footer">
        <div className="deposit-stats">
          <div className="stat-item">
            <span className="stat-icon">📝</span>
            <span>{formState.wordCount} {language === 'he' ? 'מילים' : 'words'}</span>
          </div>
          <div className="stat-item value-preview">
            <span className="stat-icon">💰</span>
            <span>+{estimatedValue} {language === 'he' ? 'נקודות' : 'points'}</span>
          </div>
          {selectedCategoryConfig && (
            <div className="stat-item">
              <span className="stat-icon">{selectedCategoryConfig.icon}</span>
              <span>{selectedCategoryConfig.name[language]}</span>
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            className="action-button secondary"
            onClick={() => setFormState(prev => ({ ...prev, content: '', selectedCategory: linkedExercise?.category || null }))}
            disabled={formState.isSubmitting}
          >
            {language === 'he' ? 'נקה' : 'Clear'}
          </button>
          
          <motion.button 
            className="action-button primary"
            onClick={handleSubmit}
            disabled={!formState.isValid || formState.isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {formState.isSubmitting 
              ? (language === 'he' ? 'מפקיד...' : 'Depositing...')
              : (language === 'he' ? 'הפקד ללב' : 'Deposit to Heart')
            }
          </motion.button>
        </div>
      </div>
      
      {/* Validation Errors */}
      <AnimatePresence>
        {formState.validationErrors.length > 0 && (
          <motion.div 
            className="validation-errors"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="error-title">
              {language === 'he' ? 'נא לתקן:' : 'Please fix:'}
            </div>
            <ul className="error-list">
              {formState.validationErrors.map((error, index) => (
                <li key={index} className="error-item">{error}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Success Message */}
      <AnimatePresence>
        {formState.submitSuccess && (
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              borderRadius: '0.5rem',
              textAlign: 'center',
              color: '#4CAF50',
              fontWeight: 600
            }}
          >
            {language === 'he' ? '✨ ההפקדה נוספה בהצלחה לבנק אהב!' : '✨ Deposit successfully added to HeartBank!'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default DepositForm