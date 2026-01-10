import type { Meta, StoryObj } from "@storybook/vue3";
import { Input } from "../components/ui/Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "number", "password", "tel", "url"],
      description: "The input type.",
    },
    label: {
      control: { type: "text" },
      description: "Label text for the input field.",
    },
    labelLevel: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Heading level for the label.",
    },
    labelSize: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size variant for the label.",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text for the input.",
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the input is required.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled.",
    },
    readonly: {
      control: { type: "boolean" },
      description: "Whether the input is readonly.",
    },
    isOptional: {
      control: { type: "boolean" },
      description: "Shows optional badge next to label.",
    },
    isLabelVisible: {
      control: { type: "boolean" },
      description: "Controls label visibility.",
    },
    isValid: {
      control: { type: "boolean" },
      description: "Shows valid state styling.",
    },
    error: {
      control: { type: "text" },
      description: "Error message to display.",
    },
    helpText: {
      control: { type: "text" },
      description: "Help text to display below input.",
    },
    tooltipText: {
      control: { type: "text" },
      description: "Tooltip text to show next to label.",
    },
  },
  args: {
    id: "input-example",
    label: "Input Label",
    placeholder: "Enter text",
    type: "text",
    required: false,
    disabled: false,
    readonly: false,
    isOptional: false,
    isLabelVisible: true,
    isValid: false,
    labelLevel: "h3",
    labelSize: "small",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    id: "default-input",
    label: "Default Input",
    placeholder: "Enter your text",
  },
};

export const WithoutLabel: Story = {
  args: {
    id: "no-label-input",
    placeholder: "Input without label",
    isLabelVisible: false,
  },
};

export const WithHelpText: Story = {
  args: {
    id: "help-text-input",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    helpText: "We'll never share your email with anyone else.",
  },
};

export const WithTooltip: Story = {
  args: {
    id: "tooltip-input",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    tooltipText: "Password must be at least 8 characters long",
  },
};

export const Optional: Story = {
  args: {
    id: "optional-input",
    label: "Middle Name",
    placeholder: "Optional field",
    isOptional: true,
    optionalText: "Optional",
  },
};

export const Required: Story = {
  args: {
    id: "required-input",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
  },
};

// Label Variants
export const LabelSizeSmall: Story = {
  args: {
    id: "label-small",
    label: "Small Label",
    labelLevel: "h3",
    labelSize: "small",
    placeholder: "h3-small",
  },
};

export const LabelSizeMedium: Story = {
  args: {
    id: "label-medium",
    label: "Medium Label",
    labelLevel: "h3",
    labelSize: "medium",
    placeholder: "h3-medium",
  },
};

export const LabelSizeLarge: Story = {
  args: {
    id: "label-large",
    label: "Large Label",
    labelLevel: "h2",
    labelSize: "large",
    placeholder: "h2-large",
  },
};

