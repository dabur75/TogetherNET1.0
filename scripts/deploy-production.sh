#!/bin/bash
# Deploy TogetherNet PWA to Production Environment

set -e

echo "🚀 Deploying TogetherNet to PRODUCTION..."
echo "⚠️  This will deploy to live users. Continue? (y/N)"
read -r confirmation

if [[ $confirmation != [yY] ]]; then
  echo "❌ Production deployment cancelled"
  exit 1
fi

# Switch to production project
firebase use production

# Copy production environment variables
cp .env.production .env

# Build the web project with production configuration
echo "📦 Building for production..."
cd packages/web
npm run build

# Run production checks
echo "🔍 Running production checks..."
npm run lint
npm run type-check

cd ../..

# Deploy to Firebase hosting and functions
echo "🌐 Deploying to Firebase..."
firebase deploy --only hosting,functions

echo "✅ PRODUCTION deployment complete!"
echo "🌐 URL: https://togethernet.app"
echo ""
echo "📱 Mobile PWA Features:"
echo "• Installable on iOS/Android home screen"
echo "• Offline functionality enabled"
echo "• Push notifications for gentle reminders"
echo "• Hebrew RTL support optimized"
echo ""
echo "🏦 HeartBank Core Ready:"
echo "• Daily exercises at 6 AM Israel time"
echo "• Banker therapeutic responses"
echo "• Deposit system with privacy controls"
echo "• Streak & wealth visualization"