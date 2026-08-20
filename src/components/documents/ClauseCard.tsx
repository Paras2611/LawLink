import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { Clause } from '../../lib/documents/types';
import { cn } from '@/src/lib/utils';

interface ClauseCardProps {
  clause: Clause;
  onViewInDocument?: (page?: number) => void;
  className?: string;
}

export function ClauseCard({ clause, onViewInDocument, className }: ClauseCardProps) {
  return (
    <div className={cn("bg-slate-50 border border-law-border rounded-lg p-4 hover:border-law-indigo transition-colors group", className)}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h4 className="text-sm font-semibold text-law-text-primary flex items-center gap-2">
          <FileText size={16} className="text-law-indigo shrink-0" />
          {clause.title}
        </h4>
        {clause.page && (
          <button 
            onClick={() => onViewInDocument?.(clause.page)}
            className="shrink-0 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white border border-law-border rounded hover:bg-law-bg hover:text-law-indigo hover:border-law-indigo transition-all opacity-0 group-hover:opacity-100"
          >
            <Eye size={12} />
            Page {clause.page}
          </button>
        )}
      </div>
      <p className="text-sm text-law-text-secondary leading-relaxed">
        {clause.content}
      </p>
    </div>
  );
}
