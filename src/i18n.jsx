import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';

/* Configures the localisation languages and resource JSON files */
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en }
    },
    supportedLngs: ["en"],
    fallbackLng: 'en',
    parseMissingKeyHandler: () => ''
}).then(() => { });

export default i18n;