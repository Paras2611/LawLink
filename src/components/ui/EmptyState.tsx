import React from 'react';
import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ className, icon: Icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-law-border bg-white/50",
        className
      )} 
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-law-text-muted mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-law-text-primary">{title}</h3>
      <p className="mt-2 mb-6 text-sm text-law-text-secondary max-w-sm mx-auto">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
