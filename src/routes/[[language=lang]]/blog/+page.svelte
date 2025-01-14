<script lang="ts">
  import PostCard from "$lib/components/post-card.svelte";
  import { _ } from "svelte-i18n";
  import type { PageServerData } from "./$types";
  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{$_("head.blog_title")}</title>
  <meta name="description" content={$_("head.blog_description")} />
  <meta property="og:description" content={$_("head.blog_description")} />
</svelte:head>

<h1 class="mt-4 transform-gpu text-center font-raster text-4xl text-red drop-shadow-glow">
  {$_("navigation.blog")}
</h1>

<div
  class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
>
  {#each data.posts as post}
    <PostCard {post} />
  {/each}
</div>
