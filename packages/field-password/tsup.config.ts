import { defineConfig } from "tsup";
import Vue from "unplugin-vue/esbuild";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  clean: true,
  external: [
    "vue",
    "reka-ui",
    "@bootcn-vue/core",
    "@bootcn-vue/forms",
    "@bootcn-vue/tooltip",
    "bootstrap",
  ],
  esbuildPlugins: [Vue()],
});
