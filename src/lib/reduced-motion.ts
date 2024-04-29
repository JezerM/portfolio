import { browser } from "$app/environment";
import { derived, writable } from "svelte/store";

const isReduced = writable(false);
export const prefersReducedMotion = derived(isReduced, (v) => v);

if (browser) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", (ev) => {
    isReduced.set(ev.matches);
  });

  isReduced.set(mediaQuery.matches);
}
