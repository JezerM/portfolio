import { init, addMessages, locale } from "svelte-i18n";
import { derived } from "svelte/store";

import en from "../locales/en.toml";
import es from "../locales/es.toml";

addMessages("en", en);
addMessages("es", es);

const defaultLocale = "en";

export const locales = ["en", "es"] as const;
export const localesLabels: { [key in (typeof locales)[number]]: string } = {
  en: "English",
  es: "Español",
};

init({
  fallbackLocale: defaultLocale,
  initialLocale: defaultLocale,
});

/**
 * Base path with current locale included
 * Ex:
 * `"/es" | "/fr"`
 */
export const baseLocale = derived(locale, ($locale) => {
  let endRoute = `/${$locale}`;
  if ($locale == "en") endRoute = ``;

  return endRoute.replace(/([^:]\/)\/+/g, "$1");
});
