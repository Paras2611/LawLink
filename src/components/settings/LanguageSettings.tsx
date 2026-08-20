import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { cn } from '@/src/lib/utils';

export function LanguageSettings() {
  const { t, language, setLanguage } = useI18n();

  const options = [
    { id: 'en', label: t('settings.language.en') },
    { id: 'hi', label: t('settings.language.hi') },
    { id: 'mr', label: t('settings.language.mr') },
  ] as const;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-law-text-primary mb-2">{t('settings.language.title')}</h2>
        <p className="text-sm text-law-text-secondary">{t('settings.language.desc')}</p>
      </div>

      <div className="space-y-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setLanguage(opt.id as any)}
            className={cn(
              "w-full flex items-center justify-between p-4 border rounded-xl transition-all text-left",
              language === opt.id ? "border-law-indigo bg-indigo-50/50" : "border-law-border hover:border-law-indigo/50"
            )}
          >
            <span className={cn("font-medium", language === opt.id ? "text-law-indigo" : "text-law-text-primary")}>
              {opt.label}
            </span>
            {language === opt.id && (
              <div className="w-3 h-3 rounded-full bg-law-indigo" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
