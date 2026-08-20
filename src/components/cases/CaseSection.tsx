import React from 'react';
import { cn } from '@/src/lib/utils';

interface CaseSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
}

export function CaseSection({ id, title, children, className, defaultExpanded = true }: CaseSectionProps) {
  // We can add collapsible state later if needed, but for now we keep it simple
  return (
    <div id={id} className={cn("bg-white border border-law-border rounded-2xl p-6 md:p-8 scroll-mt-24", className)}>
      <h2 className="text-lg md:text-xl font-bold text-law-text-primary mb-4 pb-4 border-b border-law-border">
        {title}
      </h2>
      <div className="prose prose-slate max-w-none prose-sm sm:prose-base text-law-text-primary prose-headings:text-law-text-primary prose-a:text-law-indigo">
        {children}
      </div>
    </div>
  );
}
