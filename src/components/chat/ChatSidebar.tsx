import React from 'react';
import { Plus, Search, MessageSquare, MoreVertical } from 'lucide-react';
import { mockConversations } from '../../lib/chat/mockData';

export function ChatSidebar({ onNewChat }: { onNewChat: () => void }) {
  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-law-border w-full">
      <div className="p-4 border-b border-law-border">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-law-indigo text-white px-4 py-2.5 rounded-xl hover:bg-law-navy transition-colors text-sm font-medium shadow-sm"
        >
          <Plus size={18} />
          New Conversation
        </button>
      </div>
      
      <div className="p-3 border-b border-law-border">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-law-text-muted" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full bg-white border border-law-border text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-law-indigo"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <h3 className="text-xs font-semibold text-law-text-muted uppercase tracking-wider mb-3 px-1">Recent</h3>
        <div className="space-y-1">
          {mockConversations.map((conv, i) => (
            <div 
              key={conv.id} 
              className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${i === 0 ? 'bg-white shadow-sm border border-law-border/50' : 'hover:bg-law-bg border border-transparent'}`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={16} className={i === 0 ? "text-law-indigo" : "text-law-text-muted"} />
                <span className={`text-sm truncate ${i === 0 ? "text-law-text-primary font-medium" : "text-law-text-secondary"}`}>
                  {conv.title}
                </span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 flex items-center shrink-0">
                <button className="p-1 text-law-text-muted hover:text-law-indigo transition-colors" title="Options">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
