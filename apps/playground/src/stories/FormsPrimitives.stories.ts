import type { Meta, StoryObj } from "@storybook/vue3";
// @ts-expect-error - Type declarations not yet generated for workspace package
import { InputRoot, InputField, InputLabel, InputError, InputHelp } from "@bootcn-vue/forms";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const meta = {
  title: "Forms/Primitives",
  component: InputRoot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form primitives provide the building blocks for creating accessible, customizable form fields. Use these primitives to compose your own field components with full control over layout and styling.",
      },
    },
  },
} satisfies Meta<typeof InputRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic example showing all form primitives together.
 */
export const Basic: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="basic-input">
        <InputLabel>Email Address</InputLabel>
        <InputField v-model="value" type="email" placeholder="you@example.com" />
        <InputHelp>We'll never share your email with anyone else.</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Form field with validation error message.
 */
export const WithError: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="error-input" invalid>
        <InputLabel>Username</InputLabel>
        <InputField v-model="value" placeholder="Enter username" />
        <InputError>This field is required</InputError>
      </InputRoot>
    `,
  }),
};

/**
 * Required field with asterisk indicator.
 */
export const Required: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="required-input" required>
        <InputLabel>Full Name</InputLabel>
        <InputField v-model="value" placeholder="John Doe" />
        <InputHelp>This field is required</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Optional field with badge indicator.
 */
export const Optional: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="optional-input">
        <InputLabel optional>Middle Name</InputLabel>
        <InputField v-model="value" placeholder="Optional field" />
      </InputRoot>
    `,
  }),
};

/**
 * Label with tooltip for additional information.
 */
export const WithTooltip: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="tooltip-input">
        <InputLabel tooltip-text="Enter your company's legal name as it appears on official documents">
          Company Name
        </InputLabel>
        <InputField v-model="value" placeholder="Acme Corporation" />
      </InputRoot>
    `,
  }),
};

/**
 * Disabled field state.
 */
export const Disabled: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("Disabled value");
      return { value };
    },
    template: `
      <InputRoot id="disabled-input" disabled>
        <InputLabel>Disabled Field</InputLabel>
        <InputField v-model="value" placeholder="Cannot edit" />
        <InputHelp>This field is disabled</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Field with FontAwesome icon prefix.
 */
export const WithIconPrefix: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="icon-prefix-input">
        <InputLabel>Email Address</InputLabel>
        <InputField v-model="value" type="email" placeholder="you@example.com" has-prefix>
          <template #prefix>
            <i class="fa-regular fa-envelope"></i>
          </template>
        </InputField>
        <InputHelp>Enter your email address</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Field with FontAwesome icon suffix.
 */
export const WithIconSuffix: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="icon-suffix-input">
        <InputLabel>Search</InputLabel>
        <InputField v-model="value" type="search" placeholder="Search..." has-suffix>
          <template #suffix>
            <i class="fa-solid fa-magnifying-glass"></i>
          </template>
        </InputField>
      </InputRoot>
    `,
  }),
};

/**
 * Field with both prefix and suffix icons.
 */
export const WithBothIcons: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="both-icons-input">
        <InputLabel>Price</InputLabel>
        <InputField v-model="value" type="number" placeholder="0.00" has-prefix has-suffix>
          <template #prefix>
            <i class="fa-solid fa-dollar-sign"></i>
          </template>
          <template #suffix>
            <span>USD</span>
          </template>
        </InputField>
        <InputHelp>Enter amount in USD</InputHelp>
      </InputRoot>
    `,
  }),
};

/**
 * Complete form example with multiple fields using primitives.
 */
