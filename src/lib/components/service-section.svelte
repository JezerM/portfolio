<script lang="ts">
  import { _, json } from "svelte-i18n";
  import { getContext } from "svelte";
  import type Service from "$lib/types/service";

  interface Props {
    service: Service;
  }

  const { service }: Props = $props();

  const thumbnails: { [k: string]: any } = getContext("projects:thumbnails");
  const thumbnail = thumbnails[service.image];

  const descriptionLines = $json(`services.${service.key}.description`) as string[];
</script>

<section class="group grid grid-cols-1 md:grid-cols-2">
  <div></div>

  <div class="flex flex-col gap-6 md:group-odd:text-right md:group-even:order-first">
    <h2 class="font-video text-3xl text-fg-1 drop-shadow-glow">
      {$_(`services.${service.key}.name`)}
    </h2>
    <div
      class="flex flex-col gap-4 rounded-md border border-bg-5 bg-bg-dim/50 bg-noise p-4 backdrop-blur-md"
    >
      {#each descriptionLines as line}
        <p>
          {@html line}
        </p>
      {/each}
    </div>
  </div>
</section>
