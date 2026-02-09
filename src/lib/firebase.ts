import { initializeApp, FirebaseApp, getApp, getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Using 'as any' to bypass TypeScript's strict check on import.meta.env 
// which is causing the build to fail.
const meta = import.meta as any;

const firebaseConfig = {
  apiKey: meta.env?.VITE_FIREBASE_API_KEY,
  authDomain: meta.env?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: meta.env?.VITE_FIREBASE_PROJECT_ID,
  storageBucket: meta.env?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: meta.env?.VITE_FIREBASE_APP_ID
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
    hasApiKey: !!firebaseConfig.apiKey,
    hasProjectId: !!firebaseConfig.projectId,
    hasAppId: !!firebaseConfig.appId,
    env: (import.meta as any).env ? "Defined" : "Undefined"
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
