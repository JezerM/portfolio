<script lang="ts">
  import { _, locale } from "svelte-i18n";
  import type { LayoutData } from "./$types";
  import Navbar from "$lib/components/navbar.svelte";
  import { fade } from "svelte/transition";
  import { navigating } from "$app/state";
  import { getUnlocalizedPath } from "$lib/utils";

  interface TransitionParams {
    duration: number;
    delay?: number;
  }

  interface Props {
    data: LayoutData;
    children?: import("svelte").Snippet;
  }

  let { data, children }: Props = $props();

  let instaFadeIn = { duration: 0, delay: 0 };
  let instaFadeOut = { duration: 0 };

  let durFadeIn = { duration: 150, delay: 200 };
  let durFadeOut = { duration: 150 };

  let fadeIn: TransitionParams = $state(durFadeIn);
  let fadeOut: TransitionParams = $state(durFadeOut);

  let previous = $state(data.pathname as string);
  $effect.pre(() => {
    let pathname = data.pathname as string;
    let absPrev = getUnlocalizedPath(previous);
    let absCurr = getUnlocalizedPath(pathname);
    if (absPrev == absCurr) {
      fadeIn = instaFadeIn;
      fadeOut = instaFadeOut;
    } else {
      fadeIn = durFadeIn;
      fadeOut = durFadeOut;
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

<div class="container mx-auto mb-20 p-3 sm:mb-16 md:py-8 lg:py-12" class:no-blur={transitioning}>
  {#key previous}
    <div
      in:fade={fadeIn}
      out:fade={fadeOut}
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
  src="/static/deco/44.png?w=300;540"
  sizes="300px, (min-width:640px) 540px"
  alt=""
  class="absolute left-0 right-[110px] top-[80px] -z-10 mx-auto w-72 lg:top-[100px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;540"
  sizes="300px, (min-width:640px) 540px"
  alt=""
  class="absolute left-[200px] right-0 top-[1000px] -z-10 mx-auto w-80 sm:left-[210px] lg:top-[940px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;540"
  sizes="300px, (min-width:640px) 540px"
  alt=""
  class="absolute left-0 right-[150px] top-[2000px] -z-10 mx-auto w-72 sm:hidden"
/>

<style>
  /* Fix for Safari backdrop blur during transitions */
  .no-blur :global(*) {
    --tw-backdrop-blur: blur(0px) !important;
  }
</style>
