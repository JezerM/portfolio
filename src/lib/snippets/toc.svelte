<script module lang="ts">
  import type { TocItem } from "remark-flexible-toc";
  import { createRawSnippet } from "svelte";

  /**
   * Programatic TOC snippet based on remark-flexible-toc
   */
  export const tocSection = createRawSnippet<[TocItem[]]>((params) => {
    const toc = params();
    return {
      render: () => {
        let result = "";

        const minDepth = toc.map((v) => v.depth).reduce((a, b) => (a < b ? a : b), 6);
        let depth = -1;
        for (const item of toc) {
          const itemDepth = item.depth - minDepth;
          if (depth < itemDepth) {
            result += `<ol class="toc-level-${itemDepth}">`;
          } else if (depth > itemDepth) {
            result += "</ol>";
          } else {
            result += "</li>";
          }

          depth = itemDepth;

          result += "<li>";
          result += `<a href="${item.href}">${item.value}</a>`;
        }

        return result;
      },
    };
  });
</script>
