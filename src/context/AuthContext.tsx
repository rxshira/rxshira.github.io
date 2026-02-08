import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  isAdmin: boolean;
  authError: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Persistence: Check if already logged in
  useEffect(() => {
    const savedSession = localStorage.getItem('admin_session');
    if (savedSession === 'active') {
      setUser({ username: 'admin' });
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const targetUser = (import.meta as any).env?.VITE_ADMIN_USERNAME || 'admin';
    const targetPass = (import.meta as any).env?.VITE_ADMIN_PASSWORD;

    if (!targetPass) {
      console.error("Admin password not found in VITE_ADMIN_PASSWORD");
      setAuthError("Configuration error: Login disabled.");
      return false;
    }

    if (username === targetUser && password === targetPass) {
      setUser({ username });
      setIsAdmin(true);
      setAuthError(null);
      localStorage.setItem('admin_session', 'active');
      return true;
    } else {
      setAuthError("Invalid username or password.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('admin_session');
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