<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { LayoutData } from "./$types";

  interface Props {
    data: LayoutData;
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<svelte:head>
  <meta name="description" content={$_("head.description")} />
  <meta property="og:description" content={$_("head.description")} />
  <meta name="twitter:description" content={$_("head.description")} />
</svelte:head>

<div class="container mx-auto mb-20 p-3 sm:mb-16 md:py-8 lg:py-12 2xl:max-w-7xl">
  {@render children?.()}
</div>

<enhanced:img
  src="/static/deco/02.png?w=300;400"
  sizes="300px, (min-width:640px) 400px"
  alt=""
  class="absolute left-0 right-[900px] top-[540px] -z-10 mx-auto w-48"
/>
<enhanced:img
  src="/static/deco/06.png?w=300;400"
  sizes="300px, (min-width:640px) 400px"
  alt=""
  class="absolute left-[180px] right-0 top-[640px] -z-10 mx-auto w-48 lg:left-[850px]"
/>
<enhanced:img
  src="/static/deco/44.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute left-0 right-[110px] top-[80px] -z-10 mx-auto w-72 lg:top-[100px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute left-[200px] right-0 top-[1000px] -z-10 mx-auto w-80 sm:left-[210px] lg:top-[940px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute left-0 right-[150px] top-[2000px] -z-10 mx-auto w-72 sm:hidden"
/>
