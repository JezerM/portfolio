<script lang="ts">
  const imageNames = [
    "C",
    "Rust",
    "TypeScript",
    "NodeJS",
    "Svelte",
    "Vue",
    "React",
    "MySQL",
    "PostgreSQL",
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
      src="/icons/{name}.png"
      alt={name}
      title={name}
      class="size-8 [image-rendering:pixelated]"
    />
  {/each}
</div>
