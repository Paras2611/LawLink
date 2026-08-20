import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Document } from '../../lib/documents/types';

interface DocumentProgressProps {
  status: Document['status'];
  className?: string;
}

export function DocumentProgress({ status, className }: DocumentProgressProps) {
  const steps = [
    { id: 'uploading', label: 'Uploading Document' },
    { id: 'extracting', label: 'Extracting Text' },
    { id: 'analyzing', label: 'Analyzing Clauses' },
    { id: 'finding_law', label: 'Finding Relevant Law' },
    { id: 'verifying', label: 'Verifying Claims' },
    { id: 'complete', label: 'Analysis Complete' }
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === status);

    if (status === 'failed') return 'failed';
    if (status === 'idle') return 'pending';
    
    // Once complete, everything is done
    if (status === 'complete') return 'completed';
    
    // For ongoing status
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className={cn("bg-white border border-law-border rounded-xl p-6", className)}>
      <h3 className="text-sm font-bold text-law-text-primary mb-4 uppercase tracking-wider">Processing Status</h3>
      <div className="space-y-4">
        {steps.map((step) => {
          const stepStatus = getStepStatus(step.id);
          
          return (
            <div key={step.id} className="flex items-center gap-3">
              <div className="shrink-0">
                {stepStatus === 'completed' && <CheckCircle2 size={18} className="text-emerald-500" />}
                {stepStatus === 'current' && <Loader2 size={18} className="text-law-indigo animate-spin" />}
                {stepStatus === 'pending' && <Circle size={18} className="text-slate-200" />}
                {stepStatus === 'failed' && <Circle size={18} className="text-rose-500" />}
              </div>
              <span className={cn(
                "text-sm font-medium transition-colors",
                stepStatus === 'completed' ? "text-law-text-primary" :
                stepStatus === 'current' ? "text-law-indigo font-bold" :
                stepStatus === 'failed' ? "text-rose-600" :
                "text-law-text-muted"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
