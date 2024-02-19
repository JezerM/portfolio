<script lang="ts">
  export let text: string;
  export let disableClick = false;

  export let active = false;
</script>

<button
  class="bg-light-0 px-3 py-2 text-sm transition-colors hover:bg-blue-bg data-[active]:!bg-aqua-bg-light data-[active]:hover:!bg-aqua-fg dark:bg-dark dark:hover:bg-blue-bg"
  on:click={() => (active = disableClick ? active : !active)}
  on:click
  data-active={active ? "" : undefined}
>
  <span>{text}</span>
</button>
