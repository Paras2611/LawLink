import React from 'react';
import { Quote } from 'lucide-react';
import { Citation, LegalSource } from '../../lib/verification/types';
import { cn } from '@/src/lib/utils';

interface CitationCardProps {
  citation: Citation;
  source: LegalSource;
  className?: string;
}

export function CitationCard({ citation, source, className }: CitationCardProps) {
  return (
    <div className={cn("relative pl-4 py-2 my-2 border-l-2 border-law-indigo/30 group hover:border-law-indigo transition-colors", className)}>
      <div className="absolute -left-2.5 top-2 bg-slate-50 text-law-indigo/40 group-hover:text-law-indigo transition-colors">
        <Quote size={16} className="fill-current rotate-180" />
      </div>
      <blockquote className="text-sm text-law-text-secondary italic mb-2 leading-relaxed">
        "{citation.text}"
      </blockquote>
      <div className="text-xs text-law-text-muted flex items-center gap-1.5 font-medium">
        <span className="w-4 border-t border-law-border inline-block"></span>
        Cited from {source.title} {source.section && `(Section ${source.section})`}
      </div>
    </div>
  );
}
