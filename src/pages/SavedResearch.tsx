import { useState } from 'react';
import { Trash2, Filter, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type Tab = 'cases' | 'sections' | 'documents';

export function SavedResearch() {
  const [activeTab, setActiveTab] = useState<Tab>('cases');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'cases', label: 'Cases' },
    { id: 'sections', label: 'Sections' },
    { id: 'documents', label: 'Documents' },
  ];

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const mockData = {
    cases: [
      { id: 'c1', title: 'Kesavananda Bharati v. State of Kerala', savedOn: 'Aug 19, 2026' },
      { id: 'c2', title: 'Justice K.S. Puttaswamy v. Union of India', savedOn: 'Aug 18, 2026' },
    ],
    sections: [
      { id: 's1', title: 'Article 21 - Constitution of India', savedOn: 'Aug 19, 2026' },
    ],
    documents: [
      { id: 'd1', title: 'Employment_Agreement_Template_2026.pdf', savedOn: 'Aug 17, 2026' },
    ]
  };

  const currentData = mockData[activeTab];

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-2 md:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-950">Saved Research</h1>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-slate-200 rounded-md text-xs md:text-sm text-slate-600 hover:bg-slate-50 bg-white shadow-sm">
            <Filter size={16} /> Filter
          </button>
          {selectedIds.length > 0 && (
            <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-50 border border-red-200 rounded-md text-xs md:text-sm text-red-600 hover:bg-red-100 shadow-sm transition-colors">
              <Trash2 size={16} /> Delete ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-slate-200 mb-6 md:mb-8 overflow-x-auto">
        <div className="flex gap-6 md:gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedIds([]); }}
              className={cn(
                "pb-3 md:pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id ? "border-slate-900 text-slate-950" : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        {currentData.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {currentData.map(item => (
              <div key={item.id} className="p-4 md:p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-slate-900 truncate">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Saved on {item.savedOn}</p>
                </div>
                <button className="text-slate-400 hover:text-slate-900 p-2 rounded-md hover:bg-slate-200/50 transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 md:p-8 text-center text-sm md:text-base text-slate-500">
            No saved {activeTab} yet. Start your research to save items here.
          </div>
        )}
      </div>
    </div>
  );
}
