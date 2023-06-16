import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";
import "$lib/i18n";
import type { LayoutLoad } from "./$types";
import { locale } from "svelte-i18n";
locale.set("en");

export const prerender = true;

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
  console.log(pathname, params);
  return { pathname, language };
}) satisfies LayoutLoad;

inject({ mode: dev ? "development" : "production" });
