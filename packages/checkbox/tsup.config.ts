import { defineConfig } from "tsup";
import Vue from "unplugin-vue/esbuild";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false, // We'll generate declarations separately with vue-tsc
  clean: true,
  external: ["vue", "reka-ui", "@bootcn-vue/core", "bootstrap"],
  esbuildPlugins: [
    Vue({
      style: {
        // Inline all <style> tags
        preprocessLang: "scss",
      },
    }),
    {
      name: "ignore-scss-imports",
      setup(build) {
        // Mark .scss files as external so they're not bundled
        build.onResolve({ filter: /\.scss$/ }, () => ({
          external: true,
        }));
      },
    },
  ],
});
