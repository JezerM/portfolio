import { locale } from "svelte-i18n";

export const prerender = true;

import type { LayoutLoad } from "./$types";

export const load = (({ url, params }) => {
  const { pathname } = url;
  const { language } = params;
  switch (language) {
    case "es":
      locale.set("es");
      break;
    case "en":
    default:
      locale.set("en");
      break;
  }
  console.log(params);
  return { pathname, language };
}) satisfies LayoutLoad;
