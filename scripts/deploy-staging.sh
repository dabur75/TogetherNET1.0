#!/bin/bash
# Deploy TogetherNet PWA to Staging Environment

set -e

echo "🚀 Deploying TogetherNet to Staging..."

# Switch to staging project
firebase use staging

# Copy staging environment variables
cp .env.staging .env

# Build the web project with staging configuration
echo "📦 Building for staging..."
cd packages/web
npm run build
cd ../..

# Deploy to Firebase hosting and functions
echo "🌐 Deploying to Firebase..."
firebase deploy --only hosting,functions

echo "✅ Staging deployment complete!"
echo "🌐 URL: https://togethernet-israel-staging.web.app"
echo ""
echo "📱 Test on mobile devices:"
echo "• iOS Safari: Check PWA installation"
echo "• Android Chrome: Test offline functionality"
echo "• Push notifications: Verify gentle reminders"