import React, { useState } from 'react';
import { ClarificationData } from './types';
import { ProgressIndicator } from './ProgressIndicator';
import { QuestionGroup } from './QuestionGroup';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ClarificationCardProps {
  data: ClarificationData;
  onSubmit: (answers: Record<string, any>) => void;
  isCompleted?: boolean;
}

export function ClarificationCard({ data, onSubmit, isCompleted = false }: ClarificationCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(isCompleted);

  if (!data || !data.questions || data.questions.length === 0) return null;

  const totalQuestions = data.questions.length;
  const currentQuestion = data.questions[currentIndex];
  const currentValue = answers[currentQuestion.id];

  const validateCurrent = () => {
    if (currentQuestion.required) {
      if (currentValue === undefined || currentValue === '' || (Array.isArray(currentValue) && currentValue.length === 0)) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (!validateCurrent()) {
      setError('This question is required to proceed.');
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setError('');
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate short network delay for processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSubmit(answers);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="bg-slate-50 border border-law-border rounded-2xl p-6 text-center animate-in fade-in">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-sm font-semibold text-law-text-primary mb-1">Information Submitted</h3>
        <p className="text-xs sm:text-sm text-law-text-secondary">Thank you. Generating final legal analysis based on your responses...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-law-border rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-law-border bg-slate-50/50">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-law-indigo/10 text-law-indigo flex items-center justify-center shrink-0">
            <AlertCircle size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-law-text-primary leading-snug">Clarification Needed</h4>
            {data.introText && (
              <p className="text-xs sm:text-sm text-law-text-secondary mt-0.5 leading-relaxed">{data.introText}</p>
            )}
          </div>
        </div>
        <ProgressIndicator current={currentIndex + 1} total={totalQuestions} />
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 min-h-[220px]">
        <QuestionGroup 
          question={currentQuestion}
          value={currentValue}
          onChange={(val) => {
            setError('');
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
          }}
        />
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2 animate-in fade-in">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-5 border-t border-law-border bg-slate-50/50 flex items-center justify-between gap-3">
        <button 
          onClick={handleBack} 
          disabled={currentIndex === 0 || isSubmitting}
          className={cn(
            "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-colors",
            currentIndex === 0 || isSubmitting 
              ? "text-slate-400 border-slate-200 bg-slate-50 cursor-not-allowed" 
              : "text-law-text-secondary border-law-border bg-white hover:bg-slate-50 hover:text-law-text-primary"
          )}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-law-indigo text-white text-sm font-medium rounded-xl hover:bg-law-navy transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? (
             <span className="flex items-center gap-2">
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               Processing...
             </span>
          ) : currentIndex === totalQuestions - 1 ? (
            'Submit'
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
}
