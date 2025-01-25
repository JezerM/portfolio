<script lang="ts">
  import { Check, Earth } from "lucide-svelte";
  import { Select } from "bits-ui";
  import { locale, _ } from "svelte-i18n";

  import { flyAndScale, localizePath } from "$lib/utils";
  import { localesLabels } from "$lib/i18n";
  import { goto } from "$app/navigation";
  import { untrack } from "svelte";
  import { scale } from "svelte/transition";

  const languageItems = Object.entries(localesLabels).map(([value, label]) => {
    return { label, value };
  });
  let selectedLanguage = $state(languageItems.find((v) => v.value == $locale) ?? languageItems[0]);

  $effect(() => {
    const lang = selectedLanguage.value;
    untrack(() => {
      const path = localizePath(lang);
      goto(path, { noScroll: true });
      locale.set(lang);
    });
  });
</script>

<Select.Root items={languageItems} bind:selected={selectedLanguage}>
  <Select.Trigger
    class="border-bg-5 bg-bg-dim hover:text-orange flex items-center justify-center gap-2 rounded-md border px-2 py-1.5 text-center transition-colors sm:px-4"
    aria-label="Select a theme"
  >
    <Earth class="relative h-5 w-5" />
    <Select.Value class="sr-only sm:not-sr-only" />
  </Select.Trigger>
  <Select.Content
    class="border-bg-5 bg-bg-dim z-50 w-fit! min-w-[8rem] rounded-md border px-3 py-3"
    side="top"
    sideOffset={4}
    inTransition={flyAndScale}
    inTransitionConfig={undefined}
    outTransition={scale}
    outTransitionConfig={{ start: 0.95, opacity: 0, duration: 150 }}
  >
    {#each languageItems as item}
      <Select.Item
        class="data-highlighted:bg-bg-1 flex flex-row items-center justify-between rounded-md py-2 pr-3 pl-5 text-sm"
        value={item.value}
        label={item.label}
      >
        <span>
          {item.label}
        </span>
        <Select.ItemIndicator class="ml-3" asChild={false}>
          <Check class="h-4 w-4" />
        </Select.ItemIndicator>
      </Select.Item>
    {/each}
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
