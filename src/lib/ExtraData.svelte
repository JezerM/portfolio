<script lang="ts">
  import { base } from "$app/paths";
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

<div class="infoContainer pixelBorder">
  <h3>{$_("extra_data.title")}</h3>

  {#each Object.entries(data) as [key, value]}
    <div class="data">
      <span>{$_(`extra_data.${key}`)}</span>
      <span>{value}</span>
    </div>
  {/each}

  <div class="data">
    <label for="cvLink">Currículum Vitae</label>
    <div class="actionContainer pixelSimpleBorder">
      <a
        id="cvLink"
        class="actionElement pixelSimpleBorder"
        href="{base}/cv/{cvLang}.pdf"
        target="_blank"
        title={$_("extra_data.cv_title")}
      >
        <span>{$_("extra_data.cv_open")}</span>
        <ImgIcon src="{base}/icons/Folder.png" class="bgFg" />
      </a>
    </div>
  </div>

  <span class="blue">#SOSNicaragua</span>

  <div id="localeOptionsContainer" class="actionContainer pixelSimpleBorder hideNotJavascript">
    <select
      id="localeOptions"
      class="actionElement pixelSimpleBorder"
      on:change={handleLocaleChange}
    >
      <option value="en" selected={$locale == "en"}>English</option>
      <option value="es" selected={$locale == "es"}>Español</option>
    </select>
    <ImgIcon src="{base}/icons/CaretDown.png" class="bgFg selectIcon" />
  </div>

  <div class="localeLinkContainer flexNotJavascript">
    <span>{$_("extra_data.language")}</span>
    <ul>
      <li>
        <a href={localizePath("en")}>English</a>
      </li>
      <li>
        <a href={localizePath("es")}>Spanish</a>
      </li>
    </ul>
  </div>
</div>

<style lang="less">
  @import (reference) "../app.less";

  .infoContainer {
    padding: 1.5em;
    background-color: var(--bg1);
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media (min-width: @sm) {
      padding: 2em;
    }
  }

  .data {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;

    > span:last-child {
      text-align: end;
    }
  }

  .blue {
    color: var(--fgBlue);
  }

  .actionContainer {
    display: flex;
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
  .actionContainer > .actionElement {
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

    transition: background-color 0.25s;

    &:hover {
      background-color: var(--bg2);
    }
  }
  :global(.selectIcon) {
    position: absolute;
    top: 50%;
    bottom: 50%;
    margin-top: auto;
    margin-bottom: auto;
    right: 0.75em;
    pointer-events: none;
  }
  #localeOptionsContainer {
    width: 100%;
  }
  #localeOptions {
    width: -webkit-fill-available;
    width: fill-available;
    width: -moz-available;
    position: relative;
  }

  #cvLink {
    display: flex;
    gap: 0.5em;
    padding: 0.5em;

    transition: background-color 0.25s;

    &:hover {
      background-color: var(--bg2);
    }
  }

  .localeLinkContainer {
    display: none;
    flex-direction: column;
    padding-top: 0.25em;

    ul {
      margin: 0;
      margin-top: 0.5em;
      li {
        transition: color 0.25s;

        &:hover {
          color: var(--fgBlue);
        }
      }
    }
  }
</style>
