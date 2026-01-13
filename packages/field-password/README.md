# @bootcn-vue/field-password

Complete password field component with show/hide toggle functionality for Vue 3.

[![npm version](https://badge.fury.io/js/@bootcn-vue%2Ffield-password.svg)](https://www.npmjs.com/package/@bootcn-vue/field-password)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

**[View Components & Examples](https://banavasi.github.io/Bootcn-vue/?path=/docs/forms-field-password--docs)** - Interactive Storybook

## Overview

A complete, production-ready password field component with toggle visibility, label, help text, error messages, and an optional helper slot. Perfect for login forms, registration, and password change interfaces.

## Installation

### Using CLI (Recommended)

```bash
# Initialize bootcn-vue (if not already done)
npx @bootcn-vue/cli@latest init

# Add field-password component (when available)
npx @bootcn-vue/cli@latest add field-password
```

### Direct Installation

```bash
npm install @bootcn-vue/field-password @bootcn-vue/forms @bootcn-vue/core bootstrap
```

## Features

- ✅ **Show/Hide Toggle** - Eye icon button to toggle password visibility
- ✅ **Cursor Position Preservation** - Maintains cursor position when toggling
- ✅ **Complete Field** - Label, input, help text, and error messages included
- ✅ **Helper Slot** - Flexible slot for requirements, strength indicators, or "Forgot password?" links
- ✅ **Accessible** - Full ARIA support and keyboard navigation
- ✅ **Validation** - Built-in error message display
- ✅ **Tooltips** - Optional info tooltips next to labels
- ✅ **TypeScript** - Full type safety
- ✅ **Bootstrap Styled** - Consistent with Bootstrap 5 forms
- ✅ **RDS Spacing** - Uses RDS spacing system

## Usage

### Basic Example

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref } from "vue";

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

### Login Form

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref } from "vue";

const password = ref("");
</script>

<template>
  <form @submit.prevent="handleLogin">
    <FieldPassword
      id="password"
      label="Password"
      v-model="password"
      placeholder="Enter your password"
      autocomplete="current-password"
      required
    >
      <template #helper>
        <a href="/forgot-password" class="small text-muted">
          Forgot password?
        </a>
      </template>
    </FieldPassword>

    <button type="submit" class="btn btn-primary mt-space-sm">Sign In</button>
  </form>
</template>
```

### Registration with Password Requirements

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref, computed } from "vue";

const password = ref("");

const requirements = computed(() => ({
  length: password.value.length >= 8,
  uppercase: /[A-Z]/.test(password.value),
  lowercase: /[a-z]/.test(password.value),
  number: /[0-9]/.test(password.value),
  special: /[!@#$%^&*]/.test(password.value),
}));

const allMet = computed(() => Object.values(requirements.value).every(Boolean));
</script>

<template>
  <FieldPassword
    id="password"
    label="Create Password"
    v-model="password"
    placeholder="Choose a strong password"
    autocomplete="new-password"
    required
  >
    <template #helper>
      <div class="small mt-space-xxs">
        <p class="mb-1 fw-semibold">Password must contain:</p>
        <ul class="list-unstyled mb-0">
          <li :class="requirements.length ? 'text-success' : 'text-muted'">
            <i
              :class="
                requirements.length
                  ? 'fa-solid fa-check'
                  : 'fa-regular fa-circle'
              "
            />
            At least 8 characters
          </li>
          <li :class="requirements.uppercase ? 'text-success' : 'text-muted'">
            <i
              :class="
                requirements.uppercase
                  ? 'fa-solid fa-check'
                  : 'fa-regular fa-circle'
              "
            />
            One uppercase letter
          </li>
          <li :class="requirements.lowercase ? 'text-success' : 'text-muted'">
            <i
              :class="
                requirements.lowercase
                  ? 'fa-solid fa-check'
                  : 'fa-regular fa-circle'
              "
            />
            One lowercase letter
          </li>
          <li :class="requirements.number ? 'text-success' : 'text-muted'">
            <i
              :class="
                requirements.number
                  ? 'fa-solid fa-check'
                  : 'fa-regular fa-circle'
              "
            />
            One number
          </li>
          <li :class="requirements.special ? 'text-success' : 'text-muted'">
            <i
              :class="
                requirements.special
                  ? 'fa-solid fa-check'
                  : 'fa-regular fa-circle'
              "
            />
            One special character (!@#$%^&*)
          </li>
        </ul>
      </div>
    </template>
  </FieldPassword>
</template>
```

### With Validation

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref, computed } from "vue";

const password = ref("");
const error = computed(() => {
  if (!password.value) return "Password is required";
  if (password.value.length < 8)
    return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password.value))
    return "Password must contain an uppercase letter";
  if (!/[0-9]/.test(password.value)) return "Password must contain a number";
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
    required
  />
