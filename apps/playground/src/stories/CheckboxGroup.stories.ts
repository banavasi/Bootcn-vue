import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { CheckboxGroup, type CheckboxOption } from "@/components/ui/Checkbox";

interface CheckboxGroupArgs {
  id: string;
  label: string;
  options: CheckboxOption[];
  modelValue?: Array<string | number>;
  required?: boolean;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
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

const defaultOptions: CheckboxOption[] = [
  { value: "option1", label: "First Option" },
  { value: "option2", label: "Second Option" },
  { value: "option3", label: "Third Option" },
  { value: "option4", label: "Fourth Option" },
];

const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique ID for the field (required for accessibility)",
    },
    label: {
      control: "text",
      description: "Label text for the field (required for accessibility)",
    },
    options: {
      control: "object",
      description: "Array of checkbox options to render",
    },
    modelValue: {
      control: "object",
      description: "Array of selected values",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    spacing: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Gap between checkboxes",
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
      description: "Color variant for checkboxes",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of checkboxes",
    },
    disabled: {
      control: "boolean",
      description: "Disable all checkboxes in the group",
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
      description: "Help text to display below the field",
    },
  },
  args: {
    id: "checkbox-group-demo",
    label: "Choose your options",
    options: defaultOptions,
    modelValue: [],
    spacing: "sm",
    variant: "rds-dark-3",
    size: "md",
    disabled: false,
    required: false,
    labelLevel: "h3",
    labelSize: "small",
    labelVisible: true,
    tooltipMessage: "Select one or more options that apply",
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox group with multiple selectable options.
 */
export const Default: Story = {
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(args.modelValue || []);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
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
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group with tooltip and help text.
 */
export const WithTooltipAndHelp: Story = {
  args: {
    label: "Select your preferences",
    tooltipMessage: "Choose all options that apply to you",
    helpText: "You can change these selections at any time in your settings.",
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(args.modelValue || []);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :tooltip-message="args.tooltipMessage"
          :help-text="args.helpText"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group with error state.
 */
export const WithError: Story = {
  args: {
    label: "Required selections",
    required: true,
    error: "Please select at least one option to continue",
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(args.modelValue || []);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :required="args.required"
          :error="args.error"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
        </div>
      </div>
    `,
  }),
};

/**
 * Optional checkbox group.
 */
export const OptionalField: Story = {
  args: {
    label: "Additional preferences",
    isOptional: true,
    helpText: "These selections are optional and can be skipped.",
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(args.modelValue || []);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :is-optional="args.isOptional"
          :help-text="args.helpText"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group with pre-selected options.
 */
export const PreSelected: Story = {
  args: {
    modelValue: ["option2", "option4"],
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref([...(args.modelValue || [])]);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
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
    components: { CheckboxGroup },
    setup() {
      const spacing = ref<Array<"xs" | "sm" | "md" | "lg" | "xl">>(["xs", "sm", "md", "lg", "xl"]);
      const selections = ref({
        xs: [],
        sm: [],
        md: [],
        lg: [],
        xl: [],
      });
      const options: CheckboxOption[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ];
      return { spacing, selections, options };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="size in spacing" :key="size">
          <CheckboxGroup 
            :id="'spacing-' + size"
            :label="size.toUpperCase() + ' Spacing'"
            :options="options"
            v-model="selections[size]" 
            :spacing="size"
          />
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group with different color variants.
 */
export const ColorVariants: Story = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const variants = ref(["primary", "success", "danger", "warning", "info", "rds-dark-3"]);
      const selections = ref({
        primary: ["1"],
        success: ["1"],
        danger: ["1"],
        warning: ["1"],
        info: ["1"],
        "rds-dark-3": ["1"],
      });
      const options: CheckboxOption[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ];
      return { variants, selections, options };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="variant in variants" :key="variant">
          <CheckboxGroup 
            :id="'variant-' + variant"
            :label="variant"
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
 * Checkbox group with different sizes.
 */
export const Sizes: Story = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const sizes = ref<Array<"sm" | "md" | "lg">>(["sm", "md", "lg"]);
      const selections = ref({
        sm: ["1"],
        md: ["1"],
        lg: ["1"],
      });
      const options: CheckboxOption[] = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
      ];
      return { sizes, selections, options };
    },
    template: `
      <div class="d-flex gap-space-lg align-items-start">
        <div v-for="size in sizes" :key="size">
          <CheckboxGroup 
            :id="'size-' + size"
            :label="size.toUpperCase() + ' Size'"
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
 * Disabled checkbox group.
 */
export const Disabled: Story = {
  args: {
    modelValue: ["option2"],
    disabled: true,
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref([...(args.modelValue || [])]);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
          :disabled="args.disabled"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group with individual items disabled.
 */
export const IndividualDisabled: Story = {
  args: {
    label: "Select your options",
    options: [
      { value: "option1", label: "First Option" },
      { value: "option2", label: "Second Option (disabled)", disabled: true },
      { value: "option3", label: "Third Option" },
      { value: "option4", label: "Fourth Option" },
    ],
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref(["option2"]);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          spacing="sm"
        />
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group with longer text labels.
 */
export const LongLabels: Story = {
  args: {
    label: "Terms and Conditions",
    options: [
      { value: "terms", label: "I agree to the terms and conditions of this service" },
      { value: "privacy", label: "I have read and understand the privacy policy" },
      {
        value: "marketing",
        label: "I would like to receive marketing emails and promotional offers",
      },
      {
        value: "newsletter",
        label: "Subscribe to the monthly newsletter with product updates",
      },
    ],
    spacing: "md",
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const selected = ref([]);
      return { args, selected };
    },
    template: `
      <div style="max-width: 500px;">
        <CheckboxGroup 
          :id="args.id"
          :label="args.label"
          :options="args.options"
          v-model="selected"
          :spacing="args.spacing"
        />
        
        <div class="mt-space-md">
          <strong>Accepted:</strong> {{ selected.length }} of 4
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group in a form context.
 */
export const FormExample: Story = {
  args: {
    label: "Select your interests",
    required: true,
    tooltipMessage: "Choose all areas that interest you",
    helpText: "This helps us personalize your experience",
    options: [
      { value: "web", label: "Web Development" },
      { value: "mobile", label: "Mobile Apps" },
      { value: "design", label: "UI/UX Design" },
      { value: "data", label: "Data Science" },
      { value: "ai", label: "Artificial Intelligence" },
    ],
    variant: "primary",
  },
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup },
    setup() {
      const interests = ref([]);
      const handleSubmit = () => {
        alert(`Selected interests: ${interests.value.join(", ")}`);
      };
      return { args, interests, handleSubmit };
    },
    template: `
      <form @submit.prevent="handleSubmit" style="max-width: 400px;">
        <div class="mb-space-md">
          <CheckboxGroup 
            :id="args.id"
            :label="args.label"
            :options="args.options"
            v-model="interests"
            :variant="args.variant"
            :required="args.required"
            :tooltip-message="args.tooltipMessage"
            :help-text="args.helpText"
          />
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
        
        <div class="mt-space-sm text-muted">
          {{ interests.length }} interest(s) selected
        </div>
      </form>
    `,
  }),
};
