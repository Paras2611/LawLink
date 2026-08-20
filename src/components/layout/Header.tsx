import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-xl font-semibold text-slate-900 hidden sm:block">LawLink</h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500 hidden sm:block">Legal knowledge base available</span>
        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
      </div>
    </header>
  );
}
