<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<main class="container mx-auto mb-20 p-3 sm:mb-16 md:py-8 lg:py-12 2xl:max-w-7xl">
  {@render children?.()}
</main>
