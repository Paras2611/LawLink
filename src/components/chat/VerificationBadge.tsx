import React from 'react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function VerificationBadge({ status, className }: { status: 'verified' | 'unverified' | 'processing', className?: string }) {
  if (status === 'verified') {
    return (
      <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200 text-xs font-medium", className)}>
        <ShieldCheck size={14} />
        <span>AI Supported</span>
      </div>
    );
  }
  if (status === 'unverified') {
    return (
      <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium", className)}>
        <ShieldAlert size={14} />
        <span>Unverified</span>
      </div>
    );
  }
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium", className)}>
      <Shield size={14} className="animate-pulse" />
      <span>Checking...</span>
    </div>
  );
}
