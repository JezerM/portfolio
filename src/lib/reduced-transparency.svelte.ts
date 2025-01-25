import { browser } from "$app/environment";
import { PersistedState } from "runed";
import { MediaQuery } from "svelte/reactivity";
import { derived, toStore } from "svelte/store";

export const forcedReducedTransparency = new PersistedState("reduced-transparency", false);
export const prefersReducedTransparency = new MediaQuery("prefers-reduced-transparency");

const forcedStore = toStore(() => forcedReducedTransparency.current);
const prefersStore = toStore(() => prefersReducedTransparency.current);

export const isReducedTransparency = derived([forcedStore, prefersStore], (v) => {
  return v[0] || v[1];
});

isReducedTransparency.subscribe((v) => {
  if (!browser) return;
  const body = document.querySelector("body");
  body?.classList.toggle("prefers-reduced-transparency", v);
});
