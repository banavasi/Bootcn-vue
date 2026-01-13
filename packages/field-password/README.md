# @bootcn-vue/field-password

Password field component with show/hide toggle functionality for Vue 3.

## Installation

```bash
pnpm add @bootcn-vue/field-password
```

## Usage

### Basic Usage

```vue
<script setup>
import { ref } from "vue";
import { FieldPassword } from "@bootcn-vue/field-password";

const password = ref("");
</script>

<template>
  <FieldPassword
    id="password"
    label="Password"
    v-model="password"
    placeholder="Enter your password"
    required
  />
</template>
```

### With Password Requirements

```vue
<template>
  <FieldPassword
    id="password"
    label="Password"
    v-model="password"
    placeholder="Create a password"
    required
  >
    <template #helper>
      <div class="small mt-space-xxs">
        <p>Password must contain:</p>
        <ul>
          <li>At least 8 characters</li>
          <li>One number</li>
          <li>One uppercase letter</li>
        </ul>
      </div>
    </template>
  </FieldPassword>
</template>
```

### With Validation

```vue
<script setup>
import { ref, computed } from "vue";
import { FieldPassword } from "@bootcn-vue/field-password";

const password = ref("");
const error = computed(() => {
  if (!password.value) return "Password is required";
  if (password.value.length < 8) return "Must be at least 8 characters";
  return "";
});
</script>

<template>
  <FieldPassword
    id="password"
    label="Password"
    v-model="password"
    :error="error"
    help-text="Choose a strong password"
  />
</template>
```

## Props

| Prop             | Type                                 | Default              | Description                            |
| ---------------- | ------------------------------------ | -------------------- | -------------------------------------- |
| `id`             | `string`                             | **required**         | Unique ID for the input element        |
| `label`          | `string`                             | **required**         | Label text for the field               |
| `modelValue`     | `string`                             | `''`                 | v-model binding for the password value |
| `placeholder`    | `string`                             | `undefined`          | Placeholder text                       |
| `required`       | `boolean`                            | `false`              | Mark field as required                 |
| `disabled`       | `boolean`                            | `false`              | Disable the input                      |
| `readonly`       | `boolean`                            | `false`              | Make input readonly                    |
| `error`          | `string`                             | `undefined`          | Error message to display               |
| `helpText`       | `string`                             | `undefined`          | Help text below input                  |
| `tooltipMessage` | `string`                             | `undefined`          | Tooltip next to label                  |
| `isOptional`     | `boolean`                            | `false`              | Show optional badge                    |
| `optionalText`   | `string`                             | `'Optional'`         | Custom optional badge text             |
| `labelLevel`     | `'h1'\|'h2'\|'h3'\|'h4'\|'h5'\|'h6'` | `'h3'`               | Heading level for label                |
| `labelSize`      | `'small'\|'medium'\|'large'`         | `'small'`            | Label font size                        |
| `labelVisible`   | `boolean`                            | `true`               | Show/hide label visually               |
| `autocomplete`   | `string`                             | `'current-password'` | Autocomplete attribute                 |
| `class`          | `string`                             | `undefined`          | Additional CSS classes                 |

## Slots

### `helper`

Custom content area below the input field. Perfect for password requirements, strength indicators, or action links.

```vue
<template>
  <FieldPassword id="pwd" label="Password">
    <template #helper>
      <a href="/forgot-password">Forgot password?</a>
    </template>
  </FieldPassword>
</template>
```

## Features

- **Show/Hide Toggle**: Eye icon button to toggle password visibility
- **Cursor Position Preservation**: Maintains cursor position when toggling
- **Accessibility**: Full keyboard navigation and screen reader support
- **Validation**: Integrates with form validation patterns
- **Helper Slot**: Flexible slot for requirements, hints, or actions
- **Bootstrap Styling**: Consistent with Bootstrap 5 form styling
- **RDS Spacing**: Uses RDS spacing system for consistency

## Accessibility

- Toggle button has proper `aria-label` ("Show password" / "Hide password")
- Screen reader text via `sr-only` for button state
- Proper ARIA attributes for validation states
- Full keyboard navigation support
- Button prevents form submission with `type="button"`

## Related Components

- [`@bootcn-vue/forms`](../forms) - Low-level form primitives including `InputPassword`
- [`@bootcn-vue/field-text`](../field-text) - Text input field component

## License

MIT
