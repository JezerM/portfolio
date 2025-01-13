import { locales } from "svelte-i18n";
import { page } from "$app/state";
import { get } from "svelte/store";
import type { TransitionConfig } from "svelte/transition";
import { cubicOut } from "svelte/easing";

export function getUnlocalizedPath(path: string): string {
  let route = path;
  if (route?.startsWith("/")) route = route.substring(1);
  const splitted = route?.split("/");
  if (splitted && get(locales).includes(splitted[0])) {
    splitted?.shift();
    route = splitted?.join("/") ?? null;
  }
  return "/" + route;
}

/**
 * Returns current path with the specified locale
 */
export function localizePath(lang: string): string {
  let route = page.route.id ?? "";
  route = route?.replace("[[language=lang]]", "");

  let endRoute = `/${lang}/${route}`;
  if (lang == "en") endRoute = `/${route}`;

  return endRoute.replace(/\/+/g, "/");
}

type FlyAndScaleParams = {
  y?: number;
  x?: number;
  start?: number;
  duration?: number;
};

const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
  const [minA, maxA] = scaleA;
  const [minB, maxB] = scaleB;

  const percentage = (valueA - minA) / (maxA - minA);
  const valueB = percentage * (maxB - minB) + minB;

  return valueB;
};

const styleToString = (style: Record<string, number | string | undefined>): string => {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === undefined) return str;
    return str + `${key}:${style[key]};`;
  }, "");
};

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};

export type SlidePageParams = {
  target?: number;
  current?: number;
  duration?: number;
  delay?: number;
};

export const slidePage = (
  node: Element,
  params: SlidePageParams = { target: 1, current: 0, duration: 150, delay: 200 }
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  return {
    duration: params.duration ?? 200,
    delay: params.delay ?? 0,
    css: (t) => {
      const x = ((params.current ?? 0) - (params.target ?? 1)) * 100 * (1 - t);

      const scale = scaleConversion(t, [0, 1], [0.96, 1]);

      return styleToString({
        position: "static",
        transform: `${transform} translateX(${x}vw) scale(${scale})`,
      });
    },
    easing: cubicOut,
  };
};
