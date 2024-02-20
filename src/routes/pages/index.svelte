<script lang="ts">
  import LanguageIcons from "$lib/LanguageIcons.svelte";
  import { _ } from "svelte-i18n";
</script>

<div>
  <div class="mb-6 flex flex-col items-center justify-start gap-6 md:flex-row">
    <div
      class="bg-purple-fg-light p-2 [mask-image:url('/Circle.png')] [mask-repeat:no-repeat] [mask-size:100%] dark:bg-purple-fg"
    >
      <enhanced:img
        class="block size-44 max-w-none [mask-image:url('/Circle.png')] [mask-size:100%]"
        src="/static/JezerPicture.png"
        alt="JezerM anime"
      />
    </div>
    <div id="infoSubContainer">
      <h2 class="mb-5 text-2xl font-bold">Jezer Mejía</h2>
      <p class="my-4">
        {$_("home.info_1")}<br />
        {$_("home.info_2")}<br />
        {$_("home.info_3")}
      </p>
      <LanguageIcons />
    </div>
  </div>

  <div>
    <h2 class="mb-5 text-2xl font-bold">{$_("home.about_title")}</h2>
    <p class="my-4">
      {$_("home.about_1")}
    </p>
    <p class="my-4">
      {$_("home.about_2")}
    </p>
    <p class="my-4">
      {$_("home.about_3")}
    </p>
  </div>
</div>
