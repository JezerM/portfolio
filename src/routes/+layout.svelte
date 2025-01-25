<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/navbar.svelte";
  import { getUnlocalizedPath, slidePage, type SlidePageParams } from "$lib/utils";
  import { navigating } from "$app/state";
  import type { LayoutData } from "./$types";
  import { type Snippet } from "svelte";
  import { Loader } from "lucide-svelte";
  import { blur, fade, type TransitionConfig } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { prefersReducedMotion } from "svelte/motion";

  interface Props {
    data: LayoutData;
    children?: Snippet;
  }

  let { data, children }: Props = $props();

  let animationType: "slide" | "zoom" = $state("slide");

  let instaFadeIn = { duration: 0, delay: 0 };
  let instaFadeOut = { duration: 0 };

  let durFadeIn = { duration: 450, delay: 150 };
  let durFadeOut = { duration: 450 };

  let fadeIn: SlidePageParams = $state(durFadeIn);
  let fadeOut: SlidePageParams = $state(durFadeOut);

  function transitionIn(node: HTMLElement, params: any): TransitionConfig {
    if (prefersReducedMotion.current) {
      return slidePage(node, { ...params, duration: 0, delay: 0 });
    }

    if (animationType == "slide") {
      return slidePage(node, params);
    } else {
      return blur(node, params);
    }
  }
  function transitionOut(node: HTMLElement, params: any): TransitionConfig {
    if (prefersReducedMotion.current) {
      return slidePage(node, { ...params, duration: 0, delay: 0 });
    }

    if (animationType == "slide") {
      return slidePage(node, params);
    } else {
      return blur(node, params);
    }
  }

  function getPathnamePosition(pathname: string) {
    const unlocalized = getUnlocalizedPath(pathname);

    if (unlocalized == "/") return 0;
    if (unlocalized.startsWith("/services")) return 1;
    if (unlocalized.startsWith("/blog")) return 2;
    return 0;
  }

  function setBackgroundPosition(prev: number, curr: number) {
    const body = document.querySelector("body");
    if (!body) return;

    const half = prev + (curr - prev) / 2;
    body?.style.setProperty("--background-position", `${-curr * 100}vw`);
    body?.style.setProperty("--background-position-half", `${-half * 100}vw`);

    body?.classList.add("bg-body");
  }

  let previous = $state(data.pathname as string);
  let unlocPrevious = $derived(getUnlocalizedPath(previous));
  let unlocCurrent = $derived(getUnlocalizedPath(data.pathname));

  function makeAnimationSlide() {
    animationType = "slide";

    const prevPosition = getPathnamePosition(previous);
    const currPosition = getPathnamePosition(data.pathname);

    if (prevPosition == currPosition) {
      fadeIn = instaFadeIn;
      fadeOut = instaFadeOut;
    } else {
      fadeIn = { ...durFadeIn, target: prevPosition, current: currPosition };
      fadeOut = { ...durFadeOut, target: currPosition, current: prevPosition };

      setBackgroundPosition(prevPosition, currPosition);
    }

    previous = data.pathname;
  }
  function makeAnimationZoom() {
    animationType = "zoom";

    if (unlocPrevious == unlocCurrent) {
      fadeIn = instaFadeIn;
      fadeOut = instaFadeOut;
    } else {
      fadeIn = { ...durFadeIn };
      fadeOut = { ...durFadeOut };
    }

    previous = data.pathname;
  }

  $effect.pre(() => {
    if (unlocPrevious.startsWith("/blog") && unlocCurrent.startsWith("/blog")) {
      makeAnimationZoom();
    } else {
      makeAnimationSlide();
    }
  });

  const initialPosition = getPathnamePosition(data.pathname);

  let loading = $state(false);

  $effect(() => {
    if (navigating.complete == null) {
      loading = false;
      return;
    }
    const timeout = setTimeout(() => {
      loading = navigating.complete != null;
    }, 150);

    return () => {
      clearTimeout(timeout);
    };
  });
</script>

<svelte:head>
  {#if initialPosition == 0}
    <style>
      body {
        background-position-x: 0vw;
      }
    </style>
  {:else if initialPosition == 1}
    <style>
      body {
        background-position-x: -100vw;
      }
    </style>
  {:else if initialPosition == 2}
    <style>
      body {
        background-position-x: -200vw;
      }
    </style>
  {/if}
</svelte:head>

{#if loading}
  <div
    class="bg-bg-dim/50 bg-kraft fixed z-20 flex size-full items-center justify-center backdrop-blur-md"
    transition:fade
  >
    <div class="pointer-events-none flex flex-col items-center gap-4 select-none">
      <Loader class="h-10 w-10 animate-spin" />
      <span class="text-center text-xl">{$_("navigation.loading")}</span>
    </div>
  </div>
{/if}

<div class="grid grid-cols-1 grid-rows-1 overflow-clip">
  {#key previous}
    <div
      class="relative col-start-1 col-end-1 row-start-1 row-end-1 min-h-[100vh] overflow-clip"
      in:transitionIn={fadeIn}
      out:transitionOut={fadeOut}
      onintroend={() => {
        const body = document.querySelector("body");
        if (body) {
          body.style.backgroundPositionX = body.style.getPropertyValue("--background-position");
          body.classList.remove("bg-body");
        }
      }}
    >
      {@render children?.()}
    </div>
  {/key}
</div>

<Navbar />

<style>
  :global(body.bg-body) {
    animation: bg-body-animate 600ms cubic-bezier(0.33, 1, 0.68, 1) forwards;
  }

  @keyframes bg-body-animate {
    to {
      background-position-x: calc(var(--background-position));
    }
  }
</style>
