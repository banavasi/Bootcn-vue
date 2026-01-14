# Password Input Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement InputPassword primitive and FieldPassword wrapper components with show/hide toggle functionality following TDD.

**Architecture:** Create InputPassword primitive in forms package extending InputField pattern with visibility toggle button in suffix slot and helper slot for custom content. Then create FieldPassword high-level component in its own package wrapping all form primitives together.

**Tech Stack:** Vue 3 Composition API, TypeScript, Vitest, Font Awesome, Bootstrap 5, RDS spacing

---

## Task 1: InputPassword Primitive - Setup & Structure

**Files:**

- Create: `packages/forms/src/primitives/InputPassword/InputPassword.vue`
- Create: `packages/forms/src/primitives/InputPassword/InputPassword.spec.ts`
- Create: `packages/forms/src/primitives/InputPassword/index.ts`
- Modify: `packages/forms/src/primitives/index.ts`

**Step 1: Write the failing test for basic rendering**

Create `packages/forms/src/primitives/InputPassword/InputPassword.spec.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { InputPassword } from "./index";
import { InputRoot } from "../InputRoot";

describe("InputPassword", () => {
  it("renders with type password by default", () => {
    const wrapper = mount(InputRoot, {
      props: { id: "test-pwd" },
      slots: {
        default: () => mount(InputPassword, { props: {} }),
      },
    });

    const input = wrapper.find('input[type="password"]');
    expect(input.exists()).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: FAIL with "Cannot find module './index'"

**Step 3: Create barrel export**

Create `packages/forms/src/primitives/InputPassword/index.ts`:

```typescript
export { default as InputPassword } from "./InputPassword.vue";
```

**Step 4: Write minimal component implementation**

Create `packages/forms/src/primitives/InputPassword/InputPassword.vue`:

```vue
<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ref, computed, inject, nextTick } from "vue";
import { cn } from "@bootcn-vue/core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { INPUT_INJECTION_KEY } from "../context";

interface Props {
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {});

const context = inject(INPUT_INJECTION_KEY);
if (!context) {
  throw new Error("InputPassword must be used within InputRoot");
}

