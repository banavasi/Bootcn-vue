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

### Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 20.0.0
- **Vue 3** >= 3.5.0
- **Vite** (Required for project setup)
- A Vue 3 + Vite project

### Step 1: Initialize bootcn-vue

Run the init command in your Vue 3 project directory:

```bash
npx @bootcn-vue/cli@latest init
```

This command will:

1. ✅ Detect your Vue 3 + Vite project
2. ✅ Set up path aliases (`@/*`) in `tsconfig.json` and `vite.config.ts`
3. ✅ Create `bootcn.config.json` configuration file
4. ✅ Create `src/lib/utils.ts` with utility functions (`cn()`)
5. ✅ Create `src/components/ui/` directory for components
6. ✅ Install required dependencies:
   - `bootstrap` - Bootstrap 5 CSS framework
   - `reka-ui` - Accessible Vue primitives
   - `class-variance-authority` - Type-safe variant styling
   - `clsx` - Conditional class names
   - `tailwind-merge` - Intelligent class merging
   - `@fortawesome/fontawesome-free` - Icon library

### Step 2: Add Your First Component

Add components to your project with the `add` command:

```bash
# Add a specific component
npx @bootcn-vue/cli@latest add button

# Add multiple components
npx @bootcn-vue/cli@latest add button tooltip field-text

# Interactive mode - select from list
npx @bootcn-vue/cli@latest add
```

Components are copied to `src/components/ui/{ComponentName}/` and ready to use!

### Step 3: Use It in Your App

Import and use components in your Vue files:

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
</script>

<template>
  <div>
    <Button variant="primary" size="lg">Click me!</Button>

    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline-secondary">Hover for info</Button>
      </TooltipTrigger>
      <TooltipContent>This is a helpful tooltip</TooltipContent>
    </Tooltip>
  </div>
</template>
```

### Alternative: Direct npm Installation

If you prefer using npm packages instead of the CLI:

```bash
# Install packages directly
npm install @bootcn-vue/core @bootcn-vue/buttons @bootcn-vue/tooltip bootstrap reka-ui

