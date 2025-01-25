<script lang="ts">
  import { Blend } from "lucide-svelte";
  import {
    forcedReducedTransparency,
    prefersReducedTransparency,
    isReducedTransparency,
  } from "$lib/reduced-transparency.svelte";
  import { _ } from "svelte-i18n";
</script>

{#if !prefersReducedTransparency.current}
  <button
    class={[
      "flex flex-row items-center justify-center gap-2 rounded-md border border-bg-5 bg-bg-dim px-2 py-1.5 text-center transition-all",
      "sm:px-3",
      "hover:text-orange",
      "active:scale-95",
      $isReducedTransparency && "border-2 border-orange text-orange",
    ]}
    onclick={() => (forcedReducedTransparency.current = !forcedReducedTransparency.current)}
  >
    <Blend class="relative h-5 w-5" />
    <span class="sr-only">
      {$_("navigation.reduced-transparency")}
    </span>
  </button>
{/if}
