<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { _ } from "svelte-i18n";
  import ImgIcon from "$lib/ImgIcon.svelte";
  import { baseLocale } from "./i18n";

  let darkMode = false;
  let forced = false;

  function setAppearance(isDark: boolean) {
    darkMode = isDark;
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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

<nav class="flex flex-row justify-between bg-light-1 pixel-border dark:bg-dark-1">
  <ul class="flex flex-row">
    <li class="text-blue-fg-light dark:text-blue-fg">
      <a
        href="{$baseLocale}/"
        class="flex items-center gap-2 px-5 py-4 transition-colors hover:bg-light-2 focus:bg-light-2 dark:hover:bg-dark-2 dark:focus:bg-dark-2"
      >
        <ImgIcon src="{base}/icons/Home.png" class="bg-blue-fg-light dark:bg-blue-fg" />
        <span class="hidden min-[974px]:block">{$_("navigation.home")}</span>
      </a>
    </li>
    <li class="text-purple-fg-light dark:text-purple-fg">
      <a
        href="{$baseLocale}/projects"
        class="flex items-center gap-2 px-5 py-4 transition-colors hover:bg-light-2 focus:bg-light-2 dark:hover:bg-dark-2 dark:focus:bg-dark-2"
      >
        <ImgIcon src="{base}/icons/Folder.png" class="bg-purple-fg-light dark:bg-purple-fg" />
        <span class="hidden min-[974px]:block">{$_("navigation.projects")}</span>
      </a>
    </li>
    <li class="text-aqua-fg-light dark:text-aqua-fg">
      <a
        href="{$baseLocale}/contact"
        class="flex items-center gap-2 px-5 py-4 transition-colors hover:bg-light-2 focus:bg-light-2 dark:hover:bg-dark-2 dark:focus:bg-dark-2"
      >
        <ImgIcon src="{base}/icons/Contact.png" class="bg-aqua-fg-light dark:bg-aqua-fg" />
        <span class="hidden min-[974px]:block">{$_("navigation.contact")}</span>
      </a>
    </li>
  </ul>

  <ul class="flex flex-row">
    <li class="hideNotJavascript">
      <button
        class="flex h-full items-center gap-2 px-3 transition-colors hover:bg-light-2 focus:bg-light-2 dark:hover:bg-dark-2 dark:focus:bg-dark-2"
        on:click={() => toggleDarkMode()}
        title={$_("navigation.toggle_dark_mode")}
      >
        <ImgIcon
          src={darkMode ? `${base}/icons/Moon.png` : `${base}/icons/Sun.png`}
          class="bg-blue-bg-light dark:bg-blue-fg"
        />
      </button>
    </li>
    <li class="hidden min-[510px]:block">
      <a
        href="http://discordapp.com/users/530819150969438208"
        target="_blank"
        title={$_("navigation.discord_user")}
        class="flex h-full items-center gap-2 px-3 transition-colors hover:bg-light-2 focus:bg-light-2 dark:hover:bg-dark-2 dark:focus:bg-dark-2"
      >
        <ImgIcon src="{base}/icons/Discord.png" class="size-6 bg-discord sm:size-8" />
      </a>
    </li>
    <li class="hidden min-[510px]:block">
      <a
        href="https://github.com/JezerM"
        target="_blank"
        title={$_("navigation.github_profile")}
        class="flex h-full items-center gap-2 px-3 transition-colors hover:bg-light-2 focus:bg-light-2 dark:hover:bg-dark-2 dark:focus:bg-dark-2"
      >
        <ImgIcon src="{base}/icons/GitHub.png" class="size-6 bg-black dark:bg-white sm:size-8" />
      </a>
    </li>
    <li class="hidden min-[510px]:block">
      <a
        href="https://www.linkedin.com/in/jezer-josué-mejía-otero-111b39227/"
        target="_blank"
        title={$_("navigation.linkedin_profile")}
        class="flex h-full items-center gap-2 px-3 transition-colors hover:bg-light-2 focus:bg-light-2 dark:hover:bg-dark-2 dark:focus:bg-dark-2"
      >
        <ImgIcon src="{base}/icons/LinkedIn.png" class="size-6 bg-linkedin sm:size-8" />
      </a>
    </li>
  </ul>
</nav>
