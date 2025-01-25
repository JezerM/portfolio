import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { ViteToml } from "vite-plugin-toml";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), sveltekit(), ViteToml()],
});
