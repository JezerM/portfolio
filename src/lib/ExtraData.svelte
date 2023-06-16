<script lang="ts">
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { locale, locales, _ } from "svelte-i18n";
  import { getUnlocalizedPath } from "./utils";

  const bornDate = new Date(2003, 11, 5);
  const now = Date.now();

  function getYearDifference(time1: number, time2: number): number {
    const diffTime = time1 - time2;
    const ageDate = new Date(diffTime);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const data = {
    age: getYearDifference(now, bornDate.getTime()),
    birthday: $_("extra_data.birthday_value"),
    country: "Nicaragua",
    gender: $_("extra_data.gender_value"),
  };

  _.subscribe((v) => {
    data.birthday = v("extra_data.birthday_value");
    data.gender = v("extra_data.gender_value");
  });

  function localizePath(target: string): string {
    let route: string = get(page).data.pathname;
    route = getUnlocalizedPath(route);

    if (target == "en") return `/${route}`;
    return `/${target}/${route}`;
  }
  function handleLocaleChange(event: Event) {
    const el = event.target as HTMLSelectElement;
    const lang = el.value;
    const path = localizePath(lang);
    goto(path, { noScroll: true });
    locale.set(lang);
  }
</script>

<div class="infoContainer pixelBorder">
  <h3>{$_("extra_data.title")}</h3>

  {#each Object.entries(data) as [key, value]}
    <div class="data">
      <span>{$_(`extra_data.${key}`)}</span>
      <span>{value}</span>
    </div>
  {/each}

  <span class="blue">#SOSNicaragua</span>
  <div id="localeOptionsContainer" class="pixelSimpleBorder">
    <select id="localeOptions" class="pixelSimpleBorder" on:change={handleLocaleChange}>
      <option value="en" selected={$locale == "en"}>English</option>
      <option value="es" selected={$locale == "es"}>Español</option>
    </select>
  </div>
</div>

<style lang="less">
  .infoContainer {
    padding: 2em;
    background-color: var(--bg1);
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .data {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }

  .blue {
    color: var(--fgBlue);
  }

  #localeOptionsContainer {
    width: 100%;
    position: relative;

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      background-color: var(--fg);
      z-index: -1;
    }
  }

  #localeOptions {
    width: -webkit-fill-available;
    width: fill-available;
    width: -moz-available;
    appearance: none;
    box-sizing: border-box;
    background-color: var(--bg1);
    border-radius: 0;
    border: 0;
    margin: 0.3rem;
    padding: 0.5em 1em;
    color: var(--fg);
    font-family: Monocraft;
    font-size: 14px;
  }
</style>
