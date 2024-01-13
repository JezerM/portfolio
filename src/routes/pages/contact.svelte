<script lang="ts">
  import { locale, _ } from "svelte-i18n";
  import { socialLinks } from "$lib/store";

  console.log("\tInside contact", $locale);
</script>

<div class="contact">
  <h2>{$_("contact.title")}</h2>
  <p>
    {@html $_("contact.desc_1")}
  </p>

  <h3>Social links</h3>
  <ul>
    <li>
      <a href={socialLinks.github}>GitHub</a>
    </li>
    <li>
      <a href={socialLinks.linkedin}>Linkedin</a>
    </li>
    <li>
      <a href={socialLinks.discord}>Discord</a>
    </li>
  </ul>
</div>

<style lang="less">
  .contact :global(a) {
    text-decoration-line: underline;
    text-decoration-thickness: 0.1em;
    color: var(--fgBlue);
  }
</style>
