<script lang="ts">
  export let src: string = "";
  let className: string = "";
  export { className as class };
</script>

<div class="card {className}">
  <div class="imgContainer">
    <img {src} alt="" />
  </div>
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
  .imgContainer {
    aspect-ratio: 16 / 10;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .imgContainer > img {
    width: 100%;
  }
</style>
