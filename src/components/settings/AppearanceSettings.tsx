import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function AppearanceSettings() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();

  const options = [
    { id: 'light', label: t('settings.appearance.light'), icon: Sun },
    { id: 'dark', label: t('settings.appearance.dark'), icon: Moon },
    { id: 'system', label: t('settings.appearance.system'), icon: Monitor },
  ] as const;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-law-text-primary mb-2">{t('settings.appearance.title')}</h2>
        <p className="text-sm text-law-text-secondary">{t('settings.appearance.desc')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id as any)}
            className={cn(
              "flex flex-col items-center justify-center p-6 border-2 rounded-xl transition-all gap-3",
              theme === opt.id ? "border-law-indigo bg-indigo-50/30 text-law-indigo" : "border-law-border hover:border-law-indigo/50 text-law-text-secondary hover:bg-slate-50"
            )}
          >
            <opt.icon size={28} />
            <span className="font-semibold">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
