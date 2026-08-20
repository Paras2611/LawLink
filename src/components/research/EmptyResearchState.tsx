import React from 'react';
import { FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyResearchStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionRoute?: string;
}

export function EmptyResearchState({ title, description, actionLabel, actionRoute }: EmptyResearchStateProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-law-border rounded-xl bg-white/50">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-law-text-muted">
        <FolderOpen size={32} />
      </div>
      <h3 className="text-lg font-bold text-law-text-primary mb-2">{title}</h3>
      <p className="text-sm text-law-text-secondary max-w-sm mb-6">{description}</p>
      {actionLabel && actionRoute && (
        <button
          onClick={() => navigate(actionRoute)}
          className="px-5 py-2.5 bg-law-indigo text-white text-sm font-medium rounded-lg hover:bg-law-navy transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
