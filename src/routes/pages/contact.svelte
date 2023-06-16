<script lang="ts">
  import { locale, _ } from "svelte-i18n";

  console.log("\tInside contact", $locale);
</script>

<div class="contact">
  <h2>{$_("contact.title")}</h2>
  <p>
    {@html $_("contact.desc_1")}
  </p>
</div>

<style lang="less">
  .contact :global(a) {
    text-decoration-line: underline;
    text-decoration-thickness: 0.1em;
    color: var(--fgBlue);
  }
</style>
