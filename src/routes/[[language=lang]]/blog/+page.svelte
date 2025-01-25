<script lang="ts">
  import PostCard from "$lib/components/post-card.svelte";
  import { _ } from "svelte-i18n";
  import type { PageServerData } from "./$types";
  import { headTitle } from "$lib/snippets/head.svelte";
  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  {@render headTitle($_("head.blog_title"))}

  <meta property="og:type" content="website" />
</svelte:head>

<h1
  class="font-raster text-red drop-shadow-glow mt-4 transform-gpu text-center text-4xl select-none"
>
  {$_("navigation.blog")}
</h1>

<div
  class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
>
  {#each data.posts as post}
    <PostCard {post} />
  {/each}
</div>
