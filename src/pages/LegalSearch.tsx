import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/search/SearchBar';
import { SearchTabs } from '../components/search/SearchTabs';
import { FilterPanel } from '../components/search/FilterPanel';
import { SearchResultCard } from '../components/search/SearchResultCard';
import { SortDropdown } from '../components/search/SortDropdown';
import { Pagination } from '../components/search/Pagination';
import { SearchSkeleton } from '../components/search/SearchSkeleton';
import { EmptySearchState } from '../components/search/EmptySearchState';
import { executeSearch } from '../lib/search/searchService';
import { SearchResult, SearchFilters } from '../lib/search/types';
import { Filter } from 'lucide-react';

export function LegalSearch() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [filters, setFilters] = useState<SearchFilters>({
    domain: [],
    state: [],
    court: [],
    jurisdiction: [],
    documentType: []
  });
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Load initially
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await executeSearch(query, activeTab, filters, sort, page);
      setResults(response.results);
      setTotalPages(Math.ceil(response.total / 10) || 1);
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [activeTab, sort, filters, page]); // Re-fetch when these change

  const handleSearch = () => {
    setPage(1);
    fetchResults();
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Search Header */}
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 z-10 shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary mb-2">Legal Research Database</h1>
            <p className="text-sm text-law-text-secondary">Search verified Indian laws, judgments, and regulations.</p>
          </div>
          
          <div className="mb-6">
            <SearchBar 
              value={query} 
              onChange={setQuery} 
              onSearch={handleSearch} 
              isLoading={isLoading} 
            />
          </div>

          <SearchTabs activeTab={activeTab} onChange={(t) => { setActiveTab(t); setPage(1); }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto flex gap-6 lg:gap-8">
          
          {/* Desktop Filters */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </div>

          {/* Mobile Filters Drawer */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-law-deep-navy/20 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
              <div className="relative w-[85%] max-w-[320px] h-full shadow-2xl">
                <FilterPanel filters={filters} setFilters={setFilters} isMobile onClose={() => setIsMobileFilterOpen(false)} />
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-law-border rounded-lg text-sm font-medium text-law-text-primary"
                >
                  <Filter size={16} className="text-law-indigo" />
                  Filters
                </button>
                <h2 className="text-sm font-semibold text-law-text-secondary">
                  {isLoading ? 'Searching...' : `${results.length} results found`}
                </h2>
              </div>
              <SortDropdown value={sort} onChange={setSort} />
            </div>

            {isLoading ? (
              <SearchSkeleton />
            ) : results.length === 0 ? (
              <EmptySearchState query={query} />
            ) : (
              <div className="space-y-4">
                {results.map(result => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
                
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
