<script lang="ts">
  export let text: string;
  export let disableClick = false;

  export let active = false;
</script>

<button class:active on:click={() => (active = disableClick ? active : !active)} on:click>
  <span>{text}</span>
</button>

<noscript>
  <style lang="less">
    @media (prefers-color-scheme: light) {
      button:hover,
      button:active {
        color: var(--bg);
      }
    }
  </style>
</noscript>

<style lang="less">
  button {
    font-size: 14px;
    padding: 0.5em 0.75em;
    background-color: var(--bg);
    &.active {
      background-color: var(--bgAqua);
    }
    &:hover {
      background-color: var(--bgBlue);
    }
  }

  :global(:root):is(.light) {
    button:hover,
    button:active {
      color: var(--bg);
    }
  }
</style>
