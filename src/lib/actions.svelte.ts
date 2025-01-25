import type { Action } from "svelte/action";

export const pushOnClick: Action<HTMLElement, number | undefined> = (node, ratio: number = 2) => {
  let rotate = $state({ x: 0, y: 0 });
  let touching = $state(false);

  const controller = new AbortController();

  function onMouseMove(ev: MouseEvent) {
    if (!touching) {
      rotate = { x: 0, y: 0 };
      return;
    }

    const target = ev.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const posX = ev.clientX - rect.x;
    const posY = ev.clientY - rect.y;

    const middleX = rect.width / 2;
    const middleY = rect.height / 2;

    const y = ((posX - middleX) / middleX) * ratio;
    const x = -((posY - middleY) / middleY) * ratio;

    rotate = { x, y };
  }

  $effect(() => {
    node.addEventListener(
      "mousedown",
      (ev) => {
        touching = true;
        onMouseMove(ev);
      },
      { signal: controller.signal }
    );
    node.addEventListener(
      "mouseup",
      (ev) => {
        touching = false;
        onMouseMove(ev);
      },
      { signal: controller.signal }
    );
    node.addEventListener(
      "mouseleave",
      (ev) => {
        touching = false;
        onMouseMove(ev);
      },
      { signal: controller.signal }
    );
    node.addEventListener(
      "mousemove",
      (ev) => {
        onMouseMove(ev);
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  });

  $effect(() => {
    node.style.transform = `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`;
  });
};
