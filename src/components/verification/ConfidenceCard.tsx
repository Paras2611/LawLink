import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ConfidenceScore } from '../../lib/verification/types';
import { cn } from '@/src/lib/utils';

interface ConfidenceCardProps {
  confidence: ConfidenceScore;
  className?: string;
}

export function ConfidenceCard({ confidence, className }: ConfidenceCardProps) {
  const getConfidenceConfig = (score: number) => {
    if (score >= 80) return {
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      barColor: 'bg-emerald-500',
      message: 'High confidence based on direct statutory or clear precedential support.'
    };
    if (score >= 40) return {
      icon: Shield,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      barColor: 'bg-amber-500',
      message: 'Medium confidence. Interpretation may vary or precedents may be mixed.'
    };
    return {
      icon: ShieldAlert,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      barColor: 'bg-rose-500',
      message: 'Low confidence. Weak or conflicting legal support found.'
    };
  };

  const config = getConfidenceConfig(confidence.score);
  const Icon = config.icon;

  return (
    <div className={cn("rounded-xl border p-4", config.bg, config.border, className)}>
      <div className="flex items-start gap-3">
        <div className={cn("p-1.5 rounded-lg bg-white shadow-sm shrink-0", config.color)}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-800">System Confidence</h4>
            <span className={cn("text-sm font-bold", config.color)}>{confidence.score}%</span>
          </div>
          
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
            <div 
              className={cn("h-full rounded-full transition-all duration-500", config.barColor)}
              style={{ width: `${confidence.score}%` }}
              role="progressbar"
              aria-valuenow={confidence.score}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed">
            {config.message}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-200/50">
             <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
               AI/system confidence — not a guarantee of legal correctness.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
