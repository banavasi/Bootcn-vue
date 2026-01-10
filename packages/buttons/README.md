# @bootcn-vue/buttons

Accessible, customizable Button components built with Bootstrap 5 and Vue 3.

[![npm version](https://badge.fury.io/js/@bootcn-vue%2Fbuttons.svg)](https://www.npmjs.com/package/@bootcn-vue/buttons)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

**[View Components & Examples](https://banavasi.github.io/Bootcn-vue/?path=/docs/components-button--docs)** - Interactive Storybook

## Installation

### Using CLI (Recommended)

```bash
# Add button component to your project
npx @bootcn-vue/cli add button
```

This copies the component directly to your `src/components/ui/Button/` directory, giving you full control to customize it.

### Direct Installation

```bash
npm install @bootcn-vue/buttons @bootcn-vue/core reka-ui bootstrap
```

## Features

- ✨ **All Bootstrap Variants** - primary, secondary, success, danger, warning, info, light, dark
- 🎨 **Outline Variants** - outline-primary, outline-secondary, etc.
- 📏 **Multiple Sizes** - sm, md, lg
- ♿ **Accessible** - Built on Reka UI for proper accessibility
- 🔧 **Customizable** - Full control when using CLI
- ⚡ **Loading State** - Built-in spinner support
- 🎯 **TypeScript** - Full type safety

## Usage

### With CLI (Copy-Paste Approach)

```bash
# Initialize bootcn-vue
npx @bootcn-vue/cli init

# Add button component
npx @bootcn-vue/cli add button
```

Then use it in your Vue component:

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/Button";
</script>

<template>
  <Button variant="primary" size="lg"> Click me! </Button>
</template>
```

### Direct Import (npm package)

```vue
<script setup lang="ts">
import { Button } from "@bootcn-vue/buttons";
</script>

<template>
  <Button variant="primary" size="lg"> Click me! </Button>
</template>
```

## Examples

### Basic Variants

```vue
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
```

### Outline Variants

```vue
<Button variant="outline-primary">Outline Primary</Button>
<Button variant="outline-secondary">Outline Secondary</Button>
```

### Sizes

```vue
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Loading State

```vue
<Button :loading="true">Loading...</Button>
```

### As Link

```vue
<Button as="a" href="/about">Link Button</Button>
```

### Custom Class

```vue
<Button class="my-custom-class">Custom Button</Button>
```

## Props

```typescript
interface Props {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning"
    | "outline-info"
    | "outline-light"
    | "outline-dark"
    | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  class?: string;
  as?: string | Component; // Render as different element
  asChild?: boolean; // Use child element as root
}
```

## Dependencies

- `@bootcn-vue/core` - Core utilities
- `reka-ui` - Accessible primitives

## Peer Dependencies

- `vue` ^3.5.0
- `bootstrap` ^5.3.0

## Links

- **[GitHub Repository](https://github.com/banavasi/Bootcn-vue)**
- **[Documentation](https://banavasi.github.io/Bootcn-vue/)**
- **[Report Issues](https://github.com/banavasi/Bootcn-vue/issues)**

## Related Packages

- [@bootcn-vue/cli](https://www.npmjs.com/package/@bootcn-vue/cli) - CLI for adding components
- [@bootcn-vue/core](https://www.npmjs.com/package/@bootcn-vue/core) - Core utilities
- [@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms) - Form components

## License

MIT © [Shashank Shandilya](https://github.com/banavasi)
