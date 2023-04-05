<script lang="ts">
  const data = {
    Age: 19,
    Birthday: "Nov, 5th",
    Country: "Nicaragua",
    Gender: "Male",
  };
</script>

<div class="infoContainer">
  <h2>Extra data</h2>

  {#each Object.entries(data) as [key, value]}
    <div class="data">
      <span>{key}</span>
      <span>{value}</span>
    </div>
  {/each}

  <span class="blue">#SOSNicaragua</span>
</div>

<style>
  .infoContainer {
    padding: 2em;
    background-color: #3c3836;
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
    color: #83a598;
  }
</style>
