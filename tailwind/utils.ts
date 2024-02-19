import type { PluginAPI } from "tailwindcss/types/config";

enum State {
  ZERO,
  WIDTH,
  MINUS,
  HUNDR,
}

type UnitType = "px" | "rem" | "em";

function getParsedValue(state: State, width: number, unitType: UnitType): string {
  if (state == State.ZERO) return "0";
  if (state == State.WIDTH) return `${width}${unitType}`;
  if (state == State.MINUS) return `calc(100% - ${width}${unitType})`;
  if (state == State.HUNDR) return "100%";
  return `${width}${unitType}`;
}

/**
 * Generates a clip-path that emulates a pixel border with multiple slopes.
 */
function generatePixelBorder(slopes: number, width: number, unitType: UnitType = "rem"): string {
  const initialStateX = [State.ZERO, State.MINUS, State.HUNDR, State.WIDTH];
  const endStateX = [State.WIDTH, State.HUNDR, State.MINUS, State.ZERO];
  const initialStateY = [State.WIDTH, State.ZERO, State.MINUS, State.HUNDR];
  const endStateY = [State.ZERO, State.WIDTH, State.HUNDR, State.MINUS];

  const pointArray: string[] = [];

  for (let i = 0; i < 4; i++) {
    let stateX = initialStateX[i];
    let stateY = initialStateY[i];

    let widthX = i % 2 == 0 ? 0 : width;
    let widthY = i % 2 == 0 ? width : 0;

    for (let j = 0; j < slopes * 2 + 1; j++) {
      const valueX = getParsedValue(stateX, widthX, unitType);
      const valueY = getParsedValue(stateY, widthY, unitType);
      pointArray.push(`${valueX} ${valueY}`);
      if (i % 2 == 0) {
        if (j == 0) {
          stateX = endStateX[i];
        } else if (j == slopes * 2 - 1) {
          stateY = endStateY[i];
        }
      } else {
        if (j == 0) {
          stateY = endStateY[i];
        } else if (j == slopes * 2 - 1) {
          stateX = endStateX[i];
        }
      }

      if (i % 2 == 0) {
        if (j % 2 == 0) {
          widthX += width / slopes;
        } else {
          widthY -= width / slopes;
        }
      } else {
        if ((j - 1) % 2 == 0) {
          widthX -= width / slopes;
        } else {
          widthY += width / slopes;
        }
      }
    }
  }
  const joined = pointArray.join(",");
  return `polygon(${joined})`;
}

export default function (api: PluginAPI) {
  api.addUtilities({
    ".pixel-border": {
      "clip-path": generatePixelBorder(1, 0.3, "rem"),
    },
  });
  api.addUtilities({
    ".pixel-border-2": {
      "clip-path": generatePixelBorder(2, 0.6, "rem"),
    },
  });
  api.addUtilities({
    ".pixel-border-3": {
      "clip-path": generatePixelBorder(3, 0.9, "rem"),
    },
  });
}
