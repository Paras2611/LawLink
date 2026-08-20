import { apiClient } from '../api/client';
import { mockHistory, mockSaved } from './mockData';
import { HistoryItem, SavedItem, SavedItemType } from './types';

export async function fetchHistory(query: string = ''): Promise<HistoryItem[]> {
  try {
    const response = await apiClient.get('/api/conversations', { params: { query } });
    return response.data;
  } catch (error) {
    console.warn("API failed, falling back to mock history", error);
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();
        resolve(mockHistory.filter(h => h.title.toLowerCase().includes(q) || h.category.toLowerCase().includes(q)));
      }, 600);
    });
  }
}

export async function fetchSavedResearch(query: string = '', filterType?: SavedItemType | 'all'): Promise<SavedItem[]> {
  try {
    const response = await apiClient.get('/api/saved', { params: { query, type: filterType } });
    return response.data;
  } catch (error) {
    console.warn("API failed, falling back to mock saved research", error);
    return new Promise((resolve) => {
      setTimeout(() => {
        const q = query.toLowerCase();
        let results = mockSaved.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
        if (filterType && filterType !== 'all') {
          results = results.filter(s => s.type === filterType);
        }
        resolve(results);
      }, 600);
    });
  }
}

export async function deleteHistoryItem(id: string): Promise<void> {
  try {
    await apiClient.delete(`/api/conversations/${id}`);
  } catch (error) {
    console.warn("API failed, falling back to mock delete", error);
    return new Promise((resolve) => setTimeout(resolve, 400));
  }
}

export async function renameHistoryItem(id: string, newTitle: string): Promise<void> {
  try {
    await apiClient.put(`/api/conversations/${id}`, { title: newTitle });
  } catch (error) {
    console.warn("API failed, falling back to mock rename", error);
    return new Promise((resolve) => setTimeout(resolve, 400));
  }
}

export async function deleteSavedItem(id: string): Promise<void> {
  try {
    await apiClient.delete(`/api/saved/${id}`);
  } catch (error) {
    console.warn("API failed, falling back to mock delete", error);
    return new Promise((resolve) => setTimeout(resolve, 400));
  }
}
