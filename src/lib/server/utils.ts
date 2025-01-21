import type { MarkdownMeta } from "$lib/types/markdown-meta";
import type { Post } from "$lib/types/post";

export const fetchMarkdownPosts = async () => {
  const allPostFiles = import.meta.glob("$posts/*.md");
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts: Post[] = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await resolver()) as { metadata: any };
      const metadata: MarkdownMeta = {
        date: new Date(data.metadata.date),
        title: data.metadata.title,
        description: data.metadata.description,
        toc: [],
        language: data.metadata.language ?? "en",
      };
      const postName = path.replace(/\/src\/posts\/(.*)\.md/, "$1");

      return {
        meta: metadata,
        name: postName,
      };
    })
  );

  allPosts.sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());

  return allPosts;
};
