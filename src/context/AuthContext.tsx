import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  authError: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Load allowed emails from environment variables safely
const getAllowedEmails = (): string[] => {
  try {
    const envEmails = (import.meta as any).env?.VITE_ALLOWED_EMAILS;
    if (envEmails) {
      return envEmails.split(',').map((email: string) => email.trim());
    }
  } catch (e) {
    console.warn("AuthContext: Could not access import.meta.env");
  }
  // Default fallback
  return ['shiraxrubin@gmail.com', 'shirar@andrew.cmu.edu'];
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const allowedEmails = getAllowedEmails();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (allowedEmails.includes(currentUser.email || '')) {
          setUser(currentUser);
          setIsAdmin(true);
          setAuthError(null);
        } else {
          setUser(null);
          setIsAdmin(false);
          setAuthError('Not authorized. Please go back to the main website.');
          signOut(auth);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error("Error signing in with Google", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError('Sign in failed. Please try again.');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      setAuthError(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const clearError = () => setAuthError(null);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, authError, login, logout, clearError }}>
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
