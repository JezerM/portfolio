import typography from "@tailwindcss/typography";
import plugin from "./tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts,toml}"],
  darkMode: "class",
  theme: {
    colors: {
      bg: {
        dim: "#1B1B1B",
        0: "#282828",
        1: "#32302F",
        3: "#45403D",
        5: "#5A524C",
        "status-line": {
          2: "#3A3735",
          3: "#504945",
        },
      },
      fg: {
        0: "#D4BE98",
        1: "#DDC7A1",
      },
      grey: {
        0: "#7C6F64",
        1: "#928374",
        2: "#A89984",
      },
      red: "#EA6962",
      orange: "#E78A4E",
      yellow: "#D8A657",
      green: "#A9B665",
      aqua: "#89B482",
      blue: "#7DAEA3",
      purple: "#D3869B",

      white: "#FFFFFF",
      black: "#000000",
      transparent: "#00000000",
    },
    fontFamily: {
      regular: ["MatrixSans", "Menlo", "monospace", "system-ui"],
      print: ["MatrixSans Print", "Menlo", "monospace", "system-ui"],
      raster: ["MatrixSans Raster", "Menlo", "monospace", "system-ui"],
      screen: ["MatrixSans Screen", "Menlo", "monospace", "system-ui"],
      video: ["MatrixSans Video", "Menlo", "monospace", "system-ui"],
    },
    extend: {
      backgroundImage: {
        noise: "url('/deco/noise.png')",
      },
      dropShadow: {
        glow: "0 0 25px currentcolor",
      },
    },
  },
  plugins: [typography, plugin],
};
