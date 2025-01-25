<script lang="ts">
  import ContactIcons from "$lib/components/contact-icons.svelte";
  import { headTitle } from "$lib/snippets/head.svelte";
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
  {@render headTitle($_("head.home_title"))}
</svelte:head>

<div class="mx-auto mb-8 flex w-fit flex-col items-center gap-4 sm:mt-16">
  <div class="border-bg-5 bg-purple aspect-square size-56 overflow-hidden rounded-full border-4">
    <enhanced:img class="block size-full" src="/static/JezerPicture.png" alt="JezerM anime" />
  </div>
  <h1
    class="font-raster text-aqua drop-shadow-glow mt-4 transform-gpu text-center text-4xl select-none"
  >
    {@html $_("home.greeting")}
  </h1>
  <ContactIcons />
</div>

<div class="mx-auto max-w-[840px] space-y-8">
  <div
    class="border-bg-5 bg-bg-dim/50 bg-kraft flex flex-col gap-4 rounded-md border p-8 backdrop-blur-md"
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
      class="border-bg-5 bg-bg-dim/50 bg-kraft space-y-2.5 rounded-md border p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-fg-1 text-xl">Work</h3>
      <p
        class="prose-a:font-raster prose-a:text-orange prose-a:underline prose-a:underline-offset-4 prose-a:hover:text-yellow prose-a:focus:text-yellow"
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
      class="border-bg-5 bg-bg-dim/50 bg-kraft space-y-2.5 rounded-md border p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-fg-1 text-xl">
        {$_("home.extra.title")}
      </h3>
      <ul class="list-[square] pl-8">
        <li>{$_("home.extra.nationality")}</li>
        <li>{$_("home.extra.age_desc", { values: { age } })}</li>
        <li>{$_("home.extra.gender")}</li>
      </ul>
    </div>
  </div>

  <h2 class="font-raster text-blue drop-shadow-glow transform-gpu text-center text-2xl select-none">
    {@html $_("home.skills_title")}
  </h2>

  <div class="grid grid-cols-3 gap-8 sm:grid-cols-6">
    <div
      class="border-bg-5 bg-bg-dim/50 bg-kraft col-span-3 space-y-2.5 rounded-md border p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-fg-1 text-xl">Web Development</h3>
      <ul class="list-[square] pl-8">
        <li>Svelte/SvelteKit</li>
        <li>Vue/Nuxt</li>
        <li>React/Next.js</li>
        <li>ExpressJS</li>
        <li>Java SpringBoot</li>
        <li>Rust Actix web</li>
      </ul>
    </div>

    <div
      class="border-bg-5 bg-bg-dim/50 bg-kraft col-span-3 space-y-2.5 rounded-md border p-8 backdrop-blur-md"
    >
      <h3 class="font-video text-fg-1 text-xl">Systems</h3>
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
      class="border-bg-5 bg-bg-dim/50 bg-kraft col-span-3 space-y-2.5 rounded-md border p-8 backdrop-blur-md md:col-span-2"
    >
      <h3 class="font-video text-fg-1 text-xl">Databases</h3>
      <ul class="list-[square] pl-8">
        <li>MySQL</li>
        <li>PostgreSQL</li>
        <li>MSSQL</li>
      </ul>
    </div>

    <div
      class="border-bg-5 bg-bg-dim/50 bg-kraft col-span-3 space-y-2.5 rounded-md border p-8 backdrop-blur-md md:col-span-2"
    >
      <h3 class="font-video text-fg-1 text-xl">Mobile</h3>
      <ul class="list-[square] pl-8">
        <li>React Native</li>
        <li>Kotlin Jetpack Compose</li>
        <li>SwiftUI</li>
      </ul>
    </div>

    <div
      class="border-bg-5 bg-bg-dim/50 bg-kraft col-span-3 space-y-2.5 rounded-md border p-8 backdrop-blur-md md:col-span-2"
    >
      <h3 class="font-video text-fg-1 text-xl">Design</h3>
      <ul class="list-[square] pl-8">
        <li>Figma</li>
        <li>Inkscape</li>
        <li>Aseprite</li>
        <li>Blender</li>
      </ul>
    </div>
  </div>
</div>

<enhanced:img
  src="/static/deco/44.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute top-[80px] right-[110px] left-0 -z-10 mx-auto w-72 lg:top-[100px]"
/>
<enhanced:img
  src="/static/deco/02.png?w=300;400"
  sizes="300px, (min-width:640px) 400px"
  alt=""
  class="absolute top-[540px] right-[900px] left-0 -z-10 mx-auto w-48"
/>
<enhanced:img
  src="/static/deco/06.png?w=300;400"
  sizes="300px, (min-width:640px) 400px"
  alt=""
  class="absolute top-[640px] right-0 left-[180px] -z-10 mx-auto w-48 lg:left-[850px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute top-[1000px] right-0 left-[200px] -z-10 mx-auto w-80 sm:left-[210px] lg:top-[940px]"
/>
<enhanced:img
  src="/static/deco/84.png?w=300;500"
  sizes="300px, (min-width:640px) 500px"
  alt=""
  class="absolute top-[2000px] right-[150px] left-0 -z-10 mx-auto w-72 sm:hidden"
/>
