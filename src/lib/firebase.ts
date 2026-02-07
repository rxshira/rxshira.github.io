import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || "placeholder",
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || "placeholder",
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || "placeholder",
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || "placeholder",
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "placeholder",
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || "placeholder"
};

let app: FirebaseApp;
let auth: Auth;
const googleProvider = new GoogleAuthProvider();

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization failed. Using mock/local mode.", error);
  // We provide a minimal mock auth object if Firebase fails to initialize
  // to prevent the entire application from crashing.
  auth = {
    onAuthStateChanged: () => () => {},
    signOut: async () => {},
  } as any;
}

export { auth, googleProvider };