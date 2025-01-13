<script lang="ts">
  import type { PageData } from "./$types";
  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>Blog - {data.title}</title>
</svelte:head>

<article>
  <h1>{data.title}</h1>
  <p>Published: {data.date}</p>
  <data.content />
</article>
