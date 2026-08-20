import { DocumentUploader } from '../components/ui/DocumentUploader';
import { FileText, MoreVertical, Search as SearchIcon } from 'lucide-react';

export function Documents() {
  const mockDocs = [
    { id: 1, name: 'Employment_Agreement_Template_2026.pdf', size: '2.4 MB', date: 'Aug 19, 2026', status: 'Analyzed' },
    { id: 2, name: 'Defendant_Deposition_Transcript_Final.pdf', size: '4.1 MB', date: 'Aug 18, 2026', status: 'Analyzed' },
    { id: 3, name: 'Motion_to_Dismiss_Draft_v2.pdf', size: '1.2 MB', date: 'Aug 15, 2026', status: 'Pending' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-950">Documents</h1>
      </div>
      
      <div className="mb-10">
        <DocumentUploader />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h2 className="text-base font-medium text-slate-900">Your Documents</h2>
          <div className="relative w-full sm:w-auto">
            <SearchIcon className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search files..."
              className="w-full sm:w-64 pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">Date Modified</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <FileText size={18} className="text-slate-400" />
                    <span className="font-medium text-slate-900">{doc.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{doc.size}</td>
                  <td className="px-6 py-4 text-slate-500">{doc.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      doc.status === 'Analyzed' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200/50">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
