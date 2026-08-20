import React from 'react';
import { cn } from '@/src/lib/utils';
import { SavedItemType } from '../../lib/research/types';

interface Tab {
  id: SavedItemType | 'all';
  label: string;
}

interface ResearchTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: any) => void;
}

export function ResearchTabs({ tabs, activeTab, onChange }: ResearchTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
            activeTab === tab.id
              ? "bg-law-indigo text-white shadow-sm"
              : "bg-white border border-law-border text-law-text-secondary hover:text-law-text-primary hover:border-law-indigo/50"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
