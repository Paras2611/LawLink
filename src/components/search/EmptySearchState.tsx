import React from 'react';
import { SearchX } from 'lucide-react';

export function EmptySearchState({ query }: { query: string }) {
  return (
    <div className="bg-white border border-law-border rounded-2xl p-10 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-slate-50 border border-law-border rounded-2xl flex items-center justify-center text-law-text-muted mb-4">
        <SearchX size={32} />
      </div>
      <h3 className="text-lg font-bold text-law-text-primary mb-2">No results found</h3>
      <p className="text-sm text-law-text-secondary max-w-md mx-auto">
        We couldn't find any Indian laws, sections, or judgments matching <span className="font-semibold text-law-text-primary">"{query}"</span>. 
        Try adjusting your filters or using different keywords.
      </p>
      <button className="mt-6 px-4 py-2 bg-law-bg text-law-indigo font-medium rounded-xl border border-law-border hover:bg-slate-100 hover:border-law-indigo transition-colors text-sm">
        Clear all filters
      </button>
    </div>
  );
}
