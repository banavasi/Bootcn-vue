# @bootcn-vue/forms

Accessible, customizable form components and primitives built with Bootstrap 5 and Vue 3.

[![npm version](https://badge.fury.io/js/@bootcn-vue%2Fforms.svg)](https://www.npmjs.com/package/@bootcn-vue/forms)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

**[View Components & Examples](https://banavasi.github.io/Bootcn-vue/)** - Interactive Storybook with live examples

## Overview

This package provides a comprehensive set of form components and primitives for building accessible, type-safe forms in Vue 3. Components follow Bootstrap 5 conventions and use the RDS spacing system.

### Architecture

- **Primitives** - Low-level building blocks (`InputRoot`, `InputLabel`, `InputField`, `InputError`, `InputHelp`)
- **Specialized Components** - Higher-level components built on primitives (`InputPassword`, `InputMasked`, `InputNumericRange`)
- **Field Components** - Complete field components with labels, validation, and help text (see [@bootcn-vue/field-text](https://www.npmjs.com/package/@bootcn-vue/field-text) and [@bootcn-vue/field-password](https://www.npmjs.com/package/@bootcn-vue/field-password))

## Installation

### Using CLI (Recommended)

```bash
# Initialize bootcn-vue (if not already done)
npx @bootcn-vue/cli@latest init

# Add form components (when available via CLI)
npx @bootcn-vue/cli@latest add input
```

### Direct Installation

```bash
npm install @bootcn-vue/forms @bootcn-vue/core bootstrap reka-ui
```

## Components

### Form Primitives

Build custom form fields using composable primitives:

#### `InputRoot`

Container that provides form context to child components.

```vue
<script setup lang="ts">
import { InputRoot } from "@bootcn-vue/forms";
</script>

<template>
  <InputRoot id="email" :error="errorMessage" :disabled="false">
    <!-- Child components go here -->
  </InputRoot>
</template>
```

**Props:**

- `id: string` - Unique ID for the input (required)
- `error?: string` - Error message
- `disabled?: boolean` - Disable state
- `required?: boolean` - Required state

#### `InputLabel`

Accessible label with optional tooltip, optional badge, and customizable icons. Provides flexible labeling for form fields with semantic heading levels and visual sizing.

**Basic Usage:**

```vue
<script setup lang="ts">
import { InputLabel } from "@bootcn-vue/forms";
</script>

<template>
  <InputRoot id="email">
    <InputLabel>Email Address</InputLabel>
    <InputField type="email" />
  </InputRoot>
</template>
```

**With Tooltip:**

```vue
<InputRoot id="company">
  <InputLabel tooltip-message="Enter your company's legal name as it appears on official documents">
    Company Name
  </InputLabel>
  <InputField type="text" />
</InputRoot>
```

**Optional Field:**

```vue
<InputRoot id="middle-name">
  <InputLabel is-optional>
    Middle Name
  </InputLabel>
  <InputField type="text" />
</InputRoot>
```

**Props:**

| Prop              | Type                                           | Default      | Description                                     |
| ----------------- | ---------------------------------------------- | ------------ | ----------------------------------------------- |
| `level`           | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"`       | Semantic heading level for the label            |
| `size`            | `"small" \| "medium" \| "large"`               | `"small"`    | Visual size of the label text                   |
| `class`           | `HTMLAttributes["class"]`                      | `undefined`  | Additional CSS classes                          |
| `tooltipMessage`  | `string`                                       | `undefined`  | Tooltip text. When provided, shows an info icon |
| `tooltipPosition` | `"top" \| "bottom" \| "left" \| "right"`       | `"top"`      | Position of the tooltip relative to the icon    |
| `isOptional`      | `boolean`                                      | `false`      | Shows an optional badge next to the label       |
| `optionalText`    | `string`                                       | `"Optional"` | Text displayed in the optional badge            |
| `iconPosition`    | `"before" \| "after"`                          | `"after"`    | Position of the tooltip icon relative to label  |

**Slots:**

| Slot Name        | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `default`        | Label text content                                     |
| `icon`           | Custom icon for tooltip trigger (replaces default SVG) |
| `optional-badge` | Custom content for the optional indicator              |

**Advanced Examples:**

**Custom Tooltip Icon (FontAwesome):**

```vue
<template>
  <InputRoot id="security-code">
    <InputLabel
      tooltip-message="This is sensitive information that we keep secure"
    >
      Security Code
      <template #icon>
        <FontAwesomeIcon
          :icon="['fas', 'shield-halved']"
          class="text-warning"
        />
      </template>
    </InputLabel>
    <InputField type="text" />
  </InputRoot>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { InputRoot, InputField, InputLabel } from "@bootcn-vue/forms";
</script>
```

**Icon Position (Before Label):**

```vue
<InputLabel
  tooltip-message="Important security information"
  icon-position="before"
>
  API Key
</InputLabel>
```

**Custom Optional Badge:**

```vue
<!-- Custom text -->
<InputLabel is-optional optional-text="Not Required">
  Nickname
</InputLabel>

<!-- Custom icon badge -->
<InputLabel is-optional>
  Display Name
  <template #optional-badge>
    <FontAwesomeIcon :icon="['fas', 'circle-question']" class="text-muted" size="sm" />
  </template>
</InputLabel>
```

**Label Sizing:**

```vue
<!-- Small (default) -->
<InputLabel level="h3" size="small">Small Label</InputLabel>

<!-- Medium -->
<InputLabel level="h3" size="medium">Medium Label</InputLabel>

<!-- Large -->
<InputLabel level="h2" size="large">Large Label</InputLabel>
```

**Accessibility:**

- Uses semantic `<label>` element with proper `for` attribute
- Tooltip icon button includes `aria-label="More information"`
- Supports keyboard navigation for tooltip trigger
- SVG icons have `aria-hidden="true"` to prevent screen reader announcement
- Works seamlessly with InputRoot's context for ID management

> **📖 Detailed Guide:** See [INPUT_LABEL_GUIDE.md](./INPUT_LABEL_GUIDE.md) for comprehensive examples and advanced usage patterns.

#### `InputField`

The actual input element with Bootstrap styling.

```vue
<script setup lang="ts">
import { InputField } from "@bootcn-vue/forms";
</script>

<template>
  <InputField
    id="email"
    v-model="email"
    type="email"
    placeholder="you@example.com"
  />
</template>
```

**Props:**

- `id: string` - Input ID (required)
- `modelValue?: string | number` - v-model binding
- `type?: string` - Input type (default: `text`)
- `placeholder?: string`
- `disabled?: boolean`
- `readonly?: boolean`
- `required?: boolean`
- `autocomplete?: string`
- `class?: string`

#### `InputHelp`

Help text displayed below the input.

```vue
<script setup lang="ts">
import { InputHelp } from "@bootcn-vue/forms";
</script>

<template>
  <InputHelp>We'll never share your email with anyone.</InputHelp>
</template>
```

#### `InputError`

Error message with alert styling.

```vue
<script setup lang="ts">
import { InputError } from "@bootcn-vue/forms";
</script>

<template>
  <InputError v-if="error">{{ error }}</InputError>
</template>
```

### Specialized Input Components

#### `InputPassword`

Password input with show/hide toggle.

```vue
<script setup lang="ts">
import { InputPassword } from "@bootcn-vue/forms";
import { ref } from "vue";

const password = ref("");
</script>

<template>
  <InputPassword
    id="password"
    v-model="password"
    placeholder="Enter password"
  />
</template>
```

**Features:**

- Toggle button to show/hide password
- Maintains cursor position when toggling
- Accessible with keyboard navigation
- FontAwesome icons for toggle button

#### `InputMasked`

Input with custom masking using `maska` library.

```vue
<script setup lang="ts">
import { InputMasked } from "@bootcn-vue/forms";
import { ref } from "vue";

const phone = ref("");
</script>

<template>
  <InputMasked
    id="phone"
    v-model="phone"
    mask="(###) ###-####"
    placeholder="(555) 555-5555"
  />
</template>
```

**Props:**

- `mask: string | string[]` - Mask pattern (e.g., `###-##-####`)
- All standard input props

**Mask Patterns:**

- `#` - Number (0-9)
- `@` - Letter (a-z, A-Z)
- `*` - Alphanumeric
- `!` - Escape character

#### `InputNumericRange`

Numeric input with min/max validation.

```vue
<script setup lang="ts">
import { InputNumericRange } from "@bootcn-vue/forms";
import { ref } from "vue";

const age = ref(25);
</script>

<template>
  <InputNumericRange
    id="age"
    v-model="age"
    :min="18"
    :max="120"
    placeholder="Enter your age"
  />
</template>
```

**Props:**

- `min?: number` - Minimum value
- `max?: number` - Maximum value
- All standard input props

### Complete Field Components

For ready-to-use form fields with labels, validation, and help text:

- **[@bootcn-vue/field-text](https://www.npmjs.com/package/@bootcn-vue/field-text)** - Text input field
- **[@bootcn-vue/field-password](https://www.npmjs.com/package/@bootcn-vue/field-password)** - Password field with toggle
- **FieldSSN** - Social Security Number field (included in this package)

#### `FieldSSN`

Complete SSN field with masking and validation.

```vue
<script setup lang="ts">
import { FieldSSN } from "@bootcn-vue/forms";
import { ref } from "vue";

const ssn = ref("");
</script>

<template>
  <FieldSSN
    id="ssn"
    label="Social Security Number"
    v-model="ssn"
    required
    help-text="Format: XXX-XX-XXXX"
  />
</template>
```

## Building Custom Fields

Use primitives to build your own field components:

```vue
<script setup lang="ts">
import {
  InputRoot,
  InputLabel,
  InputField,
  InputHelp,
  InputError,
} from "@bootcn-vue/forms";
import { ref, computed } from "vue";

const email = ref("");
const error = computed(() => {
  if (!email.value) return "Email is required";
  if (!email.value.includes("@")) return "Invalid email format";
  return "";
});
</script>

<template>
  <InputRoot id="email" :error="error" :required="true">
    <InputLabel for="email" level="h3" size="small" :required="true">
      Email Address
      <template #tooltip>We'll send confirmation here</template>
    </InputLabel>

    <InputField
      id="email"
      v-model="email"
      type="email"
      placeholder="you@example.com"
    />

    <InputHelp v-if="!error">
      We'll never share your email with anyone.
    </InputHelp>

    <InputError v-if="error">{{ error }}</InputError>
  </InputRoot>
</template>
```

## Form Context

The `InputRoot` component provides context to all child components using Vue's `provide/inject`:

```typescript
interface FormFieldContext {
  id: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}
```

Child components automatically consume this context, eliminating prop drilling.

## Accessibility

All components follow WCAG 2.1 guidelines:

- ✅ Proper label associations with `for` and `id` attributes
- ✅ ARIA attributes for error states (`aria-invalid`, `aria-describedby`)
- ✅ Required indicators with `aria-required`
- ✅ Keyboard navigation support
- ✅ Screen reader announcements for errors
- ✅ Focus management
- ✅ High contrast support

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { BaseFieldProps, FormFieldContext } from "@bootcn-vue/forms";

interface MyFieldProps extends BaseFieldProps {
  customProp?: string;
}
```

## Styling

Components use Bootstrap 5 classes and the RDS spacing system:

```vue
<template>
  <!-- RDS spacing classes -->
  <div class="mb-space-sm">
    <InputField id="name" class="form-control" />
  </div>
</template>
```

## Dependencies

- `@bootcn-vue/core` - Core utilities (`cn` function, `cva`)
- `@bootcn-vue/tooltip` - Tooltip component for labels
- `reka-ui` - Accessible primitives
- `maska` - Input masking library
- `@fortawesome/vue-fontawesome` - Icons

## Peer Dependencies

- `vue` ^3.5.0
- `bootstrap` ^5.3.0

## Links

- **[GitHub Repository](https://github.com/banavasi/Bootcn-vue)**
- **[Documentation](https://banavasi.github.io/Bootcn-vue/)**
- **[Report Issues](https://github.com/banavasi/Bootcn-vue/issues)**
- **[Input Label Guide](./INPUT_LABEL_GUIDE.md)** - Detailed guide on using InputLabel

## Related Packages

- [@bootcn-vue/cli](https://www.npmjs.com/package/@bootcn-vue/cli) - CLI for adding components
- [@bootcn-vue/core](https://www.npmjs.com/package/@bootcn-vue/core) - Core utilities
- [@bootcn-vue/field-text](https://www.npmjs.com/package/@bootcn-vue/field-text) - Text input field
- [@bootcn-vue/field-password](https://www.npmjs.com/package/@bootcn-vue/field-password) - Password field
- [@bootcn-vue/buttons](https://www.npmjs.com/package/@bootcn-vue/buttons) - Button components

## License

MIT © [Shashank Shandilya](https://github.com/banavasi)
