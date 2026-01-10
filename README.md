# bootcn-vue

> A modern, type-safe Bootstrap + Vue 3 component library with CLI for rapid UI development

[![CI](https://github.com/banavasi/Bootcn-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/banavasi/Bootcn-vue/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/@bootcn-vue%2Fcore.svg)](https://www.npmjs.com/package/@bootcn-vue/core)

## What is bootcn-vue?

**bootcn-vue** is a collection of accessible, reusable, and composable Vue 3 components built on top of Bootstrap 5. Unlike traditional Bootstrap component libraries, bootcn-vue takes a copy-paste approach similar to shadcn/ui - components are added directly to your project via CLI, giving you full control and customization.

### Key Features

- 🎨 **Bootstrap 5 Design System** - Beautiful, responsive components following Bootstrap conventions
- 🚀 **CLI-First** - Add components to your project with a single command
- 📦 **Copy & Own** - Components live in your codebase, not in node_modules
- 🎯 **TypeScript Native** - Full type safety with TypeScript-first design
- ♿ **Accessible** - Built on [Reka UI](https://reka-ui.com/) for proper accessibility
- 🔧 **Customizable** - Easily modify components to match your design needs
- ⚡ **Zero Runtime Overhead** - No wrapper library, just pure Vue components

## Quick Start

### Installation

```bash
# Using npx (recommended)
npx @bootcn-vue/cli init

# Or install globally
pnpm add -g @bootcn-vue/cli
bootcn-vue init
```

### Add Your First Component

```bash
npx @bootcn-vue/cli add button
```

### Use It in Your App

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/Button";
</script>

<template>
  <Button variant="primary" size="lg"> Click me! </Button>
</template>
```

## Documentation

📚 **[View Components](https://banavasi.github.io/Bootcn-vue/)** - Browse all available components in our Storybook

## Packages

This monorepo contains the following packages:

| Package                                   | Description                   | Version                                                                                                           |
| ----------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [@bootcn-vue/cli](./packages/cli)         | CLI for adding components     | [![npm](https://img.shields.io/npm/v/@bootcn-vue/cli.svg)](https://www.npmjs.com/package/@bootcn-vue/cli)         |
| [@bootcn-vue/core](./packages/core)       | Core utilities and functions  | [![npm](https://img.shields.io/npm/v/@bootcn-vue/core.svg)](https://www.npmjs.com/package/@bootcn-vue/core)       |
| [@bootcn-vue/buttons](./packages/buttons) | Button components             | [![npm](https://img.shields.io/npm/v/@bootcn-vue/buttons.svg)](https://www.npmjs.com/package/@bootcn-vue/buttons) |
| [@bootcn-vue/forms](./packages/forms)     | Form components (Coming soon) | -                                                                                                                 |

## Requirements

- **Node.js** >= 20.0.0
- **Vue 3** >= 3.5.0
- **Vite** (Required for project setup)
- **pnpm** >= 9.0.0 (for development)

## Why bootcn-vue?

### Copy-Paste Philosophy

Unlike traditional component libraries where components are imported from `node_modules`, bootcn-vue components are copied directly into your project. This means:

- ✅ **Full Control** - Modify components however you need
- ✅ **No Version Lock** - No breaking changes from library updates
- ✅ **Tree-Shakeable** - Only bundle what you use
- ✅ **Easy Debugging** - See the actual component code
- ✅ **No Bloat** - No unused components in your bundle

### Bootstrap + Modern Stack

We love Bootstrap's design system, but wanted modern Vue 3 tooling:

- Built with **Vue 3 Composition API**
- Full **TypeScript** support
- Accessible foundation with **Reka UI**
- Modern styling with **class-variance-authority**
- Bootstrap 5 styles with **SCSS**

## Development

### Prerequisites

```bash
# Install pnpm globally if you haven't
npm install -g pnpm

# Clone the repository
git clone https://github.com/banavasi/Bootcn-vue.git
cd Bootcn-vue

# Install dependencies
pnpm install
```

### Available Commands

```bash
# Start development server (Storybook)
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test:unit

# Type checking
pnpm type-check

# Linting
pnpm lint

# Create a changeset
pnpm changeset
```

### Project Structure

```
bootcn-vue/
├── apps/
│   └── playground/          # Storybook playground
├── packages/
│   ├── cli/                 # CLI package
│   ├── core/                # Core utilities
│   ├── buttons/             # Button components
│   └── forms/               # Form components (WIP)
├── .github/
│   └── workflows/           # CI/CD workflows
└── TASKS.md                 # Project roadmap
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. **Create a changeset** for your changes:

   ```bash
   pnpm changeset
   ```

2. **Follow conventional commits**:

   ```
   feat(buttons): add new variant
   fix(cli): resolve path issue
   docs(readme): update installation guide
   ```

3. **Ensure tests pass**:
   ```bash
   pnpm test:unit
   pnpm type-check
   pnpm lint
   ```

## Roadmap

- ✅ CLI with init and add commands
- ✅ Core utilities package
- ✅ Button component
- 🚧 Form components (Input, Select, Checkbox, Radio)
- 🚧 Layout components (Container, Row, Col)
- 📋 Navigation components (Navbar, Tabs)
- 📋 Feedback components (Alert, Toast, Modal)
- 📋 Data display components (Table, Card, Badge)

See [TASKS.md](./TASKS.md) for detailed progress.

## Credits

Inspired by:

- [shadcn/ui](https://ui.shadcn.com/) - For the copy-paste component philosophy
- [Reka UI](https://reka-ui.com/) - Accessible Vue components
- [Bootstrap](https://getbootstrap.com/) - Design system

## License

MIT License - see [LICENSE](./LICENSE) for details

## Author

Created and maintained by [Shashank Shandilya](https://github.com/banavasi)

---

<p align="center">
  Made with ❤️ using Vue 3, TypeScript, and Bootstrap 5
</p>
