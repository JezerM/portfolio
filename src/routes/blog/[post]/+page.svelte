<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>Blog - {data.title}</title>
</svelte:head>

<article>
  <h1>{data.title}</h1>
  <p>Published: {data.date}</p>
  <svelte:component this={data.content} />
</article>
