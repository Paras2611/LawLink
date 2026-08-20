import React from 'react';
import { ClarificationQuestion } from './types';
import { QuestionOption } from './QuestionOption';

interface QuestionGroupProps {
  question: ClarificationQuestion;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionGroup({ question, value, onChange }: QuestionGroupProps) {
  const handleSingleSelect = (val: string) => {
    onChange(val);
  };

  const handleMultiSelect = (val: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(val)) {
      onChange(currentValues.filter(v => v !== val));
    } else {
      onChange([...currentValues, val]);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-base md:text-lg font-semibold text-law-text-primary leading-snug">
          {question.title}
          {question.required && <span className="text-red-500 ml-1" title="Required">*</span>}
        </h3>
        {question.description && (
          <p className="text-sm text-law-text-secondary mt-1">{question.description}</p>
        )}
      </div>

      <div className="mt-4">
        {question.type === 'yes-no' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <QuestionOption 
              label="Yes" 
              selected={value === 'yes'} 
              onClick={() => handleSingleSelect('yes')} 
            />
            <QuestionOption 
              label="No" 
              selected={value === 'no'} 
              onClick={() => handleSingleSelect('no')} 
            />
          </div>
        )}

        {question.type === 'single-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map(opt => (
              <QuestionOption 
                key={opt.value}
                label={opt.label} 
                selected={value === opt.value} 
                onClick={() => handleSingleSelect(opt.value)} 
              />
            ))}
          </div>
        )}

        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map(opt => (
              <QuestionOption 
                key={opt.value}
                type="checkbox"
                label={opt.label} 
                selected={Array.isArray(value) && value.includes(opt.value)} 
                onClick={() => handleMultiSelect(opt.value)} 
              />
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || "Enter your answer..."}
            className="w-full p-3 border border-law-border rounded-xl focus:outline-none focus:ring-2 focus:ring-law-indigo focus:border-law-indigo text-sm text-law-text-primary transition-shadow bg-white shadow-sm"
          />
        )}

        {question.type === 'number' && (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || "Enter a number..."}
            className="w-full p-3 border border-law-border rounded-xl focus:outline-none focus:ring-2 focus:ring-law-indigo focus:border-law-indigo text-sm text-law-text-primary transition-shadow bg-white shadow-sm"
          />
        )}

        {question.type === 'date' && (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-law-border rounded-xl focus:outline-none focus:ring-2 focus:ring-law-indigo focus:border-law-indigo text-sm text-law-text-primary transition-shadow bg-white shadow-sm"
          />
        )}

        {question.type === 'dropdown' && question.options && (
          <div className="relative">
            <select
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-3 pr-10 border border-law-border rounded-xl focus:outline-none focus:ring-2 focus:ring-law-indigo focus:border-law-indigo text-sm text-law-text-primary appearance-none bg-white shadow-sm transition-shadow"
            >
              <option value="" disabled>Select an option...</option>
              {question.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-law-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
