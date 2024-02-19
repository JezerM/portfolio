<script lang="ts">
  import { locale, _ } from "svelte-i18n";
  import { socialLinks } from "$lib/store";

  console.log("\tInside contact", $locale);
</script>

<div class="contact">
  <h2 class="mb-5 text-2xl font-bold">{$_("contact.title")}</h2>
  <p class="my-4">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html $_("contact.desc_1")}
  </p>

  <h3 class="mb-4 text-lg font-bold">Social links</h3>
  <ul class="my-4 list-disc pl-10">
    <li>
      <a href={socialLinks.github}>GitHub</a>
    </li>
    <li>
      <a href={socialLinks.linkedin}>LinkedIn</a>
    </li>
    <li>
      <a href={socialLinks.discord}>Discord</a>
    </li>
  </ul>
</div>

<style lang="postcss">
  .contact :global(a) {
    text-decoration-line: underline;
    text-decoration-thickness: 0.1em;
    color: theme(colors.blue.fg-light);
  }
  :global(html.dark) .contact :global(a) {
    color: theme(colors.blue.fg);
  }
</style>
