import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/auth/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, verify the token here using an API call like /api/auth/me
    // We do NOT store tokens in UI state/localStorage directly if we can use httpOnly cookies.
    // For this mock, we just resolve immediately.
    const mockCheckAuth = async () => {
      setIsLoading(false);
    };
    mockCheckAuth();
  }, []);

  const login = (userData: User, token: string) => {
    // Note: Do not store token in localStorage in production unless necessary. Prefer httpOnly cookies.
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Remove token/cookie logic here
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
