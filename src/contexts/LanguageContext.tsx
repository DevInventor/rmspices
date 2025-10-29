import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type globalEngType from '../config/eng/global.json';
import globalEng from '../config/eng/global.json';
import globalGer from '../config/ger/global.json';

type Language = 'eng' | 'ger';
type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => unknown;
  translations: typeof globalEngType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Export context separately for useLanguage hook
export { LanguageContext };

const LanguageProviderComponent = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('rmspices-language');
    return (saved === 'eng' || saved === 'ger') ? saved : 'eng';
  });

  // Memoize translations to avoid unnecessary re-renders
  const translations = useMemo(() => {
    return language === 'eng' ? globalEng : globalGer;
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('rmspices-language', language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    if (lang === 'eng' || lang === 'ger') {
      setLanguageState(lang);
    }
  }, []);

  // Memoize translation function
  const t = useCallback((key: TranslationKey): unknown => {
    // Simple translation lookup
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
      }
      if (value === undefined) break;
    }
    
    return value !== undefined ? value : key;
  }, [translations]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    translations
  }), [language, setLanguage, t, translations]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export the provider as default to support Fast Refresh
export default LanguageProviderComponent;

// Named export for convenience
export const LanguageProvider = LanguageProviderComponent;

