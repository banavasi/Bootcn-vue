# Individual Checkbox Component Design

**Date:** 2026-01-14  
**Status:** Approved  
**Package:** `@bootcn-vue/checkbox`

## Overview

A reusable individual checkbox component for the bootcn-vue library with tri-state support ('Y', 'N', null), Bootstrap and RDS color variants, and flexible sizing.

---

## Requirements

### Functional Requirements

1. **Tri-state model**: Support `'Y'` (checked), `'N'` (unchecked), and `null` (unchecked, no action)
2. **v-model support**: Two-way binding with `'Y' | 'N' | null` values
3. **Click behavior**:
   - `null` → `'Y'` (check)
   - `'N'` → `'Y'` (check)
   - `'Y'` → `'N'` (uncheck)
4. **Size variants**: `sm`, `md` (default), `lg`
5. **Color variants**: Support both Bootstrap theme colors and RDS colors
6. **Icon customization**: Default SVG checkmark with slot override option
7. **Accessibility**: Proper ARIA attributes and keyboard navigation

### Non-Functional Requirements

1. TypeScript strict mode compliance
2. Comprehensive unit tests (Vitest)
3. Storybook documentation
4. Follows project code standards (AGENTS.md)

---

## Architecture

### Package Structure

```
packages/checkbox/
├── src/
│   ├── Checkbox.vue          # Main component
│   ├── index.ts               # Barrel export with cva variants
│   └── Checkbox.spec.ts       # Unit tests
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

### Component Hierarchy

```
CheckboxRoot (reka-ui)
  └── CheckboxIndicator (reka-ui)
        └── SVG Icon (default) or Slot (custom)
```

### Props Interface

```typescript
interface Props {
  modelValue?: "Y" | "N" | null; // Checkbox state
  variant?: CheckboxVariants["variant"]; // Color variant
  size?: CheckboxVariants["size"]; // Size variant
  class?: HTMLAttributes["class"]; // Additional classes
  disabled?: boolean; // Disabled state
}
```

### Events

```typescript
{
  'update:modelValue': [value: 'Y' | 'N' | null]
}
```

### Slots

- `icon`: Custom checkmark icon (default: SVG check)

---

## Styling & Variants

### CVA Variants (index.ts)

```typescript
export const checkboxVariants = cva(
  "form-check-input border rounded cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        // Bootstrap theme colors
        primary: "checked:bg-primary checked:border-primary",
        secondary: "checked:bg-secondary checked:border-secondary",
        success: "checked:bg-success checked:border-success",
        danger: "checked:bg-danger checked:border-danger",
        warning: "checked:bg-warning checked:border-warning",
        info: "checked:bg-info checked:border-info",
        dark: "checked:bg-dark checked:border-dark",
        light: "checked:bg-light checked:border-light",
        // RDS colors
        "rds-dark-1": "checked:bg-rds-dark-1 checked:border-rds-dark-1",
        "rds-dark-2": "checked:bg-rds-dark-2 checked:border-rds-dark-2",
        "rds-dark-3": "checked:bg-rds-dark-3 checked:border-rds-dark-3",
        "rds-light-1": "checked:bg-rds-light-1 checked:border-rds-light-1",
        "rds-light-2": "checked:bg-rds-light-2 checked:border-rds-light-2",
        "rds-light-3": "checked:bg-rds-light-3 checked:border-rds-light-3",
        "rds-light-4": "checked:bg-rds-light-4 checked:border-rds-light-4",
        "rds-light-5": "checked:bg-rds-light-5 checked:border-rds-light-5",
      },
      size: {
        sm: "h-4 w-4", // 1rem
        md: "h-5 w-5", // 1.25rem
        lg: "h-6 w-6", // 1.5rem
      },
    },
    defaultVariants: {
      variant: "rds-dark-3",
      size: "md",
    },
  },
);
```

### Interaction States

- **Unchecked**: `bg-white` with border
- **Checked**: Background and border color match variant
- **Focus**: `focus:ring-2 focus:ring-offset-1` with variant color
- **Hover**: Subtle border color change
- **Disabled**: `opacity-50 cursor-not-allowed`

### Icon Sizing

- `sm`: 0.75rem (12px)
- `md`: 1rem (16px)
- `lg`: 1.25rem (20px)

---

## Implementation

### Checkbox.vue

```vue
<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { CheckboxRoot, CheckboxIndicator } from "reka-ui";
import { computed } from "vue";
import { type CheckboxVariants, checkboxVariants } from ".";
import { cn } from "@/lib/utils";

interface Props {
  modelValue?: "Y" | "N" | null;
  variant?: CheckboxVariants["variant"];
  size?: CheckboxVariants["size"];
  class?: HTMLAttributes["class"];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  variant: "rds-dark-3",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: "Y" | "N" | null];
}>();

// Convert 'Y'/'N'/null to boolean for CheckboxRoot
const checked = computed({
  get: () => props.modelValue === "Y",
  set: (value: boolean) => {
    emit("update:modelValue", value ? "Y" : "N");
  },
});

// Icon size based on checkbox size
const iconSize = computed(() => {
  const sizes = { sm: "0.75rem", md: "1rem", lg: "1.25rem" };
  return sizes[props.size || "md"];
});
</script>

<template>
  <CheckboxRoot
    v-model:checked="checked"
    :disabled="props.disabled"
    :class="
      cn(
        checkboxVariants({ variant: props.variant, size: props.size }),
        props.class,
      )
    "
    data-slot="checkbox"
  >
    <CheckboxIndicator
      class="flex items-center justify-center h-full w-full text-white"
    >
      <slot name="icon">
        <!-- Default SVG checkmark -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :width="iconSize"
          :height="iconSize"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
