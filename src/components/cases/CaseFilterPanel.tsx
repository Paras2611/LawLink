import React from 'react';
import { CaseFilters } from '../../lib/cases/types';
import { Filter, X } from 'lucide-react';

interface CaseFilterPanelProps {
  filters: CaseFilters;
  setFilters: React.Dispatch<React.SetStateAction<CaseFilters>>;
  onClose?: () => void;
  isMobile?: boolean;
}

export function CaseFilterPanel({ filters, setFilters, onClose, isMobile }: CaseFilterPanelProps) {
  const handleToggle = (category: keyof CaseFilters, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      }
      return { ...prev, [category]: [...current, value] };
    });
  };

  const FilterSection = ({ title, category, options }: { title: string, category: keyof CaseFilters, options: string[] }) => (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-law-text-primary mb-3 uppercase tracking-wider">{title}</h4>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-law-border text-law-indigo focus:ring-law-indigo"
              checked={filters[category].includes(opt)}
              onChange={() => handleToggle(category, opt)}
            />
            <span className="text-sm text-law-text-secondary group-hover:text-law-text-primary transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col h-full bg-white ${!isMobile ? 'border border-law-border rounded-2xl p-5 shadow-sm' : ''}`}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-law-border bg-slate-50">
          <div className="flex items-center gap-2 font-semibold text-law-text-primary">
            <Filter size={18} className="text-law-indigo" />
            Filters
          </div>
          <button onClick={onClose} className="p-1.5 text-law-text-muted hover:bg-white hover:text-law-text-primary rounded-lg transition-colors border border-transparent hover:border-law-border">
            <X size={18} />
          </button>
        </div>
      )}
      
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-5' : ''}`}>
        {!isMobile && (
          <div className="flex items-center gap-2 font-semibold text-law-text-primary mb-5 border-b border-law-border pb-3">
            <Filter size={18} className="text-law-indigo" />
            Filters
          </div>
        )}

        <FilterSection 
          title="Court" 
          category="court" 
          options={['Supreme Court of India', 'Delhi High Court', 'Bombay High Court', 'Karnataka High Court']} 
        />
        
        <FilterSection 
          title="Case Type" 
          category="caseType" 
          options={['Civil Appeal', 'Criminal Appeal', 'Writ Petition', 'Commercial Suit']} 
        />
        
        <FilterSection 
          title="Jurisdiction" 
          category="jurisdiction" 
          options={['Appellate', 'Original', 'Writ Jurisdiction', 'Commercial Appellate']} 
        />
      </div>

      {isMobile && (
        <div className="p-4 border-t border-law-border bg-white">
          <button onClick={onClose} className="w-full py-2.5 bg-law-indigo text-white font-medium rounded-xl hover:bg-law-navy transition-colors">
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
