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
