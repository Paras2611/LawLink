import React from 'react';
import { User, Scale } from 'lucide-react';
import { AIResponse } from './AIResponse';
import { ClarificationCard } from './clarification/ClarificationCard';
import { cn } from '@/src/lib/utils';

export function ChatMessage({ message, onClarificationSubmit }: { message: any, onClarificationSubmit?: (answers: any) => void }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "px-4 sm:px-8 py-6 md:py-8 border-b border-law-border/50",
      isUser ? "bg-white" : "bg-slate-50"
    )}>
      <div className="max-w-4xl mx-auto flex gap-4 md:gap-6">
        <div className="shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <User size={16} />
            </div>
          ) : (
             <div className="w-8 h-8 rounded-xl bg-law-indigo shadow-md flex items-center justify-center text-white">
               <Scale size={16} />
             </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm text-law-text-primary">
              {isUser ? 'You' : 'LawLink AI'}
            </span>
            <span className="text-xs text-law-text-muted">{message.timestamp}</span>
          </div>
          {isUser ? (
            <div className="text-law-text-primary text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          ) : message.type === 'clarification' ? (
            <div className="space-y-4">
              <div className="prose prose-slate max-w-none prose-sm sm:prose-base text-law-text-primary">
                {message.content}
              </div>
              <ClarificationCard 
                data={message.clarificationData} 
                onSubmit={(answers) => {
                  if (onClarificationSubmit) {
                    onClarificationSubmit(answers);
                  }
                }}
                isCompleted={message.completed}
              />
            </div>
          ) : (
            <AIResponse content={message.content} data={message.aiData} />
          )}
        </div>
      </div>
    </div>
  );
}
