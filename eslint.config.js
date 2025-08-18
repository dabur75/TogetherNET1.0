import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // Standard.js rules
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': 'off', // Use TypeScript version
      '@typescript-eslint/no-unused-vars': 'error',
      'keyword-spacing': 'error',
      'space-before-function-paren': 'error',
      eqeqeq: ['error', 'always'],
      'space-infix-ops': 'error',
      'comma-spacing': 'error',
      'brace-style': ['error', '1tbs'],

      // React specific
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',

      // TypeScript specific
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Accessibility
      'jsx-a11y/anchor-is-valid': 'off',

      // Hebrew RTL considerations
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['Text'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['packages/mobile/**/*'],
    languageOptions: {
      globals: {
        'react-native/react-native': true,
      },
    },
  },
  {
    files: ['packages/web/**/*'],
    languageOptions: {
      globals: {
        browser: true,
      },
    },
  },
]
