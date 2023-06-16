<script lang="ts">
  import { base } from "$app/paths";
  import LanguageIcons from "$lib/LanguageIcons.svelte";

  const CircleUrl = `${base}/Circle.png`;

  import { _, locale } from "svelte-i18n";
  console.log("\tInside Home", $locale);
</script>

<div>
  <div class="infoContainer">
    <div class="pictureContainer" style="--mask-image: url('{CircleUrl}');">
      <picture>
        <source type="image/avif" srcset="{base}/JezerPicture.avif" />
        <img
          class="picture"
          src="{base}/JezerPicture.jpeg"
          alt="JezerM anime"
          style="--mask-image: url('{CircleUrl}');"
        />
      </picture>
    </div>
    <div id="infoSubContainer">
      <h2>Jezer Mejía</h2>
      <p>
        {$_("home.info_1")}<br />
        {$_("home.info_2")}<br />
        {$_("home.info_3")}
      </p>
      <LanguageIcons />
    </div>
  </div>

  <div id="aboutMeContainer">
    <h2>{$_("home.about_title")}</h2>
    <p>
      {$_("home.about_1")}
    </p>
    <p>
      {$_("home.about_2")}
    </p>
    <p>
      {$_("home.about_3")}
    </p>
  </div>
</div>

<style lang="less">
  @import (reference) "../../app.less";
  .infoContainer {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1.5em;
    margin-bottom: 1.5em;
    @media (min-width: @md) {
      flex-direction: row;
    }
  }
  .picture {
    width: 11.25em;
    height: 11.25em;
    mask-image: var(--mask-image);
    mask-size: 100%;
    -webkit-mask-image: var(--mask-image);
    -webkit-mask-size: 100%;
  }
  .pictureContainer {
    background-color: var(--fg);
    padding: 0.4em;
    mask-image: var(--mask-image);
    mask-size: 100%;
    mask-repeat: no-repeat;
    -webkit-mask-image: var(--mask-image);
    -webkit-mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
  }
</style>
