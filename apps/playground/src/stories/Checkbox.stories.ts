import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { Checkbox } from "../components/ui/Checkbox";

interface CheckboxArgs {
  id: string;
  label: string;
  modelValue?: "Y" | "N" | null;
  required?: boolean;
  variant?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  labelSize?: "small" | "medium" | "large";
  labelVisible?: boolean;
  tooltipMessage?: string;
  tooltipHtmlContent?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  tooltipBgColor?: string;
  tooltipTextColor?: string;
  isOptional?: boolean;
  optionalText?: string;
  error?: string;
  helpText?: string;
}

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique ID for the field (required for accessibility)",
    },
    label: {
      control: "text",
      description: "Label text for the checkbox (required for accessibility)",
    },
    modelValue: {
      control: { type: "select" },
      options: ["Y", "N", null],
      description:
        "The checkbox state: 'Y' (checked), 'N' (unchecked), or null (unchecked, no action)",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
    },
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light",
        "rds-dark-1",
        "rds-dark-2",
        "rds-dark-3",
        "rds-light-1",
        "rds-light-2",
        "rds-light-3",
        "rds-light-4",
        "rds-light-5",
      ],
      description: "The color variant (Bootstrap or RDS colors)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the checkbox",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled",
    },
    labelLevel: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Heading level for the label",
    },
    labelSize: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Label text size",
    },
    labelVisible: {
      control: "boolean",
      description: "Show label visually (always present for screen readers)",
    },
    tooltipMessage: {
      control: "text",
      description: "Tooltip message to display next to the label",
    },
    tooltipPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Position of the tooltip",
    },
    isOptional: {
      control: "boolean",
      description: 'Show "Optional" badge next to label',
    },
    optionalText: {
      control: "text",
      description: "Custom text for optional badge",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    helpText: {
      control: "text",
      description: "Help text to display below the checkbox",
    },
  },
  args: {
    id: "checkbox-demo",
    label: "Accept terms and conditions",
    modelValue: null,
    variant: "rds-dark-3",
    size: "md",
    disabled: false,
    required: false,
    labelLevel: "h3",
    labelSize: "small",
    labelVisible: true,
    tooltipMessage: "You must agree to continue",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with label and tooltip.
 */
export const Default: Story = {
  render: (args: CheckboxArgs) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div>
        <Checkbox 
          :id="args.id"
          :label="args.label"
          v-model="checked" 
          :variant="args.variant"
          :size="args.size"
          :disabled="args.disabled"
          :required="args.required"
          :label-level="args.labelLevel"
          :label-size="args.labelSize"
          :label-visible="args.labelVisible"
          :tooltip-message="args.tooltipMessage"
          :tooltip-position="args.tooltipPosition"
          :is-optional="args.isOptional"
          :error="args.error"
          :help-text="args.helpText"
        />
        <div class="mt-space-md text-muted">State: {{ checked }}</div>
      </div>
    `,
  }),
};

/**
 * Checkbox with tooltip and help text.
 */
export const WithTooltipAndHelp: Story = {
  args: {
    label: "Subscribe to newsletter",
    tooltipMessage: "Get updates about new features and releases",
    helpText: "You can unsubscribe at any time from your account settings.",
  },
  render: (args: CheckboxArgs) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div>
        <Checkbox 
          :id="args.id"
          :label="args.label"
          v-model="checked"
          :tooltip-message="args.tooltipMessage"
          :help-text="args.helpText"
        />
        <div class="mt-space-md text-muted">State: {{ checked }}</div>
      </div>
    `,
  }),
};

/**
 * Checkbox with error state.
 */
export const WithError: Story = {
  args: {
    label: "I agree to the terms and conditions",
    required: true,
    error: "You must accept the terms to continue",
  },
  render: (args: CheckboxArgs) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div>
        <Checkbox 
          :id="args.id"
          :label="args.label"
          v-model="checked"
          :required="args.required"
          :error="args.error"
        />
        <div class="mt-space-md text-muted">State: {{ checked }}</div>
      </div>
    `,
  }),
};

/**
 * Optional checkbox.
 */
export const OptionalField: Story = {
  args: {
    label: "Remember my preferences",
    isOptional: true,
    helpText: "This setting is optional and can be changed later.",
  },
  render: (args: CheckboxArgs) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div>
        <Checkbox 
          :id="args.id"
          :label="args.label"
          v-model="checked"
          :is-optional="args.isOptional"
          :help-text="args.helpText"
        />
        <div class="mt-space-md text-muted">State: {{ checked }}</div>
      </div>
    `,
  }),
};

