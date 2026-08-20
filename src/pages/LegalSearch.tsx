import { useState } from 'react';
import { Search as SearchIcon, Filter, Book, ExternalLink } from 'lucide-react';
import { VerificationBadge } from '../components/ui/VerificationBadge';

export function LegalSearch() {
  const [query, setQuery] = useState('');
  
  const mockResults = [
    { id: 1, title: 'Article 21 - Constitution of India', type: 'Statute', snippet: 'Protection of life and personal liberty. No person shall be deprived of his life or personal liberty except according to procedure established by law.', verified: true },
    { id: 2, title: 'Section 43A - Information Technology Act, 2000', type: 'Statute', snippet: 'Compensation for failure to protect data. Where a body corporate, possessing, dealing or handling any sensitive personal data or information in a computer resource which it owns, controls or operates, is negligent in implementing and maintaining reasonable security practices and procedures...', verified: true },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <h1 className="text-xl font-semibold text-slate-950 mb-6">Legal Search</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search statutes, regulations, and acts..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900 text-sm shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-3 bg-white border border-slate-200 rounded-md text-sm outline-none shadow-sm">
            <option>All Jurisdictions</option>
            <option>Central (Union)</option>
            <option>State (Maharashtra)</option>
            <option>State (Delhi)</option>
            <option>State (Karnataka)</option>
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
              <div className="flex items-center gap-3">
                <Book size={16} className="text-slate-400" />
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{res.type}</span>
                {res.verified && <VerificationBadge status="verified" />}
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
