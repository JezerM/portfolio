<script lang="ts">
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<main class="p-4 pb-20 sm:pb-24! md:py-8 lg:py-12">
  {@render children?.()}
</main>