/**
 * Size variants.
 */
export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const small = ref<"Y" | "N" | null>("Y");
      const medium = ref<"Y" | "N" | null>("Y");
      const large = ref<"Y" | "N" | null>("Y");
      return { small, medium, large };
    },
    template: `
      <div class="d-flex flex-column gap-3">
        <Checkbox 
          id="checkbox-sm"
          label="Small checkbox (18px)"
          v-model="small" 
          size="sm" 
        />
        <Checkbox 
          id="checkbox-md"
          label="Medium checkbox - default (24px)"
          v-model="medium" 
          size="md" 
        />
        <Checkbox 
          id="checkbox-lg"
          label="Large checkbox (30px)"
          v-model="large" 
          size="lg" 
        />
      </div>
    `,
  }),
};

/**
 * Bootstrap color variants.
 */
export const BootstrapColors: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const values = ref({
        primary: "Y",
        secondary: "Y",
        success: "Y",
        danger: "Y",
        warning: "Y",
        info: "Y",
        dark: "Y",
        light: "Y",
      });
      return { values };
    },
    template: `
      <div class="d-flex flex-column gap-3">
        <Checkbox id="cb-primary" label="Primary" v-model="values.primary" variant="primary" />
        <Checkbox id="cb-secondary" label="Secondary" v-model="values.secondary" variant="secondary" />
        <Checkbox id="cb-success" label="Success" v-model="values.success" variant="success" />
        <Checkbox id="cb-danger" label="Danger" v-model="values.danger" variant="danger" />
        <Checkbox id="cb-warning" label="Warning" v-model="values.warning" variant="warning" />
        <Checkbox id="cb-info" label="Info" v-model="values.info" variant="info" />
        <Checkbox id="cb-dark" label="Dark" v-model="values.dark" variant="dark" />
        <Checkbox id="cb-light" label="Light" v-model="values.light" variant="light" />
      </div>
    `,
  }),
};

/**
 * Disabled checkbox.
 */
export const Disabled: Story = {
  args: {
    modelValue: "Y",
    disabled: true,
  },
  render: (args: CheckboxArgs) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div>
        <Checkbox 
          :id="args.id"
          :label="args.label"
          v-model="checked"
          :disabled="args.disabled"
        />
        <div class="mt-space-md text-muted">State: {{ checked }}</div>
      </div>
    `,
  }),
};

/**
 * Form example with multiple checkboxes.
 */
export const FormExample: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const terms = ref<"Y" | "N" | null>(null);
      const privacy = ref<"Y" | "N" | null>(null);
      const marketing = ref<"Y" | "N" | null>(null);

      const handleSubmit = () => {
        alert(`Terms: ${terms.value}, Privacy: ${privacy.value}, Marketing: ${marketing.value}`);
      };

      return { terms, privacy, marketing, handleSubmit };
    },
    template: `
      <form @submit.prevent="handleSubmit" style="max-width: 500px;">
        <div class="d-flex flex-column gap-3 mb-space-md">
          <Checkbox 
            id="terms"
            label="I agree to the terms and conditions"
            v-model="terms"
            required
            :error="terms === null ? 'Required' : undefined"
            variant="primary"
          />
          
          <Checkbox 
            id="privacy"
            label="I have read and understand the privacy policy"
            v-model="privacy"
            required
            :error="privacy === null ? 'Required' : undefined"
            variant="primary"
          />
          
          <Checkbox 
            id="marketing"
            label="I would like to receive marketing emails"
            v-model="marketing"
            is-optional
            help-text="You can opt out at any time"
            variant="primary"
          />
        </div>
        
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    `,
  }),
};
