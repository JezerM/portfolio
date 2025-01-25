import RemarkFlexibleToc from "remark-flexible-toc";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import { enhancedImages } from "mdsvex-enhanced-images";
import { h } from "hastscript";

function flexibleToc() {
  let visit = RemarkFlexibleToc({});
  return async function transformer(tree, vFile) {
    visit(tree, vFile, () => {});
    vFile.data.fm.toc = vFile.data.toc;
  };
}

/**
 * @typedef {import('hast').ElementContent} ElementContent
 */
/** @type {import('rehype-autolink-headings').Options} */
const autoLinkOptions = {
  behavior: "append",
  properties: {
    "aria-hidden": true,
    tabindex: -1,
    class: "article-heading-link",
  },
  content() {
    return h(
      "svg",
      {
        viewBox: "0 0 24 24",
        width: "0.85em",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "none",
      },
      [
        h("path", {
          d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
        }),
        h("path", {
          d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
        }),
      ]
    );
  },
};

import { visit } from "unist-util-visit";

function rehypeFigure(option) {
  const className = (option && option.className) || "rehype-figure";

  function buildFigure(img) {
    const match = img.value.match(/alt="(.*)"/);
    const alt = match ? match[1] : null;
    const figure = h("figure", { class: className }, [
      img,
      alt && alt.trim().length > 0 ? h("figcaption", alt) : "",
    ]);
    return figure;
  }

  return function (tree) {
    visit(tree, { tagName: "p" }, (node, index) => {
      const images = node.children
        .filter((n) => {
          return n.type === "raw" && n.value.startsWith("<enhanced:img");
        })
        .map((img) => buildFigure(img));

      if (images.length === 0) return;

      tree.children[index] =
        images.length === 1
          ? images[0]
          : (tree.children[index] = h("div", { class: `${className}-container` }, images));
    });
  };
}

/** @type {import('rehype-external-links').Options} */
const externalLinksOptions = {
  target: "_blank",
};

/** @type {import('mdsvex').MdsvexOptions} */
export default {
  extensions: [".md"],
  remarkPlugins: [flexibleToc, enhancedImages],
  rehypePlugins: [
    [rehypeSlug],
    [rehypeAutoLinkHeadings, autoLinkOptions],
    [rehypeExternalLinks, externalLinksOptions],
    [rehypeFigure],
  ],
};
