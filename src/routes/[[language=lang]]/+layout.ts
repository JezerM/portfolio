import "$lib/i18n";
import type { LayoutLoad } from "./$types";
import { locale, waitLocale } from "svelte-i18n";

export const load = (async ({ params }) => {
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

  await waitLocale();
  return { language };
}) satisfies LayoutLoad;
