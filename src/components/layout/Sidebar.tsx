import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquareText, Search, BookOpen, FileText, Bookmark, History, 
  Settings, User, LogOut, ChevronLeft, ChevronRight, X, HelpCircle,
  Gavel, Scale, Landmark, Users, Briefcase, ShoppingCart, Laptop, ScrollText, HardHat, Building2
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const mainNav = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Ask LawLink', path: '/chat', icon: MessageSquareText },
  { name: 'Legal Search', path: '/search', icon: Search },
  { name: 'Case Search', path: '/cases', icon: BookOpen },
  { name: 'Evidence Demo', path: '/verification', icon: FileText },
  { name: 'Documents', path: '/documents', icon: FileText },
  { name: 'Saved Research', path: '/saved', icon: Bookmark },
  { name: 'History', path: '/history', icon: History },
];

const legalCategories = [
  { name: 'Criminal Law', icon: Gavel },
  { name: 'Civil Law', icon: Scale },
  { name: 'Property Law', icon: Landmark },
  { name: 'Family Law', icon: Users },
  { name: 'Contract Law', icon: Briefcase },
  { name: 'Consumer Law', icon: ShoppingCart },
  { name: 'Cyber Law', icon: Laptop },
  { name: 'Constitutional Law', icon: ScrollText },
  { name: 'Labour Law', icon: HardHat },
  { name: 'Corporate Law', icon: Building2 },
];

const bottomNav = [
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Help', path: '/help', icon: HelpCircle },
];

export function Sidebar({ isMobileOpen, closeMobile }: { isMobileOpen?: boolean; closeMobile?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLinkClick = () => {
    if (closeMobile) closeMobile();
  };

  const isHiddenText = !isMobileOpen && collapsed;

  const handleLogout = () => {
    logout();
    handleLinkClick();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-law-deep-navy/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeMobile}
        />
      )}
      
      <div className={cn(
        "h-[100dvh] bg-law-deep-navy text-law-text-muted flex flex-col transition-all duration-300 ease-in-out border-r border-law-deep-navy shadow-2xl md:shadow-none z-50",
        "fixed md:relative top-0 left-0 bottom-0",
        isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0",
        !isMobileOpen && collapsed ? "md:w-20" : "md:w-64"
      )}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 md:px-6 shrink-0 bg-law-deep-navy border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-law-indigo rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-law-indigo/20">
              <Scale size={18} className="text-white" />
            </div>
            <span className={cn("text-lg font-bold text-white tracking-widest", isHiddenText && "hidden")}>LAWLINK</span>
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:flex p-1.5 text-law-text-muted hover:text-white rounded-md hover:bg-white/5 transition-colors">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button onClick={closeMobile} className="md:hidden p-1.5 text-law-text-muted hover:text-white rounded-md hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar flex flex-col gap-8">
          
          {/* Main Navigation */}
          <nav className="space-y-1">
            {!isHiddenText && <p className="px-3 text-xs font-semibold uppercase tracking-wider text-law-text-muted/50 mb-3">Main Menu</p>}
            {mainNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                title={isHiddenText ? item.name : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive ? "bg-law-navy text-white" : "hover:bg-white/5 hover:text-white"
                  )
                }
              >
                <item.icon size={18} className={cn("shrink-0 transition-colors", "group-hover:text-law-indigo")} />
                <span className={cn(isHiddenText && "hidden")}>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Legal Categories */}
          <nav className="space-y-1">
            {!isHiddenText && <p className="px-3 text-xs font-semibold uppercase tracking-wider text-law-text-muted/50 mb-3">Categories</p>}
            {legalCategories.map((item) => (
              <button
                key={item.name}
                onClick={handleLinkClick}
                title={isHiddenText ? item.name : undefined}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                  "text-law-text-muted hover:bg-white/5 hover:text-white text-left"
                )}
              >
                <item.icon size={18} className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:text-law-indigo transition-all" />
                <span className={cn(isHiddenText && "hidden truncate")}>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-white/5 space-y-1 bg-law-deep-navy shrink-0">
          {bottomNav.map((item) => (
            <NavLink 
              key={item.name}
              to={item.path} 
              onClick={handleLinkClick} 
              title={isHiddenText ? item.name : undefined}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-law-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 group"
            >
              <item.icon size={18} className="shrink-0 group-hover:text-law-indigo transition-colors" />
              <span className={cn(isHiddenText && "hidden")}>{item.name}</span>
            </NavLink>
          ))}
          <button 
            onClick={handleLogout}
            title={isHiddenText ? "Logout" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-law-critical hover:bg-law-critical/10 hover:text-red-400 rounded-lg transition-all duration-200"
          >
            <LogOut size={18} className="shrink-0" />
            <span className={cn(isHiddenText && "hidden")}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
