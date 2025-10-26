import { createContext, useState, useEffect } from 'react';
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
    return (saved as Language) || 'eng';
  });
  const [translations, setTranslations] = useState(globalEng);

  useEffect(() => {
    localStorage.setItem('rmspices-language', language);
    // Update global translations based on language
    setTranslations(language === 'eng' ? globalEng : globalGer);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: TranslationKey): unknown => {
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
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export the provider as default to support Fast Refresh
export default LanguageProviderComponent;

// Named export for convenience
export const LanguageProvider = LanguageProviderComponent;

