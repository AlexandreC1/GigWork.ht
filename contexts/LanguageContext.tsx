import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Language, TranslationKey, translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LANGUAGE_STORAGE_KEY = 'gigwork.language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'ht';
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
  if (stored && stored in translations) return stored;
  const browserLanguage = window.navigator.language.split('-')[0] as Language;
  return browserLanguage in translations ? browserLanguage : 'ht';
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: TranslationKey): string => {
    const dictionary = translations[language] as Record<string, string>;
    const fallback = translations.en as Record<string, string>;
    if (dictionary[key] || fallback[key]) return dictionary[key] || fallback[key];
    return key.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
