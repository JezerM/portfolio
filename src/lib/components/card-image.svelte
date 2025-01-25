<script lang="ts">
  import { _ } from "svelte-i18n";
  import { ImageOff, LoaderCircle } from "lucide-svelte";
  import type { EnhancedImgAttributes } from "@sveltejs/enhanced-img";

  interface Props {
    src?: EnhancedImgAttributes["src"];
    class?: EnhancedImgAttributes["class"];
    alt: string;
  }

  const { src, alt, class: className }: Props = $props();

  let imageState: "loaded" | "error" | "loading" = $state("loading");

  if (!src) {
    imageState = "error";
  }
</script>

{#if imageState != "error" && src}
  <enhanced:img
    class={["flex h-full w-full", className]}
    {src}
    {alt}
    sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
    onerror={() => {
      imageState = "error";
    }}
    onload={() => {
      imageState = "loaded";
    }}
  />
{/if}
{#if imageState == "loading"}
  <LoaderCircle class="text-muted-foreground absolute inset-0 m-auto h-5 w-5 animate-spin" />
{:else if imageState == "error"}
  <ImageOff class="text-muted-foreground absolute inset-0 m-auto h-5 w-5" />
{/if}
