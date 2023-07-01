<script lang="ts">
  import Home from "../pages/index.svelte";
  import { _ } from "svelte-i18n";
</script>

<svelte:head>
  <title>{$_("head.home_title")}</title>
</svelte:head>

<Home />
