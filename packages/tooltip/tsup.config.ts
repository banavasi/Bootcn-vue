import { defineConfig } from "tsup";
import Vue from "unplugin-vue/esbuild";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false, // Vue SFCs don't work well with tsup dts generation
  clean: true,
  external: ["vue", "reka-ui", "@bootcn-vue/core", "bootstrap"],
  esbuildPlugins: [Vue()],
});
