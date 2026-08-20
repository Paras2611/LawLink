import React, { useState } from 'react';
import { Clock, Archive, Trash2, Edit2, Play, Check, X, FileText } from 'lucide-react';
import { HistoryItem } from '../../lib/research/types';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

interface HistoryCardProps {
  item: HistoryItem;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onArchive: (id: string) => void;
}

export function HistoryCard({ item, onDelete, onRename, onArchive }: HistoryCardProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveRename = () => {
    if (editTitle.trim() && editTitle !== item.title) {
      onRename(item.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleCancelRename = () => {
    setEditTitle(item.title);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-law-border rounded-xl p-4 sm:p-5 hover:border-law-indigo/50 transition-colors group flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex-1 min-w-0 w-full">
        {isEditing ? (
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-law-indigo rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-law-indigo/20 text-law-text-primary"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveRename();
                if (e.key === 'Escape') handleCancelRename();
              }}
            />
            <button onClick={handleSaveRename} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg">
              <Check size={16} />
            </button>
            <button onClick={handleCancelRename} className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded-lg">
              <X size={16} />
            </button>
          </div>
        ) : (
          <h3 className="text-base font-semibold text-law-text-primary mb-1 truncate flex items-center gap-2">
             <FileText size={16} className="text-law-indigo shrink-0 hidden sm:block" />
            {item.title}
          </h3>
        )}
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-law-text-secondary mt-1">
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-law-text-muted" />
            {new Date(item.lastActivity).toLocaleDateString()}
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-law-border mt-2 sm:mt-0">
        {isDeleting ? (
          <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
            <span className="text-xs font-semibold text-rose-700">Delete?</span>
            <button onClick={() => onDelete(item.id)} className="text-xs font-bold text-rose-700 hover:text-rose-900 px-2">Yes</button>
            <button onClick={() => setIsDeleting(false)} className="text-xs font-medium text-law-text-muted hover:text-law-text-primary px-2">No</button>
          </div>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 text-law-text-muted hover:text-law-indigo hover:bg-indigo-50 rounded-lg transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
              title="Rename"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => onArchive(item.id)}
              className="p-2 text-law-text-muted hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
              title="Archive"
            >
              <Archive size={16} />
            </button>
            <button 
              onClick={() => setIsDeleting(true)}
              className="p-2 text-law-text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 bg-law-bg border border-law-border text-law-indigo text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-indigo-50 hover:border-indigo-100 transition-colors"
            >
              <Play size={12} />
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
