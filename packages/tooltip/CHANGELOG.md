# @bootcn-vue/tooltip

## 0.2.2

### Patch Changes

- [#22](https://github.com/banavasi/Bootcn-vue/pull/22) [`e140184`](https://github.com/banavasi/Bootcn-vue/commit/e140184679876cbef4ddff5657420241d2790bea) Thanks [@banavasi](https://github.com/banavasi)! - update pnpm-lock.yaml and enhance forms documentation

  \- Updated pnpm-lock.yaml to reflect new versions for dependencies including vite and unplugin-vue.

  \- Enhanced forms README.md with import options for individual primitives and tooltip styles requirements.

  \- Updated forms index.ts to export individual primitives for granular imports.

## 0.2.1

### Patch Changes

- [#18](https://github.com/banavasi/Bootcn-vue/pull/18) [`6c90d79`](https://github.com/banavasi/Bootcn-vue/commit/6c90d79fcb2988264f7c42ab893f1a9f68394e57) Thanks [@banavasi](https://github.com/banavasi)! - docs: comprehensive documentation updates for all packages
  - Added detailed installation instructions (CLI + direct)
  - Added 8+ usage examples per component
  - Added complete API reference (props, events, slots)
  - Added accessibility guidelines and WCAG compliance details
  - Added form integration examples (VeeValidate, Zod)
  - Added TypeScript support documentation
  - Updated Storybook introduction with package creation guide
  - Updated main README with enhanced quick start and roadmap

## 0.2.0

### Minor Changes

- [#13](https://github.com/banavasi/Bootcn-vue/pull/13) [`4993a5f`](https://github.com/banavasi/Bootcn-vue/commit/4993a5f61b724da775e29ccfc93f5eb6d693e8fc) Thanks [@banavasi](https://github.com/banavasi)! - # Enhanced Tooltip Features

  ## Tooltip Package
  - Add `htmlContent` prop to TooltipContent for rendering HTML content
  - Add `bgColor` prop for custom background colors (Bootstrap classes or hex colors)
  - Add `textColor` prop for custom text colors (Bootstrap classes or hex colors)
  - Support both Bootstrap utility classes (e.g., `bg-primary`, `text-white`) and custom colors (e.g., `#ff0000`)

  ## Forms Package
  - Add `tooltipHtmlContent` prop to InputLabel for HTML tooltip content
  - Add `tooltipBgColor` prop to InputLabel for custom tooltip background colors
  - Add `tooltipTextColor` prop to InputLabel for custom tooltip text colors
  - Fix InputLabel import path (use `../context` instead of `../types`)
  - Add 4 new Storybook stories demonstrating enhanced tooltip features:
    - TooltipWithHtmlContent
    - TooltipWithCustomColors
    - TooltipWithCustomHexColors
    - TooltipHtmlWithFormatting

  ## Core Package
  - Add RDS color system with 8 custom colors (light-1 through light-5, dark-1 through dark-3)
  - Integrate RDS colors with Bootstrap color maps for automatic utility generation
  - Add comprehensive color documentation and Storybook examples

- [#13](https://github.com/banavasi/Bootcn-vue/pull/13) [`b973a1c`](https://github.com/banavasi/Bootcn-vue/commit/b973a1c0a63bb579eb6d5d480a6bdea9ea38e894) Thanks [@banavasi](https://github.com/banavasi)! - Initial release of tooltip component with Bootstrap 5 styling
  - Implement Tooltip, TooltipTrigger, and TooltipContent components using Reka UI
  - Add Bootstrap 5 tooltip classes (bs-tooltip-top/right/bottom/left)
  - Support all placement options (top, right, bottom, left)
  - Include proper ARIA attributes for accessibility
  - Keyboard navigation support
  - Customizable delay duration
  - Package built with tsup and unplugin-vue

### Patch Changes

- Updated dependencies [[`4993a5f`](https://github.com/banavasi/Bootcn-vue/commit/4993a5f61b724da775e29ccfc93f5eb6d693e8fc), [`7d99bf1`](https://github.com/banavasi/Bootcn-vue/commit/7d99bf17ed7655317be10791517a17d25eb01c29)]:
  - @bootcn-vue/core@0.4.0

## 0.1.0

### Minor Changes

- Initial release of tooltip component with Bootstrap 5 styling and Reka UI primitives
- Supports all Bootstrap tooltip placements (top, right, bottom, left)
- Accessible with keyboard navigation and ARIA attributes
- Composable API for flexible usage
