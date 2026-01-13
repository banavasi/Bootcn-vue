# @bootcn-vue/field-text

Complete text input field component with label, validation, and help text for Vue 3.

[![npm version](https://badge.fury.io/js/@bootcn-vue%2Ffield-text.svg)](https://www.npmjs.com/package/@bootcn-vue/field-text)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

**[View Components & Examples](https://banavasi.github.io/Bootcn-vue/?path=/docs/forms-field-text--docs)** - Interactive Storybook

## Overview

A complete, production-ready text input field component that includes label, input, help text, error messages, and optional tooltips. Built on [@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms) primitives with Bootstrap 5 styling.

## Installation

### Using CLI (Recommended)

```bash
# Initialize bootcn-vue (if not already done)
npx @bootcn-vue/cli@latest init

# Add field-text component (when available)
npx @bootcn-vue/cli@latest add field-text
```

### Direct Installation

```bash
npm install @bootcn-vue/field-text @bootcn-vue/forms @bootcn-vue/core bootstrap
```

## Features

- ✅ **Complete Field** - Label, input, help text, and error messages in one component
- ✅ **Multiple Input Types** - text, email, tel, url, search
- ✅ **Validation** - Built-in error message display
- ✅ **Accessible** - ARIA attributes and keyboard navigation
- ✅ **Tooltips** - Optional info tooltips next to labels
- ✅ **Flexible Labels** - Control heading level, size, and visibility
- ✅ **Optional Badge** - Show "Optional" badge for non-required fields
- ✅ **TypeScript** - Full type safety
- ✅ **RDS Spacing** - Consistent spacing with RDS system

## Usage

### Basic Example

```vue
<script setup lang="ts">
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

### With Validation

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref, computed } from "vue";

const email = ref("");
const error = computed(() => {
  if (!email.value) return "Email is required";
  if (!email.value.includes("@")) return "Invalid email format";
  return "";
});
</script>

<template>
  <FieldText
    id="email"
    v-model="email"
    type="email"
    label="Email Address"
    placeholder="you@example.com"
    :error="error"
  />
</template>
```

### With Tooltip

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref } from "vue";

const username = ref("");
</script>

<template>
  <FieldText
    id="username"
    v-model="username"
    label="Username"
    placeholder="Choose a username"
    tooltip-message="Your username will be visible to other users"
    required
  />
</template>
```

### Optional Field

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref } from "vue";

const middleName = ref("");
</script>

<template>
  <FieldText
    id="middle-name"
    v-model="middleName"
    label="Middle Name"
    placeholder="Optional"
    :is-optional="true"
    optional-text="Optional"
  />
</template>
```

### Different Input Types

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref } from "vue";

const email = ref("");
const phone = ref("");
const website = ref("");
const search = ref("");
</script>

<template>
  <!-- Email -->
  <FieldText
    id="email"
    v-model="email"
    type="email"
    label="Email"
    placeholder="you@example.com"
    autocomplete="email"
  />

  <!-- Phone -->
  <FieldText
    id="phone"
    v-model="phone"
    type="tel"
    label="Phone Number"
    placeholder="(555) 555-5555"
    autocomplete="tel"
  />

  <!-- Website -->
  <FieldText
    id="website"
    v-model="website"
    type="url"
    label="Website"
    placeholder="https://example.com"
    autocomplete="url"
  />

  <!-- Search -->
  <FieldText
    id="search"
    v-model="search"
    type="search"
    label="Search"
    placeholder="Search..."
  />
</template>
```

### Hidden Label (Visually)

For cases where the label is visually redundant but needed for accessibility:

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref } from "vue";

const search = ref("");
</script>

<template>
  <FieldText
    id="search"
    v-model="search"
    type="search"
    label="Search"
    :label-visible="false"
    placeholder="Search..."
  />
</template>
```

### Custom Label Styling

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref } from "vue";

const name = ref("");
</script>

<template>
  <FieldText
    id="name"
    v-model="name"
    label="Full Name"
    label-level="h2"
    label-size="large"
    required
  />
</template>
```

### Disabled and Readonly

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref } from "vue";

const username = ref("johndoe");
const id = ref("12345");
</script>

<template>
  <!-- Disabled -->
  <FieldText
    id="username"
    v-model="username"
    label="Username"
    :disabled="true"
  />

  <!-- Readonly -->
  <FieldText
    id="user-id"
    v-model="id"
    label="User ID"
    :readonly="true"
    help-text="This field cannot be edited"
  />
</template>
```

