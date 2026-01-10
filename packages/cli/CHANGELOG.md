# @bootcn-vue/cli

## 0.3.2

### Patch Changes

- [#9](https://github.com/banavasi/Bootcn-vue/pull/9) [`8532da9`](https://github.com/banavasi/Bootcn-vue/commit/8532da9f93ecb249649aa1b0672ff610b6131d38) Thanks [@banavasi](https://github.com/banavasi)! - docs: add comprehensive release process guide (RELEASE.md)

  Added detailed documentation explaining the automated Changesets workflow for creating releases. This guide helps developers understand how to properly version and publish packages.

## 0.3.1

### Patch Changes

- [`8480174`](https://github.com/banavasi/Bootcn-vue/commit/8480174f8caa0c4633ed7ca02129b5573b3c7519) Thanks [@banavasi](https://github.com/banavasi)! - fix: export cva and VariantProps from utils.ts

  The Button component imports `cva` and `VariantProps` which are transformed from `@bootcn-vue/core` to `@/lib/utils` during the `add` command. The `init` command now properly exports these from `utils.ts` by re-exporting from `class-variance-authority`.

  This fixes the runtime error:

  ```
  Uncaught SyntaxError: The requested module '/src/lib/utils.ts' does not provide an export named 'cva'
  ```

## 0.3.0

### Minor Changes

- [`99ed540`](https://github.com/banavasi/Bootcn-vue/commit/99ed5401615ae705bd8c12c636c6a2684e562958) Thanks [@banavasi](https://github.com/banavasi)! - feat: add remove command to clean up components and configuration

  Added a new `remove` command that allows you to:

  **Remove specific components:**

  ```bash
  bootcn-vue remove button
  ```

  **Remove all bootcn-vue setup:**

  ```bash
  bootcn-vue remove --all
  ```

  The `--all` flag removes:
  - All components in `src/components/ui/`
  - `src/lib/utils.ts` (and `lib/` directory if empty)
  - `bootcn.config.json`
  - Prompts to show uninstall command for dependencies

  The command includes safety confirmations and automatically detects installed components when no arguments are provided.

## 0.2.4

### Patch Changes

- [`60a55d4`](https://github.com/banavasi/Bootcn-vue/commit/60a55d43b4e818694edab87bc81cea38454b4d33) Thanks [@banavasi](https://github.com/banavasi)! - fix: install component packages as dev dependencies during init

  The `add` command was failing because it couldn't find source files from `@bootcn-vue/buttons` and `@bootcn-vue/forms` packages. The `init` command now installs these packages as dev dependencies, allowing the `add` command to copy component source files from node_modules.

  This enables the intended workflow:
  1. `bootcn-vue init` - Sets up project and installs component packages as dev deps
  2. `bootcn-vue add button` - Copies source files from @bootcn-vue/buttons to your project

## 0.2.3

### Patch Changes

- [`c538960`](https://github.com/banavasi/Bootcn-vue/commit/c538960cc1e3e72d5c06b274b049326f02765643) Thanks [@banavasi](https://github.com/banavasi)! - fix: remove duplicate shebang causing CLI syntax error

  The shebang (`#!/usr/bin/env node`) was being added twice - once in the source file and once by the tsup banner configuration. This caused an "Invalid or unexpected token" syntax error when users tried to run the CLI via `npx @bootcn-vue/cli@latest init`.

  Fixed by removing the shebang from the source file (`src/index.ts`) and letting tsup's banner configuration handle it exclusively.

## 0.2.2

### Patch Changes

- [`72123e6`](https://github.com/banavasi/Bootcn-vue/commit/72123e6a0ae5efc14ad48ff16e26708183d0d903) Thanks [@banavasi](https://github.com/banavasi)! - chore: trigger npm publish with updated credentials

  Update all packages to test npm publish with new granular access token.

## 0.2.1

### Patch Changes

- [`b2bd9d2`](https://github.com/banavasi/Bootcn-vue/commit/b2bd9d25f750b7649792c334d91aa850ed9e400e) Thanks [@banavasi](https://github.com/banavasi)! - docs: add comprehensive README files and package metadata

  ## Documentation Improvements

  ### README Files
  - Added comprehensive README for @bootcn-vue/core with usage examples
  - Added comprehensive README for @bootcn-vue/buttons with all variants and props
  - Added README for @bootcn-vue/forms with roadmap and planned components

  ### Package Metadata
  - Added homepage URLs pointing to GitHub Pages (https://banavasi.github.io/Bootcn-vue/)
  - Added bugs URL for issue tracking
  - @bootcn-vue/buttons homepage points directly to Button docs in Storybook

  This ensures npm packages have proper documentation and links to:
  - Interactive Storybook documentation
  - GitHub repository
  - Issue tracker

## 0.2.0

### Minor Changes

- [`28462af`](https://github.com/banavasi/Bootcn-vue/commit/28462afa6d4c12c41581f98063747b26f7199a7b) Thanks [@banavasi](https://github.com/banavasi)! - feat(cli): implement complete CLI with init and add commands

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

### Patch Changes

- [`28462af`](https://github.com/banavasi/Bootcn-vue/commit/28462afa6d4c12c41581f98063747b26f7199a7b) Thanks [@banavasi](https://github.com/banavasi)! - chore(ci): optimize CI/CD workflows for monorepo

  ## CI/CD Improvements

  ### GitHub Actions CI
  - Added fetch-depth: 0 for proper Turbo caching
  - Turbo automatically uses smart caching based on git history
  - Only rebuilds packages that have changed

  ### GitHub Actions Deploy Docs
  - Added path filters to only trigger when relevant files change
  - Deploys only when apps/playground/ or packages/ change
  - Saves unnecessary Storybook builds

  ### GitHub Actions Release
  - Changesets automatically handles only publishing changed packages
  - Proper git history for version bumping
