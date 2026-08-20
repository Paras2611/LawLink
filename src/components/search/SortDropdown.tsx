import React from 'react';

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-law-text-muted">Sort by:</span>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="text-sm bg-white border border-law-border rounded-lg px-2 py-1 focus:outline-none focus:border-law-indigo text-law-text-primary"
      >
        <option value="relevance">Relevance</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
}
