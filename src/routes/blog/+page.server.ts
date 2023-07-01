import { fetchMarkdownPosts } from "$root/lib/server/utils";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const posts = await fetchMarkdownPosts();
  return {
    posts: posts,
  };
}) satisfies PageServerLoad;
