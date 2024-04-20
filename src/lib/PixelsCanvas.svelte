<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { Application, Container, Graphics, GraphicsContext, Rectangle } from "pixi.js";
  import { browser } from "$app/environment";

  let divElement: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  const app = new Application();

  const pixelSize = 24;

  const pixelBlank = new GraphicsContext().rect(0, 0, pixelSize, pixelSize).fill("transparent");
  const pixelFilled = new GraphicsContext().rect(0, 0, pixelSize, pixelSize).fill("#3c3836");

  function getPixelsQuantity(screen: Rectangle) {
    const w = Math.floor(screen.width / pixelSize);
    const h = Math.floor(screen.height / pixelSize);
    const pixelsQuantity = Math.floor(w * h);
    return pixelsQuantity;
  }

  const pool: Graphics[] = [];

  function createGraphic(context: GraphicsContext) {
    let graphic = pool.pop();
    if (!graphic) {
      graphic = new Graphics(context);
    }
    graphic.context = context;
    return graphic;
  }

  function createPixelsGrid(quantity: number, screen: Rectangle, context: GraphicsContext) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < quantity; i++) {
      let pixel = createGraphic(context);
      pixel.x = x;
      pixel.y = y;
      app.stage.addChild(pixel);

      x += pixelSize;
      if (x >= screen.width - pixelSize) {
        x = 0;
        y += pixelSize;
      }
    }
  }

  let interval = 0;

  function clearChildren(container: Container) {
    const children = container.removeChildren() as Graphics[];
    for (let child of children) {
      // child.clear();
      pool.push(child);
    }
    children.length = 0;
  }

  function executeInterval(quantity: number, context: GraphicsContext) {
    let sets = 0;
    interval = window.setInterval(() => {
      let count = 0;
      for (const c of app.stage.children) {
        const child = c as Graphics;
        const random = Math.random() < 0.5 + sets / 10;

        if (random) {
          child.context = context;
        }
        if (child.context == context) {
          count++;
        }
      }

      sets++;
      app.render();
      if (count == quantity) {
        clearInterval(interval);
        clearChildren(app.stage);
      }
    }, 50);
  }

  export function showPixels() {
    if (!app.renderer) return;
    if (interval) clearInterval(interval);

    const quantity = getPixelsQuantity(app.screen);

    clearChildren(app.stage);
    createPixelsGrid(quantity, app.screen, pixelBlank);

    app.render();

    executeInterval(quantity, pixelFilled);
  }

  export function hidePixels() {
    if (!app.renderer) return;
    if (interval) clearInterval(interval);

    const quantity = getPixelsQuantity(app.screen);

    clearChildren(app.stage);
    createPixelsGrid(quantity, app.screen, pixelFilled);

    app.render();

    executeInterval(quantity, pixelBlank);
  }

  onMount(async () => {
    try {
      await app.init({
        canvas: canvas,
        backgroundAlpha: 0,
        resizeTo: divElement,
        antialias: false,
        autoStart: false,
        clearBeforeRender: false,
        eventMode: "none",
      });
      app.stage.interactive = false;
      app.stage.interactiveChildren = false;
    } catch (err) {
      console.error(err);
      dispatch("init", false);

      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        app.resize();
      });
    });

    resizeObserver.observe(divElement);

    dispatch("init", true);
  });

  onDestroy(() => {
    if (browser) {
      app.destroy(true, { children: true });
      for (const graphic of pool) {
        graphic.destroy();
      }
    }
  });
</script>

<div bind:this={divElement} class="pointer-events-none absolute left-0 top-0 z-50 size-full">
  <canvas class="size-full" bind:this={canvas} />
</div>
