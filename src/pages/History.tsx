import React, { useState, useEffect, useMemo } from 'react';
import { History as HistoryIcon } from 'lucide-react';
import { fetchHistory, deleteHistoryItem, renameHistoryItem } from '../lib/research/researchService';
import { HistoryItem, HistoryGroup } from '../lib/research/types';
import { HistoryCard } from '../components/research/HistoryCard';
import { ResearchSearch } from '../components/research/ResearchSearch';
import { EmptyResearchState } from '../components/research/EmptyResearchState';
import { ResearchSkeleton } from '../components/research/ResearchSkeleton';

export function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await fetchHistory(searchQuery);
      setItems(data);
    } catch (error) {
      console.error("Failed to load history", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search slightly in a real app, here we just re-fetch on change since it's mock
  useEffect(() => {
    const timer = setTimeout(() => {
      loadHistory();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDelete = async (id: string) => {
    await deleteHistoryItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  const handleRename = async (id: string, newTitle: string) => {
    await renameHistoryItem(id, newTitle);
    setItems(items.map(item => item.id === id ? { ...item, title: newTitle } : item));
  };

  const handleArchive = async (id: string) => {
    await deleteHistoryItem(id); // Using delete as mock archive
    setItems(items.filter(item => item.id !== id));
  };

  const groupedItems = useMemo(() => {
    const groups: Record<HistoryGroup, HistoryItem[]> = {
      'Today': [],
      'Yesterday': [],
      'Previous 7 Days': [],
      'Older': []
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;
    const lastWeek = today - 7 * 86400000;

    items.forEach(item => {
      const itemDate = new Date(item.lastActivity).getTime();
      if (itemDate >= today) {
        groups['Today'].push(item);
      } else if (itemDate >= yesterday) {
        groups['Yesterday'].push(item);
      } else if (itemDate >= lastWeek) {
        groups['Previous 7 Days'].push(item);
      } else {
        groups['Older'].push(item);
      }
    });

    return groups;
  }, [items]);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 z-10 shrink-0 pb-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-law-indigo mb-4">
              <HistoryIcon size={20} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary">Research History</h1>
            <p className="text-sm text-law-text-secondary mt-1">Pick up where you left off on past legal research.</p>
          </div>
          <div className="w-full md:w-80">
            <ResearchSearch 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search conversations..." 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <ResearchSkeleton />
          ) : items.length === 0 ? (
            <EmptyResearchState 
              title={searchQuery ? "No matching conversations found" : "No research history yet"}
              description={searchQuery ? "Try adjusting your search terms to find what you're looking for." : "Start a new chat to begin exploring legal precedents, statutes, and documents."}
              actionLabel={searchQuery ? undefined : "Start New Research"}
              actionRoute={searchQuery ? undefined : "/chat"}
            />
          ) : (
            <div className="space-y-8">
              {(Object.entries(groupedItems) as [HistoryGroup, HistoryItem[]][]).map(([group, groupItems]) => {
                if (groupItems.length === 0) return null;
                return (
                  <section key={group}>
                    <h2 className="text-sm font-bold text-law-text-muted uppercase tracking-wider mb-3 px-1">{group}</h2>
                    <div className="space-y-3">
                      {groupItems.map(item => (
                        <HistoryCard 
                          key={item.id} 
                          item={item} 
                          onDelete={handleDelete}
                          onRename={handleRename}
                          onArchive={handleArchive}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
