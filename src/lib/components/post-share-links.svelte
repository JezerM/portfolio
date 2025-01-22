<script lang="ts">
  import { page } from "$app/state";
  import Facebook from "$lib/icons/facebook.svelte";
  import Linkedin from "$lib/icons/linkedin.svelte";
  import Twitter from "$lib/icons/twitter.svelte";
  import { type Icon as IconType } from "lucide-svelte";
</script>

{#snippet shareLink(url: string, name: string, Icon: typeof IconType)}
  <a
    href={url}
    class={[
      "flex flex-row items-center gap-2 rounded-md border border-bg-5/50 bg-bg-dim/50 p-2 backdrop-blur-md transition-all ",
      "hover:border-bg-5 hover:bg-bg-dim hover:text-orange focus:border-bg-5 focus:text-orange",
      "active:scale-95",
    ]}
    title={name}
    target="_blank"
  >
    <Icon class="relative h-5 w-5" />
    <span>Share<span class="sr-only"> on {name}</span></span>
  </a>
{/snippet}

<div class="flex flex-row gap-2 text-sm">
  {@render shareLink("https://twitter.com/intent/tweet?url=" + page.url, "Twitter", Twitter)}
  {@render shareLink(
    "https://www.facebook.com/sharer/sharer.php?u=" + page.url,
    "Facebook",
    Facebook
  )}
  {@render shareLink(
    "https://www.linkedin.com/sharing/share-offsite/?url=" + page.url,
    "LinkedIn",
    Linkedin
  )}
</div>
