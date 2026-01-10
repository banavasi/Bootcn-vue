---
"@bootcn-vue/cli": patch
---

fix: remove duplicate shebang causing CLI syntax error

The shebang (`#!/usr/bin/env node`) was being added twice - once in the source file and once by the tsup banner configuration. This caused an "Invalid or unexpected token" syntax error when users tried to run the CLI via `npx @bootcn-vue/cli@latest init`.

Fixed by removing the shebang from the source file (`src/index.ts`) and letting tsup's banner configuration handle it exclusively.
