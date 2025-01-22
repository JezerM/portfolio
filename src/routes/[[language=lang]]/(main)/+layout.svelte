<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { LayoutData } from "./$types";
  import { headDescription } from "$lib/snippets/head.svelte";

  interface Props {
    data: LayoutData;
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<svelte:head>
  {@render headDescription($_("head.description"))}

  <meta property="og:type" content="website" />
</svelte:head>

<div class="container mx-auto mb-20 p-3 sm:mb-16 md:py-8 lg:py-12 2xl:max-w-7xl">
  {@render children?.()}
</div>
