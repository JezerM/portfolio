import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param) => {
  return /^(es|en)$/.test(param);
}) satisfies ParamMatcher;