## Props

### Specific Props

| Prop           | Type                                              | Default  | Description                  |
| -------------- | ------------------------------------------------- | -------- | ---------------------------- |
| `type`         | `'text' \| 'email' \| 'tel' \| 'url' \| 'search'` | `'text'` | HTML input type              |
| `autocomplete` | `string`                                          | -        | Autocomplete attribute value |

### Base Props (from @bootcn-vue/forms)

| Prop             | Type                                 | Default      | Description                          |
| ---------------- | ------------------------------------ | ------------ | ------------------------------------ |
| `id`             | `string`                             | **required** | Unique ID for the input element      |
| `label`          | `string`                             | **required** | Label text for the field             |
| `modelValue`     | `string`                             | `''`         | v-model binding for the input value  |
| `placeholder`    | `string`                             | `undefined`  | Placeholder text                     |
| `required`       | `boolean`                            | `false`      | Mark field as required               |
| `disabled`       | `boolean`                            | `false`      | Disable the input                    |
| `readonly`       | `boolean`                            | `false`      | Make input readonly                  |
| `error`          | `string`                             | `undefined`  | Error message to display             |
| `helpText`       | `string`                             | `undefined`  | Help text below input                |
| `tooltipMessage` | `string`                             | `undefined`  | Tooltip next to label                |
| `isOptional`     | `boolean`                            | `false`      | Show optional badge                  |
| `optionalText`   | `string`                             | `'Optional'` | Custom optional badge text           |
| `labelLevel`     | `'h1'\|'h2'\|'h3'\|'h4'\|'h5'\|'h6'` | `'h3'`       | Heading level for label              |
| `labelSize`      | `'small'\|'medium'\|'large'`         | `'small'`    | Label font size                      |
| `labelVisible`   | `boolean`                            | `true`       | Show/hide label visually             |
| `class`          | `string`                             | `undefined`  | Additional CSS classes for container |
| `inputClass`     | `string`                             | `undefined`  | Additional CSS classes for input     |

## Events

| Event               | Payload  | Description                      |
| ------------------- | -------- | -------------------------------- |
| `update:modelValue` | `string` | Emitted when input value changes |

## Accessibility

The component follows WCAG 2.1 guidelines:

- ✅ **Proper Labels** - Label associated with input via `for`/`id`
- ✅ **Required Fields** - `aria-required` attribute
- ✅ **Error States** - `aria-invalid` and `aria-describedby` for errors
- ✅ **Help Text** - Associated via `aria-describedby`
- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Screen Readers** - All content announced properly
- ✅ **Focus Management** - Proper focus indicators

## Styling

The component uses Bootstrap 5 classes and RDS spacing:

```vue
<template>
  <!-- Bootstrap form-control with RDS spacing -->
  <FieldText
    id="name"
    v-model="name"
    label="Name"
    class="mb-space-md"
    input-class="form-control-lg"
  />
</template>
```

## Form Integration

Works seamlessly with form libraries:

### With VeeValidate

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { useField } from "vee-validate";

const { value, errorMessage } = useField("email", "required|email");
</script>

<template>
  <FieldText
    id="email"
    v-model="value"
    type="email"
    label="Email"
    :error="errorMessage"
    required
  />
</template>
```

### With Zod + Vue

```vue
<script setup lang="ts">
import { FieldText } from "@bootcn-vue/field-text";
import { ref, computed } from "vue";
import { z } from "zod";

const emailSchema = z.string().email();
const email = ref("");

const error = computed(() => {
  const result = emailSchema.safeParse(email.value);
  return result.success ? "" : result.error.issues[0].message;
});
</script>

<template>
  <FieldText
    id="email"
    v-model="email"
    type="email"
    label="Email"
    :error="error"
  />
</template>
```

## Dependencies

- `@bootcn-vue/forms` - Form primitives
- `@bootcn-vue/core` - Core utilities

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
- [@bootcn-vue/field-password](https://www.npmjs.com/package/@bootcn-vue/field-password) - Password field component
- [@bootcn-vue/core](https://www.npmjs.com/package/@bootcn-vue/core) - Core utilities

## License

MIT © [Shashank Shandilya](https://github.com/banavasi)
