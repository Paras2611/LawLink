import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquareText, Search, BookOpen, FileText, Bookmark, History, Settings, User, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Ask LawLink', path: '/chat', icon: MessageSquareText },
  { name: 'Legal Search', path: '/search', icon: Search },
  { name: 'Case Search', path: '/cases', icon: BookOpen },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'Saved Research', path: '/saved', icon: Bookmark },
  { name: 'History', path: '/history', icon: History },
];

export function Sidebar({ isMobileOpen, closeMobile }: { isMobileOpen?: boolean; closeMobile?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (closeMobile) closeMobile();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
          onClick={closeMobile}
        />
      )}
      
      <div className={cn(
        "h-screen bg-slate-950 text-slate-400 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-900 z-50",
        "fixed md:relative top-0 left-0 bottom-0",
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0",
        !isMobileOpen && collapsed ? "md:w-20" : "md:w-60"
      )}>
        <div className="p-4 md:p-6 flex items-center justify-between border-b border-slate-900">
          <span className={cn("text-lg font-bold text-white tracking-widest", (!isMobileOpen && collapsed) && "hidden")}>LAWLINK</span>
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block p-1 text-slate-500 hover:text-white rounded">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button onClick={closeMobile} className="md:hidden p-1 text-slate-500 hover:text-white rounded">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-2.5 rounded-md text-sm font-medium transition-all duration-200",
                  isActive ? "bg-slate-900 text-white" : "hover:bg-slate-900 hover:text-white"
                )
              }
            >
              <item.icon size={18} className="shrink-0" />
              <span className={cn((!isMobileOpen && collapsed) && "hidden")}>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-900 space-y-1">
          <NavLink to="/settings" onClick={handleLinkClick} className="flex items-center gap-3 p-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 rounded-md transition-all duration-200">
            <Settings size={18} className="shrink-0" />
            <span className={cn((!isMobileOpen && collapsed) && "hidden")}>Settings</span>
          </NavLink>
          <NavLink to="/profile" onClick={handleLinkClick} className="flex items-center gap-3 p-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 rounded-md transition-all duration-200">
            <User size={18} className="shrink-0" />
            <span className={cn((!isMobileOpen && collapsed) && "hidden")}>Profile</span>
          </NavLink>
          <button 
            onClick={() => {
              handleLinkClick();
              navigate('/auth/login');
            }}
            className="w-full flex items-center gap-3 p-2.5 text-sm font-medium text-red-500 hover:bg-red-950/50 hover:text-red-400 rounded-md transition-all duration-200"
          >
            <LogOut size={18} className="shrink-0" />
            <span className={cn((!isMobileOpen && collapsed) && "hidden")}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
