import React from 'react';
import { cn } from '@/src/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || React.useId();
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              className={cn(
                "peer h-4 w-4 appearance-none rounded-[4px] border border-law-border bg-law-card shrink-0",
                "checked:bg-law-indigo checked:border-law-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-law-indigo focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50 transition-all cursor-pointer",
                error && "border-law-critical focus-visible:ring-law-critical",
                className
              )}
              {...props}
            />
            <Check 
              size={12} 
              className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
              strokeWidth={3}
            />
          </div>
          {label && (
            <label 
              htmlFor={checkboxId} 
              className={cn(
                "text-sm text-law-text-primary select-none cursor-pointer leading-tight",
                props.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-xs text-law-critical ml-6">{error}</p>}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
