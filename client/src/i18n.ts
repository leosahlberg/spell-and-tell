// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import svTranslation from "./locales/sv/translation.json";
import enTranslation from "./locales/en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sv: { translation: svTranslation },
      en: { translation: enTranslation },
    },
    fallbackLng: "sv",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
