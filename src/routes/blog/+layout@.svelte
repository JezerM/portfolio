<script lang="ts">
  import { base } from "$app/paths";
  import { locale } from "svelte-i18n";

  let baseLocale = $locale == "en" ? "" : locale;
</script>

<div class="m-5 md:mx-12 md:my-8 lg:mx-20 lg:my-12">
  <a href="{base}/{baseLocale}">Portfolio</a>
  <a href="{base}/blog">Blog</a>
  <main class="p-8">
    <slot />
  </main>
</div>
