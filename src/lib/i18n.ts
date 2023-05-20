import { browser } from "$app/environment";
import { init, addMessages } from "svelte-i18n";

import en from "../locales/en.json";
import es from "../locales/es.json";

addMessages("en", en);
addMessages("es", es);

console.log(es);
console.log(en);

const defaultLocale = "en";

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale,
});
