# @bootcn-vue/tooltip

Accessible, customizable tooltip component built with Bootstrap 5, Vue 3, and Reka UI.

[![npm version](https://badge.fury.io/js/@bootcn-vue%2Ftooltip.svg)](https://www.npmjs.com/package/@bootcn-vue/tooltip)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

**[View Components & Examples](https://banavasi.github.io/Bootcn-vue/?path=/docs/components-tooltip--docs)** - Interactive Storybook

## Overview

A fully accessible tooltip component that displays contextual information on hover or focus. Built on Reka UI primitives with Bootstrap 5 styling and smart positioning.

## Installation

### Using CLI (Recommended)

```bash
# Initialize bootcn-vue (if not already done)
npx @bootcn-vue/cli@latest init

# Add tooltip component
npx @bootcn-vue/cli@latest add tooltip
```

### Direct Installation

```bash
npm install @bootcn-vue/tooltip @bootcn-vue/core bootstrap reka-ui
```

## Styling Requirements

The tooltip component requires Bootstrap 5 tooltip styles. You must import Bootstrap's tooltip SCSS in your main stylesheet.

### Option 1: Import Full Bootstrap (Recommended)

If you're already using Bootstrap in your project:

```scss
// In your main SCSS file (e.g., src/assets/styles/main.scss)
@import "bootstrap/scss/bootstrap";

// Import tooltip component-specific styles
@import "@bootcn-vue/tooltip/src/tooltip.css";
```

### Option 2: Import Only Required Bootstrap Modules

For a smaller bundle size, import only the necessary Bootstrap modules:

```scss
// In your main SCSS file (e.g., src/assets/styles/main.scss)
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/root";
@import "bootstrap/scss/transitions";
@import "bootstrap/scss/tooltip";

// Import tooltip component-specific styles
@import "@bootcn-vue/tooltip/src/tooltip.css";
```

**Note:** The component requires Bootstrap's tooltip CSS variables and classes to function properly. The `tooltip.css` file contains additional styling for the tooltip arrow positioning.

## Features

- ✅ **Accessible** - Full keyboard navigation and screen reader support
- ✅ **Smart Positioning** - Automatically adjusts to avoid viewport edges
- ✅ **Bootstrap 5 Styled** - Matches Bootstrap tooltip design
- ✅ **Composable** - Built on Reka UI primitives
- ✅ **TypeScript** - Full type safety
- ✅ **Customizable** - Control delay, positioning, and behavior
- ✅ **Icon Support** - Perfect for info icons with FontAwesome

## Usage

### Basic Example

```vue
<script setup lang="ts">
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
</script>

<template>
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-primary">Hover me</button>
    </TooltipTrigger>
    <TooltipContent>This is helpful information</TooltipContent>
  </Tooltip>
</template>
```

### With Icon (Common Pattern)

```vue
<script setup lang="ts">
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
</script>

<template>
  <div>
    <label for="email">
      Email Address
      <Tooltip>
        <TooltipTrigger>
          <i class="fa-regular fa-circle-info ms-1 text-muted" />
        </TooltipTrigger>
        <TooltipContent>
          We'll send a confirmation email to this address
        </TooltipContent>
      </Tooltip>
    </label>
    <input id="email" type="email" class="form-control" />
  </div>
</template>
```

### Positioning

Control where the tooltip appears relative to the trigger:

```vue
<template>
  <!-- Top (default) -->
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Top</button>
    </TooltipTrigger>
    <TooltipContent side="top">Appears on top</TooltipContent>
  </Tooltip>

  <!-- Right -->
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Right</button>
    </TooltipTrigger>
    <TooltipContent side="right">Appears on right</TooltipContent>
  </Tooltip>

  <!-- Bottom -->
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Bottom</button>
    </TooltipTrigger>
    <TooltipContent side="bottom">Appears on bottom</TooltipContent>
  </Tooltip>

  <!-- Left -->
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Left</button>
    </TooltipTrigger>
    <TooltipContent side="left">Appears on left</TooltipContent>
  </Tooltip>
</template>
```

### Alignment

Control alignment along the side:

```vue
<template>
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Aligned Start</button>
    </TooltipTrigger>
    <TooltipContent side="top" align="start">
      Aligned to the start
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Aligned Center</button>
    </TooltipTrigger>
    <TooltipContent side="top" align="center">
      Centered (default)
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Aligned End</button>
    </TooltipTrigger>
    <TooltipContent side="top" align="end"> Aligned to the end </TooltipContent>
  </Tooltip>
</template>
```

### Custom Delay

Control how long before the tooltip appears:

```vue
<template>
  <!-- Instant -->
  <Tooltip :delay-duration="0">
    <TooltipTrigger>
      <button class="btn btn-secondary">Instant</button>
    </TooltipTrigger>
    <TooltipContent>Shows immediately</TooltipContent>
  </Tooltip>

  <!-- Default (700ms) -->
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-secondary">Default</button>
    </TooltipTrigger>
    <TooltipContent>Shows after 700ms</TooltipContent>
  </Tooltip>

  <!-- Longer delay -->
  <Tooltip :delay-duration="1000">
    <TooltipTrigger>
      <button class="btn btn-secondary">Delayed</button>
    </TooltipTrigger>
    <TooltipContent>Shows after 1 second</TooltipContent>
  </Tooltip>
</template>
```

### Controlled State

Control the open/close state programmatically:

```vue
<script setup lang="ts">
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <div>
    <button @click="isOpen = !isOpen" class="btn btn-primary mb-2">
      Toggle Tooltip
    </button>

    <Tooltip v-model:open="isOpen">
      <TooltipTrigger>
        <button class="btn btn-secondary">Controlled</button>
      </TooltipTrigger>
      <TooltipContent>This is controlled externally</TooltipContent>
    </Tooltip>
  </div>
</template>
```

### Disabled Tooltip

Conditionally disable the tooltip:

```vue
<script setup lang="ts">
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
import { ref } from "vue";

const isDisabled = ref(false);
</script>

<template>
  <Tooltip :disabled="isDisabled">
    <TooltipTrigger>
      <button class="btn btn-secondary">Hover me</button>
    </TooltipTrigger>
    <TooltipContent>This tooltip can be disabled</TooltipContent>
  </Tooltip>
</template>
```

## Components API

### `Tooltip`

Root component that manages tooltip state and provides context.

**Props:**

| Prop                      | Type      | Default | Description                              |
| ------------------------- | --------- | ------- | ---------------------------------------- |
| `delayDuration`           | `number`  | `700`   | Delay in ms before showing tooltip       |
| `disableClosingTrigger`   | `boolean` | `false` | Disable closing when trigger is clicked  |
| `disableHoverableContent` | `boolean` | `false` | Prevent hovering over tooltip content    |
| `disabled`                | `boolean` | `false` | Disable tooltip completely               |
| `defaultOpen`             | `boolean` | `false` | Initial open state (uncontrolled)        |
| `open`                    | `boolean` | -       | Controlled open state (use with v-model) |

**Events:**

- `update:open` - Emitted when open state changes

### `TooltipTrigger`

Element that triggers the tooltip on hover or focus.

**Usage Notes:**

- Should contain a single focusable element (button, link, etc.)
- Tooltip shows on both hover and keyboard focus
- Fully accessible with keyboard navigation

### `TooltipContent`

The tooltip popup with Bootstrap styling.

**Props:**

| Prop         | Type                                     | Default    | Description                    |
| ------------ | ---------------------------------------- | ---------- | ------------------------------ |
| `side`       | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`    | Tooltip placement              |
| `sideOffset` | `number`                                 | `4`        | Distance from trigger (pixels) |
| `align`      | `'start' \| 'center' \| 'end'`           | `'center'` | Alignment along the side       |
| `class`      | `string`                                 | -          | Additional CSS classes         |

**Auto-positioning:**

The tooltip automatically adjusts its position to stay within the viewport, even if you specify a preferred side.

## Styling

### Default Styles

Tooltips use Bootstrap's default dark theme:

- Dark background (`bg-dark`)
- White text
- Small padding
- Border radius
- Drop shadow

### Custom Styling

Add custom classes to the `TooltipContent`:

```vue
<template>
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-primary">Custom Style</button>
    </TooltipTrigger>
    <TooltipContent class="bg-primary text-white">
      Custom colored tooltip
    </TooltipContent>
  </Tooltip>
</template>
```

### CSS Customization

Override styles in your stylesheet:

```css
/* Target tooltip content */
[data-radix-popper-content-wrapper] {
  z-index: 9999;
}

.tooltip-content {
  max-width: 300px;
  font-size: 0.875rem;
}
```

## Accessibility

The tooltip component follows WCAG 2.1 guidelines:

- ✅ **Keyboard Navigation** - Shows on focus, hides on blur
- ✅ **Screen Readers** - Proper ARIA attributes
- ✅ **Focus Management** - Doesn't trap focus
- ✅ **ESC to Close** - Pressing Escape closes the tooltip
- ✅ **Role** - Uses proper `role="tooltip"`
- ✅ **aria-describedby** - Automatically linked to trigger

**Best Practices:**

- Use tooltips for supplementary information only
- Keep content concise (1-2 sentences)
- Don't hide critical information in tooltips
- Ensure tooltip content is also available to touch users

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  TooltipRootProps,
  TooltipContentProps,
} from "@bootcn-vue/tooltip";
```

## Dependencies

- `@bootcn-vue/core` - Core utilities
- `reka-ui` - Accessible tooltip primitives
- `bootstrap` - Styling (peer dependency)

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
- [@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms) - Form components (uses tooltips in labels)

## License

MIT © [Shashank Shandilya](https://github.com/banavasi)
