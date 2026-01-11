# RDS Spacing System

Rocket Design System (RDS) spacing utilities for consistent spacing across your application.

## Overview

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

## Usage

### Importing

Add to your main SCSS file after Bootstrap:

```scss
// Import Bootstrap
@import "bootstrap/scss/bootstrap";

// Import RDS spacing utilities
@import "@bootcn-vue/core/src/styles/rds-spacing";
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

## Reference

Full documentation: https://github.com/banavasi/Bootcn-vue/blob/main/packages/core/README.md