const model = defineModel<string>();
const showPassword = ref(false);
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<{
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const computedAutocomplete = computed(() => {
  if (props.autocomplete === "off") {
    return "new-password";
  }
  return props.autocomplete || "current-password";
});

const ariaDescribedBy = computed(() => {
  const ids: string[] = [];
  ids.push(context.helpId.value);
  if (context.invalid.value) {
    ids.push(context.errorId.value);
  }
  return ids.length > 0 ? ids.join(" ") : undefined;
});

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
</script>

<template>
  <div class="input-group">
    <input
      :id="context.id.value"
      ref="inputRef"
      v-model="model"
      :type="showPassword ? 'text' : 'password'"
      class="form-control col-12 p-space-xs"
      :class="
        cn(
          {
            'is-invalid': context.invalid.value,
          },
          props.class,
        )
      "
      :placeholder="placeholder"
      :required="context.required.value"
      :disabled="context.disabled.value"
      :readonly="readonly"
      :autocomplete="computedAutocomplete"
      :aria-required="context.required.value"
      :aria-invalid="context.invalid.value ? 'true' : undefined"
      :aria-describedby="ariaDescribedBy"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <button
      type="button"
      class="input-group-text"
      :disabled="context.disabled.value"
      :aria-label="showPassword ? 'Hide password' : 'Show password'"
      @click="toggleVisibility"
    >
      <FontAwesomeIcon :icon="showPassword ? faEyeSlash : faEye" />
      <span class="sr-only">{{ showPassword ? "Hide" : "Show" }} password</span>
    </button>
  </div>
  <div v-if="$slots.helper" class="mt-space-xxs">
    <slot name="helper" />
  </div>
</template>
```

**Step 5: Export from primitives index**

Modify `packages/forms/src/primitives/index.ts`:

```typescript
export * from "./InputRoot";
export * from "./InputLabel";
export * from "./InputField";
export * from "./InputPassword";
export * from "./InputError";
export * from "./InputHelp";
export * from "./context";
```

**Step 6: Run test to verify it passes**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: PASS

**Step 7: Commit**

```bash
git add packages/forms/src/primitives/InputPassword/ packages/forms/src/primitives/index.ts
git commit -m "feat(forms): add InputPassword primitive component"
```

---

## Task 2: InputPassword - Toggle Functionality Tests

**Files:**

- Modify: `packages/forms/src/primitives/InputPassword/InputPassword.spec.ts`

**Step 1: Write failing test for toggle visibility**

Add to `InputPassword.spec.ts`:

```typescript
it("toggles between password and text type when button clicked", async () => {
  const wrapper = mount(InputRoot, {
    props: { id: "test-pwd" },
    slots: {
      default: () => mount(InputPassword, { props: {} }),
    },
  });

  const input = wrapper.find("input");
  const button = wrapper.find("button");

  expect(input.attributes("type")).toBe("password");

  await button.trigger("click");
  expect(input.attributes("type")).toBe("text");

  await button.trigger("click");
  expect(input.attributes("type")).toBe("password");
});
```

**Step 2: Run test to verify it passes**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: PASS (already implemented in Task 1)

**Step 3: Write test for correct icon display**

Add to `InputPassword.spec.ts`:

```typescript
it("shows eye icon when password is hidden", () => {
  const wrapper = mount(InputRoot, {
    props: { id: "test-pwd" },
    slots: {
      default: () => mount(InputPassword, { props: {} }),
    },
  });

  const button = wrapper.find("button");
  expect(button.attributes("aria-label")).toBe("Show password");
});

it("shows eye-slash icon when password is visible", async () => {
  const wrapper = mount(InputRoot, {
    props: { id: "test-pwd" },
    slots: {
      default: () => mount(InputPassword, { props: {} }),
    },
  });

  const button = wrapper.find("button");
  await button.trigger("click");

  expect(button.attributes("aria-label")).toBe("Hide password");
});
```

**Step 4: Run tests to verify they pass**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: PASS

**Step 5: Commit**

```bash
git add packages/forms/src/primitives/InputPassword/InputPassword.spec.ts
git commit -m "test(forms): add InputPassword toggle functionality tests"
```

---

## Task 3: InputPassword - Cursor Position & Accessibility Tests

**Files:**

- Modify: `packages/forms/src/primitives/InputPassword/InputPassword.spec.ts`

**Step 1: Write test for cursor position preservation**

Add to `InputPassword.spec.ts`:

```typescript
it("preserves cursor position when toggling visibility", async () => {
  const wrapper = mount(InputRoot, {
    props: { id: "test-pwd" },
    slots: {
      default: () =>
        mount(InputPassword, {
          props: {},
          attrs: { modelValue: "password123" },
        }),
    },
  });

  const input = wrapper.find("input").element as HTMLInputElement;
  const button = wrapper.find("button");

  // Set cursor to middle of text
  input.setSelectionRange(5, 5);
  const cursorBefore = input.selectionStart;

  await button.trigger("click");
  await wrapper.vm.$nextTick();

  expect(input.selectionStart).toBe(cursorBefore);
});
```

**Step 2: Run test to verify it passes**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: PASS (already implemented)

**Step 3: Write test for disabled state**

Add to `InputPassword.spec.ts`:

```typescript
it("disables toggle button when input is disabled", () => {
  const wrapper = mount(InputRoot, {
    props: { id: "test-pwd", disabled: true },
    slots: {
      default: () => mount(InputPassword, { props: {} }),
    },
  });

  const button = wrapper.find("button");
  expect(button.attributes("disabled")).toBeDefined();
});
```

**Step 4: Run test to verify it passes**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: PASS

**Step 5: Write test for helper slot**

Add to `InputPassword.spec.ts`:

```typescript
it("renders helper slot content", () => {
  const wrapper = mount(InputRoot, {
    props: { id: "test-pwd" },
    slots: {
      default: () =>
        mount(InputPassword, {
          props: {},
          slots: {
            helper: '<div class="helper-content">Password requirements</div>',
          },
        }),
    },
  });

  expect(wrapper.find(".helper-content").exists()).toBe(true);
  expect(wrapper.find(".helper-content").text()).toBe("Password requirements");
});
```

**Step 6: Run test to verify it passes**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: PASS

**Step 7: Write test for button type**

Add to `InputPassword.spec.ts`:

```typescript
it("has button type='button' to prevent form submission", () => {
  const wrapper = mount(InputRoot, {
    props: { id: "test-pwd" },
    slots: {
      default: () => mount(InputPassword, { props: {} }),
    },
  });

  const button = wrapper.find("button");
  expect(button.attributes("type")).toBe("button");
});
```

**Step 8: Run tests to verify they pass**

Run: `pnpm test:unit -- InputPassword.spec.ts`  
Expected: PASS

**Step 9: Commit**

```bash
git add packages/forms/src/primitives/InputPassword/InputPassword.spec.ts
git commit -m "test(forms): add InputPassword cursor position and accessibility tests"
```

---

## Task 4: FieldPassword Package - Scaffold & Setup

**Files:**

- Run: `pnpm create:module` to scaffold package
- Create: `packages/field-password/src/FieldPassword.vue`
- Create: `packages/field-password/src/FieldPassword.spec.ts`
- Modify: `packages/field-password/src/index.ts`
- Modify: `packages/field-password/package.json`

**Step 1: Run create:module script**

```bash
cd packages/forms/src/primitives/InputPassword
pnpm create:module
```

Inputs:

- Module name: `field-password`
- Description: `Password field component with show/hide toggle`
- Component name: `FieldPassword`
- Author: (your name)

**Step 2: Update package.json dependencies**

Modify `packages/field-password/package.json`, add to dependencies:

```json
{
  "dependencies": {
    "@bootcn-vue/core": "workspace:*",
    "@bootcn-vue/forms": "workspace:*",
    "@bootcn-vue/tooltip": "workspace:*",
    "@fortawesome/fontawesome-svg-core": "^7.1.0",
    "@fortawesome/free-solid-svg-icons": "^7.1.0",
    "@fortawesome/vue-fontawesome": "^3.1.3",
    "class-variance-authority": "^0.7.1",
    "reka-ui": "^0.62.0"
  }
}
```

**Step 3: Install dependencies**

Run: `pnpm install`  
Expected: Dependencies installed successfully

**Step 4: Commit**

```bash
git add packages/field-password/
git commit -m "chore(field-password): scaffold package structure"
```

---

## Task 5: FieldPassword Component - Basic Implementation

**Files:**

- Modify: `packages/field-password/src/FieldPassword.vue`
- Create: `packages/field-password/src/FieldPassword.spec.ts`
- Modify: `packages/field-password/src/index.ts`

**Step 1: Write failing test for basic rendering**

Create `packages/field-password/src/FieldPassword.spec.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { FieldPassword } from "./index";

describe("FieldPassword", () => {
  it("renders label, input, and toggle button", () => {
    const wrapper = mount(FieldPassword, {
      props: {
        id: "test-pwd",
        label: "Password",
      },
    });

    expect(wrapper.find("label").text()).toBe("Password");
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test:unit --filter=@bootcn-vue/field-password`  
Expected: FAIL with component not found

**Step 3: Write component implementation**

Modify `packages/field-password/src/FieldPassword.vue`:

```vue
<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  InputRoot,
  InputLabel,
  InputPassword,
  InputError,
  InputHelp,
} from "@bootcn-vue/forms";

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

const props = withDefaults(defineProps<Props>(), {
  labelLevel: "h3",
  labelSize: "small",
  labelVisible: true,
  autocomplete: "current-password",
});

const model = defineModel<string>();
</script>

<template>
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
</template>
```

**Step 4: Update index.ts**

Modify `packages/field-password/src/index.ts`:

```typescript
export { default as FieldPassword } from "./FieldPassword.vue";
```

**Step 5: Run test to verify it passes**

Run: `pnpm test:unit --filter=@bootcn-vue/field-password`  
Expected: PASS

**Step 6: Commit**

```bash
git add packages/field-password/src/
git commit -m "feat(field-password): implement FieldPassword component"
```

---

## Task 6: FieldPassword - Props & Features Tests

**Files:**

- Modify: `packages/field-password/src/FieldPassword.spec.ts`

**Step 1: Write test for v-model binding**

Add to `FieldPassword.spec.ts`:

```typescript
it("supports v-model binding", async () => {
  const wrapper = mount(FieldPassword, {
    props: {
      id: "test-pwd",
      label: "Password",
      modelValue: "",
    },
  });

  const input = wrapper.find("input");
  await input.setValue("newpassword");

  expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["newpassword"]);
});
```

**Step 2: Run test to verify it passes**

Run: `pnpm test:unit --filter=@bootcn-vue/field-password`  
Expected: PASS

**Step 3: Write test for error message**

Add to `FieldPassword.spec.ts`:

```typescript
it("shows error message when provided", () => {
  const wrapper = mount(FieldPassword, {
    props: {
      id: "test-pwd",
      label: "Password",
      error: "Password is required",
    },
  });

  expect(wrapper.text()).toContain("Password is required");
  expect(wrapper.find(".is-invalid").exists()).toBe(true);
});
```

**Step 4: Run test to verify it passes**

Run: `pnpm test:unit --filter=@bootcn-vue/field-password`  
Expected: PASS

**Step 5: Write test for help text**

Add to `FieldPassword.spec.ts`:

```typescript
it("shows help text when provided", () => {
  const wrapper = mount(FieldPassword, {
    props: {
      id: "test-pwd",
      label: "Password",
      helpText: "Must be at least 8 characters",
    },
  });

  expect(wrapper.text()).toContain("Must be at least 8 characters");
});
```

**Step 6: Run test to verify it passes**

Run: `pnpm test:unit --filter=@bootcn-vue/field-password`  
Expected: PASS

**Step 7: Write test for helper slot**

Add to `FieldPassword.spec.ts`:

```typescript
it("passes helper slot content through", () => {
  const wrapper = mount(FieldPassword, {
    props: {
      id: "test-pwd",
      label: "Password",
    },
    slots: {
      helper: '<div class="requirements">Requirements list</div>',
    },
  });

  expect(wrapper.find(".requirements").exists()).toBe(true);
  expect(wrapper.find(".requirements").text()).toBe("Requirements list");
});
```

**Step 8: Run test to verify it passes**

Run: `pnpm test:unit --filter=@bootcn-vue/field-password`  
Expected: PASS

**Step 9: Write tests for required/disabled/readonly**

Add to `FieldPassword.spec.ts`:

```typescript
it("respects required prop", () => {
  const wrapper = mount(FieldPassword, {
    props: {
      id: "test-pwd",
      label: "Password",
      required: true,
    },
  });

  const input = wrapper.find("input");
  expect(input.attributes("required")).toBeDefined();
});

it("respects disabled prop", () => {
  const wrapper = mount(FieldPassword, {
    props: {
      id: "test-pwd",
      label: "Password",
      disabled: true,
    },
  });

  const input = wrapper.find("input");
  expect(input.attributes("disabled")).toBeDefined();
});

it("respects readonly prop", () => {
  const wrapper = mount(FieldPassword, {
    props: {
      id: "test-pwd",
      label: "Password",
      readonly: true,
    },
  });

  const input = wrapper.find("input");
  expect(input.attributes("readonly")).toBeDefined();
});
```

**Step 10: Run tests to verify they pass**

Run: `pnpm test:unit --filter=@bootcn-vue/field-password`  
Expected: PASS

**Step 11: Commit**

```bash
git add packages/field-password/src/FieldPassword.spec.ts
git commit -m "test(field-password): add comprehensive FieldPassword tests"
```

---

## Task 7: Storybook Stories - Basic Examples

**Files:**

- Create: `apps/playground/src/stories/FieldPassword.stories.ts`

**Step 1: Create Storybook stories file**

Create `apps/playground/src/stories/FieldPassword.stories.ts`:

```typescript
import type { Meta, StoryObj } from "@storybook/vue3";
import { FieldPassword } from "@bootcn-vue/field-password";

const meta = {
  title: "Forms/FieldPassword",
  component: FieldPassword,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Unique ID for the input element",
    },
    label: {
      control: { type: "text" },
      description: "Label text for the field",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    tooltipMessage: {
      control: { type: "text" },
      description: "Tooltip message to show next to label",
    },
    isOptional: {
      control: { type: "boolean" },
      description: "Show optional badge",
    },
    optionalText: {
      control: { type: "text" },
      description: "Custom text for optional badge",
    },
    helpText: {
      control: { type: "text" },
      description: "Help text below input",
    },
    error: {
      control: { type: "text" },
      description: "Error message",
    },
    required: {
      control: { type: "boolean" },
      description: "Mark as required",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable input",
    },
    readonly: {
      control: { type: "boolean" },
      description: "Make readonly",
    },
  },
  args: {
    id: "field-password-example",
    label: "Password",
    placeholder: "Enter password",
    required: false,
    disabled: false,
    readonly: false,
    isOptional: false,
    labelLevel: "h3",
    labelSize: "small",
    labelVisible: true,
  },
} satisfies Meta<typeof FieldPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-password",
    label: "Password",
    placeholder: "Enter your password",
  },
};

