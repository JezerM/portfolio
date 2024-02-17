<script lang="ts">
  import { writable, derived } from "svelte/store";
  import Card from "$lib/Card.svelte";
  import data from "$lib/projects.json";
  import FilterButton from "$lib/FilterButton.svelte";
  import { thumbnails } from "$lib/images";
  import { locale, _ } from "svelte-i18n";
  console.log("\tInside projects", $locale);

  type Data = (typeof data)[0];

  const flat = data.flatMap((v) => v.categories);
  const categories = Array.from(new Set(flat));

  const selectedCategories = new Set<string>();
  const selectedTerms = writable(selectedCategories);

  let search = "";
  let term = writable("");

  const filtered = derived(
    [term, selectedTerms, writable(data)],
    ([$term, $selectedTerms, $items]) => {
      let f: Data[] = $items.filter((x) => x.name.toLowerCase().includes($term.toLowerCase()));
      if ($selectedTerms.size > 0) {
        const s = Array.from($selectedTerms);
        f = f.filter((v) => s.every((p) => v.categories.includes(p)));
      }
      return f;
    }
  );
  $: term.set(search);

  function getProjectDescription(project: Data): string {
    switch ($locale) {
      case "en":
        return project.description.en;
      case "es":
        return project.description.es;
      default:
    }
    return "";
  }

  async function getThumbnail(project: Data): Promise<string | undefined> {
    const value = thumbnails[`/static${project.image}`];
    const result = await value();
    if (!result) return undefined;
    console.log(result);
    return result.default;
  }

  function toggleCategory(category: string) {
    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }
    selectedTerms.set(selectedCategories);
  }
  function clearSelectedCategories() {
    selectedCategories.clear();
    selectedTerms.set(selectedCategories);
  }
</script>

<div id="searchContainer" class="pixelSimpleBorder">
  <input
    id="searchInput"
    class="pixelSimpleBorder"
    type="text"
    bind:value={search}
    placeholder="Search..."
  />
</div>
<div id="categoriesContainer">
  <FilterButton
    text={$_("projects.clear")}
    disableClick
    on:click={() => clearSelectedCategories()}
  />
  {#each categories as cat}
    <FilterButton
      text={cat}
      active={$selectedTerms.has(cat)}
      on:click={() => toggleCategory(cat)}
    />
  {/each}
</div>
<div class="projectsContainer">
  {#each $filtered as project}
    <a href={project.link} target="_blank">
      <Card class={project.color}>
        <div style="width: 100%; height: -webkit-fill-available;" slot="image">
          {#await getThumbnail(project) then src}
            <enhanced:img
              class="picture"
              {src}
              alt={project.name}
              sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
            />
          {/await}
        </div>

        <h4>{project.name}</h4>
        <p class="projectDescription">
          {getProjectDescription(project)}
        </p>
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

    :global(.imgContainer) :global(picture) {
      display: flex;
      height: 100%;
      height: -webkit-fill-available;
      height: fill-available;
      height: -moz-available;
    }
  }

  :global(:root):is(.light) {
    :global(.card):hover {
      color: var(--bg);
    }
  }

  .projectDescription {
    font-size: 14px;
    margin: 0;
  }

  #searchContainer {
    width: 100%;
    margin: 0 0 1em;
    position: relative;
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      background-color: var(--fg);
      z-index: -1;
    }
  }

  #searchInput {
    width: -webkit-fill-available;
    width: fill-available;
    width: -moz-available;
    box-sizing: border-box;
    padding: 0.75em 1em;
    background-color: var(--bg1);
    margin: 0.3rem;
    border: none;
    color: var(--fg);
    font-family: Monocraft;
    font-size: 14px;

    &::placeholder {
      color: var(--fg3);
    }
  }

  #categoriesContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25em;
    margin: 0 0 1em;
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
