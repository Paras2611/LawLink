import React from 'react';
import Markdown from 'react-markdown';
import { LegalProvisionCard } from './LegalProvisionCard';
import { CaseCard } from './CaseCard';
import { ConfidenceCard } from './ConfidenceCard';
import { VerificationBadge } from './VerificationBadge';
import { Copy, RefreshCw, Bookmark, Share2 } from 'lucide-react';

export function AIResponse({ data, content }: { data?: any; content: string }) {
  if (!data) {
    return (
      <div className="prose prose-slate max-w-none prose-sm sm:prose-base prose-headings:font-semibold prose-a:text-law-indigo text-law-text-primary">
        <Markdown>{content}</Markdown>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Introduction Content */}
      <div className="prose prose-slate max-w-none prose-sm sm:prose-base text-law-text-primary">
        <Markdown>{content}</Markdown>
      </div>

      {/* Answer & Reasoning */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-law-text-primary uppercase tracking-wider mb-2">Legal Analysis</h3>
          <div className="bg-white border border-law-border p-4 rounded-lg text-sm sm:text-base text-law-text-primary leading-relaxed">
            {data.answer}
          </div>
        </div>
        
        {data.whyThisApplies && (
          <div>
            <h3 className="text-sm font-semibold text-law-text-primary uppercase tracking-wider mb-2">Why This May Apply</h3>
            <div className="text-sm sm:text-base text-law-text-secondary leading-relaxed bg-slate-50 p-4 border border-law-border rounded-lg">
              {data.whyThisApplies}
            </div>
          </div>
        )}
      </div>

      {/* Authorities */}
      <div className="space-y-6 bg-slate-50/50 p-4 md:p-6 rounded-xl border border-law-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-law-text-primary uppercase tracking-wider flex items-center gap-2">
            Authorities & Precedents
          </h3>
          <VerificationBadge status={data.verificationStatus} />
        </div>

        {data.relevantLaw && data.relevantLaw.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-law-text-muted uppercase">Relevant Law</h4>
            <div className="grid grid-cols-1 gap-3">
              {data.relevantLaw.map((law: any) => (
                <LegalProvisionCard key={law.id} provision={law} />
              ))}
            </div>
          </div>
        )}

        {data.relevantCases && data.relevantCases.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-law-text-muted uppercase">Relevant Cases</h4>
            <div className="grid grid-cols-1 gap-3">
              {data.relevantCases.map((caseItem: any) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next Steps & Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.nextSteps && data.nextSteps.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-law-text-primary uppercase tracking-wider mb-3">Possible Next Steps</h3>
            <ul className="space-y-2">
              {data.nextSteps.map((step: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-law-text-secondary leading-relaxed">
                  <span className="text-law-indigo font-bold shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.limitations && (
          <div>
            <h3 className="text-sm font-semibold text-law-text-primary uppercase tracking-wider mb-3">Important Limitations</h3>
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-sm leading-relaxed">
              {data.limitations}
            </div>
          </div>
        )}
      </div>

      {/* Meta/Actions footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-law-border gap-4">
        {data.confidence && (
          <ConfidenceCard score={data.confidence.score} label={data.confidence.label} />
        )}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button className="p-1.5 text-law-text-muted hover:text-law-text-primary hover:bg-law-bg rounded transition-colors" title="Copy">
            <Copy size={16} />
          </button>
          <button className="p-1.5 text-law-text-muted hover:text-law-text-primary hover:bg-law-bg rounded transition-colors" title="Regenerate">
            <RefreshCw size={16} />
          </button>
          <button className="p-1.5 text-law-text-muted hover:text-law-text-primary hover:bg-law-bg rounded transition-colors" title="Save">
            <Bookmark size={16} />
          </button>
          <button className="p-1.5 text-law-text-muted hover:text-law-text-primary hover:bg-law-bg rounded transition-colors" title="Share">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