# Import from packages
<script setup lang="ts">
import { Button } from "@bootcn-vue/buttons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
</script>
```

**Note:** We recommend the CLI approach for full control and customization.

## CLI Commands

### `init`

Initialize bootcn-vue in your Vue 3 project:

```bash
npx @bootcn-vue/cli init
```

This command will:

- Detect your Vue 3 + Vite project
- Set up path aliases (`@/*`)
- Install dependencies (Bootstrap, Reka UI, etc.)
- Create utility functions and component directory

### `add`

Add components to your project:

```bash
# Add specific components
npx @bootcn-vue/cli add button

# Interactive selection
npx @bootcn-vue/cli add
```

### `remove`

Remove components from your project:

```bash
# Remove specific components
npx @bootcn-vue/cli remove button

# Interactive selection
npx @bootcn-vue/cli remove

# Remove ALL bootcn-vue setup
npx @bootcn-vue/cli remove --all
```

The `--all` flag removes components, configuration, utilities, and prompts for dependency cleanup.

## 📚 Documentation

### Live Component Library

📚 **[View Interactive Storybook](https://banavasi.github.io/Bootcn-vue/)** - Live examples, component playground, and API documentation

The Storybook includes:

- **Component Examples** - All variants, sizes, and states
- **API Documentation** - Complete props, events, and slots reference
- **Interactive Playground** - Test components with different props
- **Code Examples** - Copy-paste ready code snippets
- **Accessibility Notes** - WCAG compliance information
- **Design Guidelines** - Bootstrap 5 + RDS spacing system

### Package Documentation

Each package has comprehensive documentation:

- **[@bootcn-vue/cli](./packages/cli/README.md)** - CLI commands and usage
- **[@bootcn-vue/core](./packages/core/README.md)** - Core utilities (`cn`, `cva`)
- **[@bootcn-vue/buttons](./packages/buttons/README.md)** - Button component
- **[@bootcn-vue/tooltip](./packages/tooltip/README.md)** - Tooltip component
- **[@bootcn-vue/field-text](./packages/field-text/README.md)** - Text field component
- **[@bootcn-vue/field-password](./packages/field-password/README.md)** - Password field
- **[@bootcn-vue/forms](./packages/forms/README.md)** - Form primitives and components

### npm Registry

📦 **[View on npm](https://www.npmjs.com/org/bootcn-vue)** - All published packages

> **Note**: The "Packages" section on GitHub shows GitHub Packages (container/npm registries hosted on GitHub). Our packages are published to the **public npm registry** instead.

### Contributing & Development

- **[AGENTS.md](./AGENTS.md)** - Development guidelines, coding standards, and workflow
- **[TASKS.md](./TASKS.md)** - Project roadmap and current progress
- **[RELEASE.md](./RELEASE.md)** - Release process and publishing workflow
- **[FONTAWESOME.md](./FONTAWESOME.md)** - FontAwesome icon integration guide

## 📦 Packages

This monorepo contains the following packages:

### Core & CLI

| Package                             | Description                  | Version                                                                                                     |
| ----------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [@bootcn-vue/cli](./packages/cli)   | CLI for adding components    | [![npm](https://img.shields.io/npm/v/@bootcn-vue/cli.svg)](https://www.npmjs.com/package/@bootcn-vue/cli)   |
| [@bootcn-vue/core](./packages/core) | Core utilities (`cn`, `cva`) | [![npm](https://img.shields.io/npm/v/@bootcn-vue/core.svg)](https://www.npmjs.com/package/@bootcn-vue/core) |

### UI Components

| Package                                                 | Components                              | Status | Version                                                                                                                         |
| ------------------------------------------------------- | --------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| [@bootcn-vue/buttons](./packages/buttons)               | Button                                  | ✅     | [![npm](https://img.shields.io/npm/v/@bootcn-vue/buttons.svg)](https://www.npmjs.com/package/@bootcn-vue/buttons)               |
| [@bootcn-vue/tooltip](./packages/tooltip)               | Tooltip, TooltipTrigger, TooltipContent | ✅     | [![npm](https://img.shields.io/npm/v/@bootcn-vue/tooltip.svg)](https://www.npmjs.com/package/@bootcn-vue/tooltip)               |
| [@bootcn-vue/field-text](./packages/field-text)         | FieldText (complete text input field)   | ✅     | [![npm](https://img.shields.io/npm/v/@bootcn-vue/field-text.svg)](https://www.npmjs.com/package/@bootcn-vue/field-text)         |
| [@bootcn-vue/field-password](./packages/field-password) | FieldPassword (with show/hide toggle)   | ✅     | [![npm](https://img.shields.io/npm/v/@bootcn-vue/field-password.svg)](https://www.npmjs.com/package/@bootcn-vue/field-password) |
| [@bootcn-vue/forms](./packages/forms)                   | Form primitives & specialized inputs    | 🚧     | [![npm](https://img.shields.io/npm/v/@bootcn-vue/forms.svg)](https://www.npmjs.com/package/@bootcn-vue/forms)                   |

### Available Components

- ✅ **Button** - All Bootstrap variants, sizes, outline styles, loading state
- ✅ **Tooltip** - Accessible tooltips with positioning and customization
- ✅ **FieldText** - Complete text input with label, help, error, validation
- ✅ **FieldPassword** - Password field with show/hide toggle
- ✅ **FieldSSN** - Social Security Number with masking
- ✅ **InputMasked** - Input with custom mask patterns
- ✅ **InputNumericRange** - Numeric input with min/max validation
- ✅ **Form Primitives** - Low-level building blocks (InputRoot, InputLabel, InputField, InputHelp, InputError)

### Coming Soon

- 🚧 **Select** - Dropdown select component
- 🚧 **Checkbox** - Checkbox with label
- 🚧 **Radio** - Radio button group
- 🚧 **Switch** - Toggle switch
- 📋 **Alert** - Alert messages
- 📋 **Modal** - Dialog/modal component
- 📋 **Toast** - Toast notifications
- 📋 **Card** - Card component
- 📋 **Badge** - Badge component
- 📋 **Table** - Data table

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

## 🛠️ Development

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

# Create a changeset (for publishable changes)
pnpm changeset

# Create a new package/module
pnpm create:module
```

### Creating New Packages

bootcn-vue includes an interactive CLI to scaffold new component packages:

```bash
# Run the module generator
pnpm create:module
```

The CLI will prompt you for:

- **Module name** (e.g., `alerts`)
- **Description** (e.g., "Accessible, customizable alert components")
- **Component name** (e.g., `Alert`)
- **Author name**

This creates a complete package structure:

```
packages/
└── your-module/
    ├── package.json          # Package configuration
    ├── tsconfig.json         # TypeScript config
    ├── tsup.config.ts        # Build config
    ├── vitest.config.ts      # Test config
    ├── README.md             # Documentation
    ├── CHANGELOG.md          # Version history
    └── src/
        ├── index.ts          # Package exports
        ├── env.d.ts          # Type definitions
        └── YourComponent/
            ├── YourComponent.vue    # Component implementation
            ├── YourComponent.spec.ts # Unit tests
            └── index.ts             # Component exports with variants
```

**After creating a module:**

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Build the package:**

   ```bash
   pnpm turbo build --filter=@bootcn-vue/your-module
   ```

3. **Add Storybook story** in `apps/playground/src/stories/YourComponent.stories.ts`

4. **View in Storybook:**

   ```bash
   pnpm dev
   ```

5. **Write tests and create changeset:**
   ```bash
   pnpm test:unit -- YourComponent.spec.ts
   pnpm changeset
   ```

See [AGENTS.md](./AGENTS.md) for detailed development guidelines, coding standards, and workflow.

### Project Structure

```
bootcn-vue/
├── apps/
│   └── playground/              # Storybook playground & dev environment
│       ├── src/
│       │   ├── stories/         # Storybook stories for all components
│       │   └── components/ui/   # Demo components
│       └── public/              # Static assets
├── packages/
│   ├── cli/                     # CLI for adding components
│   ├── core/                    # Core utilities (cn, cva)
│   ├── buttons/                 # Button components
│   ├── tooltip/                 # Tooltip component
│   ├── field-text/              # Text input field
│   ├── field-password/          # Password field
│   └── forms/                   # Form primitives & components
├── scripts/
│   └── create-module.mjs        # Module generator script
├── .github/
│   └── workflows/               # CI/CD workflows
├── AGENTS.md                    # Development guidelines
├── TASKS.md                     # Project roadmap
└── README.md                    # This file
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

## 🗺️ Roadmap

### Completed ✅

- ✅ **CLI** - init, add, and remove commands with interactive mode
- ✅ **Core Utilities** - `cn()`, `cva`, and class merging utilities
- ✅ **Button Component** - All Bootstrap variants, sizes, loading states
- ✅ **Tooltip Component** - Accessible tooltips with smart positioning
- ✅ **Text Field** - Complete text input with validation
- ✅ **Password Field** - Password input with show/hide toggle
- ✅ **Form Primitives** - InputRoot, InputLabel, InputField, InputHelp, InputError
- ✅ **Specialized Inputs** - InputMasked, InputNumericRange, InputPassword
- ✅ **SSN Field** - Social Security Number with masking
- ✅ **Storybook Documentation** - Comprehensive component docs
- ✅ **CI/CD Pipeline** - Automated testing, building, and publishing

### In Progress 🚧

- 🚧 **More Form Components** - Select, Checkbox, Radio, Switch
- 🚧 **Form Validation Integration** - VeeValidate and Zod examples
- 🚧 **CLI Enhancement** - Better component dependency resolution

### Planned 📋

- 📋 **Feedback Components** - Alert, Toast, Modal, Notification
- 📋 **Layout Components** - Container, Grid, Stack, Divider
- 📋 **Navigation Components** - Navbar, Tabs, Breadcrumb, Pagination
- 📋 **Data Display** - Table, Card, Badge, List, Avatar
- 📋 **Media Components** - Image, Video, Carousel
- 📋 **Advanced Inputs** - DatePicker, TimePicker, ColorPicker, FileUpload
- 📋 **Overlay Components** - Dropdown, Popover, Context Menu
- 📋 **Progress Components** - ProgressBar, Spinner, Skeleton

See [TASKS.md](./TASKS.md) for detailed epic/story/task breakdown and current progress.

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
