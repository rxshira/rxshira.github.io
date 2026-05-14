import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isConfigValid } from '../lib/firebase';
import { CarpoolUser } from '../carpool/types';

interface AuthContextType {
  user: FirebaseUser | any | null;
  carpoolUser: CarpoolUser | null;
  loading: boolean;
  isAdmin: boolean;
  authError: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (email: string, pass: string) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshCarpoolUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [carpoolUser, setCarpoolUser] = useState<CarpoolUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const fetchCarpoolUser = async (uid: string) => {
    if (!isConfigValid) return null;
    try {
      const userDoc = await getDoc(doc(db, 'carpool_users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as CarpoolUser;
      }
    } catch (error) {
      console.error("Error fetching carpool user:", error);
    }
    return null;
  };

  const checkAdminStatus = (email: string | null) => {
    if (!email) return false;
    const allowedEmails = (import.meta.env.VITE_ALLOWED_EMAILS || '').split(',').map((e: string) => e.trim().toLowerCase());
    return allowedEmails.includes(email.toLowerCase());
  };

  const ensureCarpoolUserExists = async (firebaseUser: FirebaseUser) => {
    const userRef = doc(db, 'carpool_users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      const newUser: Partial<CarpoolUser> = {
        id: firebaseUser.uid,
        full_name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        access_status: 'pending',
        is_admin: checkAdminStatus(firebaseUser.email),
        created_at: serverTimestamp(),
      };
      await setDoc(userRef, newUser);
      setCarpoolUser(newUser as CarpoolUser);
    } else {
      setCarpoolUser(userSnap.data() as CarpoolUser);
    }
    setIsAdmin(checkAdminStatus(firebaseUser.email) || userSnap.data()?.is_admin || isAdmin);
  };

  useEffect(() => {
    // 1. Check legacy session (Preserving existing logic)
    const savedSession = localStorage.getItem('admin_session');
    if (savedSession === 'active' && !user) {
      setUser({ username: 'admin', email: import.meta.env.VITE_ADMIN_USERNAME || 'admin' });
      setIsAdmin(true);
    }

    // 2. Listen to Firebase Auth
    if (isConfigValid) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          const cUser = await fetchCarpoolUser(firebaseUser.uid);
          setCarpoolUser(cUser);
          
          const isEmailAdmin = checkAdminStatus(firebaseUser.email);
          setIsAdmin(isEmailAdmin || (cUser?.is_admin ?? false));
        } else {
          if (localStorage.getItem('admin_session') !== 'active') {
            setUser(null);
            setCarpoolUser(null);
            setIsAdmin(false);
          }
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (!isConfigValid) {
      setAuthError("Firebase is not configured.");
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await ensureCarpoolUserExists(result.user);
      setUser(result.user);
    } catch (error: any) {
      console.error("Google login failed:", error);
      setAuthError(error.message);
    }
  };

  const signup = async (email: string, pass: string) => {
    if (!isConfigValid) return;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      await ensureCarpoolUserExists(result.user);
      setUser(result.user);
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!isConfigValid) return;
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const cUser = await fetchCarpoolUser(result.user.uid);
      setCarpoolUser(cUser);
      setUser(result.user);
      setIsAdmin(checkAdminStatus(result.user.email) || cUser?.is_admin || false);
    } catch (error: any) {
      setAuthError(error.message);
      throw error;
    }
  };

  const login = async (username: string, password: string) => {
    const targetUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const targetPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!targetPass) {
      setAuthError("Configuration error: Login disabled.");
      return false;
    }

    if (username === targetUser && password === targetPass) {
      const adminUser = { username, email: username };
      setUser(adminUser);
      setIsAdmin(true);
      setAuthError(null);
      localStorage.setItem('admin_session', 'active');
      return true;
    } else {
      setAuthError("Invalid username or password.");
      return false;
    }
  };

  const logout = async () => {
    if (isConfigValid) {
      await signOut(auth);
    }
    setUser(null);
    setCarpoolUser(null);
    setIsAdmin(false);
    localStorage.removeItem('admin_session');
    localStorage.removeItem('testing_session');
  };

  const refreshCarpoolUser = async () => {
    if (user?.uid) {
      const cUser = await fetchCarpoolUser(user.uid);
      setCarpoolUser(cUser);
    }
  };

  const clearError = () => setAuthError(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      carpoolUser, 
      loading, 
      isAdmin, 
      authError, 
      login, 
      signup,
      loginWithEmail,
      loginWithGoogle, 
      logout, 
      clearError,
      refreshCarpoolUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
