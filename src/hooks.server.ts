import type { Handle } from "@sveltejs/kit";
import { locale } from "svelte-i18n";
import { get } from "svelte/store";

export const handle = (({ event, resolve }) => {
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", get(locale) as string),
  });
}) satisfies Handle;
