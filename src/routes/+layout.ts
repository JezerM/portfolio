import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load = (({ url }) => {
  const { pathname } = url;
  return { pathname };
}) satisfies LayoutLoad;

inject({ mode: dev ? "development" : "production" });
