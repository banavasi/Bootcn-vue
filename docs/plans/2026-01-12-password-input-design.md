# Password Input Component Design

**Date:** 2026-01-12  
**Status:** Approved  
**Feature:** Password input primitive and high-level wrapper with show/hide toggle

---

## Overview

Create password input components following the bootcn-vue architecture pattern:

1. **InputPassword** - Primitive component with show/hide toggle functionality
2. **FieldPassword** - High-level wrapper for easy form integration

---

## Architecture

### InputPassword Primitive

**Location:** `packages/forms/src/primitives/InputPassword/`

**Purpose:** Low-level password input with visibility toggle, composable with other form primitives.

**Key Features:**

- Extends InputField behavior with password-specific functionality
- Internal show/hide state management
- Toggle button in suffix slot (eye icon)
- Helper slot for custom content (requirements, actions, etc.)
- Preserves cursor position when toggling visibility
- Integrates with InputRoot context for validation/disabled states

**Props:**

```typescript
interface Props {
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  class?: HTMLAttributes["class"];
}
```

**State Management:**

```typescript
const showPassword = ref(false);
const inputRef = ref<HTMLInputElement>();

const toggleVisibility = () => {
  const input = inputRef.value;
  const cursorPosition = input?.selectionStart;
  showPassword.value = !showPassword.value;
  nextTick(() => {
    if (input && cursorPosition !== null) {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }
  });
};
```

**Template Structure:**

```vue
<div class="input-group">
  <input
    ref="inputRef"
    :type="showPassword ? 'text' : 'password'"
    class="form-control"
    v-model="model"
    <!-- InputRoot context bindings -->
  />
  <button
    type="button"
    class="input-group-text"
    @click="toggleVisibility"
    :aria-label="showPassword ? 'Hide password' : 'Show password'"
  >
    <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
    <span class="sr-only">{{ showPassword ? 'Hide' : 'Show' }} password</span>
  </button>
</div>
<div v-if="$slots.helper" class="mt-space-xxs">
  <slot name="helper" />
</div>
```

### FieldPassword Component

**Location:** `packages/field-password/`

**Purpose:** High-level password field component for easy form integration.

**Key Features:**

- Wraps InputRoot + InputLabel + InputPassword + InputError + InputHelp
- Same convenience props as FieldText
- Exposes helper slot for password-related content
- Two-way v-model binding

**Props:**

```typescript
interface Props {
  id: string;
  label: string;
  modelValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  helpText?: string;
  tooltipMessage?: string;
  isOptional?: boolean;
  optionalText?: string;
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  labelSize?: "small" | "medium" | "large";
  labelVisible?: boolean;
  autocomplete?: string;
  class?: HTMLAttributes["class"];
}
```

**Template Structure:**

```vue
<InputRoot
  :id="id"
  :required="required"
  :disabled="disabled"
  :invalid="!!error"
>
  <InputLabel
    :level="labelLevel"
    :size="labelSize"
    :visible="labelVisible"
    :tooltip-message="tooltipMessage"
    :is-optional="isOptional"
    :optional-text="optionalText"
  >
    {{ label }}
  </InputLabel>
  <InputPassword
    v-model="model"
    :placeholder="placeholder"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :class="class"
  >
    <template #helper>
      <slot name="helper" />
    </template>
  </InputPassword>
  <InputHelp v-if="helpText">{{ helpText }}</InputHelp>
  <InputError v-if="error">{{ error }}</InputError>
</InputRoot>
```

---

## Styling

### Icons

- **Show state:** `fa-solid fa-eye` (Font Awesome)
- **Hide state:** `fa-solid fa-eye-slash` (Font Awesome)
- Import: `@fortawesome/free-solid-svg-icons`
- Component: `font-awesome-icon` from `@fortawesome/vue-fontawesome`

### Toggle Button

- Class: `input-group-text` (Bootstrap)
- Clickable cursor with hover states
- Border matches Bootstrap input styling
- Same height as input field

### Spacing

- Input padding: `p-space-xs` (RDS spacing)
- Helper slot margin: `mt-space-xxs` (small gap below input)

### Accessibility

- `sr-only` class for screen reader text
- Focus visible states on button
- Proper `aria-label` on toggle button
- Button `type="button"` prevents form submission

---

## Testing

### InputPassword.spec.ts

