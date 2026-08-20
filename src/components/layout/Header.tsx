import { Menu, Search, Globe, Moon, Bell, PanelRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
  onContextClick?: () => void;
}

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/chat': 'Ask LawLink',
  '/search': 'Legal Search',
  '/cases': 'Case Search',
  '/documents': 'Documents',
  '/saved': 'Saved Research',
  '/history': 'History',
  '/settings': 'Settings',
  '/profile': 'Profile',
};

export function Header({ onMenuClick, onContextClick }: HeaderProps) {
  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || 'LawLink';

  return (
    <header className="h-16 border-b border-law-border bg-law-card flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-law-text-secondary hover:text-law-text-primary rounded-md hover:bg-slate-50 transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center text-sm font-medium text-law-text-secondary">
          <span className="hover:text-law-text-primary cursor-pointer transition-colors">Workspace</span>
          <span className="mx-2 text-law-border">/</span>
          <span className="text-law-text-primary">{currentTitle}</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
        {/* Global Search - Hidden on small screens */}
        <div className="hidden md:flex relative max-w-md w-full mr-4">
          <Search className="absolute left-3 top-2.5 text-law-text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search across all modules..."
            className="w-full pl-9 pr-4 py-2 bg-law-bg border border-law-border rounded-md text-sm text-law-text-primary focus:outline-none focus:ring-1 focus:ring-law-indigo focus:border-law-indigo transition-all placeholder:text-law-text-muted"
          />
        </div>

        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-law-text-secondary hover:text-law-text-primary rounded-md hover:bg-slate-50 transition-colors">
          <Search size={18} />
        </button>

        <div className="h-6 w-px bg-law-border hidden md:block mx-1"></div>

        <button className="hidden sm:block p-2 text-law-text-secondary hover:text-law-text-primary rounded-md hover:bg-slate-50 transition-colors" title="Language">
          <Globe size={18} />
        </button>
        <button className="hidden sm:block p-2 text-law-text-secondary hover:text-law-text-primary rounded-md hover:bg-slate-50 transition-colors" title="Theme">
          <Moon size={18} />
        </button>
        <button className="relative p-2 text-law-text-secondary hover:text-law-text-primary rounded-md hover:bg-slate-50 transition-colors" title="Notifications">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-law-critical rounded-full border-2 border-law-card"></span>
        </button>
        <button 
          onClick={onContextClick}
          className="p-2 text-law-text-secondary hover:text-law-text-primary rounded-md hover:bg-slate-50 transition-colors" 
          title="Toggle Context Panel"
        >
          <PanelRight size={18} />
        </button>

        <div className="h-6 w-px bg-law-border mx-1"></div>

        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-law-deep-navy text-white text-xs font-bold shrink-0 hover:ring-2 hover:ring-law-indigo hover:ring-offset-2 transition-all">
          PP
        </button>
      </div>
    </header>
  );
}
