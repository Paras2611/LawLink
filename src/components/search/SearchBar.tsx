import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export function SearchBar({ value, onChange, onSearch, isLoading }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-law-indigo/30 border-t-law-indigo rounded-full animate-spin" />
        ) : (
          <Search size={20} className="text-law-text-muted" />
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Indian laws, sections and legal concepts..."
        className="w-full pl-12 pr-24 py-4 bg-white border border-law-border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-law-indigo focus:border-law-indigo text-law-text-primary text-base transition-all"
        disabled={isLoading}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
          }}
          className="absolute inset-y-0 right-20 pr-2 flex items-center text-law-text-muted hover:text-law-text-primary"
        >
          <X size={18} />
        </button>
      )}
      <div className="absolute inset-y-2 right-2 flex items-center">
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="px-4 py-2 bg-law-indigo text-white font-medium rounded-xl hover:bg-law-navy disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
