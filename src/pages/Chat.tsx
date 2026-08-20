import { useState, useEffect, useRef } from 'react';
import { Send, User, Scale, Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'lawlink_chat_session';

const defaultGreeting: Message = { 
  id: '1', 
  role: 'assistant', 
  content: 'Hello. I am LexAssist. How can I help you with your legal research today?\n\nPlease note: I am an AI, not an attorney. This information is for educational purposes and does not constitute legal advice. Consult a qualified attorney in your jurisdiction for advice specific to your situation.' 
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved chat session', e);
      }
    }
    return [defaultGreeting];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'Based on my analysis, this is a simulated response. In a fully integrated environment, I would provide a detailed, accurate legal breakdown with citations here.' 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const handleClearSession = () => {
    if (window.confirm('Are you sure you want to clear your current research session?')) {
      setMessages([defaultGreeting]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] p-4 md:p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h1 className="text-xl font-semibold text-slate-950">Ask LawLink</h1>
        <button 
          onClick={handleClearSession}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100"
        >
          <Trash2 size={14} /> Clear Session
        </button>
      </div>
      
      <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col min-h-0">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.role === 'user' ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700")}>
                {msg.role === 'user' ? <User size={16} /> : <Scale size={16} />}
              </div>
              <div className={cn("max-w-[80%] rounded-lg p-4", msg.role === 'user' ? "bg-slate-900 text-white" : "bg-slate-50 border border-slate-100 text-slate-800")}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Scale size={16} />
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 flex items-center gap-2 text-slate-500">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Analyzing legal precedents...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Describe your legal issue..."
              className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 text-slate-400 hover:text-slate-900 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            LexAssist can make mistakes. Verify important legal information.
          </p>
        </div>
      </div>
    </div>
  );
}
