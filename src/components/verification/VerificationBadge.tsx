import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { VerificationStatus } from '../../lib/verification/types';
import { cn } from '@/src/lib/utils';

interface VerificationBadgeProps {
  status: VerificationStatus;
  className?: string;
  showLabel?: boolean;
}

export function VerificationBadge({ status, className, showLabel = true }: VerificationBadgeProps) {
  const config = {
    verified: {
      icon: CheckCircle2,
      label: 'Verified',
      colors: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    partially_verified: {
      icon: HelpCircle, // Using HelpCircle as a placeholder for ◐
      label: 'Partially Verified',
      colors: 'bg-amber-50 text-amber-700 border-amber-200',
      iconColor: 'text-amber-600'
    },
    unverified: {
      icon: AlertCircle,
      label: 'Unverified',
      colors: 'bg-slate-100 text-slate-700 border-slate-300',
      iconColor: 'text-slate-500'
    },
    conflicting: {
      icon: AlertTriangle,
      label: 'Conflicting',
      colors: 'bg-rose-50 text-rose-700 border-rose-200',
      iconColor: 'text-rose-600'
    }
  };

  const { icon: Icon, label, colors, iconColor } = config[status];

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider",
        colors,
        className
      )}
      title={label}
      role="status"
    >
      <Icon size={12} className={iconColor} aria-hidden="true" />
      {showLabel && <span>{label}</span>}
    </div>
  );
}
