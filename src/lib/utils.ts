import { locales } from "svelte-i18n";
import { page } from "$app/stores";
import { get } from "svelte/store";
import { base } from "$app/paths";

export function getUnlocalizedPath(path: string): string {
  let route = path;
  if (route?.startsWith("/")) route = route.substring(1);
  const splitted = route?.split("/");
  if (splitted && get(locales).includes(splitted[0])) {
    splitted?.shift();
    route = splitted?.join("/") ?? null;
  }
  return route;
}

/**
 * Returns current path with the specified locale
 */
export function localizePath(lang: string): string {
  let route: string = get(page).url.pathname;
  route = getUnlocalizedPath(route);

  let endRoute = `${base}/${lang}/${route}`;
  if (lang == "en") endRoute = `${base}/${route}`;

  return endRoute.replace(/([^:]\/)\/+/g, "$1");
}
