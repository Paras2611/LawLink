import React from 'react';
import { RelatedCase } from '../../lib/cases/types';
import { Scale, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RelatedCaseCard({ relatedCase }: { relatedCase: RelatedCase }) {
  const navigate = useNavigate();
  const isCited = relatedCase.relation === 'cited';

  return (
    <div 
      className="bg-slate-50 border border-law-border rounded-xl p-4 hover:border-law-indigo transition-all cursor-pointer group flex items-start gap-3"
      onClick={() => navigate(`/cases/${relatedCase.id}`)}
    >
      <div className={`mt-0.5 rounded-lg p-1.5 shrink-0 ${isCited ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
        {isCited ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-law-text-primary group-hover:text-law-indigo transition-colors line-clamp-1 mb-1">
          {relatedCase.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-law-text-muted">
          <Scale size={12} />
          <span className="font-mono">{relatedCase.citation}</span>
        </div>
      </div>
    </div>
  );
}
