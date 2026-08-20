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

export const authService = {
  login: async (email: string, password: string):Promise<{user: User, token: string}> => {
    const response = await apiClient.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    return { user, token };
  },

  register: async (name: string, email: string, password: string):Promise<{user: User, token: string}> => {
    const response = await apiClient.post('/api/auth/register', { name, email, password });
    const { token, user } = response.data;
    localStorage.setItem('auth_token', token);
    return { user, token };
  },

  forgotPassword: async (email: string):Promise<void> => {
    await apiClient.post('/api/auth/forgot-password', { email });
  },

  resetPassword: async (password: string):Promise<void> => {
    await apiClient.post('/api/auth/reset-password', { password });
  }
};
