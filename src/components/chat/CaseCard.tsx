import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';

export function CaseCard({ caseItem }: { caseItem: any }) {
  return (
    <div className="bg-white border border-law-border rounded-lg p-3 sm:p-4 hover:border-law-indigo hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-start gap-2">
          <Scale size={16} className="text-law-indigo mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm text-law-text-primary">{caseItem.title}</h4>
            <span className="text-xs text-law-text-muted font-mono bg-slate-50 px-1 py-0.5 rounded border border-law-border">{caseItem.citation}</span>
          </div>
        </div>
        {caseItem.verified && <div title="AI Supported Authority"><CheckCircle2 size={16} className="text-emerald-600 shrink-0" /></div>}
      </div>
      <p className="text-sm text-law-text-secondary mt-2 leading-relaxed">
        {caseItem.relevance}
      </p>
    </div>
  );
}
