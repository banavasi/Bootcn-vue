# @bootcn-vue/cli

CLI for adding Bootstrap + Vue 3 components to your project.

## Installation

```bash
# Using npm
npm install -g @bootcn-vue/cli

# Using pnpm
pnpm add -g @bootcn-vue/cli

# Using npx (no installation required)
npx @bootcn-vue/cli
```

## Usage

### Initialize bootcn-vue in your project

```bash
npx bootcn-vue init
```

This command will:

1. Detect your Vue 3 + Vite project
2. Ask for your `src` directory location
3. Create `bootcn.config.json` configuration file
4. Update `tsconfig.json` with path aliases (`@/*`)
5. Update `vite.config.ts` with path aliases
6. Create `src/lib/utils.ts` with the `cn()` utility function
7. Create `src/components/ui/` directory for components
8. Install required dependencies (bootstrap, reka-ui, cva, clsx, tailwind-merge)

### Add components to your project

```bash
# Add a single component
npx bootcn-vue add button

# Add multiple components
npx bootcn-vue add button input

# Interactive mode - select from list
npx bootcn-vue add
```

This command will:

1. Copy component files from `@bootcn-vue/buttons` to `src/components/ui/Button/`
2. Transform imports from package imports to local imports
3. Make the component ready to use

## Configuration

After running `init`, a `bootcn.config.json` file is created:

```json
{
  "$schema": "https://bootcn-vue.dev/schema.json",
  "srcDir": "src",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib"
  }
}
```

## Usage in your Vue app

After adding components:

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/Button";
</script>

<template>
  <Button variant="primary" size="lg"> Click me </Button>
</template>
```

## Requirements

- Vue 3
- Vite
- Node.js >= 20.0.0

## Available Components

- `button` - Button component with variants and sizes

More components coming soon!

## License

MIT
