<script lang="ts">
  import type { Icon as IconType } from "lucide-svelte";
  import { Check, Earth, FolderOpen, House, NotebookText } from "lucide-svelte";
  import { Select } from "bits-ui";
  import { _ } from "svelte-i18n";

  import { page } from "$app/state";
  import { flyAndScale, getUnlocalizedPath } from "$lib/utils";
  import { baseLocale } from "$lib/i18n";
  import { scale } from "svelte/transition";
  import LanguageSelector from "./language-selector.svelte";

  function active(path: string) {
    path = getUnlocalizedPath(path);
    const pathname = getUnlocalizedPath(page.url.pathname);
    if (path == "/") {
      return pathname == path;
    }
    return pathname.startsWith(path);
  }
</script>

{#snippet navLink(path: string, label: string, Icon?: typeof IconType)}
  {@const isActive = active(path)}
  <a
    href={path}
    class={[
      "flex flex-row items-center justify-center gap-2 rounded-md border border-bg-5 bg-bg-dim px-2 py-1.5 text-center transition-colors hover:text-orange sm:min-w-32 sm:px-3",
      isActive && "min-w-20 border-2 border-orange",
    ]}
  >
    {#if Icon}
      <Icon class="relative h-5 w-5" />
    {/if}
    <span class={["sr-only sm:not-sr-only", isActive && "!not-sr-only"]}>
      {label}
    </span>
  </a>
{/snippet}

<nav
  class="fixed bottom-3 left-0 right-0 z-50 mx-auto w-fit rounded-md border border-bg-status-line-3 bg-bg-status-line-2/50 bg-noise px-4 py-2 backdrop-blur-md sm:bottom-6 sm:px-6 sm:py-3"
>
  <div class="flex flex-row gap-3 text-sm sm:gap-6 sm:text-base">
    {@render navLink($baseLocale + "/", $_("navigation.home"), House)}
    {@render navLink($baseLocale + "/services", $_("navigation.services"), FolderOpen)}
    {@render navLink("/blog", $_("navigation.blog"), NotebookText)}
    <hr class="h-auto border-[0.5px] border-fg-0" />
    <div class="flex flex-row gap-3">
      <LanguageSelector />
    </div>
  </div>
</nav>
