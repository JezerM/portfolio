<script lang="ts">
  import Navbar from "$lib/components/navbar.svelte";
  import { getUnlocalizedPath, slidePage, type SlidePageParams } from "$lib/utils";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import { onMount, type Snippet } from "svelte";

  interface Props {
    data: LayoutData;
    children?: Snippet;
  }

  let { data, children }: Props = $props();

  let instaFadeIn = { duration: 0, delay: 0 };
  let instaFadeOut = { duration: 0 };

  let durFadeIn = { duration: 350, delay: 350 };
  let durFadeOut = { duration: 350 };

  let fadeIn: SlidePageParams = $state(durFadeIn);
  let fadeOut: SlidePageParams = $state(durFadeOut);

  const targetMap: { [key: string]: number } = {
    "/": 0,
    "/services": 1,
    "/blog": 2,
  };

  function setBackgroundPosition(prev: number, curr: number, animate: boolean) {
    const body = document.querySelector("body");
    if (!body) return;

    const half = prev + (curr - prev) / 2;
    body?.style.setProperty("--background-position", `${-curr * 100}vw`);
    body?.style.setProperty("--background-position-half", `${-half * 100}vw`);

    if (animate) {
      body?.classList.add("bg-body");
    } else {
      body.style.backgroundPositionX = `${-curr * 100}vw`;
    }
  }

  let previous = $state(data.pathname as string);
  $effect.pre(() => {
    let pathname = data.pathname as string;
    let absPrev = getUnlocalizedPath(previous);
    let absCurr = getUnlocalizedPath(pathname);

    if (absPrev == absCurr) {
      fadeIn = instaFadeIn;
      fadeOut = instaFadeOut;
    } else {
      const curr = targetMap[absCurr];
      const prev = targetMap[absPrev];
      fadeIn = { ...durFadeIn, target: prev, current: curr };
      fadeOut = { ...durFadeOut, target: curr, current: prev };

      setBackgroundPosition(prev, curr, true);
    }
    previous = data.pathname;
  });

  const initialPath = getUnlocalizedPath(data.pathname);
</script>

<svelte:head>
  {#if targetMap[initialPath] == 0}
    <style>
      body {
        background-position-x: 0vw;
      }
    </style>
  {:else if targetMap[initialPath] == 1}
    <style>
      body {
        background-position-x: -100vw;
      }
    </style>
  {:else if targetMap[initialPath] == 2}
    <style>
      body {
        background-position-x: -200vw;
      }
    </style>
  {/if}
</svelte:head>

{#key previous}
  <div
    class="relative min-h-[100vh] overflow-hidden"
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

<Navbar />

<style>
  :global(body.bg-body) {
    animation: bg-body-animate 700ms cubic-bezier(0.33, 1, 0.68, 1) forwards;
  }

  @keyframes bg-body-animate {
    50% {
      background-position-x: calc(var(--background-position-half));
    }
    100% {
      background-position-x: calc(var(--background-position));
    }
  }
</style>
