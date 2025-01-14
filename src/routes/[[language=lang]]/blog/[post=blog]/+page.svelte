<script lang="ts">
  import { _, date } from "svelte-i18n";
  import type { PageData } from "./$types";
  import { TableOfContents } from "lucide-svelte";
  import { headDescription, headTitle } from "$lib/snippets/head.svelte";
  import { tocSection } from "$lib/snippets/toc.svelte";
  interface Props {
    data: PageData;
  }

  let { data: post }: Props = $props();
</script>

<svelte:head>
  {@render headTitle(`Blog - ${post.title}`)}
  {@render headDescription(post.description)}

  <meta property="og:type" content="article" />

  <meta property="article:published_time" content={post.date.toISOString()} />
  <meta property="article:author" content="Jezer Mejía" />
</svelte:head>

<article>
  <div
    class="bg-kraft mt-8 flex w-fit flex-col rounded-md border border-bg-5 bg-bg-dim/50 p-3 backdrop-blur-md"
  >
    <h1 class="mb-4 transform-gpu text-left font-raster text-4xl text-aqua drop-shadow-glow">
      {post.title}
    </h1>
    <time datetime={post.date.toISOString()} class="block">
      {$_("blog.posted_on")}
      {$date(post.date, { dateStyle: "medium", timeStyle: "short" })}
    </time>
    <blockquote class="mt-1 text-grey-0">
      {post.description}
    </blockquote>
  </div>

  <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-9">
    <aside
      class="bg-kraft top-4 col-span-1 flex h-fit w-full flex-col rounded-md border border-bg-5 bg-bg-dim/50 p-4 backdrop-blur-md lg:sticky lg:col-span-3 xl:col-span-2"
    >
      <h2 class="mb-3 flex flex-row items-center gap-2 font-video text-xl text-fg-1">
        <TableOfContents class="h-5 w-5" />
        {$_("blog.toc")}
      </h2>
      <div
        class="custom-toc max-h-[calc(100svh_-_112px)] overflow-scroll hover:prose-a:text-yellow focus:prose-a:text-yellow prose-ol:border-l-2 prose-ol:border-l-bg-5 prose-ol:pl-5"
      >
        {@render tocSection(post.toc)}
      </div>
    </aside>

    <div
      class="bg-kraft col-span-1 mx-auto w-full bg-bg-dim p-4 !py-10 sm:p-6 lg:col-span-6 xl:col-span-7"
    >
      <div
        class={[
          "custom-prose font-print",
          "prose-headings:mb-1.5 prose-headings:pt-5 prose-headings:font-video",
          "prose-h2:border-b prose-h2:border-b-bg-5 prose-h2:pb-1 prose-h2:text-2xl prose-h2:text-red",
          "prose-h3:text-xl prose-h3:text-yellow",
          "prose-h4:text-lg prose-h4:text-blue",
          "prose-p:mb-3 prose-p:leading-relaxed prose-a:font-raster",
          "prose-a:text-orange prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-yellow focus:prose-a:text-yellow",
        ]}
      >
        <post.content />
      </div>
    </div>
  </div>
</article>

<style>
  .custom-prose :global(.article-heading-link) {
    display: inline-block;
    vertical-align: middle;
    margin-left: 6px;
    @apply text-grey-0;

    &:hover {
      @apply text-yellow;
    }
  }

  .custom-toc :global(.toc-level-0) {
    border: 0;
    padding-left: 0;
  }
</style>
