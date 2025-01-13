<script lang="ts">
  import { _, date } from "svelte-i18n";
  import type { PageData } from "./$types";
  interface Props {
    data: PageData;
  }

  let { data: post }: Props = $props();

  console.log(post.toc);
</script>

<svelte:head>
  <title>Blog - {post.title}</title>
  <meta name="description" content={post.description} />
  <meta property="og:description" content={post.description} />
</svelte:head>

<article>
  <h1 class="mt-4 transform-gpu text-left font-raster text-3xl text-aqua drop-shadow-glow">
    {post.title}
  </h1>
  <div
    class="mt-4 flex w-fit flex-col rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-3 backdrop-blur-md"
  >
    <time datetime={post.date.toUTCString()} class="block">
      Posted on: {$date(post.date, { dateStyle: "medium", timeStyle: "short" })}
    </time>
    <blockquote class="mt-1 text-grey-0">
      {post.description}
    </blockquote>
  </div>

  <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-9">
    <aside
      class="top-4 col-span-1 flex h-fit w-full flex-col rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-3 backdrop-blur-md lg:sticky lg:col-span-2"
    >
      <h2 class="mb-1.5 font-video text-xl text-fg-1">Table of contents</h2>
      {#each post.toc as toc}
        <a href={toc.href}>{toc.value}</a>
      {/each}
    </aside>

    <div class="col-span-1 mx-auto w-full bg-bg-dim bg-kraft p-6 pt-8 lg:col-span-7">
      <div
        class="custom-prose prose-a:underlinp font-print prose-headings:mb-1.5 prose-headings:mt-5 prose-headings:font-video prose-h2:border-b prose-h2:border-b-bg-5 prose-h2:pb-1 prose-h2:text-2xl prose-h2:text-red prose-h3:text-xl prose-h3:text-yellow prose-p:mb-3 prose-a:text-orange"
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
      @apply text-orange;
    }
  }
</style>
