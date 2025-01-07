<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { PageData } from "./$types";
  import ProjectCard from "$lib/components/project-card.svelte";
  import { setContext } from "svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  setContext("projects:thumbnails", data.thumbnails);
</script>

<svelte:head>
  <title>{$_("head.projects_title")}</title>
</svelte:head>

<h1 class="mt-4 text-center font-raster text-4xl text-red drop-shadow-glow">
  {$_("projects.title_1")}
</h1>

<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</div>

<h1 class="mt-8 text-center font-raster text-4xl text-red drop-shadow-glow">
  {$_("projects.title_2")}
</h1>

<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</div>
