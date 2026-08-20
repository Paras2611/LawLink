import React, { useState } from 'react';
import { ExternalLink, Edit2, Share2, Trash2, Archive, Check, X, FileText, Scale, BookOpen, MessageSquare } from 'lucide-react';
import { SavedItem } from '../../lib/research/types';
import { cn } from '@/src/lib/utils';

interface SavedResearchCardProps {
  item: SavedItem;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onArchive: (id: string) => void;
  onShare: (id: string) => void;
}

export function SavedResearchCard({ item, onDelete, onRename, onArchive, onShare }: SavedResearchCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveRename = () => {
    if (editTitle.trim() && editTitle !== item.title) {
      onRename(item.id, editTitle);
    }
    setIsEditing(false);
  };

  const getTypeConfig = (type: SavedItem['type']) => {
    switch (type) {
      case 'answers': return { icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', label: 'Answer' };
      case 'cases': return { icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', label: 'Case' };
      case 'documents': return { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', label: 'Document' };
      case 'sections': return { icon: FileText, color: 'text-law-indigo', bg: 'bg-indigo-50 border-indigo-100', label: 'Section' };
      case 'sources': return { icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', label: 'Source' };
    }
  };

  const config = getTypeConfig(item.type);
  const Icon = config.icon;

  return (
    <div className="bg-white border border-law-border rounded-xl p-4 sm:p-5 hover:shadow-sm hover:border-law-indigo/30 transition-all flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border mt-1", config.bg, config.color)}>
        <Icon size={18} />
      </div>
      
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-law-text-muted">
            {config.label}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-law-text-muted">
            Saved {new Date(item.dateSaved).toLocaleDateString()}
          </span>
        </div>

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
                if (e.key === 'Escape') setIsEditing(false);
              }}
            />
            <button onClick={handleSaveRename} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg">
              <Check size={16} />
            </button>
            <button onClick={() => setIsEditing(false)} className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded-lg">
              <X size={16} />
            </button>
          </div>
        ) : (
          <h3 className="text-base font-semibold text-law-text-primary mb-1.5 line-clamp-2">
            {item.title}
          </h3>
        )}

        <p className="text-sm text-law-text-secondary leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-law-border sm:hidden flex-wrap">
           {/* Mobile Actions */}
           <button onClick={() => {}} className="flex items-center gap-1.5 text-xs font-medium text-law-indigo bg-indigo-50 px-3 py-1.5 rounded-lg" aria-label="Open Item">
             <ExternalLink size={14} /> Open
           </button>
           <button onClick={() => setIsEditing(true)} className="p-1.5 text-law-text-muted bg-slate-50 rounded-lg" aria-label="Rename"><Edit2 size={14} /></button>
           <button onClick={() => onShare(item.id)} className="p-1.5 text-law-text-muted bg-slate-50 rounded-lg" aria-label="Share"><Share2 size={14} /></button>
           <button onClick={() => setIsDeleting(true)} className="p-1.5 text-law-text-muted bg-slate-50 rounded-lg" aria-label="Delete"><Trash2 size={14} /></button>
        </div>
      </div>

      <div className="hidden sm:flex flex-col gap-2 shrink-0 border-l border-law-border pl-6 py-1">
        {isDeleting ? (
          <div className="flex flex-col items-center gap-2 bg-rose-50 p-2 rounded-lg border border-rose-100 w-28">
            <span className="text-xs font-semibold text-rose-700 text-center">Delete?</span>
            <div className="flex gap-2">
               <button onClick={() => onDelete(item.id)} className="text-xs font-bold text-rose-700 hover:bg-rose-100 px-2 py-1 rounded">Yes</button>
               <button onClick={() => setIsDeleting(false)} className="text-xs font-medium text-law-text-muted hover:bg-slate-200 px-2 py-1 rounded">No</button>
            </div>
          </div>
        ) : (
          <>
            <button className="flex items-center gap-2 text-sm font-medium text-law-indigo hover:text-indigo-800 transition-colors py-1">
              <ExternalLink size={14} /> Open Item
            </button>
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm text-law-text-secondary hover:text-law-text-primary transition-colors py-1">
              <Edit2 size={14} /> Rename
            </button>
            <button onClick={() => onShare(item.id)} className="flex items-center gap-2 text-sm text-law-text-secondary hover:text-law-text-primary transition-colors py-1">
              <Share2 size={14} /> Share
            </button>
            <button onClick={() => onArchive(item.id)} className="flex items-center gap-2 text-sm text-law-text-secondary hover:text-law-text-primary transition-colors py-1">
              <Archive size={14} /> Archive
            </button>
            <button onClick={() => setIsDeleting(true)} className="flex items-center gap-2 text-sm text-rose-600 hover:text-rose-800 transition-colors py-1">
              <Trash2 size={14} /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
