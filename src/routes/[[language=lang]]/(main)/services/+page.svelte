<script lang="ts">
  import { _, json } from "svelte-i18n";
  import type { PageData } from "./$types";
  import ProjectCard from "$lib/components/project-card.svelte";
  import { setContext } from "svelte";
  import ServiceSection from "$lib/components/service-section.svelte";
  import { Mail } from "lucide-svelte";
  import { headTitle } from "$lib/snippets/head.svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  setContext("projects:thumbnails", data.thumbnails);

  const descriptionLines = $json("services.extra.description") as string[];
</script>

<svelte:head>
  {@render headTitle($_("head.services_title"))}
</svelte:head>

<h1
  class="mt-4 transform-gpu select-none text-center font-raster text-4xl text-red drop-shadow-glow"
>
  {$_("services.title")}
</h1>

<div class="mt-4 flex flex-col gap-16">
  {#each data.services as service}
    <ServiceSection {service} />
  {/each}

  <div class="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
    <h2 class="z-10 transform-gpu select-none font-video text-3xl drop-shadow-glow">
      {$_("services.extra.title")}
    </h2>
    <div
      class="flex flex-col items-center gap-4 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-4 backdrop-blur-md"
    >
      {#each descriptionLines as line}
        <p>
          {@html line}
        </p>
      {/each}

      <a
        href="mailto:jezer.mejia@icloud.com?subject=Request services"
        class="flex flex-row items-center gap-2 rounded-md border border-bg-5 bg-bg-dim px-2 py-1.5 text-sm transition-colors hover:text-orange focus:text-orange sm:text-base"
      >
        <Mail class="h-5 w-5" />
        {$_("services.email_me")}
      </a>
    </div>
  </div>
</div>

<h1
  class="mt-24 transform-gpu select-none text-center font-raster text-4xl text-red drop-shadow-glow"
>
  {$_("projects.title")}
</h1>

<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</div>
