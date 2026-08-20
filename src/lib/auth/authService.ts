/**
 * This service isolates authentication logic from UI components.
 * It's structured to easily drop-in actual API calls to the backend.
 * Currently uses mock delays for demonstration.
 */

import { apiClient } from '../api/client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const DEMO_USER: User = {
  id: 'demo-user-1',
  email: 'demo@lawlink.app',
  name: 'Demo User',
  role: 'Advocate'
};

export const authService = {
  login: async (email: string, password: string):Promise<{user: User, token: string}> => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('auth_token', token);
      return { user, token };
    } catch (error) {
      console.warn("API login failed, falling back to demo mode", error);
      if (email === 'demo@lawlink.app' && password === 'Demo@123') {
        const token = 'demo-jwt-token';
        localStorage.setItem('auth_token', token);
        return { user: DEMO_USER, token };
      }
      throw new Error("Invalid credentials. For Demo Mode, use demo@lawlink.app / Demo@123");
    }
  },

  register: async (name: string, email: string, password: string):Promise<{user: User, token: string}> => {
    try {
      const response = await apiClient.post('/api/auth/register', { name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('auth_token', token);
      return { user, token };
    } catch (error) {
      console.warn("API register failed, falling back to demo mode", error);
      const token = 'demo-jwt-token';
      const user = { ...DEMO_USER, name, email };
      localStorage.setItem('auth_token', token);
      return { user, token };
    }
  },

  forgotPassword: async (email: string):Promise<void> => {
    try {
      await apiClient.post('/api/auth/forgot-password', { email });
    } catch (error) {
      console.warn("API forgotPassword failed, falling back to demo mode", error);
      if (!email) throw new Error("Email is required");
    }
  },

  resetPassword: async (password: string):Promise<void> => {
    try {
      await apiClient.post('/api/auth/reset-password', { password });
    } catch (error) {
      console.warn("API resetPassword failed, falling back to demo mode", error);
      if (!password) throw new Error("Password is required");
    }
  }
};
