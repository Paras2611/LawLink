import React from 'react';
import { CaseDocument } from '../../lib/cases/types';
import { Scale, Calendar, Bookmark, MessageSquare, ExternalLink, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CaseCard({ caseDoc }: { caseDoc: CaseDocument }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-law-border rounded-2xl p-5 md:p-6 hover:shadow-md hover:border-law-indigo transition-all group relative">
      {caseDoc.isDemo && (
        <div className="absolute -top-3 -right-3 sm:top-4 sm:right-4 bg-orange-100 text-orange-800 border border-orange-200 text-[10px] uppercase font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
          <ShieldAlert size={12} />
          Demo Data
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-3 pr-16 sm:pr-24">
        <div className="w-10 h-10 rounded-xl bg-law-bg border border-law-border flex items-center justify-center text-law-indigo shrink-0">
          <Scale size={18} />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-bold text-law-text-primary leading-snug group-hover:text-law-indigo transition-colors mb-2 cursor-pointer" onClick={() => navigate(`/cases/${caseDoc.id}`)}>
            {caseDoc.title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-law-text-muted">
            <span className="flex items-center gap-1"><Scale size={14} className="text-law-indigo/70" /> {caseDoc.court}</span>
            <span className="flex items-center gap-1"><Calendar size={14} className="text-law-indigo/70" /> {new Date(caseDoc.date).toLocaleDateString()}</span>
            <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-law-border/50">{caseDoc.caseNumber}</span>
          </div>
        </div>
      </div>

      <div className="ml-0 sm:ml-14 mb-4">
        <p className="text-sm text-law-text-secondary leading-relaxed line-clamp-2 mb-3">
          {caseDoc.summary}
        </p>
        
        {caseDoc.provisions && caseDoc.provisions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {caseDoc.provisions.slice(0, 3).map(prov => (
              <span key={prov} className="px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[10px] font-medium">
                {prov}
              </span>
            ))}
            {caseDoc.provisions.length > 3 && (
              <span className="px-2 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded text-[10px] font-medium">
                +{caseDoc.provisions.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="ml-0 sm:ml-14 flex items-center justify-between gap-4 pt-4 border-t border-law-border">
        <div className="text-xs font-medium text-law-text-muted">
          Relevance: <span className="text-law-text-primary">{caseDoc.relevance}%</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-law-text-muted hover:text-law-indigo hover:bg-law-bg rounded-lg transition-colors border border-transparent hover:border-law-border" title="Save Case">
            <Bookmark size={16} />
          </button>
          <button 
            onClick={() => navigate('/chat')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-law-bg text-law-indigo hover:bg-law-indigo hover:text-white rounded-lg text-xs font-medium transition-colors border border-law-indigo/20 hover:border-law-indigo"
          >
            <MessageSquare size={14} />
            Ask LawLink
          </button>
          <button 
            onClick={() => navigate(`/cases/${caseDoc.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-law-text-primary hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors border border-law-border"
          >
            <ExternalLink size={14} className="text-law-text-muted" />
            View Case
          </button>
        </div>
      </div>
    </div>
  );
}
