<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { Application, Container, Graphics, GraphicsContext, Rectangle } from "pixi.js";
  import { browser } from "$app/environment";
  import { darkMode } from "$lib/dark-mode";
  import { prefersReducedMotion } from "$lib/reduced-motion";
  import { get } from "svelte/store";

  let divElement: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  const app = new Application();

  const container = new Container({
    isRenderGroup: true, // this containers transform is now handled on the GPU!
  });

  const pixelSize = 24;

  /**
   * Draws a single pixel with the specified color
   * @param context Context to draw on
   * @param color Color to set on context
   */
  function drawSingleColorPixel(context: GraphicsContext, color: string) {
    context.clear().rect(0, 0, pixelSize, pixelSize).fill(color);
  }

  const pixelBlank = new GraphicsContext();
  const pixelFilled = new GraphicsContext();
  drawSingleColorPixel(pixelBlank, "transparent");
  drawSingleColorPixel(pixelFilled, "#3c3836");

  const dispatch = createEventDispatcher();

  /**
   * Gets pixels quantity to fit in screen
   */
  function getPixelsQuantity(screen: Rectangle) {
    const w = Math.floor(screen.width / pixelSize);
    const h = Math.floor(screen.height / pixelSize);
    const pixelsQuantity = Math.floor(w * h);
    return pixelsQuantity;
  }

  const pool: Graphics[] = [];

  /**
   * Creates a new Graphic ore returns an existing one from a pool
   * @param context GraphicsContext to apply to Graphic
   */
  function createGraphic(context: GraphicsContext) {
    let graphic = pool.pop();
    if (!graphic) {
      graphic = new Graphics(context);
    }
    graphic.context = context;
    return graphic;
  }

  /**
   * Creates a Grid of pixels with the specified quantity
   * @param quantity Quantity of pixels to draw
   * @param screen The canvas rectangle
   * @param context GraphicsContext to use for each pixel
   */
  function createPixelsGrid(quantity: number, screen: Rectangle, context: GraphicsContext) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < quantity; i++) {
      let pixel = createGraphic(context);
      pixel.x = x;
      pixel.y = y;
      container.addChild(pixel);

      x += pixelSize;
      if (x >= screen.width - pixelSize) {
        x = 0;
        y += pixelSize;
      }
    }
  }

  let interval = 0;

  /**
   * Clear all children on the specified container
   */
  function clearChildren(container: Container) {
    const children = container.removeChildren() as Graphics[];
    for (let child of children) {
      // child.clear();
      pool.push(child);
    }
    children.length = 0;
  }

  /**
   * Executes a interval that will update the Canvas each 50ms until completed
   * @param quantity Quantity of pixels to render
   * @param context GraphicsContext to use for each pixel
   */
  function executeInterval(quantity: number, context: GraphicsContext) {
    let sets = 0;
    interval = window.setInterval(() => {
      let count = 0;
      for (const c of container.children) {
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
        clearChildren(container);
      }
    }, 50);
  }

  export function showPixels() {
    if (!app.renderer) return;
    if (interval) clearInterval(interval);

    const quantity = getPixelsQuantity(app.screen);

    clearChildren(container);
    createPixelsGrid(quantity, app.screen, pixelBlank);

    app.render();

    executeInterval(quantity, pixelFilled);
  }

  export function hidePixels() {
    if (!app.renderer) return;
    if (interval) clearInterval(interval);

    const quantity = getPixelsQuantity(app.screen);

    clearChildren(container);
    createPixelsGrid(quantity, app.screen, pixelFilled);

    app.render();

    executeInterval(quantity, pixelBlank);
  }

  onMount(async () => {
    if (get(prefersReducedMotion)) {
      return;
    }

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

      container.destroy();
      return;
    }

    app.stage.addChild(container);

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        app.resize();
      });
    });

    resizeObserver.observe(divElement);

    darkMode.subscribe((dark) => {
      if (!dark) drawSingleColorPixel(pixelFilled, "#ebdbb2");
      else drawSingleColorPixel(pixelFilled, "#3c3836");
    });

    dispatch("init", true);
  });

  onDestroy(() => {
    if (browser && app) {
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
