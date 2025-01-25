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
  class="border-bg-5 bg-bg-dim/50 bg-kraft hover:border-orange focus:border-orange relative flex flex-col gap-1.5 overflow-hidden rounded-xl border p-4 backdrop-blur-md transition-all [perspective:500px]"
  use:pushOnClick={10}
>
  <time
    datetime={post.meta.date.toISOString()}
    class="font-print text-grey-0 flex justify-between gap-4"
  >
    <span>{formattedDate}</span>
    <span>{formattedTime}</span>
  </time>
  <h2 class="font-video text-fg-1 text-xl">{post.meta.title}</h2>
  <p class="text-grey-0 text-sm">{post.meta.description}</p>
</a>
