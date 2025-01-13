import type { PageServerLoad } from "./$types";
import services from "$lib/services.toml";
import projects from "$lib/projects.toml";
import { thumbnails } from "$lib/images";
import type Project from "$lib/types/project";
import type Service from "$lib/types/service";

export const load: PageServerLoad = async () => {
  const servicesValues: Service[] = Object.entries(services).map(([key, value]) => {
    return {
      key,
      ...value,
    };
  });

  const projectValues: Project[] = Object.entries(projects).map(([key, value]) => {
    return {
      key,
      ...value,
    };
  });

  const serviceImageKeys = servicesValues.map((v) => v.image);
  const projectImageKeys = projectValues.map((v) => v.image);

  const entries = Object.entries(thumbnails)
    .map(([k, v]) => {
      k = k.replace("/static", "");
      return [k, v] as [typeof k, typeof v];
    })
    .filter(([k]) => projectImageKeys.includes(k) || serviceImageKeys.includes(k));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: { [k: string]: any } = {};
  for (const [k, v] of entries) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values[k] = ((await v()) as any).default;
  }

  return { services: servicesValues, projects: projectValues, thumbnails: values };
};
