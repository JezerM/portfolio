import type { IMarkdown } from "$lib/server/utils";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const post = await import(`../../../posts/${params.post}.md`);
  const { title, date, image } = post.metadata as IMarkdown;
  const content = post.default;

  return {
    content,
    title,
    date,
    image,
  };
}) satisfies PageLoad;
