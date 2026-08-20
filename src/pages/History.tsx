import { Clock, Search, FileText, MessageSquareText } from 'lucide-react';

export function History() {
  const activities = [
    { id: 1, type: 'chat', title: 'Contract Law Inquiry - Rent Agreement', time: '2 hours ago', icon: MessageSquareText },
    { id: 2, type: 'search', title: 'Searched for "Article 21 Constitution of India"', time: '5 hours ago', icon: Search },
    { id: 3, type: 'document', title: 'Analyzed "Employment_Agreement_Template_2026.pdf"', time: 'Yesterday', icon: FileText },
    { id: 4, type: 'chat', title: 'Criminal Procedure Analysis - Section 41 CrPC', time: 'Aug 17, 2026', icon: MessageSquareText },
    { id: 5, type: 'search', title: 'Case lookup: Kesavananda Bharati v. State of Kerala', time: 'Aug 15, 2026', icon: Search },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-xl font-semibold text-slate-950 mb-6">Activity History</h1>
      
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 md:p-5 border-b border-slate-100 flex items-center gap-2 text-sm text-slate-500 bg-slate-50">
          <Clock size={16} />
          <span className="font-medium">Recent Activity</span>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.map(activity => (
            <div key={activity.id} className="p-4 md:p-6 hover:bg-slate-50 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <activity.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-900 truncate">{activity.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
              <button className="shrink-0 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded px-3 py-1.5 hover:bg-slate-50 transition-colors">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
