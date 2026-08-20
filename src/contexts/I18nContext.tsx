import React, { createContext, useContext, useState } from 'react';
import en from '../lib/i18n/locales/en.json';
import hi from '../lib/i18n/locales/hi.json';
import mr from '../lib/i18n/locales/mr.json';

type Language = 'en' | 'hi' | 'mr';
const translations = { en, hi, mr };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    const value = (translations[language] as Record<string, string>)[key];
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
