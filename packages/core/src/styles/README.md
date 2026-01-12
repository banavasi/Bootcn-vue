# RDS Design System Styles

Rocket Design System (RDS) utilities for consistent spacing and colors across your application.

## Contents

- [Spacing System](#spacing-system)
- [Color System](#color-system)

---

## Spacing System

### Overview

The RDS spacing system provides a semantic spacing scale that extends Bootstrap's default spacing utilities. These classes follow Bootstrap's naming conventions but use semantic size names.

## Spacing Scale

| Class Suffix | Value   | Pixels | Bootstrap Equivalent |
| ------------ | ------- | ------ | -------------------- |
| `xxxs`       | 0.25rem | 4px    | Similar to `1`       |
| `xxs`        | 0.5rem  | 8px    | Similar to `2`       |
| `xs`         | 1rem    | 16px   | Similar to `3`       |
| `sm`         | 1.5rem  | 24px   | Similar to `4`       |
| `md`         | 2rem    | 32px   | Similar to `5`       |
| `lg`         | 3rem    | 48px   | Custom               |
| `xl`         | 4rem    | 64px   | Custom               |
| `xxl`        | 6rem    | 96px   | Custom               |
| `xxxl`       | 8rem    | 128px  | Custom               |

### Importing

Add to your main SCSS file after Bootstrap:

```scss
// Import Bootstrap
@import "bootstrap/scss/bootstrap";

// Import RDS utilities
@import "@bootcn-vue/core/styles/rds-spacing";
@import "@bootcn-vue/core/styles/rds-colors";
```

### Available Classes

#### Margin

```html
<!-- All sides -->
<div class="m-space-sm">24px margin on all sides</div>

<!-- Individual sides -->
<div class="mt-space-xs">16px top margin</div>
<div class="mb-space-md">32px bottom margin</div>
<div class="ms-space-lg">48px left margin</div>
<div class="me-space-xl">64px right margin</div>

<!-- Axis -->
<div class="mx-space-sm">24px horizontal margin</div>
<div class="my-space-md">32px vertical margin</div>
```

#### Padding

```html
<!-- All sides -->
<div class="p-space-md">32px padding on all sides</div>

<!-- Individual sides -->
<div class="pt-space-xs">16px top padding</div>
<div class="pb-space-sm">24px bottom padding</div>
<div class="ps-space-md">32px left padding</div>
<div class="pe-space-lg">48px right padding</div>

<!-- Axis -->
<div class="px-space-md">32px horizontal padding</div>
<div class="py-space-sm">24px vertical padding</div>
```

#### Gap (Flexbox/Grid)

```html
<!-- Flex/Grid container -->
<div class="d-flex gap-space-xs">16px gap between items</div>
<div class="d-grid row-gap-space-sm">24px row gap</div>
<div class="d-grid column-gap-space-md">32px column gap</div>
```

## Why RDS Spacing?

1. **Semantic naming**: `mb-space-sm` is more meaningful than `mb-3`
2. **Consistent scale**: Extends beyond Bootstrap's default 0-5 scale
3. **Design system alignment**: Matches ASU EdPlus RDS specifications
4. **Flexible**: Use alongside Bootstrap's default spacing utilities

## Comparison with Bootstrap

```html
<!-- Bootstrap default -->
<div class="mb-3">1rem (16px) bottom margin</div>
<div class="mb-5">3rem (48px) bottom margin</div>

<!-- RDS spacing -->
<div class="mb-space-xs">1rem (16px) bottom margin</div>
<div class="mb-space-lg">3rem (48px) bottom margin</div>
```

## Best Practices

1. **Use RDS spacing for semantic consistency** across your design system
2. **Mix with Bootstrap utilities** - they work together seamlessly
3. **Prefer RDS spacing** for new components to maintain consistency
4. **Bootstrap spacing still works** - no breaking changes

## Example Component

```vue
<template>
  <div class="card p-space-md">
    <h2 class="mb-space-sm">Card Title</h2>
    <p class="mb-space-xs">Card description text.</p>
    <div class="d-flex gap-space-sm">
      <button class="btn btn-primary">Action</button>
      <button class="btn btn-secondary">Cancel</button>
    </div>
  </div>
</template>
```

---

## Color System

### Overview

The RDS color system provides a consistent neutral color palette with light and dark shades for creating cohesive user interfaces.

### Color Scale

| Color Name       | Hex Code | CSS Class                    | CSS Variable         | SCSS Variable  |
| ---------------- | -------- | ---------------------------- | -------------------- | -------------- |
| **Light Shades** |
| light-1          | #fafafa  | `text/bg/border-rds-light-1` | `var(--rds-light-1)` | `$rds-light-1` |
| light-2          | #f1f1f1  | `text/bg/border-rds-light-2` | `var(--rds-light-2)` | `$rds-light-2` |
| light-3          | #e8e8e8  | `text/bg/border-rds-light-3` | `var(--rds-light-3)` | `$rds-light-3` |
| light-4          | #d0d0d0  | `text/bg/border-rds-light-4` | `var(--rds-light-4)` | `$rds-light-4` |
| light-5          | #bfbfbf  | `text/bg/border-rds-light-5` | `var(--rds-light-5)` | `$rds-light-5` |
| **Dark Shades**  |
| dark-1           | #747474  | `text/bg/border-rds-dark-1`  | `var(--rds-dark-1)`  | `$rds-dark-1`  |
| dark-2           | #484848  | `text/bg/border-rds-dark-2`  | `var(--rds-dark-2)`  | `$rds-dark-2`  |
| dark-3           | #191919  | `text/bg/border-rds-dark-3`  | `var(--rds-dark-3)`  | `$rds-dark-3`  |

### Usage

#### Utility Classes

```html
<!-- Text colors -->
<p class="text-rds-dark-2">Dark gray text</p>
<p class="text-rds-light-1">Light gray text</p>

<!-- Background colors -->
<div class="bg-rds-light-1">Light background</div>
<div class="bg-rds-dark-3">Dark background</div>

<!-- Border colors -->
<div class="border border-rds-light-4">Light border</div>
<div class="border border-rds-dark-2">Dark border</div>

<!-- Combined -->
<div class="bg-rds-dark-3 text-rds-light-1 p-space-md">
  Dark card with light text
</div>
```

#### CSS Variables

```css
/* Use in inline styles or CSS */
.custom-element {
  background-color: var(--rds-light-2);
  color: var(--rds-dark-3);
  border: 1px solid var(--rds-light-4);
}
```

#### SCSS Variables

```scss
/* Use in SCSS files */
.custom-card {
  background-color: $rds-light-1;
  border: 1px solid $rds-light-4;

  &:hover {
    background-color: $rds-light-2;
  }
}
```

### Color Combinations

#### Recommended Pairings (Good Contrast)

| Background | Text    | Use Case              |
| ---------- | ------- | --------------------- |
| light-1    | dark-3  | Primary content areas |
| light-2    | dark-2  | Secondary sections    |
| light-3    | dark-3  | Subtle backgrounds    |
| dark-3     | light-1 | Dark mode, footers    |
| dark-2     | light-2 | Navigation bars       |
| dark-1     | light-1 | Badges, pills         |

### Example Components

```vue
<template>
  <!-- Light Card -->
  <div class="bg-rds-light-1 border border-rds-light-4 p-space-md">
    <h3 class="text-rds-dark-3 mb-space-sm">Card Title</h3>
    <p class="text-rds-dark-2">Card description text.</p>
    <button class="btn bg-rds-dark-3 text-rds-light-1">Action</button>
  </div>

  <!-- Dark Card -->
  <div class="bg-rds-dark-3 border border-rds-dark-2 p-space-md">
    <h3 class="text-rds-light-1 mb-space-sm">Dark Card</h3>
    <p class="text-rds-light-3">Dark card description.</p>
    <button class="btn bg-rds-light-1 text-rds-dark-3">Action</button>
  </div>

  <!-- Alert -->
  <div
    class="bg-rds-light-2 border-start border-5 border-rds-light-5 p-space-md"
  >
    <h6 class="text-rds-dark-3">Notice</h6>
    <p class="text-rds-dark-2">This is an informational message.</p>
  </div>
</template>
```

---

## Best Practices

1. **Use RDS spacing and colors together** for a cohesive design system
2. **Maintain contrast ratios** for accessibility (use recommended pairings)
3. **Mix with Bootstrap utilities** - they work seamlessly together
4. **Prefer semantic names** - `text-rds-dark-2` is clearer than hex codes
5. **Use CSS variables** for dynamic theming in your own styles

## Storybook Examples

See comprehensive examples in Storybook:

- **Design System → Colors** - All color utilities with live examples
- **Forms → Primitives** - RDS colors in form components

## Reference

Full documentation: https://github.com/banavasi/Bootcn-vue/blob/main/packages/core/README.md
