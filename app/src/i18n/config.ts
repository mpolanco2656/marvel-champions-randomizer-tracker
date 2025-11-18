import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import enRandomizer from './locales/en/randomizer.json';
import esRandomizer from './locales/es/randomizer.json';

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources: {
      en: {
        common: enCommon,
        randomizer: enRandomizer,
      },
      es: {
        common: esCommon,
        randomizer: esRandomizer,
      },
    },
    fallbackLng: 'es', // Default to Spanish
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator'],
      // Cache user language
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
