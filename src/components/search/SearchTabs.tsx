import React from 'react';
import { cn } from '@/src/lib/utils';

export const SEARCH_TABS = [
  { id: 'all', label: 'All Results' },
  { id: 'acts', label: 'Acts' },
  { id: 'sections', label: 'Sections' },
  { id: 'regulations', label: 'Regulations' },
  { id: 'judgments', label: 'Judgments' }
];

interface SearchTabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function SearchTabs({ activeTab, onChange }: SearchTabsProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide border-b border-law-border">
      {SEARCH_TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors relative",
            activeTab === tab.id 
              ? "text-law-indigo" 
              : "text-law-text-muted hover:text-law-text-primary"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-law-indigo rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}
