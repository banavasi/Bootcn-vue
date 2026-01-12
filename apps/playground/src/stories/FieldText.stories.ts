// @ts-expect-error - Type declarations not yet generated for workspace package
import type { Meta, StoryObj } from "@storybook/vue3";
import { FieldText } from "@bootcn-vue/field-text";

const meta = {
  title: "Forms/FieldText",
  component: FieldText,
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
    type: {
      control: { type: "select" },
      options: ["text", "email", "tel", "url", "search"],
      description: "Input type",
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
    id: "field-text-example",
    label: "Text Field",
    type: "text",
    placeholder: "Enter text",
    required: false,
    disabled: false,
    readonly: false,
    isOptional: false,
    labelLevel: "h3",
    labelSize: "small",
    labelVisible: true,
  },
} satisfies Meta<typeof FieldText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    id: "default-field",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const WithTooltip: Story = {
  args: {
    id: "tooltip-field",
    label: "Password",
    type: "text",
    placeholder: "Enter password",
    tooltipMessage: "Password must be at least 8 characters with 1 number and 1 special character",
  },
};

export const OptionalField: Story = {
  args: {
    id: "optional-field",
    label: "Middle Name",
    placeholder: "Optional field",
    isOptional: true,
  },
};

export const OptionalWithCustomText: Story = {
  args: {
    id: "optional-custom-field",
    label: "Phone Number",
    type: "tel",
    placeholder: "(555) 123-4567",
    isOptional: true,
    optionalText: "Not required",
  },
};

export const TooltipAndOptional: Story = {
  args: {
    id: "tooltip-optional-field",
    label: "Company Name",
    placeholder: "Acme Corporation",
    tooltipMessage: "Enter your company's legal name as it appears on official documents",
    isOptional: true,
    optionalText: "Optional",
  },
};

export const WithHelpText: Story = {
  args: {
    id: "help-field",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    helpText: "We'll never share your email with anyone else.",
    tooltipMessage: "We use your email to send important account notifications",
  },
};

export const WithError: Story = {
  args: {
    id: "error-field",
    label: "Username",
    placeholder: "Enter username",
    error: "This field is required",
    tooltipMessage: "Username must be 3-20 characters, letters and numbers only",
  },
};

export const RequiredWithTooltip: Story = {
  args: {
    id: "required-tooltip-field",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
    tooltipMessage: "Enter your full legal name as it appears on your ID",
  },
};

export const SearchInput: Story = {
  args: {
    id: "search-field",
    label: "Search",
    type: "search",
    placeholder: "Search for products...",
    tooltipMessage: "Use keywords to find products. You can search by name, category, or SKU",
  },
};

export const UrlInput: Story = {
  args: {
    id: "url-field",
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
    tooltipMessage: "Include the full URL with http:// or https://",
    isOptional: true,
  },
};

// Interactive Example
export const Interactive: Story = {
  name: "Interactive Demo",
  render: () => ({
    components: { FieldText },
    data() {
      return {
        value: "",
      };
    },
    template: `
      <div class="p-space-md">
        <FieldText
          id="interactive-field"
          v-model="value"
          label="Interactive Input"
          placeholder="Type something..."
          tooltip-message="This is an interactive tooltip! Try hovering over the info icon."
          is-optional
          optional-text="Optional"
          help-text="The value you type will appear below"
        />
        <div class="mt-space-md p-space-sm bg-light rounded">
          <strong>Current Value:</strong> {{ value || "(empty)" }}
        </div>
      </div>
    `,
  }),
};

// Form Example with All Features
export const CompleteForm: Story = {
  name: "Complete Form Example",
  render: () => ({
    components: { FieldText },
    data() {
      return {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        website: "",
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
      <form @submit.prevent="handleSubmit" class="p-space-md bg-light rounded" style="max-width: 600px;">
        <h3 class="mb-space-md">Registration Form</h3>
        
        <FieldText
          id="first-name"
          v-model="firstName"
          label="First Name"
          placeholder="John"
          required
          tooltip-message="Enter your first name as it appears on your ID"
          :error="errors.firstName"
          class="mb-space-sm"
        />
        
        <FieldText
          id="middle-name"
          v-model="middleName"
          label="Middle Name"
          placeholder="Optional"
          is-optional
          class="mb-space-sm"
        />
        
        <FieldText
          id="last-name"
          v-model="lastName"
          label="Last Name"
          placeholder="Doe"
          required
          tooltip-message="Enter your last name (surname)"
          :error="errors.lastName"
          class="mb-space-sm"
        />
        
        <FieldText
          id="email"
          v-model="email"
          type="email"
          label="Email Address"
          placeholder="john.doe@example.com"
          required
          tooltip-message="We'll use this email for account notifications and password recovery"
          :error="errors.email"
          help-text="We'll never share your email with third parties"
          class="mb-space-sm"
        />
        
        <FieldText
          id="phone"
          v-model="phone"
          type="tel"
          label="Phone Number"
          placeholder="(555) 123-4567"
          is-optional
          optional-text="Optional"
          tooltip-message="Optional. We may use this for account verification"
          class="mb-space-sm"
        />
        
        <FieldText
          id="website"
          v-model="website"
          type="url"
          label="Website"
          placeholder="https://example.com"
          is-optional
          tooltip-message="Your personal or company website (optional)"
          class="mb-space-md"
        />
        
        <button type="submit" class="btn btn-primary">
          Submit Registration
        </button>
      </form>
    `,
  }),
};
