<script lang="ts">
  export let src: string;
  let className = "";
  export { className as class };
</script>

<div
  class="size-6 [image-rendering:pixelated] [mask-repeat:no-repeat] [mask-size:100%] {className}"
  style:mask-image="url('{src}')"
  style:-webkit-mask-image="url('{src}')"
/>
