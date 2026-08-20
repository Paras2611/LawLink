import React, { useState } from 'react';
import { BookOpen, Scale, FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { LegalSource } from '../../lib/verification/types';
import { VerificationBadge } from './VerificationBadge';
import { cn } from '@/src/lib/utils';

interface SourceCardProps {
  source: LegalSource;
  className?: string;
  defaultExpanded?: boolean;
}

export function SourceCard({ source, className, defaultExpanded = false }: SourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getSourceIcon = (type: LegalSource['sourceType']) => {
    switch (type) {
      case 'act': return <BookOpen size={16} />;
      case 'judgment': return <Scale size={16} />;
      case 'section': return <FileText size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getSourceLabel = (type: LegalSource['sourceType']) => {
    switch (type) {
      case 'act': return 'Act';
      case 'judgment': return 'Judgment';
      case 'section': return 'Section';
      case 'regulation': return 'Regulation';
      default: return 'Source';
    }
  };

  return (
    <div className={cn("bg-white border border-law-border rounded-xl overflow-hidden transition-all hover:border-law-indigo/50", className)}>
      <div 
        className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-law-bg border border-law-border flex items-center justify-center text-law-indigo shrink-0">
            {getSourceIcon(source.sourceType)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-law-indigo bg-indigo-50 px-1.5 py-0.5 rounded">
                {getSourceLabel(source.sourceType)}
              </span>
              <VerificationBadge status={source.verificationStatus} />
            </div>
            <h4 className="text-sm font-semibold text-law-text-primary leading-snug line-clamp-2">
              {source.title} {source.section && `- Section ${source.section}`}
            </h4>
            
            {/* Quick metadata for unexpanded view */}
            {!isExpanded && (source.court || source.date) && (
              <div className="mt-1.5 flex items-center gap-3 text-xs text-law-text-muted truncate">
                {source.court && <span>{source.court}</span>}
                {source.date && <span>{new Date(source.date).getFullYear()}</span>}
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 flex items-center justify-end sm:justify-center">
          <button className="p-1 text-law-text-muted hover:text-law-indigo rounded-md hover:bg-law-bg transition-colors">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-1 bg-slate-50/50 border-t border-law-border text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3">
            {source.court && (
              <div>
                <span className="block text-xs font-medium text-law-text-muted uppercase tracking-wider mb-1">Court</span>
                <span className="text-law-text-primary">{source.court}</span>
              </div>
            )}
            {source.jurisdiction && (
              <div>
                <span className="block text-xs font-medium text-law-text-muted uppercase tracking-wider mb-1">Jurisdiction</span>
                <span className="text-law-text-primary">{source.jurisdiction}</span>
              </div>
            )}
            {source.date && (
              <div>
                <span className="block text-xs font-medium text-law-text-muted uppercase tracking-wider mb-1">Date</span>
                <span className="text-law-text-primary">{new Date(source.date).toLocaleDateString()}</span>
              </div>
            )}
            {source.section && source.sourceType !== 'section' && (
              <div>
                <span className="block text-xs font-medium text-law-text-muted uppercase tracking-wider mb-1">Section</span>
                <span className="text-law-text-primary">{source.section}</span>
              </div>
            )}
          </div>
          
          {source.url && (
            <div className="mt-4 pt-4 border-t border-law-border/50">
              <a 
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-law-indigo hover:text-indigo-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View Full Source <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
