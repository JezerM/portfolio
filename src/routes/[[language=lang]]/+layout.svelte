<script lang="ts">
  import { fade, type TransitionConfig } from "svelte/transition";
  import NavBar from "$lib/components/NavBar.svelte";
  import ExtraData from "$lib/components/ExtraData.svelte";
  import { getUnlocalizedPath } from "$lib/utils";
  import { _ } from "svelte-i18n";
  import type { LayoutData } from "./$types";
  import PixelsCanvas from "$lib/components/PixelsCanvas.svelte";

  interface TransitionParams {
    duration: number;
    delay?: number;
  }

  export let data: LayoutData;

  let instaFadeIn = { duration: 0, delay: 0 };
  let instaFadeOut = { duration: 0 };

  let durFadeIn = { duration: 250, delay: 250 };
  let durFadeOut = { duration: 250 };

  let fadeIn: TransitionParams = durFadeIn;
  let fadeOut: TransitionParams = durFadeOut;

  let pixelCanvas: PixelsCanvas;
  let validCanvas = false;

  function hideUntilStart(node: HTMLElement, params: TransitionParams): TransitionConfig {
    if (!validCanvas) {
      return fade(node, params);
    }
    if (params.duration == 0) {
      return params;
    }

    let ran = false;
    return {
      duration: params.duration,
      delay: params.delay,
      tick(t) {
        if (t == 0) {
          node.style.display = "none";
        } else {
          node.style.display = "";
        }
        if (t > 0 && !ran) {
          requestAnimationFrame(() => {
            pixelCanvas.hidePixels();
          });
          ran = true;
        }
      },
    };
  }

  function pixelTransition(node: HTMLElement, params: TransitionParams): TransitionConfig {
    if (!validCanvas) {
      return fade(node, params);
    }
    if (params.duration == 0) {
      return params;
    }

    let ran = false;
    return {
      delay: params.delay,
      duration: params.duration,
      tick(t) {
        if (t < 1 && !ran) {
          pixelCanvas.showPixels();
          ran = true;
        }
      },
    };
  }

  let previous = data.pathname as string;
  $: {
    let absPrev = getUnlocalizedPath(previous);
    let absCurr = getUnlocalizedPath(data.pathname);
    if (absPrev == absCurr) {
      fadeIn = instaFadeIn;
      fadeOut = instaFadeOut;
    } else {
      fadeIn = durFadeIn;
      fadeOut = durFadeOut;
    }
    previous = data.pathname;
  }
</script>

<svelte:head>
  <meta name="description" content={$_("head.description")} />
  <meta property="og:description" content={$_("head.description")} />
  <meta name="twitter:description" content={$_("head.description")} />
</svelte:head>

<div class="container mx-auto p-5 md:py-8 lg:py-12">
  <NavBar />

  <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
    <main
      class="relative col-span-1 grid h-fit bg-light-1 p-6 pixel-border-2 dark:bg-dark-1 sm:p-8 lg:col-span-2 xl:col-span-3"
    >
      <PixelsCanvas
        bind:this={pixelCanvas}
        on:init={(v) => {
          validCanvas = v.detail;
        }}
      />
      {#key previous}
        <div in:hideUntilStart={fadeIn} out:pixelTransition={fadeOut}>
          <slot />
        </div>
      {/key}
    </main>
    <aside class="col-span-1 w-full">
      <ExtraData />
    </aside>
  </div>
</div>
