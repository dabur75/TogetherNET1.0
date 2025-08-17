import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'מרושתים - TogetherNet | Healing Hearts',
        short_name: 'מרושתים',
        description: 'מרושתים - פלטפורמת טיפול מהפכנית הבונה מחדש ערך עצמי דרך הפקדות יומיות | Revolutionary therapeutic platform that rebuilds self-worth through daily emotional deposits',
        theme_color: '#FFD700',
        background_color: '#FAFAFA',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    proxy: {
      // Firebase emulator proxy
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@emotion/react', '@emotion/styled', 'framer-motion'],
          three: ['three', '@react-three/fiber'],
        },
      },
    },
  },
  define: {
    // Ensure proper environment variables for therapeutic platform
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
})