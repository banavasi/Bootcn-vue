import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { RadioYesNo } from "@/components/ui/Radio";

interface RadioYesNoArgs {
  id: string;
  label: string;
  modelValue?: "Y" | "N" | null;
  required?: boolean;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  labelLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  labelSize?: "small" | "medium" | "large";
  labelVisible?: boolean;
  tooltipMessage?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  isOptional?: boolean;
  error?: string;
  helpText?: string;
  yesLabel?: string;
  noLabel?: string;
}

const meta = {
  title: "Components/RadioYesNo",
  component: RadioYesNo,
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
    modelValue: {
      control: "select",
      options: ["Y", "N", null],
      description: "The selected value: 'Y' (Yes), 'N' (No), or null (none)",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
    bgColor: {
      control: "color",
      description: "Background color for selected state (any valid CSS color)",
    },
    textColor: {
      control: "color",
      description: "Text color for selected state (any valid CSS color)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio buttons are disabled",
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
    yesLabel: {
      control: "text",
      description: "Custom label for Yes option",
    },
    noLabel: {
      control: "text",
      description: "Custom label for No option",
    },
  },
  args: {
    id: "radio-yes-no-demo",
    label: "Is this a mobile number?",
    modelValue: null,
    required: false,
    bgColor: "#8c1d40", // ASU Maroon
    textColor: "#ffffff",
    disabled: false,
    labelLevel: "h3",
    labelSize: "small",
    labelVisible: true,
    tooltipMessage: "Let us know if this is a mobile phone for SMS notifications",
    yesLabel: "Yes",
    noLabel: "No",
  },
} satisfies Meta<typeof RadioYesNo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default RadioYesNo with ASU Maroon background when selected.
 */
export const Default: Story = {
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :required="args.required"
          :bg-color="args.bgColor"
          :text-color="args.textColor"
          :disabled="args.disabled"
          :label-level="args.labelLevel"
          :label-size="args.labelSize"
          :label-visible="args.labelVisible"
          :tooltip-message="args.tooltipMessage"
          :tooltip-position="args.tooltipPosition"
          :is-optional="args.isOptional"
          :error="args.error"
          :help-text="args.helpText"
          :yes-label="args.yesLabel"
          :no-label="args.noLabel"
        />
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * RadioYesNo with tooltip and help text.
 */
export const WithTooltipAndHelp: Story = {
  args: {
    label: "Want SMS notifications?",
    tooltipMessage: "We will send you important updates via text message",
    helpText: "Standard messaging rates may apply.",
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :tooltip-message="args.tooltipMessage"
          :help-text="args.helpText"
          :bg-color="args.bgColor"
        />
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * RadioYesNo with error state.
 */
export const WithError: Story = {
  args: {
    label: "Do you agree to the terms?",
    required: true,
    error: "You must agree to continue",
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :required="args.required"
          :error="args.error"
          :bg-color="args.bgColor"
        />
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * RadioYesNo with "No" pre-selected.
 */
export const NoSelected: Story = {
  args: {
    modelValue: "N",
    label: "Is this a mobile number?",
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :bg-color="args.bgColor"
          :text-color="args.textColor"
        />
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * RadioYesNo with "Yes" pre-selected.
 */
export const YesSelected: Story = {
  args: {
    modelValue: "Y",
    label: "Want to stay informed with ASU via SMS messaging?",
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :bg-color="args.bgColor"
          :text-color="args.textColor"
        />
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Different color variants using CSS colors.
 */
export const ColorVariants: Story = {
  render: () => ({
    components: { RadioYesNo },
    setup() {
      const values = ref({
        maroon: "Y" as "Y" | "N" | null,
        blue: "Y" as "Y" | "N" | null,
        green: "N" as "Y" | "N" | null,
        red: "Y" as "Y" | "N" | null,
        purple: "N" as "Y" | "N" | null,
        dark: "Y" as "Y" | "N" | null,
      });
      return { values };
    },
    template: `
      <div class="d-flex flex-column gap-space-md">
        <RadioYesNo 
          id="color-maroon"
          v-model="values.maroon"
          label="Maroon (Default - ASU)"
          bg-color="#8c1d40"
          text-color="#ffffff"
        />
        <RadioYesNo 
          id="color-blue"
          v-model="values.blue"
          label="Blue (Primary)"
          bg-color="#0d6efd"
          text-color="#ffffff"
        />
        <RadioYesNo 
          id="color-green"
          v-model="values.green"
          label="Green (Success)"
          bg-color="#198754"
          text-color="#ffffff"
        />
        <RadioYesNo 
          id="color-red"
          v-model="values.red"
          label="Red (Danger)"
          bg-color="#dc3545"
          text-color="#ffffff"
        />
        <RadioYesNo 
          id="color-purple"
          v-model="values.purple"
          label="Purple (Custom)"
          bg-color="#6f42c1"
          text-color="#ffffff"
        />
        <RadioYesNo 
          id="color-dark"
          v-model="values.dark"
          label="Dark"
          bg-color="#212529"
          text-color="#ffffff"
        />
      </div>
    `,
  }),
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    modelValue: "Y",
    label: "Disabled field",
    disabled: true,
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :disabled="args.disabled"
          :bg-color="args.bgColor"
          :text-color="args.textColor"
        />
        <div class="mt-space-md text-muted">
          This field is disabled. Selected: {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Custom labels (e.g., "Agree" / "Disagree").
 */
export const CustomLabels: Story = {
  args: {
    label: "Do you accept our privacy policy?",
    yesLabel: "I Agree",
    noLabel: "I Disagree",
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :yes-label="args.yesLabel"
          :no-label="args.noLabel"
          :bg-color="args.bgColor"
          :text-color="args.textColor"
        />
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Optional field with badge.
 */
export const OptionalField: Story = {
  args: {
    label: "Receive promotional emails?",
    isOptional: true,
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RadioYesNo 
          :id="args.id"
          :label="args.label"
          v-model="value"
          :is-optional="args.isOptional"
          :bg-color="args.bgColor"
        />
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ value || 'None' }}
        </div>
      </div>
    `,
  }),
};

/**
 * Form example with multiple RadioYesNo fields.
 */
export const FormExample: Story = {
  render: () => ({
    components: { RadioYesNo },
    setup() {
      const isMobile = ref<"Y" | "N" | null>(null);
      const wantsSMS = ref<"Y" | "N" | null>(null);
      const acceptsTerms = ref<"Y" | "N" | null>(null);

      const handleSubmit = () => {
        alert(`
          Is Mobile: ${isMobile.value}
          Wants SMS: ${wantsSMS.value}
          Accepts Terms: ${acceptsTerms.value}
        `);
      };

      return { isMobile, wantsSMS, acceptsTerms, handleSubmit };
    },
    template: `
      <form @submit.prevent="handleSubmit" style="max-width: 500px;">
        <div class="d-flex flex-column gap-space-md">
          <RadioYesNo 
            id="form-is-mobile"
            v-model="isMobile"
            label="Is this a mobile number?"
            bg-color="#8c1d40"
            tooltip-message="We need to know if this is a mobile number for SMS notifications"
          />
          
          <RadioYesNo 
            id="form-wants-sms"
            v-model="wantsSMS"
            label="Want to stay informed with ASU via SMS messaging?"
            bg-color="#8c1d40"
            help-text="Standard messaging rates may apply."
          />
          
          <RadioYesNo 
            id="form-accepts-terms"
            v-model="acceptsTerms"
            label="Do you accept the terms and conditions?"
            bg-color="#8c1d40"
            required
            :error="acceptsTerms === 'N' ? 'You must accept the terms to continue' : undefined"
          />
          
          <button 
            type="submit" 
            class="btn btn-primary mt-space-sm"
            :disabled="!isMobile || !wantsSMS || acceptsTerms !== 'Y'"
          >
            Submit
          </button>
        </div>
      </form>
    `,
  }),
};
