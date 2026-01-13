import type { Meta, StoryObj } from "@storybook/vue3";
import { InputRoot, InputLabel, InputField, InputHelp } from "@bootcn-vue/forms";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const meta = {
  title: "Forms/Primitives/InputLabel",
  component: InputLabel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Installation

1. **Install dependencies:**

\`\`\`bash
npm install @bootcn-vue/forms @bootcn-vue/core @bootcn-vue/tooltip bootstrap reka-ui
\`\`\`

2. **Copy component to your project:**

Copy the \`InputLabel\` component files from \`node_modules/@bootcn-vue/forms/src/primitives/InputLabel/\` to \`src/components/ui/InputLabel/\` in your project.

## Import

\`\`\`vue
<script setup lang="ts">
import { InputLabel } from '@/components/ui/InputLabel';
</script>
\`\`\`

## Package

**[@bootcn-vue/forms](https://www.npmjs.com/package/@bootcn-vue/forms)** - Form primitives and components

**Note:** Copy components to \`src/components/ui/\` for full control and customization.

## Overview

\`InputLabel\` is an accessible label component that can be used with standard inputs or custom components. It supports tooltips, optional badges, and custom icons.

### Key Features

- ✅ Automatic ID association via InputRoot context
- ✅ Manual ID association via \`for\` prop (for custom components)
- ✅ Tooltip support with customizable content and styling
- ✅ Optional badge indicator
- ✅ Custom icon support
- ✅ WCAG 2.1 compliant

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`for\` | \`string\` | \`undefined\` | ID of input element (overrides context ID) |
| \`level\` | \`'h1'\|'h2'\|'h3'\|'h4'\|'h5'\|'h6'\` | \`'h3'\` | Heading level for label styling |
| \`size\` | \`'small'\|'medium'\|'large'\` | \`'small'\` | Font size |
| \`tooltipMessage\` | \`string\` | \`undefined\` | Plain text tooltip message |
| \`tooltipHtmlContent\` | \`string\` | \`undefined\` | HTML tooltip content (overrides tooltipMessage) |
| \`tooltipPosition\` | \`'top'\|'bottom'\|'left'\|'right'\` | \`'top'\` | Tooltip position |
| \`tooltipBgColor\` | \`string\` | \`undefined\` | Tooltip background color (Bootstrap class or hex) |
| \`tooltipTextColor\` | \`string\` | \`undefined\` | Tooltip text color (Bootstrap class or hex) |
| \`isOptional\` | \`boolean\` | \`false\` | Show optional badge |
| \`optionalText\` | \`string\` | \`'Optional'\` | Custom optional badge text |
| \`iconPosition\` | \`'before'\|'after'\` | \`'after'\` | Tooltip icon position |

## Usage Patterns

### With Standard Inputs (Context from InputRoot)

\`\`\`vue
<InputRoot id="email">
  <InputLabel>Email Address</InputLabel>
  <InputField v-model="email" />
</InputRoot>
\`\`\`

### With Custom Components (Using 'for' Prop)

\`\`\`vue
<InputRoot id="custom-input">
  <InputLabel for="custom-input">Custom Field</InputLabel>
  <CustomComponent id="custom-input" />
</InputRoot>
\`\`\`

### Standalone (Without InputRoot)

\`\`\`vue
<InputLabel for="standalone-input">Label</InputLabel>
<CustomComponent id="standalone-input" />
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic label with standard input.
 */
export const Basic: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="basic-label">
        <InputLabel>Email Address</InputLabel>
        <InputField v-model="value" type="email" placeholder="you@example.com" />
      </InputRoot>
    `,
  }),
};

/**
 * Label with tooltip for additional information.
 */
export const WithTooltip: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="tooltip-label">
        <InputLabel tooltip-message="We'll use this email for account notifications and password recovery">
          Email Address
        </InputLabel>
        <InputField v-model="value" type="email" placeholder="you@example.com" />
        <InputHelp>Hover over the info icon for more details</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Label with HTML tooltip content.
 */
export const WithHtmlTooltip: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="html-tooltip-label">
        <InputLabel 
          tooltip-html-content="<strong>Password Requirements:</strong><br/>• At least 8 characters<br/>• 1 uppercase letter<br/>• 1 number<br/>• 1 special character"
        >
          Password
        </InputLabel>
        <InputField v-model="value" type="password" placeholder="Enter password" />
      </InputRoot>
    `,
  }),
};

/**
 * Optional field with badge indicator.
 */
export const Optional: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="optional-label">
        <InputLabel is-optional>Middle Name</InputLabel>
        <InputField v-model="value" placeholder="Optional field" />
      </InputRoot>
    `,
  }),
};

