import React from 'react';
import { EvidencePanel } from '../components/verification/EvidencePanel';
import { mockSources, mockClaims, mockCitations } from '../lib/verification/mockData';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function EvidenceDemo() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 shrink-0 pb-6">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-law-text-muted hover:text-law-indigo transition-colors mb-4 w-fit"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          <div className="mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary">Evidence & Verification UI</h1>
            <p className="text-sm text-law-text-secondary mt-1">Component demonstration for legal verification states.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Evidence Panel Component */}
          <EvidencePanel 
            sources={mockSources}
            claims={mockClaims}
            citations={mockCitations}
          />
        </div>
      </div>
    </div>
  );
}
