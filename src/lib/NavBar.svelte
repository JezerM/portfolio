<script lang="ts">
  import { base } from "$app/paths";
  import ImgIcon from "$lib/ImgIcon.svelte";
</script>

<nav class="navBar">
  <ul id="navLinks">
    <li class="navElement blueLink">
      <a href="{base}/">
        <ImgIcon src="{base}/icons/Home.png" color="#83a598" />
        <span>Home</span>
      </a>
    </li>
    <li class="navElement purpleLink">
      <a href="{base}/projects">
        <ImgIcon src="{base}/icons/Folder.png" color="#d3869b" />
        <span>My projects</span>
      </a>
    </li>
    <li class="navElement aquaLink">
      <a href="{base}/contact">
        <ImgIcon src="{base}/icons/Contact.png" color="#8EC07C" />
        <span>Contact me</span>
      </a>
    </li>
  </ul>

  <ul id="socialLinks">
    <li class="navElement">
      <a href="http://discordapp.com/users/530819150969438208" target="_blank">
        <ImgIcon src="{base}/icons/Discord.png" color="#5765F2" />
      </a>
    </li>
    <li class="navElement">
      <a href="https://github.com/JezerM" target="_blank">
        <ImgIcon src="{base}/icons/GitHub.png" color="#FFFFFF" />
      </a>
    </li>
    <li class="navElement">
      <a href="https://www.linkedin.com/in/jezer-josué-mejía-otero-111b39227/" target="_blank">
        <ImgIcon src="{base}/icons/LinkedIn.png" color="#0B66C2" />
      </a>
    </li>
  </ul>
</nav>

<style>
  nav.navBar {
    background-color: #3c3836;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  nav.navBar > ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  #socialLinks {
    gap: 0em;
  }

  #socialLinks > .navElement :global(div.icon) {
    width: 2em;
    height: 2em;
    image-rendering: pixelated;
  }

  .navElement > a {
    display: flex;
    align-items: center;
    gap: 0.5em;
    padding: 1em 1.25em;
    background-color: transparent;
  }
  .navElement > a:hover,
  .navElement > a:focus {
    background-color: #504945;
  }
  .navElement > a:visited {
    color: inherit;
  }

  #socialLinks > .navElement > a {
    padding: 0em 0.8em;
    height: 100%;
  }

  .blueLink {
    color: #83a598;
  }
  .purpleLink {
    color: #d3869b;
  }
  .aquaLink {
    color: #8ec07c;
  }
</style>
