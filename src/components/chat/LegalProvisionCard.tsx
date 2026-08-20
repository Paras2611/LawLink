import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export function LegalProvisionCard({ provision }: { provision: any }) {
  return (
    <div className="bg-white border border-law-border rounded-lg p-3 sm:p-4 hover:border-law-indigo hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 text-law-indigo">
          <BookOpen size={16} />
          <h4 className="font-semibold text-sm">{provision.title}</h4>
        </div>
        {provision.verified && <div title="AI Supported Authority"><CheckCircle2 size={16} className="text-emerald-600 shrink-0" /></div>}
      </div>
      <p className="text-sm text-law-text-secondary leading-relaxed">
        {provision.description}
      </p>
    </div>
  );
}
