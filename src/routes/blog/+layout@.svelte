<script lang="ts">
  import { base } from "$app/paths";
  import { locale } from "svelte-i18n";

  let baseLocale = $locale == "en" ? "" : `/${$locale}`;
</script>

<div id="content">
  <a href="{base}{baseLocale}/">Portfolio</a>
  <a href="{base}/blog">Blog</a>
  <main>
    <slot />
  </main>
</div>

<style lang="less">
  @import (reference) "../../app.less";
  main {
    padding: 2em;
  }
</style>
