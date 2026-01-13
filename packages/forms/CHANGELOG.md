# @bootcn-vue/forms

## 0.6.0

### Minor Changes

- [#16](https://github.com/banavasi/Bootcn-vue/pull/16) [`3211f80`](https://github.com/banavasi/Bootcn-vue/commit/3211f80a7300c8b6871a939f28125c41cbabebdd) Thanks [@banavasi](https://github.com/banavasi)! - Add FieldSSN component for Social Security Number input with auto-masking
  - New FieldSSN field component with SSN masking (###-##-####)
  - Supports "saved" state for backend-stored SSNs (displays placeholder text and becomes readonly)
  - Auto-formats SSN input with dashes
  - Includes comprehensive Storybook documentation with 11 stories
  - Full TypeScript support with proper type declarations

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

- Updated dependencies [[`6c90d79`](https://github.com/banavasi/Bootcn-vue/commit/6c90d79fcb2988264f7c42ab893f1a9f68394e57)]:
  - @bootcn-vue/tooltip@0.2.1

## 0.5.0

### Minor Changes

- [#14](https://github.com/banavasi/Bootcn-vue/pull/14) [`4d1c477`](https://github.com/banavasi/Bootcn-vue/commit/4d1c47749801a470336bc6b3e41aa9440316319c) Thanks [@banavasi](https://github.com/banavasi)! - Add InputPassword primitive component with show/hide toggle

- [`fa3e378`](https://github.com/banavasi/Bootcn-vue/commit/fa3e378b1637144fc5bd879bfcfe3ce53dad00f4) Thanks [@banavasi](https://github.com/banavasi)! - Add InputMasked and InputNumericRange primitive components

  **InputMasked**
  - Pattern-based input masking with customizable tokens (#, %, @, \*)
  - Auto-formats input as user types (e.g., phone numbers, dates, SSN)
  - Returns unmasked value via v-model
  - Prevents invalid characters from appearing
  - Enforces maximum length based on mask pattern
  - Includes comprehensive Storybook stories

  **InputNumericRange**
  - Numeric input with min/max validation
  - Supports integer-only or decimal inputs
  - Configurable prefix/suffix (e.g., $, %, kg)
  - Real-time character validation via beforeinput
  - Auto-clamps values to range on blur
  - Includes comprehensive Storybook stories for percentage, rating, price, weight, and age inputs

## 0.4.0

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

- [#13](https://github.com/banavasi/Bootcn-vue/pull/13) [`3855991`](https://github.com/banavasi/Bootcn-vue/commit/38559916a1803dad3998003094fd42d8337a3fd6) Thanks [@banavasi](https://github.com/banavasi)! - Add primitives architecture with BaseFieldProps interface
  - Add primitive components: InputRoot, InputLabel, InputField, InputError, InputHelp
  - Add BaseFieldProps interface for consistent field component props
  - Add context-based architecture for ARIA attributes
  - Fix TypeScript imports to use type-only imports
  - Add label spacing (mb-space-xxs) for better visual hierarchy

- [#13](https://github.com/banavasi/Bootcn-vue/pull/13) [`4ae5802`](https://github.com/banavasi/Bootcn-vue/commit/4ae580250e01d546ef9710a57fa6c2be33d5ee07) Thanks [@banavasi](https://github.com/banavasi)! - Add tooltip and optional badge support to InputLabel
  - Add `tooltipMessage` prop to display tooltip next to label with info icon
  - Add `isOptional` and `optionalText` props to show optional badge
  - Update BaseFieldProps interface with new tooltip/optional props
  - Integrate @bootcn-vue/tooltip package as dependency
  - Tooltip positioned to the right with 300ms delay
  - Optional badge uses Bootstrap light badge styling

- [#13](https://github.com/banavasi/Bootcn-vue/pull/13) [`4993a5f`](https://github.com/banavasi/Bootcn-vue/commit/4993a5f61b724da775e29ccfc93f5eb6d693e8fc) Thanks [@banavasi](https://github.com/banavasi)! - # InputLabel Enhancements
  - Add `tooltipPosition` prop for positioning tooltip (top, bottom, left, right)
  - Add `iconPosition` prop for positioning tooltip icon (before, after)
  - Add `#icon` slot for custom tooltip trigger icons
  - Add `#optional-badge` slot for custom optional indicator content
  - Create comprehensive INPUT_LABEL_GUIDE.md documentation
  - Add 5 new Storybook stories demonstrating new features

### Patch Changes

- [#13](https://github.com/banavasi/Bootcn-vue/pull/13) [`4993a5f`](https://github.com/banavasi/Bootcn-vue/commit/4993a5f61b724da775e29ccfc93f5eb6d693e8fc) Thanks [@banavasi](https://github.com/banavasi)! - # InputField Border Fixes
  - Enforce square corners (`border-radius: 0`) on all input fields
  - Add thick error border (`border-bottom-width: 0.25rem`) for invalid inputs
  - Extract styles to external CSS file to fix tsup build issues with sourcemaps
  - Export InputField.css in package.json

- Updated dependencies [[`4993a5f`](https://github.com/banavasi/Bootcn-vue/commit/4993a5f61b724da775e29ccfc93f5eb6d693e8fc), [`7d99bf1`](https://github.com/banavasi/Bootcn-vue/commit/7d99bf17ed7655317be10791517a17d25eb01c29), [`b973a1c`](https://github.com/banavasi/Bootcn-vue/commit/b973a1c0a63bb579eb6d5d480a6bdea9ea38e894)]:
  - @bootcn-vue/tooltip@0.2.0
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

- Updated dependencies [[`28462af`](https://github.com/banavasi/Bootcn-vue/commit/28462afa6d4c12c41581f98063747b26f7199a7b)]:
  - @bootcn-vue/core@0.2.0

## 0.1.0

### Patch Changes

- Updated dependencies [[`d5343a4`](https://github.com/banavasi/reka-bootstrap/commit/d5343a41182545700297e2712b63021331f0d1b9)]:
  - @bootcn-vue/core@0.1.0
