import { locales } from "svelte-i18n";
import { get } from "svelte/store";

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
