import type { Meta, StoryObj } from "@storybook/vue3";
import { FieldPassword } from "@bootcn-vue/field-password";

const meta = {
  title: "Forms/FieldPassword",
  component: FieldPassword,
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
npx @bootcn-vue/cli@latest add field-password
\`\`\`

This command will:
- Install required dependencies: \`@bootcn-vue/core\`, \`@bootcn-vue/forms\`, \`@bootcn-vue/tooltip\`
- Install peer dependencies: \`reka-ui\`, \`@fortawesome/fontawesome-svg-core\`, \`@fortawesome/free-solid-svg-icons\`, \`@fortawesome/vue-fontawesome\`
- Copy the component to \`src/components/ui/FieldPassword/\`
- Transform imports to use local paths

## Import

\`\`\`vue
<script setup lang="ts">
import { FieldPassword } from '@/components/ui/FieldPassword';
</script>
\`\`\`

## Package

**[@bootcn-vue/field-password](https://www.npmjs.com/package/@bootcn-vue/field-password)** - Password field component with show/hide toggle

**Note:** Components are copied to \`src/components/ui/\` for full control and customization.

## Overview

\`FieldPassword\` is a complete password input field component with label, show/hide toggle, validation, help text, and tooltip support. It's built on top of form primitives and provides a ready-to-use solution for password inputs.

### Key Features

- ✅ Complete field component with label, input, help, and error
- ✅ Show/hide password toggle button
- ✅ Tooltip support
- ✅ Optional badge indicator
- ✅ Validation error display
- ✅ WCAG 2.1 compliant
        `,
      },
    },
  },
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
    tooltipMessage: "Password must be at least 8 characters with 1 number and 1 special character",
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

export const WithPasswordRequirements: Story = {
  name: "With Password Requirements",
  render: () => ({
    components: { FieldPassword },
    setup() {
      const password = { value: "" };
      const hasMinLength = () => password.value.length >= 8;
      const hasNumber = () => /\d/.test(password.value);
      const hasUppercase = () => /[A-Z]/.test(password.value);
      const hasSpecialChar = () => /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

      return {
        password,
        hasMinLength,
        hasNumber,
        hasUppercase,
        hasSpecialChar,
      };
    },
    template: `
      <div class="p-space-md" style="max-width: 500px;">
        <FieldPassword
          id="requirements-password"
          v-model="password.value"
          label="Create Password"
          placeholder="Enter a strong password"
          required
          tooltip-message="Follow the requirements below"
        >
          <template #helper>
            <div class="small mt-space-xxs">
              <p class="mb-space-xxs fw-bold">Password must contain:</p>
              <ul class="mb-0 ps-space-sm">
                <li :class="hasMinLength() ? 'text-success' : 'text-muted'">
                  {{ hasMinLength() ? '✓' : '○' }} At least 8 characters
                </li>
                <li :class="hasNumber() ? 'text-success' : 'text-muted'">
                  {{ hasNumber() ? '✓' : '○' }} One number
                </li>
                <li :class="hasUppercase() ? 'text-success' : 'text-muted'">
                  {{ hasUppercase() ? '✓' : '○' }} One uppercase letter
                </li>
                <li :class="hasSpecialChar() ? 'text-success' : 'text-muted'">
                  {{ hasSpecialChar() ? '✓' : '○' }} One special character
                </li>
              </ul>
            </div>
          </template>
        </FieldPassword>
      </div>
    `,
  }),
};

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
