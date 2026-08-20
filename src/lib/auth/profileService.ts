import { apiClient } from '../api/client';
import { User } from './authService';

export const profileService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/api/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put('/api/profile', data);
    return response.data;
  }
};
