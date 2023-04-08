<script lang="ts">
  import { base } from "$app/paths";
  import LanguageIcons from "$lib/LanguageIcons.svelte";
</script>

<div>
  <div class="infoContainer">
    <div class="pictureContainer" style="mask-image: url('{base}/Circle.png');">
      <picture>
        <source type="image/avif" srcset="{base}/JezerPicture.avif" />
        <img
          class="picture"
          src="{base}/JezerPicture.jpeg"
          alt="JezerM anime"
          style="mask-image: url('{base}/Circle.png');"
        />
      </picture>
    </div>
    <div id="infoSubContainer">
      <h2>Jezer Mejía</h2>
      <p>
        I love Linux, coffee, Physics and Open Source.<br />
        Low level programming enthusiast.<br />
        Yet learning in UCA Nicaragua.
      </p>
      <LanguageIcons />
    </div>
  </div>

  <div id="aboutMeContainer">
    <h2>About me</h2>
    <p>
      I'm Jezer Josué Mejía Otero and I'm a developer just for fun. I love to create things that
      everyone could benefit of, investing my time in open source development, from which we can
      find some Linux applications, web pages, terminal based programs and so much more.
    </p>
    <p>
      My true passion is Physics, but that will have to wait until I move to a country that offer
      this career~
    </p>

    <p>
      As stated above, I love Linux! Hence, I also love the terminal. I've always liked TypeScript
      and C, but Rust has recently taken a part in my heart.
    </p>
  </div>
</div>

<style lang="less">
  @import (reference) "../app.less";
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
    mask-size: 100%;
  }
  .pictureContainer {
    background-color: var(--fg);
    padding: 0.4em;
    mask-size: 100%;
    mask-repeat: no-repeat;
  }
</style>
