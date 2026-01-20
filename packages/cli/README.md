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

### Remove components from your project

```bash
# Remove a single component
npx bootcn-vue remove button

# Remove multiple components
npx bootcn-vue remove button input

# Interactive mode - select from list
npx bootcn-vue remove

# Remove ALL bootcn-vue setup (components, config, utils)
npx bootcn-vue remove --all
```

The `remove --all` command will:

1. Delete all components in `src/components/ui/`
2. Delete `src/lib/utils.ts` (and `lib/` directory if empty)
3. Delete `bootcn.config.json`
4. Show command to uninstall dependencies
5. Include safety confirmations before removing

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

### UI Components

| Component     | Key              | Description                                                        |
| ------------- | ---------------- | ------------------------------------------------------------------ |
| Button        | `button`         | Button component with Bootstrap variants and sizes                 |
| Tooltip       | `tooltip`        | Accessible tooltips with Tooltip, TooltipTrigger, TooltipContent   |
| Checkbox      | `checkbox`       | Tri-state checkbox with Checkbox, CheckboxGroup, CheckboxGroupItem |
| Radio         | `radio`          | Radio buttons with RadioGroup, RadioGroupItem, RadioYesNo          |
| FieldText     | `field-text`     | Complete text input field with validation                          |
| FieldPassword | `field-password` | Password field with show/hide toggle                               |
| FieldSSN      | `field-ssn`      | Social Security Number field with masking                          |

### Form Primitives

| Component         | Key                   | Description                     |
| ----------------- | --------------------- | ------------------------------- |
| InputRoot         | `input-root`          | Form input container primitive  |
| InputLabel        | `input-label`         | Form label with tooltip support |
| InputField        | `input-field`         | Basic input field primitive     |
| InputPassword     | `input-password`      | Password input primitive        |
| InputError        | `input-error`         | Error message display           |
| InputHelp         | `input-help`          | Help text display               |
| InputMasked       | `input-masked`        | Input with masking support      |
| InputNumericRange | `input-numeric-range` | Numeric range input             |

### Usage Examples

```bash
# Add UI components
npx bootcn-vue add button
npx bootcn-vue add checkbox radio
npx bootcn-vue add tooltip field-text field-password

# Add form primitives
npx bootcn-vue add input-root input-label input-field
npx bootcn-vue add input-error input-help

# Interactive selection
npx bootcn-vue add
```

**In your Vue components:**

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/Button";
import { Checkbox, CheckboxGroup } from "@/components/ui/Checkbox";
import { RadioGroup, RadioYesNo } from "@/components/ui/Radio";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
</script>

<template>
  <div>
    <Button variant="primary">Submit</Button>

    <Checkbox v-model="accepted" label="I accept the terms" />

    <CheckboxGroup
      v-model="selectedOptions"
      :options="[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ]"
    />

    <RadioGroup
      v-model="selectedValue"
      :options="[
        { label: 'Choice A', value: 'a' },
        { label: 'Choice B', value: 'b' },
      ]"
    />

    <RadioYesNo v-model="yesNoValue" />

    <Tooltip>
      <TooltipTrigger>
        <Button variant="outline-secondary">Help</Button>
      </TooltipTrigger>
      <TooltipContent>This is helpful information</TooltipContent>
    </Tooltip>
  </div>
</template>
```

## License

MIT
