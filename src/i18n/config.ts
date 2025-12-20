import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationSI from './locales/si.json';
import translationEN from './locales/en.json';

const resources = {
  si: {
    translation: translationSI
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'si',
    fallbackLng: 'si',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
