import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  defaultTabId?: string;
}

export function Tabs({ tabs, defaultTabId, className, ...props }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="border-b border-law-border">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeId === tab.id
                  ? "border-law-indigo text-law-indigo"
                  : "border-transparent text-law-text-secondary hover:text-law-text-primary hover:border-law-border"
              )}
              aria-current={activeId === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-6 focus:outline-none">
        {tabs.find(t => t.id === activeId)?.content}
      </div>
    </div>
  );
}
