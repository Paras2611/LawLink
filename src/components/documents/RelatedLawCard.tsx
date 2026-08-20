import React from 'react';
import { BookOpen, Scale, FileText } from 'lucide-react';
import { RelatedLaw } from '../../lib/documents/types';
import { cn } from '@/src/lib/utils';

interface RelatedLawCardProps {
  law: RelatedLaw;
  className?: string;
}

export function RelatedLawCard({ law, className }: RelatedLawCardProps) {
  const getIcon = (type: RelatedLaw['type']) => {
    switch (type) {
      case 'act': return <BookOpen size={16} />;
      case 'judgment': return <Scale size={16} />;
      case 'section': return <FileText size={16} />;
    }
  };

  const getLabel = (type: RelatedLaw['type']) => {
    switch (type) {
      case 'act': return 'Act';
      case 'judgment': return 'Judgment';
      case 'section': return 'Section';
    }
  };

  return (
    <div className={cn("bg-white border border-law-border rounded-lg p-4 hover:border-law-indigo transition-colors", className)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-law-indigo shrink-0">
          {getIcon(law.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-law-indigo bg-indigo-50 px-1.5 py-0.5 rounded">
              {getLabel(law.type)}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-law-text-primary mb-1">
            {law.title}
          </h4>
          <p className="text-xs text-law-text-secondary leading-relaxed">
            {law.relevance}
          </p>
        </div>
      </div>
    </div>
  );
}
