import type { LayoutLoad } from "./$types";
import { locale } from "svelte-i18n";

export const load = (({ params }) => {
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
  return { language };
}) satisfies LayoutLoad;
