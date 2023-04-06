<script lang="ts">
  import { base } from "$app/paths";
  import { writable, derived } from "svelte/store";
  import Card from "$lib/Card.svelte";
  import data from "$lib/projects.json";

  let search = "";
  let term = writable("");
  let items = writable(data);
  const filtered = derived([term, items], ([$term, $items]) =>
    $items.filter((x) => x.name.toLowerCase().includes($term.toLowerCase()))
  );
  $: term.set(search);

  function parseProjectImageLink(link: string): string {
    if (link.startsWith("/")) {
      return `${base}${link}`;
    }
    return link;
  }
</script>

<input id="searchInput" type="text" bind:value={search} placeholder="Search..." />
<div class="projectsContainer">
  {#each $filtered as project}
    <a href={project.link} target="_blank">
      <Card src={parseProjectImageLink(project.image)} class={project.color}>
        <h4>{project.name}</h4>
        <p class="projectDescription">{project.description}</p>
      </Card>
    </a>
  {/each}
</div>

<style lang="less">
  @import (reference) "../../app.less";
  .projectsContainer {
    display: grid;
    gap: 1.5em;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    @media (min-width: @md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: @xl) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (min-width: @2xl) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    a {
      grid-column: span 1 / span 1;
      height: 100%;
    }

    :global(.card) {
      background-color: var(--bg);
      height: 100%;
      transition: background-color 0.25s, transform 0.5s;
    }
    :global(.card):hover {
      background-color: var(--cardColor);
      transform: scale(1.02);
    }
    :global(.card) > :global(.imgContainer) {
      background-color: var(--cardColor);
    }
  }

  .projectDescription {
    font-size: 14px;
    margin: 0;
  }

  #searchInput {
    width: 100%;
    margin: 0 0 2em;
    box-sizing: border-box;
    padding: 0.75em 1em;
    background-color: transparent;
    border-color: var(--fg);
    border-width: 0.3em;
    border-style: solid;
    color: var(--fg);
    font-family: Monocraft;
    font-size: 14px;

    &::placeholder {
      color: var(--fg3);
    }
  }

  :global(.card.red) {
    --cardColor: var(--bgRed);
  }
  :global(.card.green) {
    --cardColor: var(--bgGreen);
  }
  :global(.card.yellow) {
    --cardColor: var(--bgYellow);
  }
  :global(.card.blue) {
    --cardColor: var(--bgBlue);
  }
  :global(.card.purple) {
    --cardColor: var(--bgPurple);
  }
  :global(.card.aqua) {
    --cardColor: var(--bgAqua);
  }
  :global(.card.orange) {
    --cardColor: var(--bgOrange);
  }
</style>
