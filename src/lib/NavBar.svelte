<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import ImgIcon from "$lib/ImgIcon.svelte";

  let darkMode = false;
  let forced = false;

  function setAppearance(isDark: boolean) {
    darkMode = isDark;
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }
  function setForcedAppearance() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    if ((prefersDark && darkMode) || (prefersLight && !darkMode)) {
      forced = false;
    } else {
      forced = true;
    }
  }

  if (browser) {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setAppearance(true);
    } else {
      setAppearance(false);
    }
    setForcedAppearance();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (ev) => {
      if (forced) return;
      if (ev.matches) {
        setAppearance(true);
      } else {
        setAppearance(false);
      }
    });
  }

  function toggleDarkMode() {
    setAppearance(!darkMode);
    setForcedAppearance();
  }
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
    <li class="navElement alwaysVisible">
      <button class="darkToggle" on:click={() => toggleDarkMode()}>
        <ImgIcon
          src={darkMode ? `${base}/icons/Moon.png` : `${base}/icons/Sun.png`}
          class="bgFgBlue"
        />
      </button>
    </li>
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

    > .navElement:not(.alwaysVisible) {
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
    > a,
    .darkToggle {
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
  .darkToggle {
    font-size: inherit;
    padding: 0em 0.8em !important;
    border: 0;
    height: 100%;
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
