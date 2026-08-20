import { Search, MessageSquareText, BookOpen, FileText, Clock } from 'lucide-react';

export function Dashboard() {
  const quickActions = [
    { name: 'Ask LawLink', icon: MessageSquareText },
    { name: 'Legal Search', icon: Search },
    { name: 'Case Search', icon: BookOpen },
    { name: 'Upload Document', icon: FileText },
  ];

  const recentConversations = [
    { title: 'Contract Law Inquiry - Rental Agreement', time: '2 hours ago' },
    { title: 'Criminal Procedure Analysis - Section 41', time: 'Yesterday' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-2 md:px-6">
      <div className="mb-8 md:mb-12">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-950 mb-1">Good afternoon</h1>
        <p className="text-sm md:text-base text-slate-500">How can LawLink assist you today?</p>
      </div>

      <div className="relative mb-12 md:mb-16">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-slate-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Ask a legal question..."
          className="w-full py-4 md:py-5 pl-12 pr-6 rounded-lg border border-slate-200 bg-white shadow-sm focus:ring-1 focus:ring-slate-400 focus:border-slate-400 outline-none text-sm md:text-base"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <section>
          <h2 className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider mb-4 md:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {quickActions.map((action) => (
              <button key={action.name} className="flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-slate-300 transition-all text-center">
                <action.icon className="text-slate-600" size={24} />
                <span className="font-medium text-xs md:text-sm text-slate-900">{action.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider mb-4 md:mb-6">Recent Conversations</h2>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-100">
            {recentConversations.map((conv) => (
              <div key={conv.title} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                <Clock className="text-slate-400 shrink-0" size={18} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{conv.title}</p>
                  <p className="text-xs text-slate-500">{conv.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
