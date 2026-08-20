import React from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { RiskLevel } from '../../lib/documents/types';
import { cn } from '@/src/lib/utils';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
  showLabel?: boolean;
}

export function RiskBadge({ level, className, showLabel = true }: RiskBadgeProps) {
  const config = {
    critical: {
      icon: ShieldAlert,
      label: 'Critical Risk',
      colors: 'bg-rose-100 text-rose-800 border-rose-200',
      iconColor: 'text-rose-600'
    },
    high: {
      icon: AlertTriangle,
      label: 'High Risk',
      colors: 'bg-orange-100 text-orange-800 border-orange-200',
      iconColor: 'text-orange-600'
    },
    medium: {
      icon: AlertCircle,
      label: 'Medium Risk',
      colors: 'bg-amber-100 text-amber-800 border-amber-200',
      iconColor: 'text-amber-600'
    },
    low: {
      icon: Info,
      label: 'Low Risk',
      colors: 'bg-blue-100 text-blue-800 border-blue-200',
      iconColor: 'text-blue-600'
    }
  };

  const { icon: Icon, label, colors, iconColor } = config[level];

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
