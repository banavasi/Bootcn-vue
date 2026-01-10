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
    optional: {
      control: { type: "boolean" },
      description: "Shows optional badge next to label.",
    },
    error: {
      control: { type: "text" },
      description: "Error message to display.",
    },
    helpText: {
      control: { type: "text" },
      description: "Help text to display below input.",
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
    optional: false,
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

export const Optional: Story = {
  args: {
    id: "optional-input",
    label: "Middle Name",
    placeholder: "Optional field",
    optional: true,
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
          placeholder="John"
          required
          :error="errors.firstName"
        />
        
        <Input
          id="last-name"
          v-model="lastName"
          label="Last Name"
          placeholder="Doe"
          required
          :error="errors.lastName"
        />
        
        <Input
          id="email"
          v-model="email"
          type="email"
          label="Email"
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
          placeholder="(555) 123-4567"
          optional
        />
        
        <button type="submit" class="btn btn-primary mt-space-sm">
          Submit
        </button>
      </form>
    `,
  }),
};
