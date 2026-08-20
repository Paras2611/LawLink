import React, { useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

export function ChatInput({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading 
}: { 
  value: string, 
  onChange: (v: string) => void, 
  onSubmit: (e: React.FormEvent) => void,
  isLoading?: boolean
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="relative">
      <form 
        onSubmit={onSubmit}
        className="relative bg-white border border-law-border shadow-md rounded-2xl flex items-end p-2 focus-within:ring-2 focus-within:ring-law-indigo focus-within:border-law-indigo transition-all"
      >
        <button 
          type="button" 
          className="p-2.5 text-law-text-muted hover:text-law-indigo hover:bg-law-bg rounded-xl transition-colors shrink-0"
          title="Attach Document"
          disabled={isLoading}
        >
          <Paperclip size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your legal question or situation..."
          className="w-full max-h-[200px] bg-transparent text-sm sm:text-base text-law-text-primary px-3 py-3 focus:outline-none resize-none placeholder:text-law-text-muted"
          rows={1}
          disabled={isLoading}
        />

        <div className="flex items-center gap-1 shrink-0">
          {!value.trim() ? (
            <button 
              type="button" 
              className="p-2.5 text-law-text-muted hover:text-law-indigo hover:bg-law-bg rounded-xl transition-colors"
              title="Voice Input"
              disabled={isLoading}
            >
              <Mic size={20} />
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={isLoading || !value.trim()}
              className="p-2.5 bg-law-indigo text-white hover:bg-law-navy disabled:bg-slate-300 disabled:text-slate-500 rounded-xl transition-colors shadow-sm"
              title="Send"
            >
              <Send size={20} />
            </button>
          )}
        </div>
      </form>
      <div className="text-center mt-3">
        <p className="text-[11px] text-law-text-muted">
          LawLink provides AI-generated legal information and research assistance. It is not a substitute for advice from a qualified legal professional.
        </p>
      </div>
    </div>
  );
}
