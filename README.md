# README
## Instructions
1. Create a new Firebase project.
2. Create a `.env.local` file, with the following contents
   ```v
   VITE_FIREBASE_API_KEY = "paste_your_firebase_project_apiKey_here"
   VITE_FIREBASE_AUTH_DOMAIN = "paste_your_firebase_project_authDomain_here"
   VITE_FIREBASE_PROJECT_ID = "paste_your_firebase_project_projectId_here"
   VITE_FIREBASE_STORAGE_BUCKET = "paste_your_firebase_project_storageBucket_here"
   VITE_FIREBASE_MESSAGING_SENDER_ID ="paste_your_firebase_project_messagingSenderId_here"
   VITE_FIREBASE_APP_ID = "paste_your_firebase_project_appId_here"
   ```
3. Run `pnpm i`, then `pnpm run dev`