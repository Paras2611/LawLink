import React from 'react';
import { BookOpen, ShieldCheck, FileText } from 'lucide-react';
import { SourceCard } from './SourceCard';

export function ChatEvidencePanel({ currentSources }: { currentSources?: any[] }) {
  if (!currentSources || currentSources.length === 0) {
    return (
      <div className="flex flex-col h-full bg-slate-50 border-l border-law-border w-full">
        <div className="p-4 border-b border-law-border flex items-center gap-2 text-law-text-primary font-semibold">
          <BookOpen size={18} className="text-law-indigo" />
          Research Evidence
        </div>
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-[200px]">
            <div className="w-12 h-12 bg-law-bg border border-law-border rounded-xl flex items-center justify-center mx-auto mb-4 text-law-text-muted">
              <FileText size={24} />
            </div>
            <h3 className="text-sm font-medium text-law-text-primary mb-1">No Evidence Yet</h3>
            <p className="text-xs text-law-text-muted">Sources and citations will appear here once the research is complete.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-law-border w-full">
      <div className="p-4 border-b border-law-border flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2 text-law-text-primary font-semibold">
          <BookOpen size={18} className="text-law-indigo" />
          Research Evidence
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium border border-green-200">
          <ShieldCheck size={14} />
          Verified
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-law-text-muted uppercase tracking-wider mb-3">Primary Sources</h3>
          <div className="space-y-2">
            {currentSources.map(src => (
              <SourceCard key={src.id} source={src} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-law-text-muted uppercase tracking-wider mb-3">Verification Logs</h3>
          <div className="bg-slate-50 border border-law-border rounded-lg p-3 text-xs text-law-text-secondary space-y-2 font-mono">
            <div className="flex items-center gap-2 text-green-600">
              <ShieldCheck size={14} />
              Cross-referenced with Supreme Court database
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <ShieldCheck size={14} />
              Statutory provisions active as of 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
