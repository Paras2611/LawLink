import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { fetchSavedResearch, deleteSavedItem, renameHistoryItem } from '../lib/research/researchService';
import { SavedItem, SavedItemType } from '../lib/research/types';
import { SavedResearchCard } from '../components/research/SavedResearchCard';
import { ResearchSearch } from '../components/research/ResearchSearch';
import { ResearchTabs } from '../components/research/ResearchTabs';
import { EmptyResearchState } from '../components/research/EmptyResearchState';
import { ResearchSkeleton } from '../components/research/ResearchSkeleton';

export function SavedResearch() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SavedItemType | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const tabs: { id: SavedItemType | 'all', label: string }[] = [
    { id: 'all', label: 'All Saved' },
    { id: 'answers', label: 'Answers' },
    { id: 'sections', label: 'Sections' },
    { id: 'cases', label: 'Cases' },
    { id: 'documents', label: 'Documents' },
    { id: 'sources', label: 'Sources' }
  ];

  const loadSavedItems = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSavedResearch(searchQuery, activeTab);
      setItems(data);
    } catch (error) {
      console.error("Failed to load saved research", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSavedItems();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab]);

  const handleDelete = async (id: string) => {
    await deleteSavedItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  const handleRename = async (id: string, newTitle: string) => {
    await renameHistoryItem(id, newTitle); // Mocking with history rename
    setItems(items.map(item => item.id === id ? { ...item, title: newTitle } : item));
  };

  const handleArchive = async (id: string) => {
    await deleteSavedItem(id); // Mocking archive as delete
    setItems(items.filter(item => item.id !== id));
  };

  const handleShare = (id: string) => {
    console.log("Sharing item", id);
    // In a real app, open a share modal
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 z-10 shrink-0 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-law-indigo mb-4">
                <Bookmark size={20} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary">Saved Research</h1>
              <p className="text-sm text-law-text-secondary mt-1">Organize and revisit your saved cases, documents, and answers.</p>
            </div>
            <div className="w-full md:w-80">
              <ResearchSearch 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder="Search saved items..." 
              />
            </div>
          </div>
          
          <ResearchTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <ResearchSkeleton />
          ) : items.length === 0 ? (
            <EmptyResearchState 
              title={searchQuery ? "No matching saved items" : "No saved research yet"}
              description={searchQuery ? "Try adjusting your search terms or filters." : "When you find useful cases, sections, or AI answers, save them to build your personal library."}
              actionLabel={searchQuery ? undefined : "Go to Chat"}
              actionRoute={searchQuery ? undefined : "/chat"}
            />
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <SavedResearchCard 
                  key={item.id} 
                  item={item} 
                  onDelete={handleDelete}
                  onRename={handleRename}
                  onArchive={handleArchive}
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
