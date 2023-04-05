<script lang="ts">
  import { fade } from "svelte/transition";
  import NavBar from "$lib/NavBar.svelte";
  import ExtraData from "$lib/ExtraData.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div id="content">
  <NavBar />

  <div class="mainContainer">
    <main class="transitionContainer">
      {#key data.pathname}
        <div in:fade={{ duration: 250, delay: 250 }} out:fade={{ duration: 250 }}>
          <slot />
        </div>
      {/key}
    </main>
    <aside>
      <ExtraData />
    </aside>
  </div>
</div>

<style>
  :global(body) {
    display: block;
    background-color: #282828;
    color: #ebdbb2;
    font-family: Monocraft;
    margin: 0;
  }

  :global(h2) {
    margin-top: 0;
  }
  :global(h4) {
    margin-top: 0;
    margin-bottom: 0.2em;
  }

  .transitionContainer {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
  .transitionContainer > :global(*) {
    grid-column: 1;
    grid-row: 1;
  }

  #content {
    margin: 3em 5em;
  }

  .mainContainer {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-top: 2em;
    gap: 2em;
  }
  main {
    grid-column: span 3 / span 3;
    padding: 2em;
    background-color: #3c3836;
  }
  aside {
    grid-column: span 1 / span 1;
  }

  @font-face {
    font-family: "Monocraft";
    font-style: normal;
    font-weight: 500;
    src: url("/Monocraft.otf");
  }
</style>
