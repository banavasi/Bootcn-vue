# @bootcn-vue/tooltip

Accessible, customizable tooltip component built with Bootstrap 5, Vue 3, and Reka UI.

## Installation

```bash
npm install @bootcn-vue/tooltip
# or
pnpm add @bootcn-vue/tooltip
```

## Usage

### Basic Example

```vue
<script setup>
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
</script>

<template>
  <Tooltip>
    <TooltipTrigger>
      <button class="btn btn-primary">Hover me</button>
    </TooltipTrigger>
    <TooltipContent>This is a tooltip</TooltipContent>
  </Tooltip>
</template>
```

### With Icon

```vue
<template>
  <Tooltip>
    <TooltipTrigger>
      <i class="fa-regular fa-circle-info" />
    </TooltipTrigger>
    <TooltipContent>Helpful information here</TooltipContent>
  </Tooltip>
</template>
```

### Positioning

Control tooltip placement with the `side` prop:

```vue
<TooltipContent side="top">Tooltip on top</TooltipContent>
<TooltipContent side="right">Tooltip on right</TooltipContent>
<TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
<TooltipContent side="left">Tooltip on left</TooltipContent>
```

## Components

### Tooltip

Root component that wraps the trigger and content.

**Props:**

- `delayDuration?: number` - Delay in ms before showing tooltip (default: 700)
- `disableClosingTrigger?: boolean` - Disable closing on trigger click
- `disableHoverableContent?: boolean` - Disable hoverable content
- `disabled?: boolean` - Disable tooltip
- `defaultOpen?: boolean` - Initial open state
- `open?: boolean` - Controlled open state

### TooltipTrigger

Element that triggers the tooltip on hover/focus.

### TooltipContent

The tooltip content with Bootstrap styling.

**Props:**

- `side?: 'top' | 'right' | 'bottom' | 'left'` - Placement (default: 'top')
- `sideOffset?: number` - Distance from trigger (default: 4)
- `align?: 'start' | 'center' | 'end'` - Alignment
- `class?: string` - Additional CSS classes

## Features

- ✅ Accessible with keyboard navigation
- ✅ Bootstrap 5 styling
- ✅ Customizable positioning
- ✅ Hover and focus triggers
- ✅ TypeScript support
- ✅ Composable with Reka UI primitives

## License

MIT
