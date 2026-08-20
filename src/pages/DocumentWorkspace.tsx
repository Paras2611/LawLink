import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, PanelLeftClose, PanelRightClose } from 'lucide-react';
import { getDocumentAnalysis } from '../lib/documents/documentService';
import { Document } from '../lib/documents/types';
import { DocumentViewer } from '../components/documents/DocumentViewer';
import { AnalysisPanel } from '../components/documents/AnalysisPanel';
import { cn } from '@/src/lib/utils';

export function DocumentWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Layout state
  const [showViewer, setShowViewer] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [activeMobileTab, setActiveMobileTab] = useState<'viewer' | 'analysis'>('analysis');

  useEffect(() => {
    async function loadDocument() {
      if (!id) return;
      setIsLoading(true);
      try {
        const doc = await getDocumentAnalysis(id);
        setDocument(doc);
      } catch (error) {
        console.error("Failed to load document", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDocument();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-law-indigo/30 border-t-law-indigo rounded-full animate-spin mb-4" />
          <p className="text-law-text-secondary">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (!document || !document.analysis) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-law-text-primary mb-2">Document not found</h2>
          <p className="text-law-text-secondary mb-4">The requested document could not be located.</p>
          <button 
            onClick={() => navigate('/documents')}
            className="px-4 py-2 bg-law-indigo text-white font-medium rounded-lg hover:bg-law-navy transition-colors"
          >
            Upload New Document
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-law-border px-4 py-3 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/documents')}
            className="p-1.5 text-law-text-muted hover:bg-slate-100 hover:text-law-text-primary rounded-lg transition-colors"
            title="Back to Documents"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-law-indigo shrink-0">
            <FileText size={16} />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-law-text-primary truncate">{document.filename}</h1>
            <div className="flex items-center gap-2 text-xs text-law-text-muted">
              <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{(document.size / 1024 / 1024).toFixed(1)} MB</span>
              {document.isDemo && (
                <span className="ml-2 px-1.5 py-0.5 bg-orange-100 text-orange-800 rounded font-bold uppercase text-[9px] tracking-wider">Demo</span>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Panel Controls */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-law-border">
          <button 
            onClick={() => { setShowViewer(!showViewer); if(!showViewer) setShowAnalysis(true); }}
            className={cn("p-1.5 rounded transition-colors", showViewer ? "bg-white shadow-sm text-law-indigo" : "text-law-text-muted hover:text-law-text-primary")}
            title="Toggle Viewer"
          >
            <PanelLeftClose size={16} />
          </button>
          <button 
            onClick={() => { setShowAnalysis(!showAnalysis); if(!showAnalysis) setShowViewer(true); }}
            className={cn("p-1.5 rounded transition-colors", showAnalysis ? "bg-white shadow-sm text-law-indigo" : "text-law-text-muted hover:text-law-text-primary")}
            title="Toggle Analysis"
          >
            <PanelRightClose size={16} />
          </button>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex items-center bg-slate-100 p-1 rounded-lg border border-law-border">
           <button 
            onClick={() => setActiveMobileTab('viewer')}
            className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", activeMobileTab === 'viewer' ? "bg-white shadow-sm text-law-indigo" : "text-law-text-muted")}
          >
            Viewer
          </button>
          <button 
            onClick={() => setActiveMobileTab('analysis')}
            className={cn("px-3 py-1 text-xs font-medium rounded transition-colors", activeMobileTab === 'analysis' ? "bg-white shadow-sm text-law-indigo" : "text-law-text-muted")}
          >
            Analysis
          </button>
        </div>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-4 p-4">
        
        {/* Viewer Panel (Desktop & Mobile) */}
        <div className={cn(
          "h-full flex-col",
          // Desktop: shown if toggled
          showViewer ? "lg:flex" : "lg:hidden",
          // Split sizes based on what's visible
          showViewer && showAnalysis ? "lg:w-1/2" : "lg:w-full",
          // Mobile: shown if active tab
          activeMobileTab === 'viewer' ? "flex w-full" : "hidden lg:flex"
        )}>
          <DocumentViewer document={document} />
        </div>

        {/* Analysis Panel (Desktop & Mobile) */}
        <div className={cn(
          "h-full flex-col min-w-[320px]",
          // Desktop: shown if toggled
          showAnalysis ? "lg:flex" : "lg:hidden",
          // Split sizes
          showViewer && showAnalysis ? "lg:w-1/2" : "lg:w-full",
           // Mobile: shown if active tab
          activeMobileTab === 'analysis' ? "flex w-full" : "hidden lg:flex"
        )}>
          <AnalysisPanel 
            analysis={document.analysis} 
            onViewInDocument={(page) => {
              if (window.innerWidth < 1024) setActiveMobileTab('viewer');
              if (!showViewer) setShowViewer(true);
              // Handle page navigation here in a real implementation
              console.log("Navigating to page", page);
            }} 
          />
        </div>

      </div>
    </div>
  );
}
