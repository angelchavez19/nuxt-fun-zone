import { enTranslate } from "./i18n";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: enTranslate,
  },
}));
