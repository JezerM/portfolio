<script lang="ts">
  import type Project from "$lib/types/project";
  import { _ } from "svelte-i18n";
  import { Globe } from "lucide-svelte";
  import { getContext } from "svelte";
  import Github from "$lib/icons/github.svelte";
  import CardImage from "./card-image.svelte";

  interface Props {
    project: Project;
  }

  const { project }: Props = $props();

  const thumbnails: { [k: string]: any } = getContext("projects:thumbnails");
  const thumbnail = thumbnails[project.image];
</script>

<div
  class="border-bg-5 bg-bg-dim/50 relative flex flex-col overflow-hidden rounded-xl border backdrop-blur-md"
>
  <div class="bg-bg-dim relative aspect-16/10 w-full">
    <CardImage src={thumbnail} alt={project.name} />
  </div>
  <div class="bg-kraft flex h-full flex-col items-start gap-1.5 px-4 py-4">
    <h2 class="font-video text-fg-1 text-xl">{project.name}</h2>
    <p class="text-grey-0 text-sm">{$_(`projects.${project.key}.description`)}</p>

    <div class="mt-auto flex flex-row gap-2">
      {#if project.github}
        <a
          href={project.github}
          target="_blank"
          class="border-bg-5 bg-bg-dim hover:text-orange focus:text-orange flex flex-row items-center gap-2 rounded-md border px-2 py-1.5 text-sm transition-colors sm:text-base"
        >
          <Github class="h-5 w-5" />
          GitHub
        </a>
      {/if}

      {#if project.link}
        <a
          href={project.link}
          target="_blank"
          class="border-bg-5 bg-bg-dim hover:text-orange focus:text-orange flex flex-row items-center gap-2 rounded-md border px-2 py-1.5 text-sm transition-colors sm:text-base"
        >
          <Globe class="h-5 w-5" />
          {$_("projects.open")}
        </a>
      {/if}
    </div>
  </div>
</div>
