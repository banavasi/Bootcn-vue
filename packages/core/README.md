# @bootcn-vue/core

Core utilities and shared functions for the bootcn-vue component library.

[![npm version](https://badge.fury.io/js/@bootcn-vue%2Fcore.svg)](https://www.npmjs.com/package/@bootcn-vue/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

**[View Components & Examples](https://banavasi.github.io/Bootcn-vue/)** - Interactive Storybook

## Installation

```bash
# Using npm
npm install @bootcn-vue/core

# Using pnpm
pnpm add @bootcn-vue/core

# Using yarn
yarn add @bootcn-vue/core
```

## What's Included

This package provides core utilities used by all bootcn-vue components:

### `cn()` - Class Name Utility

A utility function for merging Tailwind CSS classes with Bootstrap classes. Built on top of `clsx` and `tailwind-merge`.

```typescript
import { cn } from "@bootcn-vue/core";

// Merge classes
cn("btn", "btn-primary", className);

// Conditional classes
cn("btn", {
  "btn-primary": isPrimary,
  "btn-secondary": !isPrimary,
});

// Override with tailwind-merge intelligence
cn("p-4", "p-2"); // → 'p-2' (conflicting classes merged intelligently)
```

### `cva` - Class Variance Authority

Re-exports `cva` and types from `class-variance-authority` for creating variant-based component styles.

```typescript
import { cva, type VariantProps } from "@bootcn-vue/core";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
    },
    size: {
      sm: "btn-sm",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;
```

## Usage with CLI

This package is automatically installed when you run:

```bash
npx @bootcn-vue/cli init
```

The CLI will create a local `src/lib/utils.ts` file with the `cn()` function for you to use and customize.

## Direct Usage

You can also use this package directly in your Vue 3 project:

```vue
<script setup lang="ts">
import { cn } from "@bootcn-vue/core";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('container', 'p-4', props.class)">
    <slot />
  </div>
</template>
```

## Dependencies

- `class-variance-authority` - Type-safe variant styling
- `clsx` - Conditional class names
- `tailwind-merge` - Intelligent class merging

## Peer Dependencies

- `vue` ^3.5.0

## Links

- **[GitHub Repository](https://github.com/banavasi/Bootcn-vue)**
- **[Documentation](https://banavasi.github.io/Bootcn-vue/)**
- **[Report Issues](https://github.com/banavasi/Bootcn-vue/issues)**

## Related Packages

- [@bootcn-vue/cli](https://www.npmjs.com/package/@bootcn-vue/cli) - CLI for adding components
- [@bootcn-vue/buttons](https://www.npmjs.com/package/@bootcn-vue/buttons) - Button components
- [@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms) - Form components

## License

MIT © [Shashank Shandilya](https://github.com/banavasi)
