<script lang="ts">
  import type { Icon as IconType } from "lucide-svelte";
  import { Earth, FolderOpen, House, NotebookText } from "lucide-svelte";
  import { locale, _ } from "svelte-i18n";

  import { page } from "$app/state";
  import { getUnlocalizedPath, localizePath } from "$lib/utils";
  import { baseLocale } from "$lib/i18n";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";

  const language = $derived.by(() => {
    switch ($locale) {
      case "es":
        return "Español";
      case "en":
      default:
        return "English";
    }
  });

  function active(path: string) {
    path = getUnlocalizedPath(path);
    const pathname = getUnlocalizedPath(page.url.pathname);
    if (path == "/") {
      return pathname == path;
    }
    return pathname.startsWith(path);
  }

  function changeLanguage() {
    let lang = "en";
    if (get(locale) == "en") {
      lang = "es";
    }
    const path = localizePath(lang);
    goto(path, { noScroll: true });
    locale.set(lang);
  }
</script>

{#snippet navLink(path: string, label: string, Icon?: typeof IconType)}
  {@const isActive = active(path)}
  <li>
    <a
      href={path}
      class={[
        "flex flex-row items-center justify-center gap-2 rounded-md border border-bg-5 bg-bg-dim px-2 py-1.5 text-center transition-colors hover:text-orange sm:min-w-32 sm:px-3",
        isActive && "min-w-20 border-2 border-orange",
      ]}
    >
      {#if Icon}
        <Icon class="relative h-5 w-5 transition-transform group-hover:scale-110" />
      {/if}
      <span class={["hidden sm:block", isActive && "!block"]}>
        {label}
      </span>
    </a>
  </li>
{/snippet}

{#snippet navButton(action: () => void, label: string, Icon?: typeof IconType)}
  <li>
    <button
      class={[
        "flex items-center justify-center gap-2 rounded-md border border-bg-5 bg-bg-dim px-2 py-1.5 text-center transition-colors hover:text-orange sm:px-4",
      ]}
      onclick={action}
    >
      {#if Icon}
        <Icon class="relative h-5 w-5 transition-transform group-hover:scale-110" />
      {/if}
      <span class={["hidden sm:block"]}>
        {label}
      </span>
    </button>
  </li>
{/snippet}

<nav
  class="fixed bottom-3 left-0 right-0 mx-auto w-fit rounded-md border border-bg-status-line-3 bg-bg-status-line-2/50 bg-noise px-4 py-2 backdrop-blur-md sm:bottom-6 sm:px-6 sm:py-3"
>
  <ul class="flex flex-row gap-3 text-sm sm:gap-6 sm:text-base">
    {@render navLink($baseLocale + "/", $_("navigation.home"), House)}
    {@render navLink($baseLocale + "/projects", $_("navigation.projects"), FolderOpen)}
    {@render navLink("/blog", $_("navigation.blog"), NotebookText)}
    <hr class="h-auto border-[0.5px] border-fg-0" />
    <div class="flex flex-row gap-3">
      {@render navButton(
        () => {
          changeLanguage();
        },
        language,
        Earth
      )}
    </div>
  </ul>
</nav>
