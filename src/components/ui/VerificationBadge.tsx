import { CheckCircle, AlertTriangle, HelpCircle, XCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type VerificationStatus = 'verified' | 'partially-verified' | 'unverified' | 'conflicting';

interface VerificationBadgeProps {
  status: VerificationStatus;
}

export function VerificationBadge({ status }: VerificationBadgeProps) {
  const config = {
    verified: {
      text: 'VERIFIED',
      icon: CheckCircle,
      className: 'bg-green-50 text-green-700 border-green-200',
    },
    'partially-verified': {
      text: 'PARTIALLY VERIFIED',
      icon: AlertTriangle,
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    unverified: {
      text: 'UNVERIFIED',
      icon: HelpCircle,
      className: 'bg-slate-100 text-slate-700 border-slate-200',
    },
    conflicting: {
      text: 'CONFLICTING',
      icon: XCircle,
      className: 'bg-red-50 text-red-700 border-red-200',
    },
  };

  const { text, icon: Icon, className } = config[status];

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wider", className)}>
      <Icon size={12} />
      {text}
    </div>
  );
}
