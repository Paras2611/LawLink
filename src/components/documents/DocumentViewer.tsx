import React, { useState } from 'react';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download, Printer, Search, Maximize } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Document } from '../../lib/documents/types';

interface DocumentViewerProps {
  document: Document;
  className?: string;
  onPageChange?: (page: number) => void;
}

export function DocumentViewer({ document, className, onPageChange }: DocumentViewerProps) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 12; // Mock total pages

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(p => p - 1);
      onPageChange?.(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(p => p + 1);
      onPageChange?.(page + 1);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-slate-100 border border-law-border rounded-xl overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="h-12 bg-white border-b border-law-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded transition-colors" title="Zoom Out" onClick={() => setZoom(Math.max(50, zoom - 10))}>
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-medium text-law-text-secondary w-12 text-center">{zoom}%</span>
          <button className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded transition-colors" title="Zoom In" onClick={() => setZoom(Math.min(200, zoom + 10))}>
            <ZoomIn size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded transition-colors disabled:opacity-30" 
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-medium text-law-text-secondary">
            Page {page} of {totalPages}
          </span>
          <button 
            className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded transition-colors disabled:opacity-30" 
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded transition-colors" title="Search">
            <Search size={16} />
          </button>
          <button className="p-1.5 text-law-text-muted hover:bg-slate-100 rounded transition-colors" title="Download">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Viewer Area */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-slate-200">
        <div 
          className="bg-white shadow-md border border-law-border/50 relative flex flex-col transition-transform origin-top"
          style={{ 
            width: '100%', 
            maxWidth: '800px', 
            minHeight: '1000px',
            transform: `scale(${zoom / 100})`
          }}
        >
          {/* Document Content Placeholder */}
          <div className="p-12 space-y-6">
            <div className="h-8 bg-slate-100 rounded w-3/4 mb-12"></div>
            
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-indigo-50/50 rounded w-full relative">
                 <div className="absolute -left-2 top-0 bottom-0 w-1 bg-indigo-400 rounded-l"></div>
              </div>
              <div className="h-4 bg-indigo-50/50 rounded w-5/6"></div>
              <div className="h-4 bg-slate-100 rounded w-4/6"></div>
            </div>

             <div className="space-y-3">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-white/40">
              <span className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded shadow-lg backdrop-blur-sm">
                PDF Rendering Placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
