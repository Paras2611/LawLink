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
        // Just return the big detailed mock response if this is the first interaction, otherwise a generic demo one
        if (history.length <= 1) {
          resolve(mockChatHistory[1]);
        } else {
          resolve({
            role: 'assistant',
            content: '[DEMO SYSTEM] This is a mock AI response generated because the backend is unavailable.',
            aiData: {
              answer: 'Demo synthesized analysis based on mock data.',
              whyThisApplies: 'Demo reasoning for capstone demonstration.',
              confidence: { score: 85, label: 'High' },
              verificationStatus: 'verified',
              relevantLaw: [],
              relevantCases: [],
              nextSteps: ['Demo next step 1', 'Demo next step 2'],
              sources: [
                { id: 'mock-src', name: 'Demo Legal Authority', type: 'mock' }
              ]
            }
          });
        }
      }, 1500);
    });
  }
}
