import React from 'react';
import { Activity } from 'lucide-react';

export function ConfidenceCard({ score, label }: { score: number, label: string }) {
  let colorClass = 'text-green-600 bg-green-50 border-green-200';
  if (score < 70) colorClass = 'text-amber-600 bg-amber-50 border-amber-200';
  if (score < 40) colorClass = 'text-red-600 bg-red-50 border-red-200';

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${colorClass} text-xs font-medium`}>
      <Activity size={14} />
      <span>Confidence: {label} ({score}%)</span>
    </div>
  );
}
