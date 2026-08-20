import React from 'react';
import { SearchResult } from '../../lib/search/types';
import { Scale, FileText, BookOpen, CheckCircle2, Bookmark, ExternalLink, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SearchResultCard({ result }: { result: SearchResult }) {
  const navigate = useNavigate();

  const getIcon = () => {
    switch(result.type) {
      case 'judgment': return <Scale size={18} />;
      case 'act': return <BookOpen size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const getBadgeColor = () => {
    switch(result.type) {
      case 'judgment': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'act': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'section': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-law-border rounded-2xl p-5 md:p-6 hover:shadow-md hover:border-law-indigo transition-all group">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-law-bg border border-law-border flex items-center justify-center text-law-indigo shrink-0 group-hover:bg-law-indigo group-hover:text-white transition-colors">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getBadgeColor()}`}>
                {result.type}
              </span>
              {result.verified && (
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200" title="Verified Authority">
                  <CheckCircle2 size={12} />
                  Verified
                </span>
              )}
              {result.relevance >= 90 && (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                  Highly Relevant
                </span>
              )}
            </div>
            <h3 className="text-base md:text-lg font-bold text-law-text-primary group-hover:text-law-indigo transition-colors leading-snug">
              {result.title}
            </h3>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button className="p-2 text-law-text-muted hover:text-law-indigo hover:bg-law-bg rounded-lg transition-colors border border-transparent hover:border-law-border" title="Save to Workspace">
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      <div className="ml-0 sm:ml-13 mb-4">
        <p className="text-sm text-law-text-secondary leading-relaxed line-clamp-2">
          {result.shortExplanation}
        </p>
      </div>

      <div className="ml-0 sm:ml-13 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-law-border">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-law-text-muted">
          {result.court && (
            <span className="flex items-center gap-1.5 font-medium"><Scale size={14} className="text-law-indigo/70" /> {result.court}</span>
          )}
          {result.date && (
            <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-law-border/50">{new Date(result.date).getFullYear()}</span>
          )}
          {result.jurisdiction && (
            <span>{result.jurisdiction}</span>
          )}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button 
            className="sm:hidden p-2 text-law-text-muted hover:text-law-indigo hover:bg-law-bg rounded-lg transition-colors border border-law-border" 
            title="Save"
          >
            <Bookmark size={16} />
          </button>
          <button 
            onClick={() => navigate('/chat')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-law-bg text-law-indigo hover:bg-law-indigo hover:text-white rounded-lg text-xs font-medium transition-colors border border-law-indigo/20 hover:border-law-indigo"
          >
            <MessageSquare size={14} />
            Ask LawLink
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-law-text-primary hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors border border-law-border">
            <ExternalLink size={14} className="text-law-text-muted" />
            View
          </button>
        </div>
      </div>
    </div>
  );
}
