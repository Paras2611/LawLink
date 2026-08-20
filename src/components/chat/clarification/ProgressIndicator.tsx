import React from 'react';

export function ProgressIndicator({ current, total }: { current: number, total: number }) {
  const percentage = (current / total) * 100;
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between text-xs font-medium text-law-text-muted">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-law-indigo transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
