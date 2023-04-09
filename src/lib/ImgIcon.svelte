<script lang="ts">
  export let src: string;
  let className = "";
  export { className as class };
</script>

<div class="icon {className}" style="--mask-image: url('{src}');" />

<style>
  .icon {
    mask-image: var(--mask-image);
    mask-size: 100%;
    mask-repeat: no-repeat;
    -webkit-mask-image: var(--mask-image);
    -webkit-mask-size: 100%;
    -webkit-mask-repeat: no-repeat;
    image-rendering: pixelated;
    width: 1.5em;
    height: 1.5em;
  }
</style>
