<script lang="ts">
  import { _, date } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { TableOfContents } from "lucide-svelte";
  import { headDescription, headTitle } from "$lib/snippets/head.svelte";
  import { tocSection } from "$lib/snippets/toc.svelte";
  import PostShareLinks from "$lib/components/post-share-links.svelte";
  interface Props {
    data: PageData;
  }

  let { data: post }: Props = $props();

  const language = $derived.by(() => {
    if (post.language == "es") {
      return "Español";
    }
    return "English";
  });
</script>

<svelte:head>
  {@render headTitle(`Blog - ${post.title}`)}
  {@render headDescription(post.description)}

  <meta property="og:type" content="article" />

  <meta property="article:published_time" content={post.date.toISOString()} />
  <meta property="article:author" content="Jezer Mejía" />

  <style>
    body {
      background-color: var(--color-bg-dim) !important;
    }
  </style>
</svelte:head>

<article class="container mx-auto 2xl:max-w-(--breakpoint-lg)">
  <div class="border-b-bg-5 mt-8 mb-4 flex w-full flex-col border-b pb-4">
    <h1
      class="font-raster text-aqua drop-shadow-glow mb-4 transform-gpu text-left text-4xl select-none"
    >
      {post.title}
    </h1>
    <time datetime={post.date.toISOString()} class="block">
      {$_("blog.posted_on")}
      {$date(post.date, { dateStyle: "medium", timeStyle: "short" })}
    </time>
    <span>
      {$_("blog.language")}
      {language}
    </span>
    <blockquote class="text-grey-0 mt-1">
      {post.description}
    </blockquote>
  </div>

  <PostShareLinks />

  <div class="mt-12 flex flex-col gap-4">
    <!-- <aside -->
    <!--   class="top-4 col-span-1 flex h-fit w-full flex-col rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-4 backdrop-blur-md lg:sticky lg:col-span-3 xl:col-span-2" -->
    <!-- > -->
    <!--   <h2 class="mb-3 flex flex-row items-center gap-2 font-video text-xl text-fg-1"> -->
    <!--     <TableOfContents class="h-5 w-5" /> -->
    <!--     {$_("blog.toc")} -->
    <!--   </h2> -->
    <!--   <div -->
    <!--     class="custom-toc max-h-[calc(100svh_-_112px)] overflow-scroll prose-a:hover:text-yellow prose-a:focus:text-yellow prose-ol:border-l-2 prose-ol:border-l-bg-5 prose-ol:pl-5" -->
    <!--   > -->
    <!--     {@render tocSection(post.toc)} -->
    <!--   </div> -->
    <!-- </aside> -->

    <div class="mx-auto w-full" lang={post.language}>
      <div
        class={[
          "custom-prose font-print",
          "prose-headings:mb-1.5 prose-headings:pt-5 prose-headings:font-video",
          "prose-h2:border-b prose-h2:border-b-bg-5 prose-h2:pb-1 prose-h2:text-2xl prose-h2:text-red",
          "prose-h3:text-xl prose-h3:text-yellow",
          "prose-h4:text-lg prose-h4:text-blue",
          "prose-p:mb-3 prose-p:leading-relaxed prose-a:font-raster",
          "prose-a:text-orange prose-a:underline prose-a:underline-offset-4 prose-a:hover:text-yellow prose-a:focus:text-yellow",
          "prose-figure:mx-auto prose-figure:my-6 prose-figure:flex prose-figure:w-full prose-figure:max-w-4xl prose-figure:flex-col prose-figure:gap-2",
          "prose-figure:prose-img:w-full",
          "prose-figcaption:text-center prose-figcaption:font-video prose-figcaption:text-grey-0",
          "prose-code:bg-bg-0 prose-code:px-2 prose-code:py-1 prose-code:font-raster",
          "prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0",
          "prose-pre:mb-3 prose-pre:overflow-scroll prose-pre:bg-bg-0 prose-pre:px-3.5 prose-pre:py-2.5",
        ]}
      >
        <post.content />
      </div>
    </div>
  </div>
</article>

<style>
  @reference "tailwindcss/theme";

  .custom-prose :global(.article-heading-link) {
    display: inline-block;
    vertical-align: middle;
    margin-left: 6px;
    color: var(--color-grey-0);

    &:hover {
      color: var(--color-yellow);
    }
  }

  .custom-toc :global(.toc-level-0) {
    border: 0;
    padding-left: 0;
  }
</style>
