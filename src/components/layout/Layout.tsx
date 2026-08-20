import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ContextPanel } from './ContextPanel';
import { MobileBottomNav } from './MobileBottomNav';

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contextPanelOpen, setContextPanelOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] bg-law-bg overflow-hidden relative text-law-text-primary">
      <Sidebar isMobileOpen={mobileMenuOpen} closeMobile={() => setMobileMenuOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header 
          onMenuClick={() => setMobileMenuOpen(true)} 
          onContextClick={() => setContextPanelOpen(!contextPanelOpen)} 
        />
        
        <div className="flex-1 flex overflow-hidden relative pb-16 md:pb-0">
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
          
          <ContextPanel 
            isOpen={contextPanelOpen} 
            onClose={() => setContextPanelOpen(false)} 
          />
        </div>
      </div>
      
      <MobileBottomNav />
    </div>
  );
}
