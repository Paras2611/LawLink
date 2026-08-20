import { cn } from '@/src/lib/utils';

interface ConfidenceCardProps {
  score: number;
  breakdown: {
    relevance: number;
    support: number;
    consistency: number;
  };
  className?: string;
}

export function ConfidenceCard({ score, breakdown, className }: ConfidenceCardProps) {
  return (
    <div className={cn("p-4 border border-slate-200 rounded-lg bg-white", className)}>
      <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Answer Confidence</h4>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-3xl font-semibold text-slate-950">{score}%</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-600">Source relevance</span>
          <span className="font-medium text-slate-900">{breakdown.relevance}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-600">Citation support</span>
          <span className="font-medium text-slate-900">{breakdown.support}%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-600">Answer consistency</span>
          <span className="font-medium text-slate-900">{breakdown.consistency}%</span>
        </div>
      </div>
    </div>
  );
}
