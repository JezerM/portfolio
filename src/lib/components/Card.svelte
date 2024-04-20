<script lang="ts">
  let className = "";
  let imageContainerClass = "";
  export { className as class, imageContainerClass as imageClass };
</script>

<div class="box-border flex flex-col {className}">
  <div class="flex aspect-[16/10] w-full items-center justify-center {imageContainerClass}">
    <slot name="image" />
  </div>
  <div class="p-5">
    <slot />
  </div>
</div>