export const CompleteForm: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const email = ref("");
      const password = ref("");
      const phone = ref("");
      const errors = ref({
        email: "",
        password: "",
      });

      const handleSubmit = () => {
        errors.value = { email: "", password: "" };

        if (!email.value) {
          errors.value.email = "Email is required";
        }
        if (!password.value) {
          errors.value.password = "Password is required";
        }

        if (!errors.value.email && !errors.value.password) {
          alert("Form submitted successfully!");
        }
      };

      return { email, password, phone, errors, handleSubmit };
    },
    template: `
      <form @submit.prevent="handleSubmit" class="p-space-md bg-light rounded" style="max-width: 500px;">
        <h3 class="mb-space-md">Sign Up</h3>
        
        <div class="mb-space-sm">
          <InputRoot id="signup-email" required :invalid="!!errors.email">
            <InputLabel>Email Address</InputLabel>
            <InputField v-model="email" type="email" placeholder="you@example.com" has-prefix>
              <template #prefix>
                <i class="fa-regular fa-envelope"></i>
              </template>
            </InputField>
            <InputError v-if="errors.email">{{ errors.email }}</InputError>
            <InputHelp v-else>We'll never share your email</InputHelp>
          </InputRoot>
        </div>
        
        <div class="mb-space-sm">
          <InputRoot id="signup-password" required :invalid="!!errors.password">
            <InputLabel>Password</InputLabel>
            <InputField v-model="password" type="password" placeholder="Enter password" has-prefix>
              <template #prefix>
                <i class="fa-solid fa-lock"></i>
              </template>
            </InputField>
            <InputError v-if="errors.password">{{ errors.password }}</InputError>
            <InputHelp v-else>At least 8 characters</InputHelp>
          </InputRoot>
        </div>
        
        <div class="mb-space-sm">
          <InputRoot id="signup-phone">
            <InputLabel optional>Phone Number</InputLabel>
            <InputField v-model="phone" type="tel" placeholder="(555) 123-4567" has-prefix>
              <template #prefix>
                <i class="fa-solid fa-phone"></i>
              </template>
            </InputField>
            <InputHelp>Optional: For account recovery</InputHelp>
          </InputRoot>
        </div>
        
        <button type="submit" class="btn btn-primary mt-space-sm w-100">
          <i class="fa-solid fa-user-plus me-2"></i>
          Create Account
        </button>
      </form>
    `,
  }),
};

/**
 * Various input types showcasing the versatility of primitives.
 */
export const InputTypes: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputError, InputHelp },
    setup() {
      const text = ref("");
      const email = ref("");
      const password = ref("");
      const number = ref("");
      const tel = ref("");
      const url = ref("");
      const search = ref("");

      return { text, email, password, number, tel, url, search };
    },
    template: `
      <div class="row g-3" style="max-width: 800px;">
        <div class="col-md-6">
          <InputRoot id="type-text">
            <InputLabel>Text Input</InputLabel>
            <InputField v-model="text" type="text" placeholder="Text" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="type-email">
            <InputLabel>Email Input</InputLabel>
            <InputField v-model="email" type="email" placeholder="email@example.com" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="type-password">
            <InputLabel>Password Input</InputLabel>
            <InputField v-model="password" type="password" placeholder="Password" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="type-number">
            <InputLabel>Number Input</InputLabel>
            <InputField v-model="number" type="number" placeholder="123" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="type-tel">
            <InputLabel>Phone Input</InputLabel>
            <InputField v-model="tel" type="tel" placeholder="(555) 123-4567" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="type-url">
            <InputLabel>URL Input</InputLabel>
            <InputField v-model="url" type="url" placeholder="https://example.com" />
          </InputRoot>
        </div>
        
        <div class="col-12">
          <InputRoot id="type-search">
            <InputLabel>Search Input</InputLabel>
            <InputField v-model="search" type="search" placeholder="Search..." has-suffix>
              <template #suffix>
                <i class="fa-solid fa-magnifying-glass"></i>
              </template>
            </InputField>
          </InputRoot>
        </div>
      </div>
    `,
  }),
};

/**
 * InputLabel with custom FontAwesome icon in tooltip.
 */
