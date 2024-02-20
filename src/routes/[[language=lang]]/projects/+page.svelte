<script lang="ts">
  import Projects from "../../pages/projects.svelte";
  import { _ } from "svelte-i18n";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>{$_("head.projects_title")}</title>
</svelte:head>

<Projects {data} />
