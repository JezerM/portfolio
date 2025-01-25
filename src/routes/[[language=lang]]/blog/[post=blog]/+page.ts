import type { MarkdownMeta } from "$lib/types/markdown-meta";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const post = await import(`$posts/${params.post}.md`);
  const { title, date, description, toc, language } = post.metadata as Partial<MarkdownMeta>;
  const content = post.default;

  return {
    content,
    title: title ?? params.post,
    date: new Date(date!),
    description: description ?? "",
    toc: toc ?? [],
    language: language ?? "en",
  };
}) satisfies PageLoad;