export const WithTooltip: Story = {
  args: {
    id: "tooltip-password",
    label: "Password",
    placeholder: "Enter password",
    tooltipMessage:
      "Password must be at least 8 characters with 1 number and 1 special character",
  },
};

export const WithHelpText: Story = {
  args: {
    id: "help-password",
    label: "Password",
    placeholder: "Enter password",
    helpText: "Choose a strong password to protect your account",
  },
};

export const WithError: Story = {
  args: {
    id: "error-password",
    label: "Password",
    placeholder: "Enter password",
    error: "Password is required",
  },
};

export const Required: Story = {
  args: {
    id: "required-password",
    label: "Password",
    placeholder: "Enter password",
    required: true,
    tooltipMessage: "This field is required for account creation",
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-password",
    label: "Password",
    placeholder: "Enter password",
    disabled: true,
    modelValue: "disabledpassword",
  },
};

export const Readonly: Story = {
  args: {
    id: "readonly-password",
    label: "Password",
    readonly: true,
    modelValue: "readonlypassword",
  },
};
```

**Step 2: Build and verify Storybook compiles**

Run: `pnpm build --filter=@bootcn-vue/field-password`  
Expected: Build succeeds

**Step 3: Commit**

```bash
git add apps/playground/src/stories/FieldPassword.stories.ts
git commit -m "docs(field-password): add basic Storybook stories"
```

---

## Task 8: Storybook Stories - Advanced Examples

**Files:**

- Modify: `apps/playground/src/stories/FieldPassword.stories.ts`

**Step 1: Add helper slot story**

Add to `FieldPassword.stories.ts`:

```typescript
export const WithPasswordRequirements: Story = {
  name: "With Password Requirements",
  render: () => ({
    components: { FieldPassword },
    data() {
      return {
        password: "",
      };
    },
    computed: {
      hasMinLength() {
        return this.password.length >= 8;
      },
      hasNumber() {
        return /\d/.test(this.password);
      },
      hasUppercase() {
        return /[A-Z]/.test(this.password);
      },
      hasSpecialChar() {
        return /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
      },
    },
    template: `
      <div class="p-space-md" style="max-width: 500px;">
        <FieldPassword
          id="requirements-password"
          v-model="password"
          label="Create Password"
          placeholder="Enter a strong password"
          required
          tooltip-message="Follow the requirements below"
        >
          <template #helper>
            <div class="small mt-space-xxs">
              <p class="mb-space-xxs fw-bold">Password must contain:</p>
              <ul class="mb-0 ps-space-sm">
                <li :class="hasMinLength ? 'text-success' : 'text-muted'">
                  {{ hasMinLength ? '✓' : '○' }} At least 8 characters
                </li>
                <li :class="hasNumber ? 'text-success' : 'text-muted'">
                  {{ hasNumber ? '✓' : '○' }} One number
                </li>
                <li :class="hasUppercase ? 'text-success' : 'text-muted'">
                  {{ hasUppercase ? '✓' : '○' }} One uppercase letter
                </li>
                <li :class="hasSpecialChar ? 'text-success' : 'text-muted'">
                  {{ hasSpecialChar ? '✓' : '○' }} One special character
                </li>
              </ul>
            </div>
          </template>
        </FieldPassword>
      </div>
    `,
  }),
};
```

**Step 2: Add interactive story**

Add to `FieldPassword.stories.ts`:

```typescript
export const Interactive: Story = {
  name: "Interactive Demo",
  render: () => ({
    components: { FieldPassword },
    data() {
      return {
        password: "",
      };
    },
    template: `
      <div class="p-space-md">
        <FieldPassword
          id="interactive-password"
          v-model="password"
          label="Password"
          placeholder="Type a password..."
          tooltip-message="Try typing and toggling visibility!"
          help-text="Your password will be hidden by default"
        />
        <div class="mt-space-md p-space-sm bg-light rounded">
          <strong>Current Value:</strong> {{ password || "(empty)" }}
        </div>
      </div>
    `,
  }),
};
```

**Step 3: Add complete form story**

Add to `FieldPassword.stories.ts`:

```typescript
export const CompleteForm: Story = {
  name: "Complete Registration Form",
  render: () => ({
    components: { FieldPassword },
    data() {
      return {
        password: "",
        confirmPassword: "",
        errors: {} as Record<string, string>,
      };
    },
    methods: {
      validatePassword(this: {
        password: string;
        confirmPassword: string;
        errors: Record<string, string>;
      }) {
        this.errors = {};

        if (!this.password) {
          this.errors.password = "Password is required";
        } else if (this.password.length < 8) {
          this.errors.password = "Password must be at least 8 characters";
        } else if (!/\d/.test(this.password)) {
          this.errors.password = "Password must contain at least one number";
        }

        if (!this.confirmPassword) {
          this.errors.confirmPassword = "Please confirm your password";
        } else if (this.password !== this.confirmPassword) {
          this.errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(this.errors).length === 0) {
          alert("Registration successful!");
        }
      },
    },
    template: `
      <form @submit.prevent="validatePassword" class="p-space-md bg-light rounded" style="max-width: 500px;">
        <h3 class="mb-space-md">Create Account</h3>
        
        <FieldPassword
          id="register-password"
          v-model="password"
          label="Password"
          placeholder="Create a password"
          required
          tooltip-message="Choose a strong password"
          :error="errors.password"
          help-text="Must be at least 8 characters with 1 number"
          class="mb-space-sm"
        />
        
        <FieldPassword
          id="confirm-password"
          v-model="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          required
          tooltip-message="Must match the password above"
          :error="errors.confirmPassword"
          class="mb-space-md"
        />
        
        <button type="submit" class="btn btn-primary">
          Create Account
        </button>
      </form>
    `,
  }),
};
```

**Step 4: Commit**

```bash
git add apps/playground/src/stories/FieldPassword.stories.ts
git commit -m "docs(field-password): add advanced Storybook stories"
```

---

## Task 9: Package Documentation

**Files:**

- Modify: `packages/field-password/README.md`

**Step 1: Write comprehensive README**

Modify `packages/field-password/README.md`:

````markdown
# @bootcn-vue/field-password

Password field component with show/hide toggle functionality for Vue 3.

## Installation

```bash
pnpm add @bootcn-vue/field-password
```
````

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

````

**Step 2: Commit**

```bash
git add packages/field-password/README.md
git commit -m "docs(field-password): add comprehensive README"
````