</template>
```

### Password Confirmation

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref, computed } from "vue";

const password = ref("");
const confirmPassword = ref("");

const confirmError = computed(() => {
  if (!confirmPassword.value) return "Please confirm your password";
  if (confirmPassword.value !== password.value) return "Passwords do not match";
  return "";
});
</script>

<template>
  <div>
    <FieldPassword
      id="password"
      label="New Password"
      v-model="password"
      placeholder="Enter password"
      autocomplete="new-password"
      required
    />

    <FieldPassword
      id="confirm-password"
      label="Confirm Password"
      v-model="confirmPassword"
      placeholder="Re-enter password"
      autocomplete="new-password"
      :error="confirmError"
      required
      class="mt-space-sm"
    />
  </div>
</template>
```

### With Tooltip

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref } from "vue";

const password = ref("");
</script>

<template>
  <FieldPassword
    id="password"
    label="Password"
    v-model="password"
    tooltip-message="Your password should be at least 8 characters and include uppercase, lowercase, and numbers"
    required
  />
</template>
```

### Optional Field

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref } from "vue";

const optionalPassword = ref("");
</script>

<template>
  <FieldPassword
    id="optional-password"
    label="Additional Password"
    v-model="optionalPassword"
    :is-optional="true"
    optional-text="Optional"
    help-text="Only required for advanced features"
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

**Autocomplete values:**

- `current-password` - For login forms (default)
- `new-password` - For registration and password change forms

## Slots

### `helper`

Custom content area below the input field, perfect for:

- Password requirements checklist
- Password strength indicator
- "Forgot password?" link
- Additional help text or actions

```vue
<template>
  <FieldPassword id="pwd" label="Password">
    <template #helper>
      <!-- Your custom content here -->
    </template>
  </FieldPassword>
</template>
```

**Note:** The helper slot replaces `helpText` prop if both are provided.

## Events

| Event               | Payload  | Description                      |
| ------------------- | -------- | -------------------------------- |
| `update:modelValue` | `string` | Emitted when input value changes |

## Toggle Button Behavior

The show/hide toggle button:

- Shows an eye icon (👁️) when password is hidden
- Shows an eye-slash icon (👁️‍🗨️) when password is visible
- Has proper `aria-label` for screen readers
- Preserves cursor position when toggling
- Uses `type="button"` to prevent form submission
- Is keyboard accessible (Tab to focus, Enter/Space to toggle)

## Accessibility

The component follows WCAG 2.1 guidelines:

- ✅ **Proper Labels** - Label associated with input via `for`/`id`
- ✅ **Toggle Button** - Accessible with `aria-label` and screen reader text
- ✅ **Required Fields** - `aria-required` attribute
- ✅ **Error States** - `aria-invalid` and `aria-describedby` for errors
- ✅ **Help Text** - Associated via `aria-describedby`
- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Focus Management** - Proper focus indicators
- ✅ **Screen Readers** - All content announced properly

## Styling

The component uses Bootstrap 5 classes and RDS spacing:

```vue
<template>
  <FieldPassword
    id="password"
    label="Password"
    v-model="password"
    class="mb-space-md"
  />
</template>
```

## Form Integration

Works seamlessly with form libraries:

### With VeeValidate

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { useField } from "vee-validate";

const { value, errorMessage } = useField("password", "required|min:8");
</script>

<template>
  <FieldPassword
    id="password"
    label="Password"
    v-model="value"
    :error="errorMessage"
    required
  />
</template>
```

### With Zod

```vue
<script setup lang="ts">
import { FieldPassword } from "@bootcn-vue/field-password";
import { ref, computed } from "vue";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[0-9]/, "Must contain number");

const password = ref("");

const error = computed(() => {
  const result = passwordSchema.safeParse(password.value);
  return result.success ? "" : result.error.issues[0].message;
});
</script>

<template>
  <FieldPassword
    id="password"
    label="Password"
    v-model="password"
    :error="error"
  />
</template>
```

## Security Considerations

- Password is masked by default (type="password")
- Toggle button allows users to verify input
- Cursor position is preserved to avoid user confusion
- No password value is exposed in DOM attributes
- Works with browser password managers
- Supports autocomplete for better UX

## Dependencies

- `@bootcn-vue/forms` - Form primitives (includes InputPassword)
- `@bootcn-vue/core` - Core utilities
- `@fortawesome/vue-fontawesome` - Icons for toggle button

## Peer Dependencies

- `vue` ^3.5.0
- `bootstrap` ^5.3.0

## Links

- **[GitHub Repository](https://github.com/banavasi/Bootcn-vue)**
- **[Documentation](https://banavasi.github.io/Bootcn-vue/)**
- **[Report Issues](https://github.com/banavasi/Bootcn-vue/issues)**

## Related Packages

- [@bootcn-vue/cli](https://www.npmjs.com/package/@bootcn-vue/cli) - CLI for adding components
- [@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms) - Form primitives and components
- [@bootcn-vue/field-text](https://www.npmjs.com/package/@bootcn-vue/field-text) - Text input field component
- [@bootcn-vue/core](https://www.npmjs.com/package/@bootcn-vue/core) - Core utilities

## License

MIT © [Shashank Shandilya](https://github.com/banavasi)
