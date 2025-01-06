<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";

  interface Props {
    data: LayoutData;
    children?: Snippet;
  }

  let { data, children }: Props = $props();

  let fadeIn = $state(zoomOut);
  let fadeOut = $state(zoomIn);

  let previous = $state(data.pathname as string);
  let isInBlog = $state(0);
  function zoomNull(node: HTMLElement) {
    node.classList.remove("zoomIn");
    node.classList.remove("zoomOut");
    return {
      delay: 0,
      duration: 0,
    };
  }

  function zoomIn(_node: HTMLElement) {
    return {
      delay: 0,
      duration: 1500,
    };
  }
  function zoomOut(_node: HTMLElement) {
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
  $effect(() => {
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
  });
</script>

{#key isInBlog}
  <div
    class="relative min-h-[100vh] overflow-hidden"
    onanimationend={endAnimation}
    in:fadeIn
    out:fadeOut
    onintrostart={(ev) => {
      if (previous.startsWith("/blog")) {
        ev.currentTarget.className = "bottomZoom show";
      } else {
        ev.currentTarget.className = "topZoom show";
      }
    }}
    onoutrostart={(ev) => {
      if (previous.startsWith("/blog")) {
        ev.currentTarget.className = "topZoom hide";
      } else {
        ev.currentTarget.className = "bottomZoom hide";
      }
    }}
  >
    {@render children?.()}
  </div>
{/key}
