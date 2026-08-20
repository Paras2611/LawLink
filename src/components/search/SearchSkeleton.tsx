import React from 'react';

export function SearchSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-law-border rounded-2xl p-5 md:p-6 animate-pulse">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-24 mb-3" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
          <div className="ml-0 md:ml-14 space-y-2 mb-6">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
          <div className="ml-0 md:ml-14 flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex gap-4">
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-4 bg-slate-200 rounded w-16" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-slate-200 rounded w-24" />
              <div className="h-8 bg-slate-200 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
