import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { ViteToml } from "vite-plugin-toml";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit(), ViteToml()],
});
