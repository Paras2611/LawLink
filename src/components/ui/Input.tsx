import React from 'react';
import { cn } from '@/src/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-law-text-primary">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-law-border bg-law-card px-3 py-2 text-sm text-law-text-primary placeholder:text-law-text-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-law-indigo focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm",
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
Input.displayName = 'Input';
