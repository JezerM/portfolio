import type { EntryGenerator } from "./$types";

export const entries = (() => {
  return [
    {
      language: "es",
    },
    {
      language: "en",
    },
  ];
}) satisfies EntryGenerator;

export const prerender = true;
