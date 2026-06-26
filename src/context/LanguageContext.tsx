import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, languages, getTranslation } from '../data/translations';
import { getLanguage, setLanguage as saveLanguage } from '../data/store';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = getLanguage();
    return (languages.find(l => l.code === saved)?.code || 'en') as Language;
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    saveLanguage(newLang);
  };

  const t = (key: string) => getTranslation(lang, key);
  
  const dir = languages.find(l => l.code === lang)?.dir || 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
