import { apiClient } from '../api/client';
import { User } from './authService';

let demoProfile: User = {
  id: 'demo-user-1',
  email: 'demo@lawlink.app',
  name: 'Demo User',
  role: 'Advocate'
};

export const profileService = {
  getProfile: async (): Promise<User> => {
    try {
      const response = await apiClient.get('/api/profile');
      return response.data;
    } catch (error) {
      console.warn("API getProfile failed, falling back to demo mode", error);
      return demoProfile;
    }
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.put('/api/profile', data);
      return response.data;
    } catch (error) {
      console.warn("API updateProfile failed, falling back to demo mode", error);
      demoProfile = { ...demoProfile, ...data };
      return demoProfile;
    }
  }
};
