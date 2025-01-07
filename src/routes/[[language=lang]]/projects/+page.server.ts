import type { PageServerLoad } from "./$types";
import projects from "$lib/projects.toml";
import { thumbnails } from "$lib/images";
import type Project from "$lib/types/project";

export const load: PageServerLoad = async () => {
  const projectObjects = Object.entries(projects).map(([key, value]) => {
    return {
      key,
      name: value.name,
      image: value.image,
      github: value.github,
      link: value.link,
    } satisfies Project;
  });

  const imageKeys = projectObjects.map((v) => v.image);
  const entries = Object.entries(thumbnails)
    .map(([k, v]) => {
      k = k.replace("/static", "");
      return [k, v] as [typeof k, typeof v];
    })
    .filter(([k]) => imageKeys.includes(k));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: { [k: string]: any } = {};
  for (const [k, v] of entries) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values[k] = ((await v()) as any).default;
  }

  return { projects: projectObjects, thumbnails: values };
};
