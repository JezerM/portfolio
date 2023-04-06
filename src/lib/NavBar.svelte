<script lang="ts">
  import { base } from "$app/paths";
  import ImgIcon from "$lib/ImgIcon.svelte";
</script>

<nav class="navBar">
  <ul id="navLinks">
    <li class="navElement blueLink">
      <a href="{base}/">
        <ImgIcon src="{base}/icons/Home.png" class="bgFgBlue" />
        <span>Home</span>
      </a>
    </li>
    <li class="navElement purpleLink">
      <a href="{base}/projects">
        <ImgIcon src="{base}/icons/Folder.png" class="bgFgPurple" />
        <span>My projects</span>
      </a>
    </li>
    <li class="navElement aquaLink">
      <a href="{base}/contact">
        <ImgIcon src="{base}/icons/Contact.png" class="bgFgAqua" />
        <span>Contact me</span>
      </a>
    </li>
  </ul>

  <ul id="socialLinks">
    <li class="navElement">
      <a href="http://discordapp.com/users/530819150969438208" target="_blank">
        <ImgIcon src="{base}/icons/Discord.png" class="bgDiscord" />
      </a>
    </li>
    <li class="navElement">
      <a href="https://github.com/JezerM" target="_blank">
        <ImgIcon src="{base}/icons/GitHub.png" class="bgWhite" />
      </a>
    </li>
    <li class="navElement">
      <a href="https://www.linkedin.com/in/jezer-josué-mejía-otero-111b39227/" target="_blank">
        <ImgIcon src="{base}/icons/LinkedIn.png" class="bgLinkedIn" />
      </a>
    </li>
  </ul>
</nav>

<style lang="less">
  @import (reference) "../app.less";
  nav.navBar {
    background-color: var(--bg1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > ul {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  #navLinks {
    > .navElement {
      span {
        display: none;
        @media (min-width: @md) {
          display: block;
        }
      }
    }
  }

  #socialLinks {
    gap: 0em;

    > .navElement {
      display: none;
      @media (min-width: @nm) {
        display: block;
      }
      :global(div.icon) {
        width: 1.5em;
        height: 1.5em;
        @media (min-width: @sm) {
          width: 2em;
          height: 2em;
        }
        image-rendering: pixelated;
      }

      > a {
        padding: 0em 0.8em;
        height: 100%;
      }
    }
  }

  .navElement {
    > a {
      display: flex;
      align-items: center;
      gap: 0.5em;
      padding: 1em 1.25em;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: var(--bg2);
      }

      &:visited {
        color: inherit;
      }
    }
  }

  .blueLink {
    color: var(--fgBlue);
  }
  .purpleLink {
    color: var(--fgPurple);
  }
  .aquaLink {
    color: var(--fgAqua);
  }
</style>
