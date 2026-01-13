import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { InputRoot, InputLabel, InputMasked, InputHelp, InputError } from "@bootcn-vue/forms";

const meta = {
  title: "Forms/Primitives/InputMasked",
  component: InputMasked,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Installation

\`\`\`bash
npm install @bootcn-vue/forms
\`\`\`

## Import

\`\`\`vue
<script setup lang="ts">
import { InputMasked } from '@bootcn-vue/forms';
</script>
\`\`\`

## Package

**[@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms)** - Form primitives and components

## Overview

\`InputMasked\` provides pattern-based input masking for formatted inputs like phone numbers, dates, credit cards, and SSNs. The component automatically formats input as the user types and returns the unmasked value via v-model.

### Key Features

- ✅ Pattern-based masking with customizable tokens
- ✅ Auto-formats input as user types
- ✅ Returns unmasked value via v-model
- ✅ Prevents invalid characters
- ✅ Enforces maximum length based on mask pattern
- ✅ Maintains cursor position during formatting

## Mask Patterns

| Token | Description | Example |
|-------|-------------|---------|
| \`#\` | Digit (0-9) | Phone: \`(###) ###-####\` |
| \`%\` | Letter (a-z, A-Z) | License: \`%%%-####\` |
| \`@\` | Alphanumeric | Code: \`@@@@-@@@@\` |
| \`*\` | Any character | Custom patterns |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`mask\` | \`string\|string[]\` | \`undefined\` | Mask pattern (e.g., \`(###) ###-####\`) |
| \`tokens\` | \`Record<string, {pattern: RegExp, transform?: (char: string) => string}>\` | See below | Custom token definitions |
| \`placeholder\` | \`string\` | \`undefined\` | Placeholder text |
| \`readonly\` | \`boolean\` | \`false\` | Make input readonly |
| \`autocomplete\` | \`string\` | \`undefined\` | Autocomplete attribute |
| \`class\` | \`string\` | \`undefined\` | Additional CSS classes |

## Default Tokens

\`\`\`typescript
{
  "#": { pattern: /\\d/ },        // digit
  "%": { pattern: /[a-zA-Z]/ },  // letter
  "@": { pattern: /[a-zA-Z0-9]/ }, // alphanumeric
  "*": { pattern: /./ }         // any character
}
\`\`\`

## Usage

\`InputMasked\` must be used within \`InputRoot\` to receive the field context:

\`\`\`vue
<InputRoot id="phone" :required="true">
  <InputLabel>Phone Number</InputLabel>
  <InputMasked
    v-model="phone"
    mask="(###) ###-####"
    placeholder="(555) 123-4567"
  />
</InputRoot>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    mask: {
      control: { type: "text" },
      description: "Mask pattern (# = digit, % = letter, @ = alphanumeric, * = any)",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    readonly: {
      control: { type: "boolean" },
      description: "Make input readonly",
    },
  },
} satisfies Meta<typeof InputMasked>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhoneNumber: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputMasked, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="container py-space-md">
        <InputRoot id="phone" :required="true">
          <InputLabel>Phone Number</InputLabel>
          <InputMasked
            v-model="value"
            mask="(###) ###-####"
            placeholder="(555) 123-4567"
          />
          <InputHelp>Format: (###) ###-####</InputHelp>
        </InputRoot>
        <div class="mt-space-sm">
          <strong>Unmasked Value:</strong> {{ value || '(empty)' }}
        </div>
      </div>
    `,
  }),
};

