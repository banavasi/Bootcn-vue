import type { Meta, StoryObj } from "@storybook/vue3";
import { FieldSSN } from "@bootcn-vue/forms";

const meta = {
  title: "Forms/FieldSSN",
  component: FieldSSN,
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
    isSaved: {
      control: { type: "boolean" },
      description: "Indicates if SSN is saved from backend",
    },
  },
  args: {
    id: "field-ssn-example",
    label: "Social Security Number",
    placeholder: "123-45-6789",
    required: false,
    disabled: false,
    readonly: false,
    isOptional: false,
    isSaved: false,
    labelLevel: "h3",
    labelSize: "small",
    labelVisible: true,
  },
} satisfies Meta<typeof FieldSSN>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-ssn",
    label: "Social Security Number",
    placeholder: "123-45-6789",
  },
};

export const WithTooltip: Story = {
  args: {
    id: "tooltip-ssn",
    label: "Social Security Number",
    placeholder: "123-45-6789",
    tooltipMessage: "Your SSN is used for identity verification and will be securely stored",
  },
};

export const WithHelpText: Story = {
  args: {
    id: "help-ssn",
    label: "Social Security Number",
    placeholder: "123-45-6789",
    helpText: "Enter your 9-digit Social Security Number without spaces or dashes",
  },
};

export const WithError: Story = {
  args: {
    id: "error-ssn",
    label: "Social Security Number",
    placeholder: "123-45-6789",
    error: "SSN must be 9 digits",
  },
};

export const Required: Story = {
  args: {
    id: "required-ssn",
    label: "Social Security Number",
    placeholder: "123-45-6789",
    required: true,
    tooltipMessage: "This field is required for identity verification",
  },
};

export const SavedFromBackend: Story = {
  name: "Saved from Backend (All Masked)",
  args: {
    id: "saved-ssn",
    label: "Social Security Number",
    isSaved: true,
    helpText: "Your SSN is securely stored. Contact support to update.",
  },
};

export const UserInput: Story = {
  name: "User Input Mode",
  render: () => ({
    components: { FieldSSN },
    data() {
      return {
        ssn: "",
      };
    },
    template: `
      <div class="p-space-md">
        <FieldSSN
          id="user-input-ssn"
          v-model="ssn"
          label="Social Security Number"
          placeholder="123-45-6789"
          help-text="Type your SSN - it will be masked with dashes"
        />
        <div class="mt-space-md p-space-sm bg-light rounded">
          <strong>Full Value (unmasked):</strong> {{ ssn || "(empty)" }}
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  name: "Interactive Demo",
  render: () => ({
    components: { FieldSSN },
    data() {
      return {
        ssn: "",
      };
    },
    template: `
      <div class="p-space-md">        
        <FieldSSN
          id="interactive-ssn"
          v-model="ssn"
          label="Social Security Number"
          placeholder="Type your SSN..."
          tooltip-message="Your SSN will be securely stored"
          help-text="Enter your 9-digit Social Security Number"
        />
        
        <div class="mt-space-md p-space-sm bg-light rounded">
          <strong>Unmasked Value:</strong> {{ ssn || "(empty)" }}
        </div>
      </div>
    `,
  }),
};

export const TwoStateComparison: Story = {
  name: "Two States: New Entry vs Saved",
  render: () => ({
    components: { FieldSSN },
    data() {
      return {
        newSSN: "",
        savedSSN: "000000000",
      };
    },
    template: `
      <div class="p-space-md">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="border rounded p-space-sm">
              <h4 class="h5 mb-space-sm">State 1: New Entry</h4>
              <FieldSSN
                id="new-entry-ssn"
                v-model="newSSN"
                label="Social Security Number"
                placeholder="123-45-6789"
                help-text="Type to enter your SSN"
              />
              <div class="mt-space-sm p-space-xs bg-light rounded small">
                <strong>Stored value:</strong> {{ newSSN || "(empty)" }}
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="border rounded p-space-sm">
              <h4 class="h5 mb-space-sm">State 2: Saved (Backend)</h4>
              <FieldSSN
                id="saved-ssn"
                v-model="savedSSN"
                label="Social Security Number"
                :is-saved="true"
                help-text="SSN is securely stored (read-only)"
              />
              <div class="mt-space-sm p-space-xs bg-light rounded small">
                <strong>Stored value:</strong> {{ savedSSN }}
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const CompleteForm: Story = {
  name: "Complete Verification Form",
  render: () => ({
    components: { FieldSSN },
    data() {
      return {
        ssn: "",
        errors: {} as Record<string, string>,
      };
    },
    methods: {
      validateSSN(this: { ssn: string; errors: Record<string, string> }) {
        this.errors = {};

        if (!this.ssn) {
          this.errors.ssn = "Social Security Number is required";
        } else if (this.ssn.length !== 9) {
          this.errors.ssn = "SSN must be exactly 9 digits";
        } else if (!/^\d{9}$/.test(this.ssn)) {
          this.errors.ssn = "SSN must contain only numbers";
        }

        if (Object.keys(this.errors).length === 0) {
          alert("SSN submitted successfully: ***-**-" + this.ssn.slice(-4));
        }
      },
    },
    template: `
      <form @submit.prevent="validateSSN" class="p-space-md bg-light rounded" style="max-width: 500px;">
        <h3 class="mb-space-md">Identity Verification</h3>
        
        <FieldSSN
          id="verify-ssn"
          v-model="ssn"
          label="Social Security Number"
          placeholder="123-45-6789"
          required
          tooltip-message="Your SSN will be encrypted and stored securely"
          :error="errors.ssn"
          help-text="Enter your 9-digit SSN for identity verification"
          class="mb-space-md"
        />
        
        <div class="alert alert-info mb-space-md">
          <strong>Privacy Notice:</strong> Your SSN is encrypted and stored securely.
        </div>
        
        <button type="submit" class="btn btn-primary">
          Verify Identity
        </button>
      </form>
    `,
  }),
};
