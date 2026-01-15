import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { RadioYesNo } from "@/components/ui/Radio";

interface RadioYesNoArgs {
  modelValue?: "Y" | "N" | null;
  label?: string;
  id?: string;
  required?: boolean;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  yesLabel?: string;
  noLabel?: string;
}

const meta = {
  title: "Components/RadioYesNo",
  component: RadioYesNo,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "select",
      options: ["Y", "N", null],
      description: "The selected value: 'Y' (Yes), 'N' (No), or null (none)",
    },
    label: {
      control: "text",
      description: "Label text displayed above the radio buttons",
    },
    id: {
      control: "text",
      description: "Unique ID for accessibility",
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
    modelValue: null,
    label: "Is this a mobile number?",
    required: false,
    bgColor: "#8c1d40", // ASU Maroon
    textColor: "#ffffff",
    disabled: false,
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
          v-model="value"
          :label="args.label"
          :required="args.required"
          :bg-color="args.bgColor"
          :text-color="args.textColor"
          :disabled="args.disabled"
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
          v-model="value"
          :label="args.label"
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
          v-model="value"
          :label="args.label"
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
          v-model="values.maroon"
          label="Maroon (Default - ASU)"
          bg-color="#8c1d40"
          text-color="#ffffff"
        />
        <RadioYesNo 
          v-model="values.blue"
          label="Blue (Primary)"
          bg-color="#0d6efd"
          text-color="#ffffff"
        />
        <RadioYesNo 
          v-model="values.green"
          label="Green (Success)"
          bg-color="#198754"
          text-color="#ffffff"
        />
        <RadioYesNo 
          v-model="values.red"
          label="Red (Danger)"
          bg-color="#dc3545"
          text-color="#ffffff"
        />
        <RadioYesNo 
          v-model="values.purple"
          label="Purple (Custom)"
          bg-color="#6f42c1"
          text-color="#ffffff"
        />
        <RadioYesNo 
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
 * Required field with asterisk indicator.
 */
export const Required: Story = {
  args: {
    label: "Do you agree to the terms?",
    required: true,
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
          v-model="value"
          :label="args.label"
          :required="args.required"
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
          v-model="value"
          :label="args.label"
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
          v-model="value"
          :label="args.label"
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
 * Without label (standalone usage).
 */
export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
  render: (args: RadioYesNoArgs) => ({
    components: { RadioYesNo },
    setup() {
      const value = ref<"Y" | "N" | null>("N");
      return { args, value };
    },
    template: `
      <div>
        <p class="mb-space-xs"><strong>Standalone usage without integrated label:</strong></p>
        <RadioYesNo 
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
            v-model="isMobile"
            label="Is this a mobile number?"
            bg-color="#8c1d40"
          />
          
          <RadioYesNo 
            v-model="wantsSMS"
            label="Want to stay informed with ASU via SMS messaging?"
            bg-color="#8c1d40"
          />
          
          <RadioYesNo 
            v-model="acceptsTerms"
            label="Do you accept the terms and conditions?"
            bg-color="#8c1d40"
            :required="true"
          />
          
          <button 
            type="submit" 
            class="btn btn-primary mt-space-sm"
            :disabled="!isMobile || !wantsSMS || !acceptsTerms"
          >
            Submit
          </button>
        </div>
      </form>
    `,
  }),
};
