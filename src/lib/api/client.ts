/// <reference types="vite/client" />
import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data === undefined || response.data === null) {
      console.warn('API returned empty response structure');
    }
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const data = error.response.data as any;
      const backendMessage = data?.detail || data?.message;

      switch (status) {
        case 401:
          errorMessage = 'Your session has expired. Please log in again.';
          localStorage.removeItem('auth_token');
          window.dispatchEvent(new CustomEvent('auth:unauthorized'));
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 408:
          errorMessage = 'The request timed out. Please try again.';
          break;
        case 429:
          errorMessage = 'You have made too many requests. Please slow down and try again later.';
          break;
        default:
          if (status >= 500) {
            errorMessage = 'A server error occurred. Our team has been notified. Please try again later.';
          } else {
            errorMessage = backendMessage || `Error ${status}: Something went wrong.`;
          }
      }
    } else if (error.request) {
      // The request was made but no response was received
      if (error.code === 'ECONNABORTED') {
         errorMessage = 'The request timed out. Please check your connection and try again.';
      } else {
         errorMessage = 'Network error. Please check your internet connection.';
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    
    console.error(`[API Error] ${errorMessage}`, error);
    return Promise.reject(new Error(errorMessage));
  }
);
