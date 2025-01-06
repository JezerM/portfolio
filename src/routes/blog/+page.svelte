<script lang="ts">
  import type { PageServerData } from "./$types";
  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<ul>
  {#each data.posts as post}
    <li>
      <a href={post.path}>{post.meta.title} - {post.meta.date}</a>
    </li>
  {/each}
</ul>
