<script lang="ts">
  import Discord from "$lib/icons/discord.svelte";
  import Github from "$lib/icons/github.svelte";
  import KoFi from "$lib/icons/ko-fi.svelte";
  import Linkedin from "$lib/icons/linkedin.svelte";
  import Paypal from "$lib/icons/paypal.svelte";
  import { Mail, type Icon as IconType } from "lucide-svelte";
</script>

{#snippet contactIcon(url: string, label: string, Icon: typeof IconType)}
  <a
    href={url}
    class="rounded-md border border-bg-5/50 bg-bg-dim/50 p-2 backdrop-blur-md transition-colors hover:border-bg-5 hover:bg-bg-dim hover:text-orange focus:border-bg-5 focus:text-orange"
    title={label}
    target="_blank"
  >
    <Icon class="relative h-6 w-6" />
    <span class="sr-only">{label}</span>
  </a>
{/snippet}

<div class="flex flex-row gap-2">
  {@render contactIcon("https://github.com/JezerM", "GitHub", Github)}
  {@render contactIcon(
    "https://www.linkedin.com/in/jezer-josué-mejía-otero-111b39227/",
    "LinkedIn",
    Linkedin
  )}
  {@render contactIcon("http://discordapp.com/users/530819150969438208", "Discord", Discord)}
  {@render contactIcon("mailto:jezer.mejia@icloud.com", "Email", Mail)}
  {@render contactIcon("https://ko-fi.com/jezerm", "Ko-fi", KoFi)}
  {@render contactIcon("https://paypal.me/JezerM09", "Paypal", Paypal)}
</div>
