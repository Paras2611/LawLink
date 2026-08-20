import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

export function SourceCard({ source }: { source: any }) {
  return (
    <a href="#" className="flex items-center justify-between p-3 bg-white border border-law-border rounded-lg hover:border-law-indigo hover:bg-slate-50 transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-law-bg flex items-center justify-center text-law-text-muted group-hover:text-law-indigo transition-colors border border-law-border">
          <FileText size={16} />
        </div>
        <div>
          <div className="text-sm font-medium text-law-text-primary group-hover:text-law-indigo transition-colors line-clamp-1">{source.name}</div>
          <div className="text-xs text-law-text-muted">{source.type}</div>
        </div>
      </div>
      <ExternalLink size={14} className="text-law-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
