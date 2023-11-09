<script lang="ts">
  import "../app.less";
  import type { LayoutData } from "./$types";
  export let data: LayoutData;

  let fadeIn = zoomOut;
  let fadeOut = zoomIn;

  let previous = data.pathname as string;
  let isInBlog = 0;
  $: {
    let pathname = data.pathname as string;
    if (pathname.startsWith("/blog") !== previous.startsWith("/blog")) {
      fadeIn = zoomOut;
      fadeOut = zoomIn;
      isInBlog++;
    } else {
      fadeIn = zoomNull;
      fadeOut = zoomNull;
    }
    previous = pathname;
  }
  function zoomNull(node: HTMLElement) {
    node.classList.remove("zoomIn");
    node.classList.remove("zoomOut");
    return {
      delay: 0,
      duration: 0,
    };
  }

  function zoomIn(_node: HTMLElement, _params: unknown) {
    return {
      delay: 0,
      duration: 1500,
    };
  }
  function zoomOut(_node: HTMLElement, _params: unknown) {
    return {
      delay: 250,
      duration: 1500,
    };
  }
  function endAnimation(ev: AnimationEvent) {
    if (
      ev.animationName == "topZoomShow" ||
      ev.animationName == "bottomZoomShow" ||
      ev.animationName == "noAnimation"
    ) {
      const target = ev.currentTarget as HTMLDivElement;
      target.className = "";
    }
  }
</script>

{#key isInBlog}
  <div
    on:animationend={endAnimation}
    in:fadeIn
    out:fadeOut
    on:introstart={(ev) => {
      if (previous.startsWith("/blog")) {
        ev.currentTarget.className = "bottomZoom show";
      } else {
        ev.currentTarget.className = "topZoom show";
      }
    }}
    on:outrostart={(ev) => {
      if (previous.startsWith("/blog")) {
        ev.currentTarget.className = "topZoom hide";
      } else {
        ev.currentTarget.className = "bottomZoom hide";
      }
    }}
  >
    <slot />
  </div>
{/key}