1. ✓ Renders with default props (type="password")
2. ✓ Toggles visibility when button clicked
3. ✓ Shows correct icon for each state (eye/eye-slash)
4. ✓ Preserves cursor position during toggle
5. ✓ Respects disabled state from context
6. ✓ Renders helper slot content
7. ✓ Has proper aria-label on toggle button
8. ✓ Prevents form submission (button type="button")

### FieldPassword.spec.ts

1. ✓ Renders all child primitives correctly
2. ✓ v-model binding works
3. ✓ Shows error message when provided
4. ✓ Shows help text when provided
5. ✓ Passes helper slot content through
6. ✓ Respects required/disabled/readonly props

---

## Documentation

### Storybook Stories

- Default password field
- With error message
- With help text
- With helper slot (password requirements example)
- Required field
- Disabled state
- Complete form example with validation

### Package README

- Installation instructions
- Basic usage examples
- Props documentation
- Slot documentation
- Accessibility notes

---

## Implementation Checklist

### Phase 1: InputPassword Primitive

- [ ] Create `packages/forms/src/primitives/InputPassword/` directory
- [ ] Implement `InputPassword.vue` component
- [ ] Create `index.ts` barrel export
- [ ] Write `InputPassword.spec.ts` unit tests
- [ ] Export from `packages/forms/src/primitives/index.ts`
- [ ] Verify all tests pass

### Phase 2: FieldPassword Package

- [ ] Run `pnpm create:module` to scaffold field-password package
- [ ] Implement `FieldPassword.vue` component
- [ ] Write `FieldPassword.spec.ts` unit tests
- [ ] Create Storybook stories (`FieldPassword.stories.ts`)
- [ ] Update package README
- [ ] Build and verify package

### Phase 3: Integration & Testing

- [ ] Add password field to playground/demo
- [ ] Run full test suite (`pnpm test:unit`)
- [ ] Run type checking (`pnpm type-check`)
- [ ] Run linting (`pnpm lint`)
- [ ] Manual testing in Storybook
- [ ] Accessibility testing (keyboard nav, screen readers)

### Phase 4: Documentation & Release

- [ ] Create changeset for both packages
- [ ] Update TASKS.md
- [ ] Request user testing in Storybook
- [ ] Address feedback if needed
- [ ] Merge to main

---

## Usage Examples

### InputPassword Primitive

```vue
<InputRoot id="pwd" :required="true">
  <InputLabel>Password</InputLabel>
  <InputPassword v-model="password" placeholder="Enter password">
    <template #helper>
      <ul class="small text-muted">
        <li>At least 8 characters</li>
        <li>One uppercase letter</li>
        <li>One number</li>
      </ul>
    </template>
  </InputPassword>
  <InputError v-if="error">{{ error }}</InputError>
</InputRoot>
```

### FieldPassword Component

```vue
<FieldPassword
  id="password"
  label="Password"
  v-model="password"
  placeholder="Enter password"
  required
  tooltip-message="Choose a strong password"
  :error="passwordError"
  help-text="We'll never share your password"
>
  <template #helper>
    <div class="password-strength">
      Strength: <strong>{{ strength }}</strong>
    </div>
  </template>
</FieldPassword>
```

---

## Technical Notes

### Cursor Position Preservation

When toggling between password and text types, the browser resets the cursor position. We preserve it by:

1. Capturing cursor position before toggle
2. Using `nextTick` to wait for DOM update
3. Restoring cursor position with `setSelectionRange`

### Autocomplete Handling

Following InputField pattern: if `autocomplete="off"`, map to `"new-password"` for better browser compatibility.

### Context Integration

InputPassword inherits from InputRoot context:

- `id` for label association
- `required`, `disabled` for input states
- `invalid` for validation styling
- `errorId`, `helpId` for ARIA describedby

---

## Design Decisions

### Why suffix button instead of external helper?

- Industry standard (Google, GitHub, etc.)
- Better UX - action is adjacent to input
- Cleaner visual design
- Helper slot still available for other content

### Why preserve cursor position?

- Better UX when editing password mid-string
- Small code addition for significant improvement
- Prevents frustrating cursor jumps

### Why both primitive and wrapper?

- Flexibility: primitives for complex layouts
- Convenience: wrapper for common use cases
- Consistency: matches existing FieldText pattern
- Scalability: easier to add FieldEmail, FieldUrl, etc.

---

## End of Design Document
