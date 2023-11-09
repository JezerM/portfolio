import { base } from "$app/paths";

export interface IMarkdown {
  title: string;
  date: Date;
  image: string;
}

export const fetchMarkdownPosts = async () => {
  const allPostFiles = import.meta.glob("/src/posts/*.md");
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = (await resolver()) as { metadata: IMarkdown };
      const postName = path.replace(/\/src\/posts\/(.*)\.md/, "$1");
      const postPath = `${base}/blog/${postName}`;

      return {
        meta: metadata,
        path: postPath,
      };
    })
  );

  return allPosts;
};
