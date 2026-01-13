import { defineConfig } from "tsup";
import { unplugin } from "unplugin-vue/tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  external: ["vue", "@bootcn-vue/core", "reka-ui"],
  plugins: [unplugin()],
});