/**
 * Optional field with custom badge text.
 */
export const OptionalCustomText: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="optional-custom-label">
        <InputLabel is-optional optional-text="Not Required">Phone Number</InputLabel>
        <InputField v-model="value" type="tel" placeholder="(555) 123-4567" />
      </InputRoot>
    `,
  }),
};

/**
 * Label with custom icon in tooltip.
 */
export const WithCustomIcon: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField, FontAwesomeIcon },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="custom-icon-label">
        <InputLabel tooltip-message="This is sensitive information that we keep secure">
          Security Code
          <template #icon>
            <FontAwesomeIcon :icon="['fas', 'shield-halved']" class="text-warning" />
          </template>
        </InputLabel>
        <InputField v-model="value" type="text" placeholder="Enter code" />
      </InputRoot>
    `,
  }),
};

/**
 * Label with icon positioned before the text.
 */
export const IconBefore: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="icon-before-label">
        <InputLabel 
          tooltip-message="Icon appears before label text" 
          icon-position="before"
        >
          API Key
        </InputLabel>
        <InputField v-model="value" type="password" placeholder="sk-..." />
      </InputRoot>
    `,
  }),
};

/**
 * Label with custom component using 'for' prop.
 */
export const WithCustomComponent: Story = {
  render: () => ({
    components: { InputRoot, InputLabel },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="custom-component-example">
        <InputLabel for="custom-component-example">Custom Date Picker</InputLabel>
        <div 
          id="custom-component-example"
          class="form-control"
          style="padding: 0.5rem; background: #f8f9fa; border: 1px solid #dee2e6;"
        >
          <input 
            type="date" 
            v-model="value"
            style="border: none; background: transparent; width: 100%;"
            aria-label="Custom Date Picker"
          />
        </div>
        <small class="text-muted mt-1 d-block">This demonstrates using InputLabel with a custom component</small>
      </InputRoot>
    `,
  }),
};

/**
 * Different tooltip positions.
 */
export const TooltipPositions: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const values = {
        top: ref(""),
        bottom: ref(""),
        left: ref(""),
        right: ref(""),
      };
      return { values };
    },
    template: `
      <div class="row g-3" style="max-width: 800px; padding: 100px 50px;">
        <div class="col-md-6">
          <InputRoot id="tooltip-top">
            <InputLabel tooltip-message="Tooltip on top" tooltip-position="top">
              Top Tooltip
            </InputLabel>
            <InputField v-model="values.top.value" placeholder="Hover icon" />
          </InputRoot>
        </div>
        <div class="col-md-6">
          <InputRoot id="tooltip-bottom">
            <InputLabel tooltip-message="Tooltip on bottom" tooltip-position="bottom">
              Bottom Tooltip
            </InputLabel>
            <InputField v-model="values.bottom.value" placeholder="Hover icon" />
          </InputRoot>
        </div>
        <div class="col-md-6">
          <InputRoot id="tooltip-left">
            <InputLabel tooltip-message="Tooltip on left" tooltip-position="left">
              Left Tooltip
            </InputLabel>
            <InputField v-model="values.left.value" placeholder="Hover icon" />
          </InputRoot>
        </div>
        <div class="col-md-6">
          <InputRoot id="tooltip-right">
            <InputLabel tooltip-message="Tooltip on right" tooltip-position="right">
              Right Tooltip
            </InputLabel>
            <InputField v-model="values.right.value" placeholder="Hover icon" />
          </InputRoot>
        </div>
      </div>
    `,
  }),
};

/**
 * Tooltip with custom colors.
 */
export const CustomTooltipColors: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputField },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="p-space-md">
        <div class="mb-space-md">
          <InputRoot id="danger-tooltip">
            <InputLabel 
              tooltip-message="This field is required for security"
              tooltip-bg-color="bg-danger"
              tooltip-text-color="text-white"
            >
              Security Code
            </InputLabel>
            <InputField v-model="value" type="text" placeholder="Enter code" />
          </InputRoot>
        </div>
        <div>
          <InputRoot id="info-tooltip">
            <InputLabel 
              tooltip-message="We use this to verify your identity"
              tooltip-bg-color="bg-info"
              tooltip-text-color="text-white"
            >
              Phone Number
            </InputLabel>
            <InputField v-model="value" type="tel" placeholder="(555) 123-4567" />
          </InputRoot>
        </div>
      </div>
    `,
  }),
};
