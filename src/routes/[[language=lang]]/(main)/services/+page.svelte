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
  class="font-raster text-red drop-shadow-glow mt-4 transform-gpu text-center text-4xl select-none"
>
  {$_("services.title")}
</h1>

<div class="mt-4 flex flex-col gap-16">
  {#each data.services as service}
    <ServiceSection {service} />
  {/each}

  <div class="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
    <h2 class="font-video drop-shadow-glow z-10 transform-gpu text-3xl select-none">
      {$_("services.extra.title")}
    </h2>
    <div
      class="border-bg-5 bg-bg-dim/50 bg-kraft flex flex-col items-center gap-4 rounded-md border p-4 backdrop-blur-md"
    >
      {#each descriptionLines as line}
        <p>
          {@html line}
        </p>
      {/each}

      <a
        href="mailto:jezer.mejia@icloud.com?subject=Request services"
        class="border-bg-5 bg-bg-dim hover:text-orange focus:text-orange flex flex-row items-center gap-2 rounded-md border px-2 py-1.5 text-sm transition-colors sm:text-base"
      >
        <Mail class="h-5 w-5" />
        {$_("services.email_me")}
      </a>
    </div>
  </div>
</div>

<h1
  class="font-raster text-red drop-shadow-glow mt-24 transform-gpu text-center text-4xl select-none"
>
  {$_("projects.title")}
</h1>

<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</div>

<enhanced:img
  src="/static/deco/44.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute top-[150px] right-0 left-[600px] -z-10 mx-auto w-72 lg:top-[150px]"
/>
<enhanced:img
  src="/static/deco/02.png?w=300;400"
  sizes="300px, (min-width:640px) 400px"
  alt=""
  class="absolute top-[540px] right-[500px] left-0 -z-10 mx-auto w-48"
/>
<enhanced:img
  src="/static/deco/06.png?w=300;400"
  sizes="300px, (min-width:640px) 400px"
  alt=""
  class="absolute top-[740px] right-0 left-[180px] -z-10 mx-auto w-48 lg:left-[850px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute top-[1000px] right-[700px] left-0 -z-10 mx-auto w-80 sm:left-[210px] lg:top-[940px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute top-[1950px] right-0 left-0 -z-10 mx-auto w-72 sm:left-[350px]"
/>
