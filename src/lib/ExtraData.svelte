<script lang="ts">
  import { get } from "svelte/store";
  import { _ } from "svelte-i18n";

  const bornDate = new Date(2003, 11, 5);
  const now = Date.now();

  function getYearDifference(time1: number, time2: number): number {
    const diffTime = time1 - time2;
    const ageDate = new Date(diffTime);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const data = {
    age: getYearDifference(now, bornDate.getTime()),
    birthday: get(_)("extra_data.birthday_value"),
    country: "Nicaragua",
    gender: get(_)("extra_data.gender_value"),
  };
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
</div>

<style>
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
</style>
