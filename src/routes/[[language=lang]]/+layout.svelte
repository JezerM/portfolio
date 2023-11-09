<script lang="ts">
  import "../../app.less";
  import { fade } from "svelte/transition";
  import NavBar from "$lib/NavBar.svelte";
  import ExtraData from "$lib/ExtraData.svelte";
  import { getUnlocalizedPath } from "$lib/utils";
  import { _ } from "svelte-i18n";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  let instaFadeIn = { duration: 0, delay: 0 };
  let instaFadeOut = { duration: 0 };

  let durFadeIn = { duration: 250, delay: 250 };
  let durFadeOut = { duration: 250 };

  let fadeIn = durFadeIn;
  let fadeOut = durFadeOut;

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

<div id="content">
  <NavBar />

  <div class="mainContainer">
    <main class="transitionContainer pixelBorder">
      {#key previous}
        <div in:fade={fadeIn} out:fade={fadeOut}>
          <slot />
        </div>
      {/key}
    </main>
    <aside>
      <ExtraData />
    </aside>
  </div>
</div>

<style lang="less">
  @import (reference) "../../app.less";
  .transitionContainer {
    height: fit-content;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    > :global(*) {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .mainContainer {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: @lg) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (min-width: @xl) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    margin-top: 2em;
    gap: 2em;
  }
  main {
    grid-column: span 1 / span 1;
    padding: 2em;
    background-color: var(--bg1);

    @media (min-width: @lg) {
      grid-column: span 2 / span 2;
    }
    @media (min-width: @xl) {
      grid-column: span 3 / span 3;
    }
  }
  aside {
    width: 100%;
    grid-column: span 1 / span 1;
  }
</style>
