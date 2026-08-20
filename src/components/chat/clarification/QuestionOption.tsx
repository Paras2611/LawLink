import React from 'react';
import { cn } from '@/src/lib/utils';
import { Check } from 'lucide-react';

interface QuestionOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  type?: 'radio' | 'checkbox';
}

export function QuestionOption({ label, selected, onClick, type = 'radio' }: QuestionOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-3 md:p-4 text-left border rounded-xl transition-all duration-200",
        selected 
          ? "border-law-indigo bg-law-indigo/5 text-law-navy shadow-sm" 
          : "border-law-border bg-white hover:border-slate-300 hover:bg-slate-50 text-law-text-primary"
      )}
    >
      <div className={cn(
        "w-5 h-5 flex items-center justify-center shrink-0 border transition-colors",
        type === 'radio' ? "rounded-full" : "rounded-[4px]",
        selected 
          ? "border-law-indigo bg-law-indigo text-white" 
          : "border-slate-300 bg-white"
      )}>
        {selected && <Check size={14} strokeWidth={3} />}
      </div>
      <span className="font-medium text-sm leading-tight">{label}</span>
    </button>
  );
}
