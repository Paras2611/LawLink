import React from 'react';
import { cn } from '@/src/lib/utils';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: string;
  action?: React.ReactNode;
}

export function ErrorState({ className, title = "Something went wrong", description, action, ...props }: ErrorStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-law-critical/20 bg-law-critical/5",
        className
      )} 
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-law-critical/10 text-law-critical mb-4">
        <AlertCircle size={24} />
      </div>
      <h3 className="text-lg font-semibold text-law-critical">{title}</h3>
      <p className="mt-2 mb-6 text-sm text-law-text-secondary max-w-sm mx-auto">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
