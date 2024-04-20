<script lang="ts">
  import { goto } from "$app/navigation";
  import { locale, _ } from "svelte-i18n";
  import { localizePath } from "./utils";
  import ImgIcon from "./ImgIcon.svelte";

  let cvLang: string;
  $: switch ($locale) {
    case "es":
      cvLang = "spanish";
      break;
    case "en":
    default:
      cvLang = "english";
      break;
  }

  const bornDate = new Date(2003, 11, 5);
  const now = Date.now();

  function getYearDifference(time1: number, time2: number): number {
    const diffTime = time1 - time2;
    const ageDate = new Date(diffTime);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  $: data = {
    age: getYearDifference(now, bornDate.getTime()),
    birthday: $_("extra_data.birthday_value"),
    country: "Nicaragua",
    gender: $_("extra_data.gender_value"),
  };

  function handleLocaleChange(event: Event) {
    const el = event.target as HTMLSelectElement;
    const lang = el.value;
    const path = localizePath(lang);
    goto(path, { noScroll: true });
    locale.set(lang);
  }
</script>

<div class="flex flex-col gap-2 bg-light-1 p-6 pixel-border-2 dark:bg-dark-1 sm:p-8">
  <h3 class="mb-4 text-lg font-bold">{$_("extra_data.title")}</h3>

  {#each Object.entries(data) as [key, value]}
    <div class="flex w-full flex-row items-center justify-between gap-2">
      <span>{$_(`extra_data.${key}`)}</span>
      <span class="text-end">{value}</span>
    </div>
  {/each}

  <div class="flex w-full flex-row items-center justify-between gap-2">
    <label for="cvLink">Currículum Vitae</label>
    <div
      class="group relative flex pixel-border before:absolute before:z-[-1] before:block before:size-full before:bg-dark-1 before:transition-colors dark:before:bg-light-1 [&:is(:hover,:focus-within)]:before:bg-orange-bg"
    >
      <a
        class="m-[0.3rem] flex items-center gap-2 bg-light-1 p-2 text-sm transition-colors pixel-border group-[&:is(:hover,:focus-within)]:bg-orange-bg group-[&:is(:hover,:focus-within)]:text-light-1 dark:bg-dark-1"
        href="/{$locale ?? 'en'}/curriculum-vitae.pdf"
        target="_blank"
        title={$_("extra_data.cv_title")}
      >
        <span>{$_("extra_data.cv_open")}</span>
        <ImgIcon
          src="/icons/Folder.png"
          class="bg-dark-1 group-[&:is(:hover,:focus-within)]:bg-light-1 dark:bg-light-1"
        />
      </a>
    </div>
  </div>

  <span class="text-blue-fg-light dark:text-blue-fg">#SOSNicaragua</span>

  <div
    class="hideNotJavascript group relative flex w-full pixel-border before:absolute before:z-[-1] before:block before:size-full before:bg-dark-1 before:transition-colors dark:before:bg-light-1 [&:is(:hover,:focus-within)]:before:bg-orange-bg"
  >
    <select
      class="relative m-[0.3rem] box-border flex w-full appearance-none gap-2 rounded-none bg-light-1 px-4 py-2 text-sm transition-colors pixel-border group-[&:is(:hover,:focus-within)]:bg-orange-bg group-[&:is(:hover,:focus-within)]:text-light-1 dark:bg-dark-1"
      on:change={handleLocaleChange}
    >
      <option value="en" selected={$locale == "en"}>English</option>
      <option value="es" selected={$locale == "es"}>Español</option>
    </select>
    <ImgIcon
      src="/icons/CaretDown.png"
      class="pointer-events-none absolute bottom-1/2 right-3 top-1/2 mb-auto mt-auto bg-dark-1 group-[&:is(:hover,:focus-within)]:bg-light-1 dark:bg-light-1"
    />
  </div>

  <div class="flexNotJavascript hidden flex-col pt-1">
    <span>{$_("extra_data.language")}</span>
    <ul class="ml-2 mt-2">
      <li class="transition-colors hover:text-blue-fg-light">
        <a href={localizePath("en")}>English</a>
      </li>
      <li class="transition-colors hover:text-blue-fg-light">
        <a href={localizePath("es")}>Spanish</a>
      </li>
    </ul>
  </div>
</div>
