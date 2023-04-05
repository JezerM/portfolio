<script lang="ts">
  export let src: string = "";
</script>

<div class="card">
  <img {src} alt="" />
  <div class="cardContent">
    <slot />
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .cardContent {
    padding: 1.25em;
  }
</style>
