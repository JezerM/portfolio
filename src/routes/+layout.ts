import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
import "$lib/i18n";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load = (({ url, params }) => {
  const { pathname } = url;
  console.log(pathname, params);
  return { pathname };
}) satisfies LayoutLoad;

inject({ mode: dev ? "development" : "production" });
injectSpeedInsights();
