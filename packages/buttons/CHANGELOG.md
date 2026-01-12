# @bootcn-vue/buttons

## 0.4.0

### Patch Changes

- Updated dependencies [[`4993a5f`](https://github.com/banavasi/Bootcn-vue/commit/4993a5f61b724da775e29ccfc93f5eb6d693e8fc), [`7d99bf1`](https://github.com/banavasi/Bootcn-vue/commit/7d99bf17ed7655317be10791517a17d25eb01c29)]:
  - @bootcn-vue/core@0.4.0

## 0.2.2

### Patch Changes

- [`72123e6`](https://github.com/banavasi/Bootcn-vue/commit/72123e6a0ae5efc14ad48ff16e26708183d0d903) Thanks [@banavasi](https://github.com/banavasi)! - chore: trigger npm publish with updated credentials

  Update all packages to test npm publish with new granular access token.

- Updated dependencies [[`72123e6`](https://github.com/banavasi/Bootcn-vue/commit/72123e6a0ae5efc14ad48ff16e26708183d0d903)]:
  - @bootcn-vue/core@0.2.2

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

- Updated dependencies [[`b2bd9d2`](https://github.com/banavasi/Bootcn-vue/commit/b2bd9d25f750b7649792c334d91aa850ed9e400e)]:
  - @bootcn-vue/core@0.2.1

## 0.2.0

### Patch Changes

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

- Updated dependencies [[`28462af`](https://github.com/banavasi/Bootcn-vue/commit/28462afa6d4c12c41581f98063747b26f7199a7b)]:
  - @bootcn-vue/core@0.2.0

## 0.1.0

### Minor Changes

- [`d5343a4`](https://github.com/banavasi/reka-bootstrap/commit/d5343a41182545700297e2712b63021331f0d1b9) Thanks [@banavasi](https://github.com/banavasi)! - Initial release of bootcn-vue packages

  ## @bootcn-vue/core
  - `cn()` utility function for merging class names (clsx + tailwind-merge)
  - Re-exports `cva` and `VariantProps` from class-variance-authority

  ## @bootcn-vue/buttons
  - Button component with Bootstrap 5 styling
  - 17 variants (8 solid, 8 outline, 1 link)
  - 3 sizes (sm, md, lg)
  - Loading state with spinner
  - Composition support via `asChild` prop (reka-ui Primitive)

### Patch Changes

- Updated dependencies [[`d5343a4`](https://github.com/banavasi/reka-bootstrap/commit/d5343a41182545700297e2712b63021331f0d1b9)]:
  - @bootcn-vue/core@0.1.0
