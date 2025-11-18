import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import enRandomizer from './locales/en/randomizer.json';
import esRandomizer from './locales/es/randomizer.json';
import enTabs from './locales/en/tabs.json';
import esTabs from './locales/es/tabs.json';
import enCampaign from './locales/en/campaign.json';
import esCampaign from './locales/es/campaign.json';
import enCampaignRandomizer from './locales/en/campaignRandomizer.json';
import esCampaignRandomizer from './locales/es/campaignRandomizer.json';
import enCollection from './locales/en/collection.json';
import esCollection from './locales/es/collection.json';
import enHistory from './locales/en/history.json';
import esHistory from './locales/es/history.json';
import enProgression from './locales/en/progression.json';
import esProgression from './locales/es/progression.json';

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
        tabs: enTabs,
        campaign: enCampaign,
        campaignRandomizer: enCampaignRandomizer,
        collection: enCollection,
        history: enHistory,
        progression: enProgression,
      },
      es: {
        common: esCommon,
        randomizer: esRandomizer,
        tabs: esTabs,
        campaign: esCampaign,
        campaignRandomizer: esCampaignRandomizer,
        collection: esCollection,
        history: esHistory,
        progression: esProgression,
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
