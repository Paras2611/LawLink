import { useState } from 'react';
import { Search as SearchIcon, Filter, Gavel, ExternalLink, Calendar } from 'lucide-react';

export function CaseSearch() {
  const [query, setQuery] = useState('');
  
  const mockResults = [
    { id: 1, title: 'Kesavananda Bharati v. State of Kerala', court: 'Supreme Court of India', date: 'Apr 24, 1973', snippet: 'Landmark decision of the Supreme Court of India that outlined the basic structure doctrine of the Indian Constitution, asserting that the Parliament cannot alter its fundamental features.' },
    { id: 2, title: 'Justice K.S. Puttaswamy (Retd.) v. Union of India', court: 'Supreme Court of India', date: 'Aug 24, 2017', snippet: 'A landmark judgment of the Supreme Court of India, which holds that the right to privacy is protected as a fundamental right under Articles 14, 19 and 21 of the Constitution of India.' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <h1 className="text-xl font-semibold text-slate-950 mb-6">Case Law Search</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by case name, citation, or keywords..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-3 bg-white border border-slate-200 rounded-md text-sm outline-none shadow-sm">
            <option>All Courts</option>
            <option>Supreme Court of India</option>
            <option>High Courts</option>
            <option>District Courts</option>
            <option>Tribunals</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-md text-sm hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {mockResults.map(res => (
          <div key={res.id} className="bg-white p-5 border border-slate-200 rounded-lg shadow-sm hover:border-slate-300 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5"><Gavel size={14} /> {res.court}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {res.date}</span>
              </div>
              <ExternalLink size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">{res.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{res.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
