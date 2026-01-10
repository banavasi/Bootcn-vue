---
"@bootcn-vue/cli": patch
---

fix: install component packages as dev dependencies during init

The `add` command was failing because it couldn't find source files from `@bootcn-vue/buttons` and `@bootcn-vue/forms` packages. The `init` command now installs these packages as dev dependencies, allowing the `add` command to copy component source files from node_modules.

This enables the intended workflow:

1. `bootcn-vue init` - Sets up project and installs component packages as dev deps
2. `bootcn-vue add button` - Copies source files from @bootcn-vue/buttons to your project
