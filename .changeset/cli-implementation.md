---
"@bootcn-vue/cli": minor
"@bootcn-vue/core": patch
"@bootcn-vue/buttons": patch
---

feat(cli): implement complete CLI with init and add commands

## CLI Features

### `bootcn-vue init`

- Detects Vue 3 + Vite projects automatically
- Detects package manager (pnpm/npm/yarn)
- Creates bootcn.config.json configuration
- Updates tsconfig.json with @/\* path aliases
- Updates vite.config.ts with path aliases
- Creates src/lib/utils.ts with cn() utility
- Creates src/components/ui/ directory
- Installs required dependencies (bootstrap, reka-ui, cva, clsx, tailwind-merge)

### `bootcn-vue add [component]`

- Copies component files from @bootcn-vue packages
- Transforms imports from @bootcn-vue/core to @/lib/utils
- Supports interactive mode and command-line arguments
- Components are immediately usable after copying

## Other Changes

- Updated all repository URLs to https://github.com/banavasi/Bootcn-vue.git
- Improved package descriptions for better discoverability
- Added comprehensive CLI documentation
