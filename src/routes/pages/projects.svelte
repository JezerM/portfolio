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

  const colorVariants: { [key: string]: string } = {
    red: "bg-red-bg dark:bg-red-fg",
    green: "bg-green-bg dark:bg-green-fg",
    yellow: "bg-yellow-bg dark:bg-yellow-fg",
    blue: "bg-blue-bg dark:bg-blue-fg",
    purple: "bg-purple-bg dark:bg-purple-fg",
    aqua: "bg-aqua-bg dark:bg-aqua-fg",
    orange: "bg-orange-bg dark:bg-orange-fg",
  };
  const hoverColorVariants: { [key: string]: string } = {
    red: "hover:!bg-red-bg",
    green: "hover:!bg-green-bg",
    yellow: "hover:!bg-yellow-bg",
    blue: "hover:!bg-blue-bg",
    purple: "hover:!bg-purple-bg",
    aqua: "hover:!bg-aqua-bg",
    orange: "hover:!bg-orange-bg",
  };

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await value()) as any;
    if (!result) return undefined;
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

<div
  class="relative mb-4 w-full pixel-border before:absolute before:z-[-1] before:block before:size-full before:bg-dark-1 dark:before:bg-light-1"
>
  <input
    class="m-[0.3rem] box-border w-[fill-available] bg-light-1 px-4 py-3 text-sm text-dark-1 placeholder-dark-3 pixel-border dark:bg-dark-1 dark:text-light-1 dark:placeholder-light-3"
    type="text"
    bind:value={search}
    placeholder="Search..."
  />
</div>
<div class="mb-4 flex flex-row flex-wrap gap-1">
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
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
  {#each $filtered as project}
    <a href={project.link} target="_blank" class="col-span-1 h-full">
      <Card
        class="
        bg-light-0 dark:bg-dark
        {hoverColorVariants[project.color]}
        group h-full transition-all duration-300 hover:scale-[102%]
        "
        imageClass={colorVariants[project.color]}
      >
        <div class="h-[fill-available] w-full" slot="image">
          {#await getThumbnail(project) then image}
            <enhanced:img
              class="flex h-[fill-available]"
              src={image}
              alt={project.name}
              sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
            />
          {/await}
        </div>

        <h4 class="font-bold group-hover:text-light-0">{project.name}</h4>
        <p class="text-sm group-hover:text-light-0">
          {getProjectDescription(project)}
        </p>
      </Card>
    </a>
  {/each}
</div>
