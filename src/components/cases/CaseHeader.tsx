import React from 'react';
import { CaseDocument } from '../../lib/cases/types';
import { ArrowLeft, Scale, Bookmark, MessageSquare, ExternalLink, ShieldAlert, GitCompare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CaseHeader({ caseDoc }: { caseDoc: CaseDocument }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-law-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={() => navigate('/cases')}
          className="flex items-center gap-2 text-sm text-law-text-muted hover:text-law-indigo transition-colors mb-6 w-fit"
        >
          <ArrowLeft size={16} />
          Back to Search Results
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {caseDoc.isDemo && (
                <span className="bg-orange-100 text-orange-800 border border-orange-200 text-[10px] uppercase font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                  <ShieldAlert size={12} />
                  Demo Case
                </span>
              )}
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-amber-100 text-amber-800 border border-amber-200">
                {caseDoc.caseType}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-law-text-primary leading-tight mb-4">
              {caseDoc.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-law-text-secondary">
              <span className="flex items-center gap-1.5"><Scale size={16} className="text-law-indigo" /> <span className="font-medium">{caseDoc.court}</span></span>
              <span><span className="text-law-text-muted">Date:</span> <span className="font-medium text-law-text-primary">{new Date(caseDoc.date).toLocaleDateString()}</span></span>
              <span><span className="text-law-text-muted">Case No:</span> <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-law-border/50">{caseDoc.caseNumber}</span></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-law-text-primary font-medium rounded-xl border border-law-border hover:bg-slate-50 hover:text-law-indigo transition-colors text-sm">
              <Bookmark size={16} className="text-law-text-muted" />
              Save Case
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-law-text-primary font-medium rounded-xl border border-law-border hover:bg-slate-50 hover:text-law-indigo transition-colors text-sm hidden sm:flex">
              <GitCompare size={16} className="text-law-text-muted" />
              Compare
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="flex items-center gap-2 px-4 py-2 bg-law-indigo text-white font-medium rounded-xl hover:bg-law-navy transition-colors text-sm shadow-sm"
            >
              <MessageSquare size={16} />
              Ask LawLink
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
