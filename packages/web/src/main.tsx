import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import App from './App'
import { therapeuticTheme } from './styles/theme'
import './styles/globals.css'
import './i18n/config'

// Register PWA service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('PWA Service Worker registered'))
    .catch((error) => console.log('PWA Service Worker registration failed:', error))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={therapeuticTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)