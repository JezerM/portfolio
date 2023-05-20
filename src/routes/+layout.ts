import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";
import "$lib/i18n";
import type { LayoutLoad } from "./$types";
import { locale } from "svelte-i18n";
locale.set("en");

export const prerender = true;

export const load = (({ url }) => {
  const { pathname } = url;
  return { pathname };
}) satisfies LayoutLoad;

inject({ mode: dev ? "development" : "production" });
