import React, { useState, useRef, useEffect } from 'react';
import { Menu, PanelLeftClose, PanelRightClose, PanelLeft, PanelRight, Shield, Scale } from 'lucide-react';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatEvidencePanel } from '../components/chat/ChatEvidencePanel';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { mockChatHistory, mockProgressStates } from '../lib/chat/mockData';

export function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>(mockChatHistory);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileEvidenceOpen, setIsMobileEvidenceOpen] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStateIndex, setProgressStateIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating, progressStateIndex]);

  const handleNewChat = () => {
    setMessages([]);
    setIsMobileSidebarOpen(false);
    setIsMobileEvidenceOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const newMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsGenerating(true);
    setProgressStateIndex(0);

    // Simulate progress states
    let stateIdx = 0;
    const interval = setInterval(() => {
      stateIdx++;
      if (stateIdx < mockProgressStates.length) {
        setProgressStateIndex(stateIdx);
      } else {
        clearInterval(interval);
        // Add fake AI response
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'This is a mock AI response generated based on your query. In a production environment, this would hit the LawLink backend API to stream a verified legal response.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          aiData: {
            answer: 'Based on the provided input, this represents the synthesized legal analysis.',
            confidence: { score: 85, label: 'High' },
            verificationStatus: 'verified',
            sources: [
              { id: 'mock-src', name: 'Mock Legal Authority', type: 'Database' }
            ]
          }
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsGenerating(false);
      }
    }, 800);
  };

  const currentSources = messages.filter(m => m.aiData?.sources).pop()?.aiData?.sources;

  return (
    <div className="flex h-full overflow-hidden bg-white relative">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block transition-all duration-300 ease-in-out shrink-0 h-full border-r border-law-border ${isSidebarOpen ? 'w-[280px]' : 'w-0 overflow-hidden border-none'}`}>
        <ChatSidebar onNewChat={handleNewChat} />
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-law-deep-navy/20 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="relative w-[85%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col">
            <ChatSidebar onNewChat={handleNewChat} />
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Chat Header */}
        <header className="h-14 sm:h-16 shrink-0 border-b border-law-border bg-white flex items-center justify-between px-3 sm:px-4 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileSidebarOpen(true);
                } else {
                  setIsSidebarOpen(!isSidebarOpen);
                }
              }}
              className="p-1.5 sm:p-2 text-law-text-muted hover:text-law-indigo hover:bg-law-bg rounded-lg transition-colors"
            >
              {isSidebarOpen ? <PanelLeftClose size={20} className="hidden md:block" /> : <PanelLeft size={20} className="hidden md:block" />}
              <Menu size={20} className="md:hidden" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-law-indigo text-white flex items-center justify-center">
                <Scale size={18} />
              </div>
              <div>
                <h1 className="font-bold text-law-text-primary text-sm sm:text-base leading-tight">LawLink AI</h1>
                <p className="text-[10px] sm:text-xs text-law-text-muted leading-tight">Indian Legal Information Assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileEvidenceOpen(true);
                } else {
                  setIsEvidenceOpen(!isEvidenceOpen);
                }
              }}
              className="p-1.5 sm:p-2 text-law-text-muted hover:text-law-indigo hover:bg-law-bg rounded-lg transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline-block text-xs font-medium">Evidence</span>
              {isEvidenceOpen ? <PanelRightClose size={20} className="hidden lg:block" /> : <PanelRight size={20} className="hidden lg:block" />}
              <Shield size={20} className="lg:hidden" />
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto bg-white">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-law-bg border border-law-border rounded-2xl flex items-center justify-center text-law-indigo mb-6">
                <Scale size={32} />
              </div>
              <h2 className="text-xl font-bold text-law-text-primary mb-2">How can I assist you today?</h2>
              <p className="text-sm text-law-text-secondary mb-8 leading-relaxed">
                Describe your legal question, paste a document snippet, or ask for relevant case laws.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <button onClick={() => setInput('What are the grounds for divorce under the Hindu Marriage Act?')} className="p-3 text-sm text-left border border-law-border rounded-xl hover:border-law-indigo hover:bg-slate-50 transition-colors text-law-text-secondary hover:text-law-indigo">
                  Grounds for divorce under Hindu Marriage Act
                </button>
                <button onClick={() => setInput('Explain the concept of force majeure in Indian contract law.')} className="p-3 text-sm text-left border border-law-border rounded-xl hover:border-law-indigo hover:bg-slate-50 transition-colors text-law-text-secondary hover:text-law-indigo">
                  Force majeure in Indian contract law
                </button>
              </div>
            </div>
          ) : (
            <div className="pb-8">
              {messages.map(msg => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg} 
                  onClarificationSubmit={(answers) => {
                    // Update the message to mark it completed
                    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, completed: true } : m));
                    
                    // Add user response message
                    const userRespId = Date.now().toString();
                    const newMsg = {
                      id: userRespId,
                      role: 'user',
                      content: 'Provided the requested clarification.',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, newMsg]);

                    // Trigger AI generation
                    setIsGenerating(true);
                    setProgressStateIndex(0);
                    
                    let stateIdx = 0;
                    const interval = setInterval(() => {
                      stateIdx++;
                      if (stateIdx < mockProgressStates.length) {
                        setProgressStateIndex(stateIdx);
                      } else {
                        clearInterval(interval);
                        const aiMsg = {
                          id: (Date.now() + 1).toString(),
                          role: 'assistant',
                          content: 'Based on your clarification, here is the legal analysis regarding breach of contract.',
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          aiData: {
                            answer: 'Since there was a written agreement governed by Maharashtra law with an arbitration clause, your primary remedy is to invoke arbitration. You can claim damages for the breach, and potentially seek an interim injunction under Section 9 of the Arbitration and Conciliation Act.',
                            confidence: { score: 92, label: 'High' },
                            verificationStatus: 'verified',
                            sources: [
                              { id: 'mock-src-1', name: 'Indian Contract Act, 1872', type: 'Statute' },
                              { id: 'mock-src-2', name: 'Arbitration and Conciliation Act, 1996', type: 'Statute' }
                            ]
                          }
                        };
                        setMessages(prev => [...prev, aiMsg]);
                        setIsGenerating(false);
                      }
                    }, 800);
                  }}
                />
              ))}
              
              {isGenerating && (
                <div className="px-4 sm:px-8 py-6 md:py-8 border-b border-law-border/50 bg-slate-50">
                  <div className="max-w-4xl mx-auto flex gap-4 md:gap-6">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-xl bg-law-indigo shadow-md flex items-center justify-center text-white">
                        <Scale size={16} className="animate-pulse" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm text-law-text-primary">LawLink AI</span>
                      </div>
                      <div className="flex items-center gap-3 text-law-text-secondary text-sm">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-law-indigo rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-law-indigo rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-law-indigo rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="animate-pulse">{mockProgressStates[progressStateIndex]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 sm:p-6 border-t border-law-border bg-white">
          <div className="max-w-4xl mx-auto">
            <ChatInput 
              value={input} 
              onChange={setInput} 
              onSubmit={handleSubmit} 
              isLoading={isGenerating} 
            />
          </div>
        </div>
      </div>

      {/* Desktop Evidence Panel */}
      <div className={`hidden lg:block transition-all duration-300 ease-in-out shrink-0 h-full border-l border-law-border ${isEvidenceOpen ? 'w-[320px] xl:w-[360px]' : 'w-0 overflow-hidden border-none'}`}>
        <ChatEvidencePanel currentSources={currentSources} />
      </div>

      {/* Mobile/Tablet Evidence Drawer */}
      {isMobileEvidenceOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-law-deep-navy/20 backdrop-blur-sm" onClick={() => setIsMobileEvidenceOpen(false)} />
          <div className="relative w-[85%] max-w-[360px] h-full bg-white shadow-2xl flex flex-col border-l border-law-border">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setIsMobileEvidenceOpen(false)}
                className="p-1.5 bg-white border border-law-border rounded-lg text-law-text-muted hover:text-law-indigo shadow-sm"
              >
                <PanelRightClose size={16} />
              </button>
            </div>
            <ChatEvidencePanel currentSources={currentSources} />
          </div>
        </div>
      )}
    </div>
  );
}
