import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./translations/en.json";
import hi from "./translations/hi.json";
import gu from "./translations/gu.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  gu: { translation: gu },
};

const fallback = { languageTag: "en" };

// Detect device language safely
// const bestLanguage = RNLocalize.findBestAvailableLanguage(["en", "hi", "gu"]);
// const { languageTag } = bestLanguage || fallback;
const { languageTag } =   fallback;

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    lng: languageTag,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Add listener inside a safe function (not at top level)
export const initLocalization = () => {
  RNLocalize.addEventListener("change", () => {
    const { languageTag } =
      RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;
    i18n.changeLanguage(languageTag);
  });
};

export default i18n;
