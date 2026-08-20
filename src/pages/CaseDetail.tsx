import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCaseDetails } from '../lib/cases/caseService';
import { CaseDocument } from '../lib/cases/types';
import { CaseHeader } from '../components/cases/CaseHeader';
import { CaseSection } from '../components/cases/CaseSection';
import { CaseTimeline } from '../components/cases/CaseTimeline';
import { RelatedCaseCard } from '../components/cases/RelatedCaseCard';
import { Scale, BookOpen, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function CaseDetail() {
  const { id } = useParams();
  const [caseDoc, setCaseDoc] = useState<CaseDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('summary');

  useEffect(() => {
    async function loadCase() {
      setIsLoading(true);
      if (id) {
        const data = await getCaseDetails(id);
        setCaseDoc(data);
      }
      setIsLoading(false);
    }
    loadCase();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-law-indigo/30 border-t-law-indigo rounded-full animate-spin mb-4" />
          <p className="text-law-text-secondary">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseDoc) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-law-text-primary mb-2">Case not found</h2>
          <p className="text-law-text-secondary">The requested case document could not be located.</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'summary', label: 'Case Summary' },
    { id: 'facts', label: 'Facts of the Case' },
    { id: 'issues', label: 'Legal Issues' },
    { id: 'reasoning', label: 'Court Reasoning' },
    { id: 'citations', label: 'Citations' }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <CaseHeader caseDoc={caseDoc} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 space-y-8">
            <CaseSection id="summary" title="Case Summary">
              <p className="text-lg leading-relaxed text-law-text-secondary">{caseDoc.summary}</p>
              
              {caseDoc.provisions && caseDoc.provisions.length > 0 && (
                <div className="mt-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-indigo-900 mb-3 uppercase tracking-wider">
                    <BookOpen size={16} />
                    Relevant Provisions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {caseDoc.provisions.map(prov => (
                      <span key={prov} className="px-3 py-1.5 bg-white text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium shadow-sm">
                        {prov}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CaseSection>

            {caseDoc.facts && (
              <CaseSection id="facts" title="Facts of the Case">
                <p className="whitespace-pre-wrap">{caseDoc.facts}</p>
              </CaseSection>
            )}

            {caseDoc.issues && caseDoc.issues.length > 0 && (
              <CaseSection id="issues" title="Legal Issues Addressed">
                <ul className="space-y-4 list-none p-0">
                  {caseDoc.issues.map((issue, idx) => (
                    <li key={idx} className="flex gap-3 bg-slate-50 border border-law-border rounded-xl p-4">
                      <div className="w-6 h-6 rounded-full bg-white border border-law-border flex items-center justify-center text-sm font-bold text-law-indigo shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-law-text-primary font-medium">{issue}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            )}

            {(caseDoc.courtReasoning || caseDoc.outcome || caseDoc.judgmentSummary) && (
              <CaseSection id="reasoning" title="Judgment & Court Reasoning">
                {caseDoc.judgmentSummary && (
                  <div className="mb-6 p-5 bg-amber-50/50 border border-amber-200 rounded-xl">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2 uppercase tracking-wider">
                      <Scale size={16} />
                      Judgment Summary
                    </h4>
                    <p className="text-amber-950">{caseDoc.judgmentSummary}</p>
                  </div>
                )}
                
                {caseDoc.courtReasoning && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-law-text-primary mb-2">Detailed Reasoning</h4>
                    <p className="whitespace-pre-wrap">{caseDoc.courtReasoning}</p>
                  </div>
                )}

                {caseDoc.outcome && (
                  <div className="mt-8 pt-6 border-t border-law-border">
                    <h4 className="font-semibold text-law-text-primary mb-2">Final Outcome</h4>
                    <div className="flex items-start gap-3 p-4 bg-green-50/50 border border-green-200 rounded-xl">
                      <div className="shrink-0 mt-0.5 text-green-600">
                        <Scale size={18} />
                      </div>
                      <p className="text-green-900 font-medium">{caseDoc.outcome}</p>
                    </div>
                  </div>
                )}
              </CaseSection>
            )}

            {((caseDoc.citedCases && caseDoc.citedCases.length > 0) || (caseDoc.citingCases && caseDoc.citingCases.length > 0)) && (
              <CaseSection id="citations" title="Citations">
                {caseDoc.citedCases && caseDoc.citedCases.length > 0 && (
                  <div className="mb-8">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-law-text-secondary mb-4 uppercase tracking-wider">
                      Cases cited by this judgment
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseDoc.citedCases.map(rc => (
                        <RelatedCaseCard key={rc.id} relatedCase={rc} />
                      ))}
                    </div>
                  </div>
                )}
              </CaseSection>
            )}
          </div>

          {/* Right Sidebar - Navigation & Timeline */}
          <div className="w-full lg:w-[320px] shrink-0 space-y-6">
            
            {/* Sticky Navigation */}
            <div className="bg-white border border-law-border rounded-2xl p-5 sticky top-6 hidden lg:block">
              <h3 className="text-sm font-semibold text-law-text-secondary uppercase tracking-wider mb-4">Contents</h3>
              <nav className="space-y-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left",
                      activeSection === section.id
                        ? "bg-law-bg text-law-indigo font-medium"
                        : "text-law-text-secondary hover:bg-slate-50 hover:text-law-text-primary"
                    )}
                  >
                    {section.label}
                    {activeSection === section.id && <ArrowRight size={14} />}
                  </button>
                ))}
              </nav>
            </div>

            {/* Timeline */}
            {caseDoc.timeline && caseDoc.timeline.length > 0 && (
              <div className="sticky top-[320px]">
                <CaseTimeline events={caseDoc.timeline} />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