// Input Types
export const EmailInput: Story = {
  args: {
    id: "email-input",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const PasswordInput: Story = {
  args: {
    id: "password-input",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
};

export const NumberInput: Story = {
  args: {
    id: "number-input",
    label: "Age",
    type: "number",
    placeholder: "25",
  },
};

export const TelInput: Story = {
  args: {
    id: "tel-input",
    label: "Phone Number",
    type: "tel",
    placeholder: "(555) 123-4567",
  },
};

// States
export const WithError: Story = {
  args: {
    id: "error-input",
    label: "Username",
    placeholder: "Enter username",
    error: "This field is required",
  },
};

export const WithMultipleErrors: Story = {
  args: {
    id: "multiple-errors-input",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    errors: [
      "Password is required",
      "Password must be at least 8 characters",
      "Password must contain a number",
    ],
  },
};

export const ValidState: Story = {
  args: {
    id: "valid-input",
    label: "Username",
    placeholder: "john_doe",
    isValid: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-input",
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    id: "readonly-input",
    label: "Readonly Input",
    placeholder: "Cannot edit but can focus",
    readonly: true,
  },
};

// Interactive Example with v-model
export const Interactive: Story = {
  name: "Interactive (v-model)",
  render: () => ({
    components: { Input },
    data() {
      return {
        value: "",
      };
    },
    template: `
      <div>
        <Input
          id="interactive-input"
          v-model="value"
          label="Type Something"
          placeholder="Start typing..."
          help-text="The value will be displayed below"
        />
        <div class="mt-space-sm p-space-sm bg-light rounded">
          <strong>Current Value:</strong> {{ value || "(empty)" }}
        </div>
      </div>
    `,
  }),
};

// With Button Slot
export const WithButton: Story = {
  name: "With Button Slot",
  render: () => ({
    components: { Input },
    template: `
      <Input
        id="button-slot-input"
        label="Search"
        placeholder="Enter search term"
      >
        <template #button>
          <button
            type="button"
            class="btn btn-primary position-absolute end-0 top-0 me-space-xxs mt-space-xxxs"
          >
            Search
          </button>
        </template>
      </Input>
    `,
  }),
};

// With Custom Tooltip Slot
export const WithTooltipSlot: Story = {
  name: "With Tooltip Slot",
  render: () => ({
    components: { Input },
    template: `
      <Input
        id="tooltip-slot-input"
        label="Custom Tooltip"
        placeholder="Hover over the icon"
      >
        <template #tooltip>
          <span class="badge bg-info text-white" style="cursor: help;" title="This is a custom tooltip">
            <i class="fa-solid fa-circle-question"></i>
          </span>
        </template>
      </Input>
    `,
  }),
};

// Form Example
export const FormExample: Story = {
  name: "Form Example",
  render: () => ({
    components: { Input },
    data() {
      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        errors: {} as Record<string, string>,
      };
    },
    methods: {
      handleSubmit(this: {
        firstName: string;
        lastName: string;
        email: string;
        errors: Record<string, string>;
      }) {
        this.errors = {};
        if (!this.firstName) this.errors.firstName = "First name is required";
        if (!this.lastName) this.errors.lastName = "Last name is required";
        if (!this.email) this.errors.email = "Email is required";
        
        if (Object.keys(this.errors).length === 0) {
          alert("Form submitted successfully!");
        }
      },
    },
    template: `
      <form @submit.prevent="handleSubmit" class="p-space-md bg-light rounded">
        <h3 class="mb-space-md">Contact Information</h3>
        
        <Input
          id="first-name"
          v-model="firstName"
          label="First Name"
          label-level="h4"
          label-size="small"
          placeholder="John"
          required
          :error="errors.firstName"
        />
        
        <Input
          id="last-name"
          v-model="lastName"
          label="Last Name"
          label-level="h4"
          label-size="small"
          placeholder="Doe"
          required
          :error="errors.lastName"
        />
        
        <Input
          id="email"
          v-model="email"
          type="email"
          label="Email"
          label-level="h4"
          label-size="small"
          placeholder="john.doe@example.com"
          required
          :error="errors.email"
          help-text="We'll never share your email"
        />
        
        <Input
          id="phone"
          v-model="phone"
          type="tel"
          label="Phone Number"
          label-level="h4"
          label-size="small"
          placeholder="(555) 123-4567"
          is-optional
        />
        
        <button type="submit" class="btn btn-primary mt-space-sm">
          Submit
        </button>
      </form>
    `,
  }),
};

// Validation States Example
export const ValidationStates: Story = {
  name: "Validation States",
  render: () => ({
    components: { Input },
    template: `
      <div class="p-space-md">
        <h3 class="mb-space-md">Input Validation States</h3>
        
        <Input
          id="valid-state"
          label="Valid Input"
          placeholder="Valid input"
          is-valid
          class="mb-space-md"
        />
        
        <Input
          id="error-state"
          label="Invalid Input"
          placeholder="Invalid input"
          error="This field has an error"
          class="mb-space-md"
        />
        
        <Input
          id="default-state"
          label="Default Input"
          placeholder="Default input"
        />
      </div>
    `,
  }),
};
