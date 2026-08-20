import { SearchResult, SearchFilters } from './types';
import { mockSearchResults } from './mockData';

export async function executeSearch(
  query: string,
  tab: string,
  filters: SearchFilters,
  sort: string,
  page: number
): Promise<{ results: SearchResult[]; total: number }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let results = [...mockSearchResults];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      r => r.title.toLowerCase().includes(q) || r.shortExplanation.toLowerCase().includes(q)
    );
  }

  if (tab !== 'all') {
    // Map tabs to document types: 'acts' -> 'act', 'sections' -> 'section', etc.
    const mappedType = tab.replace(/s$/, ''); 
    results = results.filter(r => r.type === mappedType);
  }

  // Very basic mock sorting
  if (sort === 'relevance') {
    results.sort((a, b) => b.relevance - a.relevance);
  } else if (sort === 'date') {
    results.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }

  return {
    results,
    total: results.length
  };
}
