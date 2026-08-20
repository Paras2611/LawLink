export function Settings() {
  return (
    <div className="p-6 max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-semibold text-slate-950 mb-8">Settings</h1>
      
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-medium text-slate-900 mb-1">Application Preferences</h2>
          <p className="text-sm text-slate-500">Manage your workspace settings and UI preferences.</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-900">Dark Mode</h3>
              <p className="text-xs text-slate-500 mt-1">Switch between light and dark themes</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-900">Email Notifications</h3>
              <p className="text-xs text-slate-500 mt-1">Receive updates on saved case alerts</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-900">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
            </button>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-2">Default Jurisdiction</h3>
            <select className="w-full max-w-xs p-2 border border-slate-200 rounded-md text-sm outline-none focus:border-slate-400">
              <option>Central (Union of India)</option>
              <option>Delhi</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
