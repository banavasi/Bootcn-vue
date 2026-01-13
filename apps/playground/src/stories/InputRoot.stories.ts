import type { Meta, StoryObj } from "@storybook/vue3";
import { InputRoot, InputLabel, InputField, InputHelp, InputError } from "@bootcn-vue/forms";
import { ref } from "vue";

const meta = {
  title: "Forms/Primitives/InputRoot",
  component: InputRoot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Prerequisites

Before adding components, initialize bootcn-vue in your project:

\`\`\`bash
npx @bootcn-vue/cli@latest init
\`\`\`

This will:
- Create \`bootcn.config.json\` configuration file
- Set up path aliases (\`@/*\`) in \`tsconfig.json\` and \`vite.config.ts\`
- Create \`src/lib/utils.ts\` with utility functions
- Create \`src/components/ui/\` directory
- Install base dependencies: \`bootstrap\`, \`reka-ui\`, \`class-variance-authority\`, \`clsx\`, \`tailwind-merge\`

## Installation

\`\`\`bash
npx @bootcn-vue/cli@latest add input-root
\`\`\`

This command will:
- Install required dependencies: \`@bootcn-vue/core\`
- Install peer dependencies: \`reka-ui\`
- Copy the component to \`src/components/ui/InputRoot/\`
- Transform imports to use local paths (\`@/lib/utils\` instead of \`@bootcn-vue/core\`)

## Import

\`\`\`vue
<script setup lang="ts">
import { InputRoot } from '@/components/ui/InputRoot';
</script>
\`\`\`

## Package

**[@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms)** - Form primitives and components

**Note:** Components are copied to \`src/components/ui/\` for full control and customization.

## Overview

\`InputRoot\` is a container component that provides form context to all child components using Vue's \`provide/inject\` pattern. It manages the field's ID, validation state, and accessibility attributes.

### Key Features

- ✅ Provides context to child components (InputLabel, InputField, InputError, InputHelp)
- ✅ Manages field ID for accessibility
- ✅ Handles validation state (invalid, disabled, required)
- ✅ Generates error and help text IDs automatically
- ✅ Eliminates prop drilling

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`id\` | \`string\` | **required** | Unique ID for the input field |
| \`invalid\` | \`boolean\` | \`false\` | Whether the field has validation errors |
| \`disabled\` | \`boolean\` | \`false\` | Whether the field is disabled |
| \`required\` | \`boolean\` | \`false\` | Whether the field is required |
| \`class\` | \`string\` | \`undefined\` | Additional CSS classes |

## Context Provided

The component provides the following context to child components:

\`\`\`typescript
interface InputContext {
  id: Ref<string>;
  invalid: Ref<boolean>;
  disabled: Ref<boolean>;
  required: Ref<boolean>;
  errorId: Ref<string>;  // Computed: \`\${id}-error\`
  helpId: Ref<string>;  // Computed: \`\${id}-help\`
}
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof InputRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic InputRoot with label and input field.
 */
export const Basic: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="basic-example">
        <InputLabel>Email Address</InputLabel>
        <InputField v-model="value" type="email" placeholder="you@example.com" />
      </InputRoot>
    `,
  }),
};

/**
 * InputRoot with all child components: label, field, help text, and error.
 */
export const Complete: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField, InputHelp, InputError },
    setup() {
      const value = ref("");
      const hasError = ref(false);
      return { value, hasError };
    },
    template: `
      <InputRoot id="complete-example" :invalid="hasError">
        <InputLabel>Username</InputLabel>
        <InputField v-model="value" placeholder="Enter username" />
        <InputHelp v-if="!hasError">Choose a unique username</InputHelp>
        <InputError v-if="hasError">Username is already taken</InputError>
      </InputRoot>
    `,
  }),
};

/**
 * Required field with validation.
 */
export const Required: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="required-example" required>
        <InputLabel>Full Name</InputLabel>
        <InputField v-model="value" placeholder="John Doe" />
        <InputHelp>This field is required</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Disabled field state.
 */
export const Disabled: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField, InputHelp },
    setup() {
      const value = ref("Disabled value");
      return { value };
    },
    template: `
      <InputRoot id="disabled-example" disabled>
        <InputLabel>Disabled Field</InputLabel>
        <InputField v-model="value" placeholder="Cannot edit" />
        <InputHelp>This field is disabled</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Field with validation error.
 */
export const WithError: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField, InputError },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="error-example" invalid required>
        <InputLabel>Email Address</InputLabel>
        <InputField v-model="value" type="email" placeholder="you@example.com" />
        <InputError>Please enter a valid email address</InputError>
      </InputRoot>
    `,
  }),
};
