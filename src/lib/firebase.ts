import { initializeApp, FirebaseApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID,
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
const googleProvider = new GoogleAuthProvider();

// Validation: Check if we have at least the API Key and Project ID
const isConfigValid = firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.apiKey !== "placeholder";

try {
  if (isConfigValid) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully.");
  } else {
    throw new Error("Missing or placeholder Firebase configuration.");
  }
} catch (error) {
  console.warn("Firebase initialization failed. Site is running in read-only local mode.", error);
  // Fallback objects to prevent app crash
  auth = { onAuthStateChanged: () => () => {}, signOut: async () => {} } as any;
  db = {} as any;
}

export { auth, db, googleProvider, isConfigValid };
