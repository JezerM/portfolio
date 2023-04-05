<script lang="ts">
  export let src: string;
  export let color: string;
</script>

<div class="icon" style="mask-image: url({src}); background-color: {color}" />

<style>
  .icon {
    mask-size: 100%;
    image-rendering: pixelated;
    width: 1.5em;
    height: 1.5em;
  }
</style>
