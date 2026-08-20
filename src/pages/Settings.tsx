import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { Settings as SettingsIcon, Palette, Languages, Bell, Shield, Lock } from 'lucide-react';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { LanguageSettings } from '../components/settings/LanguageSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { PrivacySettings } from '../components/settings/PrivacySettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { cn } from '@/src/lib/utils';

type SettingsTab = 'appearance' | 'language' | 'notifications' | 'privacy' | 'security';

export function Settings() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');

  const tabs = [
    { id: 'appearance', label: t('settings.nav.appearance'), icon: Palette },
    { id: 'language', label: t('settings.nav.language'), icon: Languages },
    { id: 'notifications', label: t('settings.nav.notifications'), icon: Bell },
    { id: 'privacy', label: t('settings.nav.privacy'), icon: Shield },
    { id: 'security', label: t('settings.nav.security'), icon: Lock }
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'appearance': return <AppearanceSettings />;
      case 'language': return <LanguageSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'privacy': return <PrivacySettings />;
      case 'security': return <SecuritySettings />;
      default: return <AppearanceSettings />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 shrink-0 pb-6">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-law-indigo">
            <SettingsIcon size={20} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary">{t('settings.title')}</h1>
            <p className="text-sm text-law-text-secondary mt-1">{t('settings.description')}</p>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-10">
          
          {/* Mobile / Tablet Nav (Horizontal scroll) */}
          <div className="md:hidden flex overflow-x-auto no-scrollbar pb-1 border-b border-law-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
                  activeTab === tab.id ? "border-law-indigo text-law-indigo" : "border-transparent text-law-text-secondary hover:text-law-text-primary"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-col w-56 lg:w-64 shrink-0 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                  activeTab === tab.id ? "bg-white shadow-sm text-law-indigo border border-law-border" : "text-law-text-secondary hover:bg-slate-100 hover:text-law-text-primary border border-transparent"
                )}
              >
                <tab.icon size={18} className={cn(activeTab === tab.id ? "text-law-indigo" : "text-law-text-muted")} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content Panel */}
          <div className="flex-1 bg-white border border-law-border rounded-xl p-5 sm:p-8 shadow-sm">
            {renderContent()}
          </div>

        </div>
      </div>
    </div>
  );
}
