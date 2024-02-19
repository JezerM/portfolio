<script lang="ts">
  import { base } from "$app/paths";

  const imageNames = [
    "C",
    "Rust",
    "TypeScript",
    "NodeJS",
    "Svelte",
    "Vue",
    "MySQL",
    "Html",
    "Swift",
    "CSharp",
    "Kotlin",
    "Java",
  ];
</script>

<div class="flex flex-row flex-wrap gap-3">
  {#each imageNames as name}
    <img
      src="{base}/icons/{name}.png"
      alt={name}
      title={name}
      class="size-8 [image-rendering:pixelated]"
    />
  {/each}
</div>
