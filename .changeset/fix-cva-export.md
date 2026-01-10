---
"@bootcn-vue/cli": patch
---

fix: export cva and VariantProps from utils.ts

The Button component imports `cva` and `VariantProps` which are transformed from `@bootcn-vue/core` to `@/lib/utils` during the `add` command. The `init` command now properly exports these from `utils.ts` by re-exporting from `class-variance-authority`.

This fixes the runtime error:

```
Uncaught SyntaxError: The requested module '/src/lib/utils.ts' does not provide an export named 'cva'
```
