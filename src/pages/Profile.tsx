import { User, Mail, Shield, Building } from 'lucide-react';

export function Profile() {
  return (
    <div className="p-6 max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-semibold text-slate-950 mb-8">User Profile</h1>
      
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-8 overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Legal Professional</h2>
            <p className="text-sm text-slate-500 mt-1">Senior Associate</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Email Address</label>
              <div className="flex items-center gap-3 text-sm text-slate-900">
                <Mail size={16} className="text-slate-400" />
                name@firm.com
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Firm / Organization</label>
              <div className="flex items-center gap-3 text-sm text-slate-900">
                <Building size={16} className="text-slate-400" />
                LawLink Global
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Role & Permissions</label>
              <div className="flex items-center gap-3 text-sm text-slate-900">
                <Shield size={16} className="text-slate-400" />
                Administrator
              </div>
            </div>
          </div>
          
          <div className="pt-4 mt-6 border-t border-slate-100">
            <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
