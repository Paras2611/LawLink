import { apiClient } from '../api/client';
import { mockChatHistory, mockProgressStates } from './mockData';

export async function sendMessage(message: string, history: any[]): Promise<any> {
  try {
    const response = await apiClient.post('/api/chat', {
      message,
      history
    });
    return response.data;
  } catch (error) {
    console.warn("API failed, falling back to mock chat response", error);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          role: 'assistant',
          content: 'This is a mock AI response generated because the backend is unavailable.',
          aiData: {
            answer: 'Mock synthesized analysis.',
            confidence: { score: 85, label: 'High' },
            verificationStatus: 'verified',
            sources: [
              { id: 'mock-src', name: 'Mock Legal Authority', type: 'Database' }
            ]
          }
        });
      }, 1500);
    });
  }
}
