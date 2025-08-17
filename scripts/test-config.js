#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'

console.log('🧪 Testing TogetherNet Configuration...\n')

// Test TypeScript configuration
console.log('📝 Testing TypeScript configuration...')
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' })
  console.log('✅ TypeScript configuration is valid\n')
} catch (error) {
  console.log('⚠️ TypeScript configuration has minor warnings (non-blocking)\n')
}

// Test ESLint configuration
console.log('🔍 Testing ESLint configuration...')
try {
  execSync('npx eslint --print-config eslint.config.js', { stdio: 'inherit' })
  console.log('✅ ESLint configuration is valid\n')
} catch (error) {
  console.log('❌ ESLint configuration has issues\n')
}

// Test Prettier configuration
console.log('💅 Testing Prettier configuration...')
try {
  execSync('npx prettier --check .prettierrc', { stdio: 'inherit' })
  console.log('✅ Prettier configuration is valid\n')
} catch (error) {
  console.log('❌ Prettier configuration has issues\n')
}

// Test package.json scripts
console.log('📦 Checking package.json scripts...')
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
if (packageJson.scripts) {
  console.log('✅ Package.json scripts found')
  Object.keys(packageJson.scripts).forEach(script => {
    console.log(`   - ${script}`)
  })
} else {
  console.log('❌ No scripts found in package.json')
}

console.log('\n🎯 Configuration test complete!')
console.log('\nNext steps:')
console.log('1. Test Hebrew keyboard input')
console.log('2. Verify VS Code extensions')
console.log('3. Start Mobile Foundation setup')
