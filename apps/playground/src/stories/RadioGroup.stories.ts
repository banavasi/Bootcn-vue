import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { RadioGroup, type RadioOption } from "@/components/ui/Radio";

interface RadioGroupArgs {
  id: string;
  label: string;
  options: RadioOption[];
  modelValue?: string | number;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  required?: boolean;
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  labelSize?: "small" | "medium" | "large";
  labelVisible?: boolean;
  tooltipMessage?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  isOptional?: boolean;
  error?: string;
  helpText?: string;
}

const defaultOptions: RadioOption[] = [
  { value: "option1", label: "First Option" },
  { value: "option2", label: "Second Option" },
  { value: "option3", label: "Third Option" },
  { value: "option4", label: "Fourth Option" },
];

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique ID for accessibility (required)",
    },
    label: {
      control: "text",
      description: "Label text for the field (required)",
    },
    options: {
      control: "object",
      description: "Array of options with value and label",
    },
    modelValue: {
      control: "text",
      description: "Currently selected value",
    },
    spacing: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Gap between radio buttons",
    },
    variant: {
      control: "select",
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
      description: "Color variant (inherited by all radio buttons)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of radio buttons (inherited by all radio buttons)",
    },
    disabled: {
      control: "boolean",
      description: "Disable all radio buttons in the group",
    },
    required: {
      control: "boolean",
      description: "Mark field as required",
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
      description: "Show label visually",
    },
    tooltipMessage: {
      control: "text",
      description: "Tooltip message to display",
    },
    tooltipPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Tooltip position",
    },
    isOptional: {
      control: "boolean",
      description: "Show optional badge",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    helpText: {
      control: "text",
      description: "Help text to display",
    },
  },
  args: {
    id: "radio-group-demo",
    label: "Choose an option",
    options: defaultOptions,
    modelValue: undefined,
    spacing: "sm",
    variant: "rds-dark-3",
    size: "md",
    disabled: false,
    required: false,
    labelLevel: "h3",
    labelSize: "small",
    labelVisible: true,
    tooltipMessage: "Select one of the available options",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group with single selectable option.
 */
export const Default: Story = {
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :spacing="args.spacing"
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
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group with tooltip and help text.
 */
export const WithTooltipAndHelp: Story = {
  args: {
    label: "Select your preference",
    tooltipMessage: "Choose the option that best fits your needs",
    helpText: "You can change this selection later in your settings.",
  },
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :tooltip-message="args.tooltipMessage"
          :help-text="args.helpText"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group with error state.
 */
export const WithError: Story = {
  args: {
    label: "Required selection",
    required: true,
    error: "Please select an option to continue",
  },
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :required="args.required"
          :error="args.error"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group with pre-selected option.
 */
export const PreSelected: Story = {
  args: {
    modelValue: "option2",
    label: "Pre-selected example",
  },
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Demonstrates all 5 spacing options.
 */
export const SpacingVariants: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const spacings = ["xs", "sm", "md", "lg", "xl"] as const;
      const selections = ref({
        xs: "1",
        sm: "1",
        md: "1",
        lg: "1",
        xl: "1",
      });
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ];
      return { spacings, selections, options };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="spacing in spacings" :key="spacing">
          <RadioGroup 
            :id="'spacing-' + spacing" 
            :label="spacing + ' spacing'"
            :options="options"
            v-model="selections[spacing]" 
            :spacing="spacing"
          />
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group with different color variants.
 */
export const ColorVariants: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const variants = ["primary", "success", "danger", "warning", "info", "rds-dark-3"];
      const selections = ref({
        primary: "1",
        success: "1",
        danger: "1",
        warning: "1",
        info: "1",
        "rds-dark-3": "1",
      });
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ];
      return { variants, selections, options };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="variant in variants" :key="variant">
          <RadioGroup 
            :id="'variant-' + variant" 
            :label="variant + ' variant'"
            :options="options"
            v-model="selections[variant]" 
            :variant="variant" 
            spacing="xs"
          />
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group with different sizes.
 */
export const Sizes: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const sizes = ["sm", "md", "lg"] as const;
      const selections = ref({
        sm: "1",
        md: "1",
        lg: "1",
      });
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ];
      return { sizes, selections, options };
    },
    template: `
      <div class="d-flex gap-space-lg align-items-start">
        <div v-for="size in sizes" :key="size">
          <RadioGroup 
            :id="'size-' + size" 
            :label="size.toUpperCase() + ' size'"
            :options="options"
            v-model="selections[size]" 
            :size="size" 
            spacing="xs"
          />
        </div>
      </div>
    `,
  }),
};

/**
 * Disabled radio group.
 */
export const Disabled: Story = {
  args: {
    modelValue: "option2",
    disabled: true,
    label: "Disabled radio group",
  },
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :disabled="args.disabled"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group with individual item disabled.
 */
export const IndividualDisabled: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const selected = ref("option1");
      const options = [
        { value: "option1", label: "First Option" },
        { value: "option2", label: "Second Option (disabled)", disabled: true },
        { value: "option3", label: "Third Option" },
        { value: "option4", label: "Fourth Option" },
      ];
      return { selected, options };
    },
    template: `
      <div>
        <RadioGroup 
          id="individual-disabled"
          label="Some options disabled"
          :options="options"
          v-model="selected" 
          spacing="sm"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group with longer text labels.
 */
export const LongLabels: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const selected = ref<string>();
      const options = [
        { value: "delivery-standard", label: "Standard Delivery (5-7 business days) - Free" },
        { value: "delivery-express", label: "Express Delivery (2-3 business days) - $9.99" },
        { value: "delivery-overnight", label: "Overnight Delivery (Next business day) - $24.99" },
        { value: "delivery-pickup", label: "In-store Pickup (Available same day) - Free" },
      ];
      return { selected, options };
    },
    template: `
      <div style="max-width: 500px;">
        <RadioGroup 
          id="delivery-options"
          label="Select delivery method"
          :options="options"
          v-model="selected" 
          spacing="md"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Radio group in a form context.
 */
export const FormExample: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const plan = ref<string>();
      const options = [
        { value: "free", label: "Free - $0/month" },
        { value: "basic", label: "Basic - $9/month" },
        { value: "pro", label: "Pro - $29/month" },
        { value: "enterprise", label: "Enterprise - $99/month" },
      ];
      const handleSubmit = () => {
        alert(`Selected plan: ${plan.value}`);
      };
      return { plan, options, handleSubmit };
    },
    template: `
      <form @submit.prevent="handleSubmit" style="max-width: 400px;">
        <RadioGroup 
          id="subscription-plan"
          label="Choose your subscription plan"
          :options="options"
          v-model="plan" 
          spacing="sm" 
          variant="primary"
          required
          help-text="You can upgrade or downgrade at any time."
        />
        
        <button type="submit" class="btn btn-primary mt-space-md" :disabled="!plan">Submit</button>
        
        <div class="mt-space-sm text-muted">
          {{ plan ? 'Plan selected: ' + plan : 'Please select a plan' }}
        </div>
      </form>
    `,
  }),
};

/**
 * Optional radio group with badge.
 */
export const OptionalField: Story = {
  args: {
    label: "Optional preference",
    isOptional: true,
  },
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :is-optional="args.isOptional"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected || 'None' }}
        </div>
      </div>
    `,
  }),
};
