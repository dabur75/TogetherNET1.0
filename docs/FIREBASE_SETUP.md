# Firebase Setup Guide - TogetherNet

## Project Overview
**Project ID**: `togethernet-israel-poc`  
**Project Name**: TogetherNet-Israel-POC  
**Project Number**: 804554421133

## Services Configured

### ✅ Firestore Database
- **Rules**: `firestore.rules` - User data protection
- **Indexes**: `firestore.indexes.json` - Query optimization
- **Port**: 8080 (emulator)

### ✅ Cloud Functions
- **Runtime**: Node.js 18
- **Source**: `functions/` directory
- **Port**: 5001 (emulator)
- **Genkit**: AI-powered functions enabled

### ✅ Authentication
- **Methods**: Anonymous + Email
- **Port**: 9099 (emulator)

### ✅ Storage
- **Rules**: `storage.rules` - File access control
- **Port**: 9199 (emulator)

### ✅ Hosting
- **Public**: `packages/web/dist`
- **Port**: 5000 (emulator)

### ✅ Data Connect
- **Purpose**: Database connectivity
- **SDK**: Generated JavaScript/TypeScript

## Configuration Files

### `firebase.json`
Main Firebase configuration with all services and emulator ports.

### `.firebaserc`
Project association file.

### `firestore.rules`
Database security rules protecting user data.

### `storage.rules`
File storage security rules.

### `config/firebase.config.example.js`
Environment configuration template.

## Getting Started

### 1. Environment Setup
Copy `config/firebase.config.example.js` to `config/firebase.config.js` and fill in your Firebase values.

### 2. Start Emulators
```bash
# Start all emulators
firebase emulators:start

# Start specific services
firebase emulators:start --only firestore,functions
```

### 3. Access Emulator UI
- **Emulator UI**: http://localhost:4000
- **Firestore**: http://localhost:8080
- **Functions**: http://localhost:5001
- **Auth**: http://localhost:9099
- **Storage**: http://localhost:9199

### 4. Deploy to Production
```bash
# Deploy all services
firebase deploy

# Deploy specific service
firebase deploy --only firestore
firebase deploy --only functions
firebase deploy --only hosting
```

## Security Rules

### Firestore Rules
- Users can only read/write their own data
- Public content is readable by all
- Crisis data is highly protected

### Storage Rules
- User files are private by default
- Public creative content is readable by all
- Crisis files are user-protected

## Development Workflow

### Local Development
1. Start emulators: `firebase emulators:start`
2. Use shared Firebase config from `packages/shared/src/firebase/init.ts`
3. Test with emulator data

### Testing
1. Use emulator suite for isolated testing
2. Test security rules with emulator
3. Verify Hebrew RTL support

### Production Deployment
1. Update environment variables
2. Deploy security rules first
3. Deploy functions and hosting
4. Verify production configuration

## Troubleshooting

### Common Issues
- **Port conflicts**: Check if ports are already in use
- **Authentication**: Ensure Firebase project is properly configured
- **Rules**: Verify security rules syntax

### Getting Help
- Firebase Console: https://console.firebase.google.com/project/togethernet-israel-poc
- Firebase Docs: https://firebase.google.com/docs
- Project Issues: Check TASKS.md for known problems

## Next Steps

1. **Complete Firebase Setup**: Get API keys from console
2. **Test Emulators**: Verify all services work locally
3. **Mobile Setup**: Initialize Expo project with Firebase
4. **Web Setup**: Configure React app with Firebase
5. **Banker Service**: Implement AI responses in Cloud Functions

---

*Last Updated: January 2025*  
*Next Review: After mobile foundation setup*
