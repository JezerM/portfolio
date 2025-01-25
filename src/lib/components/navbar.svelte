<script lang="ts">
  import type { Icon as IconType } from "lucide-svelte";
  import { FolderOpen, House, NotebookText } from "lucide-svelte";
  import { _ } from "svelte-i18n";

  import { page } from "$app/state";
  import { getUnlocalizedPath } from "$lib/utils";
  import { baseLocale } from "$lib/i18n";
  import LanguageSelector from "./language-selector.svelte";
  import { pushOnClick } from "$lib/actions.svelte";
  import ReduceTransparency from "./reduce-transparency.svelte";

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
      "border-bg-5 bg-bg-dim flex flex-row items-center justify-center gap-2 rounded-md border px-2 py-1.5 text-center transition-all",
      "sm:min-w-32 sm:px-3",
      "hover:text-orange",
      "active:scale-95",
      isActive && "border-orange min-w-20 border-2",
    ]}
  >
    {#if Icon}
      <Icon class="relative h-5 w-5" />
    {/if}
    <span class={["sr-only sm:not-sr-only", isActive && "not-sr-only!"]}>
      {label}
    </span>
  </a>
{/snippet}

<div class="fixed right-0 bottom-3 left-0 z-50 mx-auto w-fit [perspective:500px] sm:bottom-6">
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <nav
    class="border-bg-status-line-3 bg-bg-status-line-2/50 bg-kraft rounded-md border px-4 py-1.5 backdrop-blur-md transition-transform sm:px-6 sm:py-3"
    use:pushOnClick
  >
    <div class="flex flex-row gap-3 text-xs sm:gap-6 sm:text-base">
      {@render navLink($baseLocale + "/", $_("navigation.home"), House)}
      {@render navLink($baseLocale + "/services", $_("navigation.services"), FolderOpen)}
      {@render navLink($baseLocale + "/blog", $_("navigation.blog"), NotebookText)}
      <hr class="border-fg-0 h-auto border-[0.5px]" />
      <div class="flex flex-row gap-1.5 sm:gap-3">
        <LanguageSelector />
        <ReduceTransparency />
      </div>
    </div>
  </nav>
</div>
