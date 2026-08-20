import { mockHistory, mockSaved } from './mockData';
import { HistoryItem, SavedItem, SavedItemType } from './types';

export async function fetchHistory(query: string = ''): Promise<HistoryItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(mockHistory.filter(h => h.title.toLowerCase().includes(q) || h.category.toLowerCase().includes(q)));
    }, 600);
  });
}

export async function fetchSavedResearch(query: string = '', filterType?: SavedItemType | 'all'): Promise<SavedItem[]> {
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

export async function deleteHistoryItem(id: string): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 400));
}

export async function renameHistoryItem(id: string, newTitle: string): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 400));
}

export async function deleteSavedItem(id: string): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 400));
}