---

## Task 10: Integration & Verification

**Files:**

- Verify all tests pass
- Verify type checking passes
- Verify linting passes
- Verify builds succeed

**Step 1: Run all unit tests**

Run: `pnpm test:unit`  
Expected: All tests pass

**Step 2: Run type checking**

Run: `pnpm type-check`  
Expected: No type errors

**Step 3: Run linting**

Run: `pnpm lint`  
Expected: No lint errors

**Step 4: Build all packages**

Run: `pnpm build`  
Expected: All packages build successfully

**Step 5: Start Storybook**

Run: `pnpm storybook`  
Expected: Storybook starts on port 6006, FieldPassword stories visible

**Step 6: Manual testing checklist**

In Storybook, verify:

- [ ] Default story renders correctly
- [ ] Toggle button shows/hides password
- [ ] Eye icon changes between eye and eye-slash
- [ ] Cursor position preserved when toggling
- [ ] Helper slot content renders
- [ ] Error state shows red border and message
- [ ] Help text displays below input
- [ ] Disabled state disables both input and button
- [ ] Keyboard navigation works (Tab to button, Enter/Space to toggle)
- [ ] Screen reader announces button state

**Step 7: Commit if any fixes needed**

```bash
git add .
git commit -m "fix: address integration issues"
```

