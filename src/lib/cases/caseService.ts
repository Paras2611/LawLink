import { apiClient } from '../api/client';
import { CaseDocument, CaseFilters } from './types';
import { mockCases } from './mockData';

export async function executeCaseSearch(
  query: string,
  filters: CaseFilters,
  sort: string,
  page: number
): Promise<{ results: CaseDocument[]; total: number }> {
  try {
    const response = await apiClient.post('/api/cases/search', {
      query,
      filters,
      sort,
      page
    });
    return response.data;
  } catch (error) {
    console.warn("API failed, falling back to mock cases", error);
    let results = [...mockCases];

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        r => r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)
      );
    }

    if (filters.court && filters.court.length > 0) {
      results = results.filter(r => filters.court.includes(r.court));
    }

    if (sort === 'relevance') {
      results.sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
    } else if (sort === 'date') {
      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return {
      results,
      total: results.length
    };
  }
}

export async function getCaseDetails(id: string): Promise<CaseDocument | null> {
  try {
    const response = await apiClient.get(`/api/cases/${id}`);
    return response.data;
  } catch (error) {
    console.warn("API failed, falling back to mock case detail", error);
    const found = mockCases.find(c => c.id === id);
    return found || null;
  }
}
