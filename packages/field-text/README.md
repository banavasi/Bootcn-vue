# @bootcn-vue/field-text

Text input field component for Vue 3 using Bootstrap primitives.

## Installation

```bash
pnpm add @bootcn-vue/field-text
```

## Usage

```vue
<script setup>
import { FieldText } from "@bootcn-vue/field-text";
import { ref } from "vue";

const email = ref("");
</script>

<template>
  <FieldText
    id="user-email"
    v-model="email"
    type="email"
    label="Email Address"
    placeholder="you@example.com"
    help-text="We'll never share your email"
    required
  />
</template>
```

## Props

Extends `BaseFieldProps` from `@bootcn-vue/forms` with:

| Prop           | Type                                              | Default  | Description            |
| -------------- | ------------------------------------------------- | -------- | ---------------------- |
| `type`         | `'text' \| 'email' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type             |
| `autocomplete` | `string`                                          | -        | Autocomplete attribute |

## Base Props

From `BaseFieldProps`:

- `id` (required): Unique ID for the input
- `label` (required): Label text
- `labelLevel`: Heading level (`h1` - `h6`)
- `labelSize`: Label size (`small`, `medium`, `large`)
- `labelVisible`: Show/hide label (uses visually-hidden if false)
- `placeholder`: Placeholder text
- `required`: Mark as required
- `disabled`: Disable input
- `readonly`: Make read-only
- `error`: Error message
- `helpText`: Help text below input
- `class`: CSS class for root container
- `inputClass`: CSS class for input element

## License

MIT
