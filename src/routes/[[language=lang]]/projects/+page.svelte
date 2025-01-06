<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{$_("head.projects_title")}</title>
</svelte:head>

<h1 class="drop-shadow-glow mt-4 text-center font-raster text-4xl text-red">
  {$_("projects.title_1")}
</h1>
