<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
  import { getUnlocalizedPath, slidePage, type SlidePageParams } from "$lib/utils";
  import "../app.css";
  import { navigating } from "$app/state";
  import type { LayoutData } from "./$types";
  import { type Snippet } from "svelte";
  import { Loader } from "lucide-svelte";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";

  interface Props {
    data: LayoutData;
    children?: Snippet;
  }

  let { data, children }: Props = $props();

  let instaFadeIn = { duration: 0, delay: 0 };
  let instaFadeOut = { duration: 0 };

  let durFadeIn = { duration: 450, delay: 150 };
  let durFadeOut = { duration: 450 };

  let fadeIn: SlidePageParams = $state(durFadeIn);
  let fadeOut: SlidePageParams = $state(durFadeOut);

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
  $effect.pre(() => {
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
    class="fixed z-20 flex size-full items-center justify-center bg-bg-dim/50 bg-kraft backdrop-blur-md"
    transition:fade
  >
    <div class="pointer-events-none flex select-none flex-col items-center gap-4">
      <Loader class="h-10 w-10 animate-spin" />
      <span class="text-center text-xl">{$_("navigation.loading")}</span>
    </div>
  </div>
{/if}

<div class="grid grid-cols-1 grid-rows-1">
  {#key previous}
    <div
      class="relative col-start-1 col-end-1 row-start-1 row-end-1 min-h-[100vh] overflow-clip"
      in:slidePage={fadeIn}
      out:slidePage={fadeOut}
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
