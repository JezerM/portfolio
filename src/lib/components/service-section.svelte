<script lang="ts">
  import { _, json } from "svelte-i18n";
  import { getContext } from "svelte";
  import type Service from "$lib/types/service";
  import {
    ChartColumnIncreasing,
    ChartLine,
    ChevronsUp,
    FileChartPie,
    KeyRound,
    LaptopMinimalCheck,
    LifeBuoy,
    MonitorSmartphone,
    Paintbrush,
    UserCheck,
    type Icon,
  } from "lucide-svelte";
  import Rust from "$lib/icons/rust.svelte";
  import Linux from "$lib/icons/linux.svelte";
  import CardImage from "./card-image.svelte";

  interface Props {
    service: Service;
  }

  const { service }: Props = $props();

  const thumbnails: { [k: string]: any } = getContext("projects:thumbnails");
  const thumbnail = thumbnails[service.image];

  const descriptionLines = $json(`services.${service.key}.description`) as string[];

  function getIconByKey(key: string): typeof Icon | null {
    switch (key) {
      case "key-round":
        return KeyRound;
      case "paintbrush":
        return Paintbrush;
      case "life-buoy":
        return LifeBuoy;
      case "laptop-minimal-check":
        return LaptopMinimalCheck;
      case "monitor-smartphone":
        return MonitorSmartphone;
      case "chart-line":
        return ChartLine;
      case "chart-column-increasing":
        return ChartColumnIncreasing;
      case "file-chart-pie":
        return FileChartPie;
      case "user-check":
        return UserCheck;
      case "chevrons-up":
        return ChevronsUp;
      case "rust":
        return Rust;
      case "linux":
        return Linux;
    }
    return null;
  }
</script>

<section class="group mt-4 grid grid-cols-1 items-center gap-6 md:mt-0 lg:grid-cols-2">
  {#if service.image != ""}
    <div class="relative mt-8 h-fit w-full">
      <enhanced:img
        src="/static/deco/15.png?w=300;400"
        sizes="300px, (min-width:640px) 400px"
        alt=""
        class="absolute inset-x-0 -top-5 z-10 mx-auto w-32 lg:-top-7 lg:w-48"
      />
      <CardImage
        src={thumbnail}
        alt={$_(`services.${service.key}.name`)}
        class="border-[16px] border-white bg-white shadow-xl"
      />
    </div>
  {:else}
    <div class=""></div>
  {/if}

  <div class="flex flex-col gap-6 md:group-odd:text-right md:group-even:order-first">
    <h2
      class="z-10 transform-gpu text-center font-video text-3xl text-fg-1 drop-shadow-glow md:[text-align:inherit]"
    >
      {$_(`services.${service.key}.name`)}
    </h2>
    <div
      class="flex flex-col gap-4 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-4 backdrop-blur-md"
    >
      {#each descriptionLines as line}
        <p>
          {@html line}
        </p>
      {/each}
    </div>

    <div
      class="flex flex-row flex-wrap justify-center gap-4 sm:grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4"
    >
      {#each service.benefits as benefit}
        {@const Icon = getIconByKey(benefit.icon)}
        <div
          class={[
            "benefit-container flex w-40 flex-col items-center justify-between gap-2 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-4 text-center backdrop-blur-md sm:w-auto",
            benefit.class,
          ]}
        >
          {#if Icon}
            <Icon class="h-10 w-10" />
          {/if}
          <span
            class="mt-auto max-w-full font-video text-base md:text-[clamp(0.75rem,10cqw,1rem)] lg:text-[clamp(1rem,10cqw,1.25rem)]"
          >
            {$_(`services.${service.key}.benefits.${benefit.key}`)}
          </span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .benefit-container {
    container-type: size;
    container-type: inline-size;
  }
</style>
