import { CaseDocument, CaseFilters } from './types';
import { mockCases } from './mockData';

export async function executeCaseSearch(
  query: string,
  filters: CaseFilters,
  sort: string,
  page: number
): Promise<{ results: CaseDocument[]; total: number }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  let results = [...mockCases];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      r => r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)
    );
  }

  // Basic filtering mock (just on court for now as example)
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

export async function getCaseDetails(id: string): Promise<CaseDocument | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  const found = mockCases.find(c => c.id === id);
  return found || null;
}
