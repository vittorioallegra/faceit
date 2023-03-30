import { en } from '../messages';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  returnNull: false,
  lng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  ns: 'app',
  resources: {
    en,
  },
});

export { i18n };
