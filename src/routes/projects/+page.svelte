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

<style>
  .projectsContainer {
    display: grid;
    gap: 1.5em;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .projectsContainer a {
    grid-column: span 1 / span 1;
    height: 100%;
  }

  .projectsContainer :global(.card) {
    background-color: #282828;
    height: 100%;
    transition: background-color 0.25s, transform 0.5s;
  }
  .projectsContainer :global(.card):hover {
    background-color: var(--cardColor);
    transform: scale(1.02);
  }
  .projectsContainer :global(.card) > :global(.imgContainer) {
    background-color: var(--cardColor);
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
    border-color: #ebdbb2;
    border-width: 0.3em;
    border-style: solid;
    color: #ebdbb2;
    font-family: Monocraft;
    font-size: 14px;
  }
  #searchInput::placeholder {
    color: #bdae93;
  }

  :global(.card.red) {
    --cardColor: #cc2410;
  }
  :global(.card.green) {
    --cardColor: #98971a;
  }
  :global(.card.yellow) {
    --cardColor: #d79921;
  }
  :global(.card.blue) {
    --cardColor: #458588;
  }
  :global(.card.purple) {
    --cardColor: #b16286;
  }
  :global(.card.aqua) {
    --cardColor: #689d6a;
  }
  :global(.card.orange) {
    --cardColor: #d65d0e;
  }
</style>