```

### index.ts (Barrel Export)

```typescript
import { cva, type VariantProps } from "class-variance-authority";

export { default as Checkbox } from "./Checkbox.vue";

export const checkboxVariants = cva(
  "form-check-input border rounded cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        // Bootstrap theme colors
        primary: "checked:bg-primary checked:border-primary",
        secondary: "checked:bg-secondary checked:border-secondary",
        success: "checked:bg-success checked:border-success",
        danger: "checked:bg-danger checked:border-danger",
        warning: "checked:bg-warning checked:border-warning",
        info: "checked:bg-info checked:border-info",
        dark: "checked:bg-dark checked:border-dark",
        light: "checked:bg-light checked:border-light",
        // RDS colors
        "rds-dark-1": "checked:bg-rds-dark-1 checked:border-rds-dark-1",
        "rds-dark-2": "checked:bg-rds-dark-2 checked:border-rds-dark-2",
        "rds-dark-3": "checked:bg-rds-dark-3 checked:border-rds-dark-3",
        "rds-light-1": "checked:bg-rds-light-1 checked:border-rds-light-1",
        "rds-light-2": "checked:bg-rds-light-2 checked:border-rds-light-2",
        "rds-light-3": "checked:bg-rds-light-3 checked:border-rds-light-3",
        "rds-light-4": "checked:bg-rds-light-4 checked:border-rds-light-4",
        "rds-light-5": "checked:bg-rds-light-5 checked:border-rds-light-5",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "rds-dark-3",
      size: "md",
    },
  },
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
```

---

## Testing Strategy

### Unit Tests Coverage

1. **State Rendering**
   - Unchecked when `modelValue` is `null`
   - Unchecked when `modelValue` is `'N'`
   - Checked when `modelValue` is `'Y'`

2. **Interaction**
   - Emits `'Y'` when clicked while unchecked (`null` or `'N'`)
   - Emits `'N'` when clicked while checked (`'Y'`)
   - Does not emit when disabled

3. **Variants**
   - Size variants apply correct classes (`sm`, `md`, `lg`)
   - Color variants apply correct classes (Bootstrap + RDS)

4. **Customization**
   - Accepts custom classes via `class` prop
   - Renders custom icon via `icon` slot

### Test File Structure (Checkbox.spec.ts)

```typescript
describe("Checkbox", () => {
  describe("State Rendering", () => {
    it("renders unchecked when modelValue is null");
    it("renders unchecked when modelValue is N");
    it("renders checked when modelValue is Y");
  });

  describe("Interaction", () => {
    it("emits update:modelValue with Y when clicked while unchecked");
    it("emits update:modelValue with N when clicked while checked");
    it("respects disabled state");
  });

  describe("Variants", () => {
    it("applies size variants correctly");
    it("applies Bootstrap color variants correctly");
    it("applies RDS color variants correctly");
  });

  describe("Customization", () => {
    it("accepts custom classes");
    it("renders custom icon via slot");
  });
});
```

---

## Documentation

### Usage Examples

#### Basic Example

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Checkbox } from "@bootcn-vue/checkbox";

const accepted = ref<"Y" | "N" | null>(null);
</script>

<template>
  <label class="d-flex align-items-center gap-space-xs">
    <Checkbox v-model="accepted" />
    <span>Accept terms and conditions</span>
  </label>
</template>
```

#### Size Variants

```vue
<Checkbox v-model="value" size="sm" />
<Checkbox v-model="value" size="md" />
<Checkbox v-model="value" size="lg" />
```

#### Color Variants

```vue
<!-- Bootstrap colors -->
<Checkbox v-model="value" variant="primary" />
<Checkbox v-model="value" variant="success" />
<Checkbox v-model="value" variant="danger" />

<!-- RDS colors -->
<Checkbox v-model="value" variant="rds-dark-3" />
<Checkbox v-model="value" variant="rds-light-4" />
```

#### Custom Icon

```vue
<Checkbox v-model="value">
  <template #icon>
    <Icon icon="mdi:check-bold" />
  </template>
</Checkbox>
```

#### Disabled State

```vue
<Checkbox v-model="value" disabled />
```

### Storybook Stories

1. **Default**: All variants showcase
2. **Sizes**: Small, medium, large comparison
3. **Colors**: Bootstrap and RDS color variants
4. **States**: Checked, unchecked, disabled
5. **Custom Icon**: Slot usage example
6. **Form Integration**: Multiple checkboxes in a form

---

## Implementation Steps

1. **Scaffold Package**: Run `pnpm create:module`
   - Module name: `checkbox`
   - Description: Individual checkbox component with tri-state support
   - Component name: `Checkbox`

2. **Implement Component**: Create `Checkbox.vue` with design above

3. **Create Variants**: Implement `index.ts` with cva configuration

4. **Write Tests**: Comprehensive unit tests in `Checkbox.spec.ts`

5. **Add to Storybook**: Create stories for all variants

6. **User Testing**: Request user feedback on Storybook

7. **Documentation**: Update README with usage examples

8. **Validation**: Run `pnpm lint && pnpm type-check && pnpm test:unit`

9. **Changeset**: Create changeset for release

10. **Complete**: Mark task complete in TASKS.md

---

## Success Criteria

- [ ] Component renders correctly in all three states
- [ ] v-model binding works with 'Y', 'N', and null values
- [ ] All size variants (sm, md, lg) display correctly
- [ ] All color variants (Bootstrap + RDS) work as expected
- [ ] Custom icon slot functions properly
- [ ] Disabled state prevents interaction
- [ ] All unit tests pass
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Storybook documentation complete
- [ ] User testing approved

---

## Future Enhancements (Out of Scope)

- CheckboxGroup component for multiple selections
- Indeterminate state support
- Form validation integration
- Custom animations for check/uncheck transitions
