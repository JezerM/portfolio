<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { LayoutData } from "./$types";
  import Navbar from "$lib/components/navbar.svelte";
  import { getUnlocalizedPath, slidePage, type SlidePageParams } from "$lib/utils";

  interface Props {
    data: LayoutData;
    children?: import("svelte").Snippet;
  }

  let { data, children }: Props = $props();

  let instaFadeIn = { duration: 0, delay: 0 };
  let instaFadeOut = { duration: 0 };

  let durFadeIn = { duration: 350, delay: 500 };
  let durFadeOut = { duration: 350 };

  let fadeIn: SlidePageParams = $state(durFadeIn);
  let fadeOut: SlidePageParams = $state(durFadeOut);

  const targetMap: { [key: string]: number } = {
    "/": 0,
    "/services": 1,
  };

  let previous = $state(data.pathname as string);
  $effect.pre(() => {
    let pathname = data.pathname as string;
    let absPrev = getUnlocalizedPath(previous);
    let absCurr = getUnlocalizedPath(pathname);
    if (absPrev == absCurr) {
      fadeIn = instaFadeIn;
      fadeOut = instaFadeOut;
    } else {
      const curr = targetMap[absCurr];
      const prev = targetMap[absPrev];
      fadeIn = { ...durFadeIn, target: prev, current: curr };
      fadeOut = { ...durFadeOut, target: curr, current: prev };
    }
    previous = data.pathname;
  });

  let transitioning = $state(false);
</script>

<svelte:head>
  <meta name="description" content={$_("head.description")} />
  <meta property="og:description" content={$_("head.description")} />
  <meta name="twitter:description" content={$_("head.description")} />
</svelte:head>

<div
  class="container mx-auto mb-20 p-3 sm:mb-16 md:py-8 lg:py-12 2xl:max-w-7xl"
  class:no-blur={transitioning}
>
  {#key previous}
    <div
      in:slidePage={fadeIn}
      out:slidePage={fadeOut}
      onintrostart={() => (transitioning = true)}
      onintroend={() => (transitioning = false)}
    >
      {@render children?.()}
    </div>
  {/key}
</div>

<Navbar />

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

<style>
  /* Fix for Safari backdrop blur during transitions */
  .no-blur :global(*) {
    /* --tw-backdrop-blur: blur(0px) !important; */
  }
</style>
