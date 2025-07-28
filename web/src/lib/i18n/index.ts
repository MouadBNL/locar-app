import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_common from './locales/en/common.json';
import en_vehicle from './locales/en/vehicle.json';
import fr_common from './locales/fr/common.json';
import fr_vehicle from './locales/fr/vehicle.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {},
    common: en_common,
    vehicle: en_vehicle,
  },
  fr: {
    translation: {},
    common: fr_common,
    vehicle: fr_vehicle,
  },
};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    returnNull: false,
    resources,
    defaultNS: 'common',
    ns: ['common', 'vehicle'],
    fallbackLng: 'en',
    lng: 'fr', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
