import { browser } from "$app/environment";
import { derived, get, writable, type Writable } from "svelte/store";

const theme: Writable<"light" | "dark" | "auto"> = writable("auto");
export const darkMode = derived(theme, (v) => {
  if (v == "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return v == "dark";
});

export function setAppearance(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  const value = dark ? "dark" : "light";
  localStorage.setItem("theme", value);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  theme.set(value);

  if ((prefersDark && dark) || (prefersLight && !dark)) {
    theme.set("auto");
  }
}

if (browser) {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setAppearance(true);
  } else {
    setAppearance(false);
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (ev) => {
    if (get(theme) != "auto") return;
    if (ev.matches) {
      setAppearance(true);
    } else {
      setAppearance(false);
    }
  });
}
