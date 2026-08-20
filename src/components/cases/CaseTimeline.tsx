import React from 'react';
import { CaseTimelineEvent } from '../../lib/cases/types';
import { CheckCircle2, Circle, Clock, MinusCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function CaseTimeline({ events }: { events: CaseTimelineEvent[] }) {
  const getIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle2 size={16} className="text-law-indigo bg-white" />;
      case 'current': return <Clock size={16} className="text-amber-500 bg-white" />;
      case 'upcoming': return <Circle size={16} className="text-slate-300 bg-white" />;
      default: return <MinusCircle size={16} className="text-slate-300 bg-white" />;
    }
  };

  return (
    <div className="bg-white border border-law-border rounded-2xl p-5 md:p-6 h-full">
      <h3 className="font-bold text-law-text-primary mb-6">Case Timeline</h3>
      <div className="relative border-l border-law-border ml-2 space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-6">
            <div className="absolute -left-2 top-0.5">
              {getIcon(event.status)}
            </div>
            <div>
              <h4 className={cn("text-sm font-semibold mb-1", event.status === 'completed' || event.status === 'current' ? 'text-law-text-primary' : 'text-law-text-muted')}>
                {event.stage}
              </h4>
              {event.date && (
                <p className="text-xs text-law-text-secondary font-mono mb-1">{new Date(event.date).toLocaleDateString()}</p>
              )}
              {event.description && (
                <p className="text-xs text-law-text-muted mt-1 leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
