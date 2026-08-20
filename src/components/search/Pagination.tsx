import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-law-border rounded-lg text-law-text-secondary hover:bg-slate-50 hover:text-law-indigo disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
      >
        <ChevronLeft size={18} />
      </button>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              currentPage === i + 1 
                ? 'bg-law-indigo text-white border-law-indigo' 
                : 'bg-white border border-law-border text-law-text-secondary hover:bg-slate-50 hover:text-law-indigo'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-law-border rounded-lg text-law-text-secondary hover:bg-slate-50 hover:text-law-indigo disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
