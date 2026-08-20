import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquareText, Search, FileText, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function MobileBottomNav() {
  const items = [
    { path: '/', icon: LayoutDashboard, label: 'Home' },
    { path: '/chat', icon: MessageSquareText, label: 'Ask' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/documents', icon: FileText, label: 'Docs' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-law-card border-t border-law-border z-40 flex items-center justify-around px-2 pb-safe">
      {items.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-medium transition-colors",
            isActive ? "text-law-indigo" : "text-law-text-muted hover:text-law-text-primary"
          )}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
