<script lang="ts">
  import Contact from "../../pages/contact.svelte";
  import { _ } from "svelte-i18n";
</script>

<svelte:head>
  <title>{$_("head.contact_title")}</title>
</svelte:head>

<Contact />
