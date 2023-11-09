import * as fs from "fs";
import type { EntryGenerator, RouteParams } from "./$types";

export const entries = (() => {
  const dir = fs.readdirSync("src/posts/", { withFileTypes: true, recursive: false });

  const posts = dir.reduce((filtered, value) => {
    if (value.isFile() && value.name.endsWith(".md")) {
      filtered.push({ post: value.name.replace(/(.*)(\.md)/, "$1") });
    }
    return filtered;
  }, [] as RouteParams[]);
  return posts;
}) satisfies EntryGenerator;

export const prerender = true;
