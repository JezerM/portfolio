import type { EntryGenerator, RouteParams } from "./$types";
import { fetchMarkdownPosts } from "$lib/server/utils";

export const entries = (async () => {
  const posts = await fetchMarkdownPosts();

  return posts.map((v) => {
    return { post: v.name } as RouteParams;
  });
}) satisfies EntryGenerator;

export const prerender = true;
