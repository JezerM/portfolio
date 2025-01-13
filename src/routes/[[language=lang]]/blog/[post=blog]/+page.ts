import type { MarkdownMeta } from "$lib/types/markdown-meta";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const post = await import(`$posts/${params.post}.md`);
  const { title, date, description, toc } = post.metadata as MarkdownMeta;
  const content = post.default;

  return {
    content,
    title,
    date: new Date(date),
    description,
    toc,
  };
}) satisfies PageLoad;
