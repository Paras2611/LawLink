import { cn } from '@/src/lib/utils';

const SkeletonItem = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-slate-100 rounded", className)} />
);

export const SkeletonParagraph = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonItem key={i} className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} />
    ))}
  </div>
);

export const SkeletonCard = () => (
  <div className="p-6 border border-slate-100 rounded-lg bg-white shadow-sm space-y-4">
    <SkeletonItem className="h-6 w-1/3" />
    <SkeletonParagraph lines={2} />
  </div>
);

export const SkeletonLegalSource = () => (
  <div className="flex gap-4 p-4 border border-slate-100 rounded-md bg-white">
    <SkeletonItem className="h-10 w-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <SkeletonItem className="h-4 w-3/4" />
      <SkeletonItem className="h-3 w-1/2" />
    </div>
  </div>
);
