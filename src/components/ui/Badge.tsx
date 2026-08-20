import React from 'react';
import { cn } from '@/src/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'verified' | 'warning' | 'critical' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-law-deep-navy text-white',
    verified: 'bg-law-verified/10 text-law-verified border border-law-verified/20',
    warning: 'bg-law-warning/10 text-law-warning border border-law-warning/20',
    critical: 'bg-law-critical/10 text-law-critical border border-law-critical/20',
    outline: 'border border-law-border text-law-text-secondary',
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-law-indigo focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
