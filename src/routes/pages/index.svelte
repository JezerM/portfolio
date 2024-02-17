<script lang="ts">
  import LanguageIcons from "$lib/LanguageIcons.svelte";

  const CircleUrl = `/Circle.png`;

  import { _, locale } from "svelte-i18n";
  console.log("\tInside Home", $locale);
</script>

<div>
  <div class="infoContainer">
    <div
      class="pictureContainer"
      style:mask-image="url('{CircleUrl}')"
      style:-webkit-mask-image="url('{CircleUrl}')"
    >
      <enhanced:img
        class="picture"
        style:mask-image="url('{CircleUrl}')"
        style:-webkit-mask-image="url('{CircleUrl}')"
        src="/static/JezerPicture.png"
        alt="JezerM anime"
      />
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
    display: block;
    width: 11.25em;
    height: 11.25em;
    mask-size: 100%;
    -webkit-mask-size: 100%;
  }
  .pictureContainer {
    background-color: var(--fgPurple);
    padding: 0.4em;
    mask-size: 100%;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
  }
</style>