---

## Task 11: Changesets & Finalization

**Files:**

- Create changeset for forms package
- Create changeset for field-password package
- Update TASKS.md if applicable

**Step 1: Create changeset for forms package**

Run: `pnpm changeset`

Select:

- `@bootcn-vue/forms` - minor
- Summary: "Add InputPassword primitive component with show/hide toggle"

**Step 2: Create changeset for field-password package**

Run: `pnpm changeset`

Select:

- `@bootcn-vue/field-password` - minor
- Summary: "Initial release of FieldPassword component"

**Step 3: Commit changesets**

```bash
git add .changeset/
git commit -m "chore: add changesets for password input components"
```

**Step 4: Push branch**

Run: `git push -u origin feat/password-input`  
Expected: Branch pushed successfully

---

## Final Verification

Before requesting user testing:

1. **All tests pass**: `pnpm test:unit` ✓
2. **Type checking passes**: `pnpm type-check` ✓
3. **Linting passes**: `pnpm lint` ✓
4. **Builds succeed**: `pnpm build` ✓
5. **Storybook works**: `pnpm storybook` ✓
6. **Manual testing complete**: See Task 10, Step 6 ✓
7. **Documentation complete**: README, Storybook stories ✓
8. **Changesets created**: Both packages ✓

## User Testing Request

After all verification passes, present to user:

```
Password input components are ready for testing in Storybook!

**Location**: http://localhost:6006 → Forms → FieldPassword

**Please test:**
1. [ ] Toggle shows/hides password correctly
2. [ ] Eye icon changes appropriately
3. [ ] Cursor stays in place when toggling
4. [ ] Helper slot displays custom content
5. [ ] All variants render correctly (error, disabled, etc.)
6. [ ] Keyboard navigation works
7. [ ] Accessibility (screen reader if possible)

**Feedback**: (please share any issues or improvements)
```

---

## End of Implementation Plan

**Related Skills:**

- Use @superpowers:test-driven-development for TDD guidance throughout
- Use @superpowers:verification-before-completion before claiming tasks complete
- Use @superpowers:requesting-code-review when ready for final review
- Use @superpowers:finishing-a-development-branch when ready to merge
