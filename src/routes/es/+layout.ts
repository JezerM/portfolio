import { locale } from "svelte-i18n";
locale.set("es");

export const prerender = true;

import type { LayoutLoad } from "./$types";

export const load = (({ url }) => {
  const { pathname } = url;
  return { pathname };
}) satisfies LayoutLoad;
