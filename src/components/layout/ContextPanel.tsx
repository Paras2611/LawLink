import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Skeleton } from '../ui/Skeleton';

interface ContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContextPanel({ isOpen, onClose }: ContextPanelProps) {
  return (
    <aside 
      className={cn(
        "absolute md:relative right-0 top-0 bottom-0 z-30 bg-law-card border-l border-law-border flex flex-col transition-all duration-300 ease-in-out shadow-xl md:shadow-none",
        isOpen ? "w-80 translate-x-0 opacity-100" : "w-0 translate-x-full md:translate-x-0 opacity-0 overflow-hidden border-none"
      )}
    >
      <div className="w-80 flex flex-col h-full">
        <div className="h-16 border-b border-law-border flex items-center justify-between px-4 shrink-0">
          <h3 className="font-semibold text-law-text-primary text-sm">Context Information</h3>
          <button 
            onClick={onClose} 
            aria-label="Close context panel"
            className="p-2 text-law-text-muted hover:text-law-text-primary hover:bg-slate-50 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-8 overflow-y-auto flex-1">
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </aside>
  );
}
