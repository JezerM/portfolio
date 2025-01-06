<script lang="ts">
  import { baseLocale } from "$lib/i18n";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="m-5 md:mx-12 md:my-8 lg:mx-20 lg:my-12">
  <a href="{$baseLocale}/">Portfolio</a>
  <a href="/blog">Blog</a>
  <main class="p-8">
    {@render children?.()}
  </main>
</div>
