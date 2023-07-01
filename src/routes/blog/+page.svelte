<script lang="ts">
  import type { PageServerData } from "./$types";
  export let data: PageServerData;
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
