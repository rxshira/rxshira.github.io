import { initializeApp, FirebaseApp, getApp, getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Validation: Check if we have the critical keys
const isConfigValid = !!(firebaseConfig.apiKey && 
                        firebaseConfig.projectId && 
                        firebaseConfig.apiKey !== "placeholder" &&
                        firebaseConfig.apiKey.length > 5);

// DIAGNOSTIC LOGGING
if (!isConfigValid) {
  console.log("🔍 Configuration Diagnostic:", {
    hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
    hasProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    hasAppId: !!import.meta.env.VITE_FIREBASE_APP_ID,
    envType: typeof import.meta.env
  });
}

try {
  if (isConfigValid) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully.");
  } else {
    console.warn("⚠️ Firebase configuration is missing or invalid. Running in local mode.");
    // Fallbacks to prevent crashes
    auth = { onAuthStateChanged: () => () => {} } as any;
    db = {} as any;
  }
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
  auth = { onAuthStateChanged: () => () => {} } as any;
  db = {} as any;
}

export { auth, db, isConfigValid };
