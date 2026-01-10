# @bootcn-vue/cli

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
