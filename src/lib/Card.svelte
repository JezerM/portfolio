<script lang="ts">
  let className: string = "";
  export { className as class };
</script>

<div class="card {className}">
  <div class="imgContainer">
    <slot name="image" />
  </div>
  <div class="cardContent">
    <slot />
  </div>
</div>

<style lang="less">
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

    :global(img) {
      width: 100%;
    }
  }
</style>