export const LabelWithCustomIcon: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, FontAwesomeIcon },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <InputRoot id="custom-icon-label">
        <InputLabel tooltip-message="This is sensitive information that we keep secure">
          Security Code
          <template #icon>
            <FontAwesomeIcon :icon="['fas', 'shield-halved']" class="text-warning" />
          </template>
        </InputLabel>
        <InputField v-model="value" type="text" placeholder="Enter code" />
      </InputRoot>
    `,
  }),
};

/**
 * InputLabel with different tooltip positions.
 */
export const TooltipPositions: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, FontAwesomeIcon },
    setup() {
      const value1 = ref("");
      const value2 = ref("");
      const value3 = ref("");
      const value4 = ref("");
      return { value1, value2, value3, value4 };
    },
    template: `
      <div class="row g-3" style="max-width: 800px; padding: 100px 50px;">
        <div class="col-md-6">
          <InputRoot id="tooltip-top">
            <InputLabel tooltip-message="Tooltip appears on top" tooltip-position="top">
              Top Tooltip
            </InputLabel>
            <InputField v-model="value1" placeholder="Hover icon" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="tooltip-bottom">
            <InputLabel tooltip-message="Tooltip appears on bottom" tooltip-position="bottom">
              Bottom Tooltip
            </InputLabel>
            <InputField v-model="value2" placeholder="Hover icon" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="tooltip-left">
            <InputLabel tooltip-message="Tooltip appears on left" tooltip-position="left">
              Left Tooltip
            </InputLabel>
            <InputField v-model="value3" placeholder="Hover icon" />
          </InputRoot>
        </div>
        
        <div class="col-md-6">
          <InputRoot id="tooltip-right">
            <InputLabel tooltip-message="Tooltip appears on right" tooltip-position="right">
              Right Tooltip
            </InputLabel>
            <InputField v-model="value4" placeholder="Hover icon" />
          </InputRoot>
        </div>
      </div>
    `,
  }),
};

/**
 * InputLabel with icon positioned before the label text.
 */
export const IconPositionBefore: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, FontAwesomeIcon },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="row g-3" style="max-width: 600px;">
        <div class="col-12">
          <InputRoot id="icon-after">
            <InputLabel 
              tooltip-message="Icon appears after label (default)" 
              icon-position="after"
            >
              Icon After (Default)
            </InputLabel>
            <InputField v-model="value" placeholder="Icon on the right" />
          </InputRoot>
        </div>
        
        <div class="col-12">
          <InputRoot id="icon-before">
            <InputLabel 
              tooltip-message="Icon appears before label" 
              icon-position="before"
            >
              Icon Before
            </InputLabel>
            <InputField v-model="value" placeholder="Icon on the left" />
          </InputRoot>
        </div>
      </div>
    `,
  }),
};

/**
 * InputLabel with custom optional badge content.
 */
export const CustomOptionalBadge: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, FontAwesomeIcon },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `
      <div class="row g-3" style="max-width: 600px;">
        <div class="col-12">
          <InputRoot id="optional-default">
            <InputLabel is-optional>
              Default Optional Badge
            </InputLabel>
            <InputField v-model="value" placeholder="Optional field" />
          </InputRoot>
        </div>
        
        <div class="col-12">
          <InputRoot id="optional-custom-text">
            <InputLabel is-optional optional-text="Not Required">
              Custom Optional Text
            </InputLabel>
            <InputField v-model="value" placeholder="Not required" />
          </InputRoot>
        </div>
        
        <div class="col-12">
          <InputRoot id="optional-custom-badge">
            <InputLabel is-optional>
              Custom Optional Badge
              <template #optional-badge>
                <FontAwesomeIcon :icon="['fas', 'circle-question']" class="text-muted" size="sm" />
              </template>
            </InputLabel>
            <InputField v-model="value" placeholder="Custom badge" />
          </InputRoot>
        </div>
      </div>
    `,
  }),
};

/**
 * Advanced InputLabel customization with all features combined.
 */
export const AdvancedLabelCustomization: Story = {
  render: () => ({
    components: { InputRoot, InputField, InputLabel, InputHelp, FontAwesomeIcon },
    setup() {
      const apiKey = ref("");
      const nickname = ref("");
      return { apiKey, nickname };
    },
    template: `
      <div class="row g-3" style="max-width: 600px;">
        <div class="col-12">
          <InputRoot id="api-key" required>
            <InputLabel 
              tooltip-message="Your API key is used to authenticate requests. Keep it secret!"
              tooltip-position="right"
              icon-position="before"
            >
              API Key
              <template #icon>
                <FontAwesomeIcon :icon="['fas', 'key']" class="text-danger" size="sm" />
              </template>
            </InputLabel>
            <InputField v-model="apiKey" type="password" placeholder="sk-..." has-prefix>
              <template #prefix>
                <FontAwesomeIcon :icon="['fas', 'lock']" />
              </template>
            </InputField>
            <InputHelp>
              <FontAwesomeIcon :icon="['fas', 'triangle-exclamation']" class="text-warning me-1" />
              Never share your API key with anyone
            </InputHelp>
          </InputRoot>
        </div>
        
        <div class="col-12">
          <InputRoot id="nickname">
            <InputLabel 
              is-optional
              tooltip-message="Your nickname will be visible to other users"
              tooltip-position="bottom"
            >
              Display Name
              <template #icon>
                <FontAwesomeIcon :icon="['far', 'circle-question']" class="text-info" size="sm" />
              </template>
              <template #optional-badge>
                <span class="badge bg-info text-white">Nice to have</span>
              </template>
            </InputLabel>
            <InputField v-model="nickname" placeholder="Choose a nickname" has-prefix>
              <template #prefix>
                <FontAwesomeIcon :icon="['fas', 'user']" />
              </template>
            </InputField>
          </InputRoot>
        </div>
      </div>
    `,
  }),
};
