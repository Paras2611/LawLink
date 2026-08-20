import React from 'react';
import { Search, X } from 'lucide-react';

interface ResearchSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ResearchSearch({ value, onChange, placeholder = 'Search...' }: ResearchSearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-law-text-muted" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2.5 border border-law-border rounded-xl text-sm placeholder:text-law-text-muted text-law-text-primary focus:outline-none focus:ring-2 focus:ring-law-indigo/20 focus:border-law-indigo transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-law-text-muted hover:text-law-text-primary transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
