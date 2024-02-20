import type { PageServerLoad } from "./$types";
import projects from "$lib/projects.json";
import { thumbnails } from "$lib/images";

export const load: PageServerLoad = async () => {
  const projectKeys = projects.map((v) => v.image);
  const entries = Object.entries(thumbnails)
    .map(([k, v]) => {
      k = k.replace("/static", "");
      return [k, v] as [typeof k, typeof v];
    })
    .filter(([k]) => projectKeys.includes(k));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: { [k: string]: any } = {};
  for (const [k, v] of entries) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values[k] = ((await v()) as any).default;
  }
  return { thumbnails: values };
};
