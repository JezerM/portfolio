import { init, addMessages, locale } from "svelte-i18n";
import { derived } from "svelte/store";

import en from "../locales/en.json";
import es from "../locales/es.json";

addMessages("en", en);
addMessages("es", es);

//console.log(es);
//console.log(en);

const defaultLocale = "en";

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
