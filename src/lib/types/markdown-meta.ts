import type { TocItem } from "remark-flexible-toc";

export interface MarkdownMeta {
  title: string;
  date: Date;
  description: string;
  language: string;
  toc: TocItem[];
}
