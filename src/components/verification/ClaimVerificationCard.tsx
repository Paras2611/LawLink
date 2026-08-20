import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { LegalClaim, LegalSource } from '../../lib/verification/types';
import { VerificationBadge } from './VerificationBadge';
import { SourceCard } from './SourceCard';
import { ConfidenceCard } from './ConfidenceCard';
import { cn } from '@/src/lib/utils';

interface ClaimVerificationCardProps {
  claim: LegalClaim;
  sources: Record<string, LegalSource>;
  className?: string;
}

export function ClaimVerificationCard({ claim, sources, className }: ClaimVerificationCardProps) {
  const claimSources = claim.sourceIds.map(id => sources[id]).filter(Boolean);

  return (
    <div className={cn("bg-white border border-law-border rounded-xl p-5 md:p-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5 pb-5 border-b border-law-border">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-law-text-muted uppercase tracking-wider">
              Extracted Claim
            </span>
            <VerificationBadge status={claim.status} />
          </div>
          <p className="text-base font-medium text-law-text-primary leading-relaxed">
            "{claim.claim}"
          </p>
          
          {claim.explanation && (
            <div className="mt-3 text-sm text-law-text-secondary bg-slate-50 p-3 rounded-lg border border-law-border/50">
              <span className="font-semibold text-law-text-primary mr-1">Analysis:</span>
              {claim.explanation}
            </div>
          )}
          
          {claim.status === 'unverified' && (
            <div className="mt-3 flex items-start gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <AlertCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <p>LawLink could not verify this claim against the available legal sources.</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold text-law-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <FileText size={14} />
            Supporting Sources ({claimSources.length})
          </h4>
          
          {claimSources.length > 0 ? (
            <div className="space-y-3">
              {claimSources.map(source => (
                <SourceCard key={source.id} source={source} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-law-text-muted p-4 bg-slate-50 rounded-xl border border-law-border border-dashed text-center">
              No direct sources available.
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold text-law-text-muted uppercase tracking-wider mb-3">
            Verification Confidence
          </h4>
          <ConfidenceCard confidence={claim.confidence} />
        </div>
      </div>
    </div>
  );
}
