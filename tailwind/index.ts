import plugin from "tailwindcss/plugin";
import utils from "./utils";

export default plugin(
  (api) => {
    utils(api);
  },
  {
    // theme,
  }
);
