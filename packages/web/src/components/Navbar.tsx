import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import { useLanguage } from '../hooks/useLanguage'

const navbarStyles = css`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  
  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--color-warm-black);
    font-weight: 600;
    font-size: 1.25rem;
    
    .logo-icon {
      font-size: 1.5rem;
    }
    
    .logo-text {
      font-family: var(--font-banker);
      color: var(--color-gold);
    }
    
    &:hover {
      text-decoration: none;
      .logo-text {
        color: var(--color-turquoise);
      }
    }
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
    
    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      justify-content: center;
      gap: 3rem;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 1000;
      
      &.mobile-open {
        transform: translateX(0);
      }
      
      &.rtl {
        transform: translateX(100%);
        
        &.mobile-open {
          transform: translateX(0);
        }
      }
    }
  }
  
  .nav-link {
    text-decoration: none;
    color: var(--color-warm-black);
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      color: var(--color-gold);
      background: rgba(255, 215, 0, 0.1);
      text-decoration: none;
    }
    
    &.active {
      color: var(--color-gold);
      background: rgba(255, 215, 0, 0.15);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        background: var(--color-gold);
        border-radius: 1px;
      }
    }
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .language-toggle {
    background: none;
    border: 2px solid var(--color-turquoise);
    color: var(--color-turquoise);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--color-turquoise);
      color: white;
      transform: translateY(-2px);
    }
    
    &:focus {
      outline: 2px solid var(--color-turquoise);
      outline-offset: 2px;
    }
  }
  
  .mobile-menu-button {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-warm-black);
    padding: 0.5rem;
    
    @media (max-width: 768px) {
      display: block;
    }
  }
  
  .mobile-close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-warm-black);
    
    &.rtl {
      right: auto;
      left: 1rem;
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    .nav-container {
      direction: rtl;
    }
    
    .nav-logo {
      flex-direction: row-reverse;
    }
    
    .nav-actions {
      flex-direction: row-reverse;
    }
  }
`

export const Navbar: React.FC = () => {
  const { t, language, toggleLanguage, isRTL } = useLanguage()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { path: '/heartbank', key: 'heartbank' },
    { path: '/studio', key: 'studio' },
    { path: '/gallery', key: 'gallery' },
    { path: '/treasury', key: 'treasury' },
  ]
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path)
  }
  
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }
  
  return (
    <nav css={navbarStyles} className={isRTL ? 'rtl' : ''}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={handleLinkClick}>
          <span className="logo-icon">🏦</span>
          <span className="logo-text">
            {language === 'he' ? t('common.appName') : 'TogetherNet'}
          </span>
        </Link>
        
        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''} ${isRTL ? 'rtl' : ''}`}>
          {mobileMenuOpen && (
            <button 
              className={`mobile-close-button ${isRTL ? 'rtl' : ''}`}
              onClick={handleMobileMenuToggle}
              aria-label={t('accessibility.close')}
            >
              ×
            </button>
          )}
          
          {navItems.map(({ path, key }) => (
            <li key={key}>
              <Link
                to={path}
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                {t(`navigation.${key}`)}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Actions */}
        <div className="nav-actions">
          {/* Language Toggle */}
          <button
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label={t('accessibility.languageSwitch')}
          >
            {language === 'en' ? 'עב' : 'EN'}
          </button>
          
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={handleMobileMenuToggle}
            aria-label={t('accessibility.menu')}
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          `}
          onClick={handleMobileMenuToggle}
        />
      )}
    </nav>
  )
}