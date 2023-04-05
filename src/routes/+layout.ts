import type { PageLoad } from "./$types";
export const prerender = true;

export const load = (({ url }) => {
  const { pathname } = url;
  return { pathname };
}) satisfies PageLoad;
