<script lang="ts">
  import ContactIcons from "$lib/components/contact-icons.svelte";
  import { FileUser } from "lucide-svelte";
  import { _, locale } from "svelte-i18n";

  const bornDate = new Date(2003, 11, 5);
  const now = Date.now();

  function getYearDifference(time1: number, time2: number): number {
    const diffTime = time1 - time2;
    const ageDate = new Date(diffTime);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const age = getYearDifference(now, bornDate.getTime());
</script>

<svelte:head>
  <title>{$_("head.home_title")}</title>
  <meta property="og:title" content={$_("head.home_title")} />
</svelte:head>

<div class="mx-auto mb-8 flex w-fit flex-col items-center gap-4 sm:mt-16">
  <div class="aspect-square size-56 overflow-hidden rounded-full border-4 border-bg-5 bg-purple">
    <enhanced:img class="block size-full" src="/static/JezerPicture.png" alt="JezerM anime" />
  </div>
  <h1 class="mt-4 transform-gpu text-center font-raster text-4xl text-aqua drop-shadow-glow">
    {@html $_("home.greeting")}
  </h1>
  <ContactIcons />
</div>

<div class="mx-auto max-w-[840px] space-y-8">
  <div
    class="flex flex-col gap-4 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md"
  >
    <p>
      {@html $_("home.about_1")}
    </p>
    <p>
      {@html $_("home.about_2")}
    </p>
  </div>

  <h2 class="sr-only">
    {@html $_("home.about_title")}
  </h2>

  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
    <div
      class="space-y-2.5 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-xl text-fg-1">Work</h3>
      <p
        class="prose-a:font-raster prose-a:text-orange prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-yellow focus:prose-a:text-yellow"
      >
        {@html $_("home.work")}
        <a
          href="{$locale}/curriculum-vitae.pdf"
          target="_blank"
          class="group mt-3 flex flex-row items-center gap-2"
        >
          <FileUser
            stroke-dasharray="3 5"
            stroke-linecap="square"
            class="transition-all group-hover:[stroke-dasharray:0] "
          />
          Currículum Vitae
        </a>
      </p>
    </div>

    <div
      class="space-y-2.5 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-xl text-fg-1">
        {$_("home.extra.title")}
      </h3>
      <ul class="list-[square] pl-8">
        <li>{$_("home.extra.nationality")}</li>
        <li>{$_("home.extra.age_desc", { values: { age } })}</li>
        <li>{$_("home.extra.gender")}</li>
      </ul>
    </div>
  </div>

  <h2 class="transform-gpu text-center font-raster text-2xl text-blue drop-shadow-glow">
    {@html $_("home.skills_title")}
  </h2>

  <div class="grid grid-cols-3 gap-8 sm:grid-cols-6">
    <div
      class="col-span-3 space-y-2.5 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-xl text-fg-1">Web Development</h3>
      <ul class="list-[square] pl-8">
        <li>Svelte/SvelteKit</li>
        <li>Vue/Nuxt</li>
        <li>React</li>
        <li>ExpressJS</li>
        <li>Java SprintBoot</li>
        <li>Rust Actix web</li>
      </ul>
    </div>

    <div
      class="col-span-3 space-y-2.5 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-xl text-fg-1">Systems</h3>
      <ul class="list-[square] pl-8">
        <li>C and C++</li>
        <li>Rust</li>
        <li>Aarch64 assembly</li>
        <li>Java/Kotlin</li>
        <li>Python</li>
        <li>Linux and Unix systems</li>
      </ul>
    </div>

    <div
      class="col-span-3 space-y-2.5 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md md:col-span-2"
    >
      <h3 class="font-video text-xl text-fg-1">Databases</h3>
      <ul class="list-[square] pl-8">
        <li>MySQL</li>
        <li>PostgreSQL</li>
        <li>MSSQL</li>
      </ul>
    </div>

    <div
      class="col-span-3 space-y-2.5 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md md:col-span-2"
    >
      <h3 class="font-video text-xl text-fg-1">Mobile</h3>
      <ul class="list-[square] pl-8">
        <li>React Native</li>
        <li>Kotlin Jetpack Compose</li>
        <li>SwiftUI</li>
      </ul>
    </div>

    <div
      class="col-span-3 space-y-2.5 rounded-md border border-bg-5 bg-bg-dim/50 bg-kraft p-8 backdrop-blur-md md:col-span-2"
    >
      <h3 class="font-video text-xl text-fg-1">Design</h3>
      <ul class="list-[square] pl-8">
        <li>Figma</li>
        <li>Inkscape</li>
        <li>Aseprite</li>
        <li>Blender</li>
      </ul>
    </div>
  </div>
</div>

<style>
  @keyframes -global-intro-animation {
    from {
      zoom: 2;
      transform: scale(1.25);
      filter: blur(4px);
    }
  }
</style>
