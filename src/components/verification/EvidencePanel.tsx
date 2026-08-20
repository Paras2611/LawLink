import React, { useState } from 'react';
import { BookOpen, Scale, FileText, LayoutList, CheckCircle2 } from 'lucide-react';
import { LegalSource, LegalClaim, Citation } from '../../lib/verification/types';
import { SourceCard } from './SourceCard';
import { ClaimVerificationCard } from './ClaimVerificationCard';
import { CitationCard } from './CitationCard';
import { cn } from '@/src/lib/utils';

interface EvidencePanelProps {
  sources: LegalSource[];
  claims: LegalClaim[];
  citations?: Citation[];
  className?: string;
}

export function EvidencePanel({ sources, claims, citations = [], className }: EvidencePanelProps) {
  const [activeTab, setActiveTab] = useState<'verification' | 'sources'>('verification');

  const sourceMap = sources.reduce((acc, source) => {
    acc[source.id] = source;
    return acc;
  }, {} as Record<string, LegalSource>);

  const acts = sources.filter(s => s.sourceType === 'act' || s.sourceType === 'regulation');
  const sections = sources.filter(s => s.sourceType === 'section');
  const judgments = sources.filter(s => s.sourceType === 'judgment');

  return (
    <div className={cn("bg-white border border-law-border rounded-2xl overflow-hidden flex flex-col h-full", className)}>
      {/* Panel Header */}
      <div className="px-6 py-5 border-b border-law-border bg-slate-50/50">
        <h2 className="text-lg font-bold text-law-text-primary flex items-center gap-2">
          <BookOpen size={20} className="text-law-indigo" />
          Evidence & Sources
        </h2>
        <p className="text-sm text-law-text-secondary mt-1">
          Review extracted claims, legal provisions, and supporting authority.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-4 border-b border-law-border overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => setActiveTab('verification')}
          className={cn(
            "px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2",
            activeTab === 'verification' 
              ? "border-law-indigo text-law-indigo" 
              : "border-transparent text-law-text-muted hover:text-law-text-primary"
          )}
        >
          <CheckCircle2 size={16} />
          Claim Verification ({claims.length})
        </button>
        <button
          onClick={() => setActiveTab('sources')}
          className={cn(
            "px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2",
            activeTab === 'sources' 
              ? "border-law-indigo text-law-indigo" 
              : "border-transparent text-law-text-muted hover:text-law-text-primary"
          )}
        >
          <LayoutList size={16} />
          All Sources ({sources.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
        {activeTab === 'verification' && (
          <div className="space-y-6">
            {claims.map(claim => (
              <ClaimVerificationCard 
                key={claim.id} 
                claim={claim} 
                sources={sourceMap} 
              />
            ))}
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-8">
            
            {/* Acts & Regulations */}
            {acts.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-law-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-law-indigo" />
                  Relevant Acts & Regulations
                </h3>
                <div className="space-y-3">
                  {acts.map(source => (
                    <SourceCard key={source.id} source={source} />
                  ))}
                </div>
              </section>
            )}

            {/* Sections */}
            {sections.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-law-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-law-indigo" />
                  Relevant Sections
                </h3>
                <div className="space-y-3">
                  {sections.map(source => (
                    <div key={source.id} className="space-y-2">
                      <SourceCard source={source} />
                      {/* Show citations for this section if any */}
                      {citations.filter(c => c.sourceId === source.id).map(citation => (
                        <CitationCard key={citation.id} citation={citation} source={source} className="ml-4" />
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Judgments */}
            {judgments.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-law-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Scale size={16} className="text-law-indigo" />
                  Relevant Judgments
                </h3>
                <div className="space-y-3">
                  {judgments.map(source => (
                    <div key={source.id} className="space-y-2">
                      <SourceCard source={source} />
                      {citations.filter(c => c.sourceId === source.id).map(citation => (
                        <CitationCard key={citation.id} citation={citation} source={source} className="ml-4" />
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {sources.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-white rounded-full border border-law-border flex items-center justify-center mx-auto mb-3">
                  <BookOpen size={20} className="text-law-text-muted" />
                </div>
                <h3 className="text-sm font-bold text-law-text-primary">No sources available</h3>
                <p className="text-sm text-law-text-muted mt-1">There are no legal sources attached to this view.</p>
              </div>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}
