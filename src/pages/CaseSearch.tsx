import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/search/SearchBar';
import { CaseCard } from '../components/cases/CaseCard';
import { CaseFilterPanel } from '../components/cases/CaseFilterPanel';
import { SortDropdown } from '../components/search/SortDropdown';
import { Pagination } from '../components/search/Pagination';
import { SearchSkeleton } from '../components/search/SearchSkeleton';
import { EmptySearchState } from '../components/search/EmptySearchState';
import { executeCaseSearch } from '../lib/cases/caseService';
import { CaseDocument, CaseFilters } from '../lib/cases/types';
import { Filter } from 'lucide-react';

export function CaseSearch() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('relevance');
  const [filters, setFilters] = useState<CaseFilters>({
    court: [],
    state: [],
    date: [],
    provisions: [],
    caseType: [],
    jurisdiction: []
  });
  
  const [results, setResults] = useState<CaseDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await executeCaseSearch(query, filters, sort, page);
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
  }, [sort, filters, page]);

  const handleSearch = () => {
    setPage(1);
    fetchResults();
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 z-10 shrink-0 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary mb-2">Case Law Research</h1>
            <p className="text-sm text-law-text-secondary">Search Indian judgments and legal precedents.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar 
              value={query} 
              onChange={setQuery} 
              onSearch={handleSearch} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto flex gap-6 lg:gap-8">
          
          <div className="hidden lg:block w-[280px] shrink-0">
            <CaseFilterPanel filters={filters} setFilters={setFilters} />
          </div>

          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-law-deep-navy/20 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
              <div className="relative w-[85%] max-w-[320px] h-full shadow-2xl">
                <CaseFilterPanel filters={filters} setFilters={setFilters} isMobile onClose={() => setIsMobileFilterOpen(false)} />
              </div>
            </div>
          )}

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
                  {isLoading ? 'Searching...' : `${results.length} cases found`}
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
                  <CaseCard key={result.id} caseDoc={result} />
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
