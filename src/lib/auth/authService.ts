/**
 * This service isolates authentication logic from UI components.
 * It's structured to easily drop-in actual API calls to the backend.
 * Currently uses mock delays for demonstration.
 */

// Types can be extended based on actual API payload
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const mockUser: User = {
  id: '1',
  email: 'name@firm.com',
  name: 'Legal Professional',
  role: 'Administrator',
};

export const authService = {
  login: async (email: string, password: string):Promise<{user: User, token: string}> => {
    // Replace with: return axios.post('/api/auth/login', { email, password })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ user: mockUser, token: 'mock-jwt-token' });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  },

  register: async (name: string, email: string, password: string):Promise<{user: User, token: string}> => {
    // Replace with: return axios.post('/api/auth/register', { name, email, password })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          resolve({ user: { ...mockUser, name, email }, token: 'mock-jwt-token' });
        } else {
          reject(new Error('Missing required fields'));
        }
      }, 1500);
    });
  },

  forgotPassword: async (email: string):Promise<void> => {
    // Replace with: return axios.post('/api/auth/forgot-password', { email })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email) {
          resolve();
        } else {
          reject(new Error('Email is required'));
        }
      }, 1500);
    });
  },

  resetPassword: async (password: string):Promise<void> => {
    // Replace with: return axios.post('/api/auth/reset-password', { password })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password) {
          resolve();
        } else {
          reject(new Error('Password is required'));
        }
      }, 1500);
    });
  }
};
