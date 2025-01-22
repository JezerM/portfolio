<script lang="ts">
  import { _, date } from "svelte-i18n";
  import type { Post } from "$lib/types/post";
  import { baseLocale } from "$lib/i18n";
  import { pushOnClick } from "$lib/actions.svelte";

  interface Props {
    post: Post;
  }

  const { post }: Props = $props();

  const formattedDate = $date(post.meta.date, { dateStyle: "long" });
  const formattedTime = $date(post.meta.date, { timeStyle: "short" });
</script>

<a
  href="{$baseLocale}/blog/{post.name}"
  class="relative flex flex-col gap-1.5 overflow-hidden rounded-xl border border-bg-5 bg-bg-dim/50 bg-kraft p-4 backdrop-blur-md transition-all [perspective:500px] hover:border-orange focus:border-orange"
  use:pushOnClick={10}
>
  <time
    datetime={post.meta.date.toISOString()}
    class="flex justify-between gap-4 font-print text-grey-0"
  >
    <span>{formattedDate}</span>
    <span>{formattedTime}</span>
  </time>
  <h2 class="font-video text-xl text-fg-1">{post.meta.title}</h2>
  <p class="text-sm text-grey-0">{post.meta.description}</p>
</a>
