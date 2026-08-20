import React from 'react';
import { cn } from '@/src/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-law-text-primary">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-law-border bg-law-card px-3 py-2 text-sm text-law-text-primary placeholder:text-law-text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-law-indigo focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm resize-y",
            error && "border-law-critical focus-visible:ring-law-critical",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-law-critical mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
