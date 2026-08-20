import React, { useState } from 'react';
import { FileText, Users, Calendar, AlertTriangle, BookOpen, Brain, Download, Bookmark, MessageSquare, ExternalLink } from 'lucide-react';
import { DocumentAnalysis } from '../../lib/documents/types';
import { RiskBadge } from './RiskBadge';
import { ClauseCard } from './ClauseCard';
import { RelatedLawCard } from './RelatedLawCard';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

interface AnalysisPanelProps {
  analysis: DocumentAnalysis;
  onViewInDocument?: (page?: number) => void;
  className?: string;
}

export function AnalysisPanel({ analysis, onViewInDocument, className }: AnalysisPanelProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'clauses' | 'risks' | 'laws'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'clauses', label: `Clauses (${analysis.clauses.length})` },
    { id: 'risks', label: `Risks (${analysis.risks.length})` },
    { id: 'laws', label: `Laws (${analysis.relatedLaws.length})` }
  ] as const;

  return (
    <div className={cn("flex flex-col h-full bg-white border border-law-border rounded-xl overflow-hidden", className)}>
      <div className="p-5 border-b border-law-border bg-slate-50/50">
        <h2 className="text-lg font-bold text-law-text-primary mb-1">AI Document Analysis</h2>
        <p className="text-xs text-law-text-muted">AI-assisted analysis — requires professional legal review.</p>
      </div>

      <div className="flex border-b border-law-border px-2 overflow-x-auto no-scrollbar shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab.id 
                ? "border-law-indigo text-law-indigo" 
                : "border-transparent text-law-text-muted hover:text-law-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-bold text-law-text-muted uppercase tracking-wider flex items-center gap-2 mb-3">
                <FileText size={14} /> Document Type
              </h3>
              <div className="bg-slate-50 border border-law-border rounded-lg p-3">
                <span className="font-medium text-law-text-primary">{analysis.documentType}</span>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-law-text-muted uppercase tracking-wider flex items-center gap-2 mb-3">
                <Users size={14} /> Parties
              </h3>
              <div className="space-y-2">
                {analysis.parties.map((party, idx) => (
                  <div key={idx} className="bg-slate-50 border border-law-border rounded-lg p-3 flex justify-between items-center">
                    <span className="font-medium text-law-text-primary">{party.name}</span>
                    <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded-md font-semibold">{party.role}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-law-text-muted uppercase tracking-wider flex items-center gap-2 mb-3">
                <Calendar size={14} /> Key Dates
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {analysis.dates.map((date, idx) => (
                  <div key={idx} className="bg-slate-50 border border-law-border rounded-lg p-3">
                    <div className="text-[10px] text-law-text-muted uppercase tracking-wider font-bold mb-1">{date.label}</div>
                    <div className="font-medium text-law-text-primary">{new Date(date.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-law-text-muted uppercase tracking-wider flex items-center gap-2 mb-3">
                <Brain size={14} /> AI Findings
              </h3>
              <ul className="space-y-3">
                {analysis.aiFindings.map((finding, idx) => (
                  <li key={idx} className="flex gap-3 bg-indigo-50/50 border border-indigo-100 rounded-lg p-4 text-sm text-indigo-900">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5 text-indigo-700 font-bold text-xs">
                      {idx + 1}
                    </div>
                    {finding}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'clauses' && (
          <div className="space-y-4">
            {analysis.clauses.map(clause => (
              <ClauseCard key={clause.id} clause={clause} onViewInDocument={onViewInDocument} />
            ))}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            {analysis.risks.map(risk => (
              <div key={risk.id} className="bg-white border border-law-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-law-border flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2">
                      <RiskBadge level={risk.level} />
                    </div>
                    <h4 className="font-semibold text-law-text-primary mb-1">{risk.title}</h4>
                    <p className="text-sm text-law-text-secondary leading-relaxed mb-3">{risk.description}</p>
                    {risk.suggestion && (
                      <div className="bg-amber-50 p-3 rounded text-sm text-amber-900 border border-amber-100">
                        <span className="font-semibold mr-1">Suggestion:</span>
                        {risk.suggestion}
                      </div>
                    )}
                  </div>
                </div>
                {risk.clauseId && (
                  <div className="bg-slate-50 px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-law-text-muted">Linked to clause in document</span>
                    <button 
                      onClick={() => onViewInDocument?.(analysis.clauses.find(c => c.id === risk.clauseId)?.page)}
                      className="text-xs font-medium text-law-indigo hover:text-indigo-800 transition-colors flex items-center gap-1"
                    >
                      View Clause <ExternalLink size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'laws' && (
          <div className="space-y-4">
             {analysis.relatedLaws.map(law => (
              <RelatedLawCard key={law.id} law={law} />
            ))}
          </div>
        )}

      </div>

      <div className="p-4 border-t border-law-border bg-slate-50 flex items-center justify-between shrink-0">
         <button className="p-2 text-law-text-muted hover:text-law-indigo rounded-lg transition-colors" title="Save Analysis">
           <Bookmark size={18} />
         </button>
         <div className="flex gap-2">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-law-border rounded-lg text-sm font-medium text-law-text-primary hover:bg-slate-50 transition-colors">
             <Download size={14} className="text-law-text-muted" />
             Report
           </button>
           <button 
             onClick={() => navigate('/chat')}
             className="flex items-center gap-2 px-3 py-1.5 bg-law-indigo text-white rounded-lg text-sm font-medium hover:bg-law-navy transition-colors"
           >
             <MessageSquare size={14} />
             Ask LawLink
           </button>
         </div>
      </div>
    </div>
  );
}
