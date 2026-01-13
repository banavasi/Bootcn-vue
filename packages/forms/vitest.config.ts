import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.spec.ts"],
  },
  resolve: {
    alias: {
      "@bootcn-vue/core": fileURLToPath(new URL("../core/src/index.ts", import.meta.url)),
      "@bootcn-vue/tooltip": fileURLToPath(new URL("../tooltip/src/index.ts", import.meta.url)),
    },
  },
});