export const DateInput: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputMasked, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="container py-space-md">
        <InputRoot id="date">
          <InputLabel>Date of Birth</InputLabel>
          <InputMasked
            v-model="value"
            mask="##/##/####"
            placeholder="MM/DD/YYYY"
          />
          <InputHelp>Format: MM/DD/YYYY</InputHelp>
        </InputRoot>
        <div class="mt-space-sm">
          <strong>Unmasked Value:</strong> {{ value || '(empty)' }}
        </div>
      </div>
    `,
  }),
};

export const SSN: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputMasked, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="container py-space-md">
        <InputRoot id="ssn">
          <InputLabel>Social Security Number</InputLabel>
          <InputMasked
            v-model="value"
            mask="###-##-####"
            placeholder="123-45-6789"
          />
          <InputHelp>Format: ###-##-####</InputHelp>
        </InputRoot>
        <div class="mt-space-sm">
          <strong>Unmasked Value:</strong> {{ value || '(empty)' }}
        </div>
      </div>
    `,
  }),
};

export const CreditCard: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputMasked, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="container py-space-md">
        <InputRoot id="cc">
          <InputLabel>Credit Card Number</InputLabel>
          <InputMasked
            v-model="value"
            mask="#### #### #### ####"
            placeholder="1234 5678 9012 3456"
          />
          <InputHelp>Format: #### #### #### ####</InputHelp>
        </InputRoot>
        <div class="mt-space-sm">
          <strong>Unmasked Value:</strong> {{ value || '(empty)' }}
        </div>
      </div>
    `,
  }),
};

export const CustomPattern: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputMasked, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="container py-space-md">
        <InputRoot id="custom">
          <InputLabel>License Plate</InputLabel>
          <InputMasked
            v-model="value"
            mask="%%%-####"
            placeholder="ABC-1234"
          />
          <InputHelp>Format: 3 letters + dash + 4 digits</InputHelp>
        </InputRoot>
        <div class="mt-space-sm">
          <strong>Unmasked Value:</strong> {{ value || '(empty)' }}
        </div>
      </div>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputMasked, InputError },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="container py-space-md">
        <InputRoot id="phone-error" :required="true" :invalid="true">
          <InputLabel>Phone Number</InputLabel>
          <InputMasked
            v-model="value"
            mask="(###) ###-####"
            placeholder="(555) 123-4567"
          />
          <InputError>Please enter a valid phone number</InputError>
        </InputRoot>
        <div class="mt-space-sm">
          <strong>Unmasked Value:</strong> {{ value || '(empty)' }}
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputMasked, InputHelp },
    setup() {
      const phone = ref("");
      const date = ref("");
      const ssn = ref("");
      const cc = ref("");
      return { phone, date, ssn, cc };
    },
    template: `
      <div class="container py-space-md">
        <div class="row g-space-sm">
          <div class="col-md-6">
            <InputRoot id="phone">
              <InputLabel>Phone</InputLabel>
              <InputMasked v-model="phone" mask="(###) ###-####" placeholder="(555) 123-4567" />
            </InputRoot>
          </div>
          <div class="col-md-6">
            <InputRoot id="date">
              <InputLabel>Date</InputLabel>
              <InputMasked v-model="date" mask="##/##/####" placeholder="MM/DD/YYYY" />
            </InputRoot>
          </div>
          <div class="col-md-6">
            <InputRoot id="ssn">
              <InputLabel>SSN</InputLabel>
              <InputMasked v-model="ssn" mask="###-##-####" placeholder="123-45-6789" />
            </InputRoot>
          </div>
          <div class="col-md-6">
            <InputRoot id="cc">
              <InputLabel>Credit Card</InputLabel>
              <InputMasked v-model="cc" mask="#### #### #### ####" placeholder="1234 5678 9012 3456" />
            </InputRoot>
          </div>
        </div>

        <div class="mt-space-md p-space-sm bg-light rounded">
          <h5>Unmasked Values:</h5>
          <ul class="mb-0">
            <li><strong>Phone:</strong> {{ phone || '(empty)' }}</li>
            <li><strong>Date:</strong> {{ date || '(empty)' }}</li>
            <li><strong>SSN:</strong> {{ ssn || '(empty)' }}</li>
            <li><strong>Credit Card:</strong> {{ cc || '(empty)' }}</li>
          </ul>
        </div>
      </div>
    `,
  }),
};
