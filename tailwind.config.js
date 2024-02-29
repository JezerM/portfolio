import plugin from "./tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    colors: {
      dark: {
        DEFAULT: "#282828",
        "0h": "#1d2021",
        "0s": "#32302f",
        0: "#282828",
        1: "#3c3836",
        2: "#504945",
        3: "#665c54",
        4: "#7c6f64",
      },
      light: {
        DEFAULT: "#ebdbb2",
        "0h": "#f9f5d7",
        "0s": "#f2e5bc",
        0: "#fbf1c7",
        1: "#ebdbb2",
        2: "#d5c4a1",
        3: "#bdae93",
        4: "#a89984",
      },
      red: {
        fg: "#fb4934",
        bg: "#cc2410",
        "bg-light": "#cc241d",
        "fg-light": "#9d0006",
      },
      green: {
        bg: "#98971a",
        fg: "#b8bb26",
        "bg-light": "#98971a",
        "fg-light": "#79740e",
      },
      yellow: {
        bg: "#d79921",
        fg: "#fabd2f",
        "bg-light": "#d79921",
        "fg-light": "#b57614",
      },
      blue: {
        bg: "#458588",
        fg: "#83a598",
        "bg-light": "#458588",
        "fg-light": "#076678",
      },
      purple: {
        bg: "#b16286",
        fg: "#d3869b",
        "bg-light": "#b16286",
        "fg-light": "#8f3f71",
      },
      aqua: {
        bg: "#689d6a",
        fg: "#8ec07c",
        "bg-light": "#689d6a",
        "fg-light": "#427b58",
      },
      orange: {
        bg: "#d65d0e",
        fg: "#fe9019",
        "bg-light": "#d65d0e",
        "fg-light": "#af3a03",
      },
      gray: {
        bg: "#a89984",
        fg: "#928374",
        "bg-light": "#7c6f64",
        "fg-light": "#928374",
      },
      white: "#FFFFFF",
      black: "#000000",
      transparent: "#00000000",
      discord: "#5765f2",
      linkedin: "#0b66c2",
    },
    extend: {},
  },
  plugins: [plugin],
};
