import React from 'react';

export function ResearchSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-law-border rounded-xl p-5 animate-pulse">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-slate-100 rounded w-3/4"></div>
              <div className="flex gap-2">
                <div className="h-4 bg-slate-100 rounded w-24"></div>
                <div className="h-4 bg-slate-100 rounded w-32"></div>
              </div>
            </div>
            <div className="h-8 w-8 bg-slate-100 rounded-lg shrink-0"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
