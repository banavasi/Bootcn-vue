import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { CheckboxGroup, CheckboxGroupItem } from "@/components/ui/Checkbox";

interface CheckboxGroupArgs {
  modelValue: Array<string | number>;
  spacing: "xs" | "sm" | "md" | "lg" | "xl";
  variant: string;
  size: "sm" | "md" | "lg";
  disabled: boolean;
}

const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "object",
      description: "Array of selected values",
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
      description: "Color variant (inherited by all checkboxes)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of checkboxes (inherited by all checkboxes)",
    },
    disabled: {
      control: "boolean",
      description: "Disable all checkboxes in the group",
    },
  },
  args: {
    modelValue: [],
    spacing: "sm",
    variant: "rds-dark-3",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox group with multiple selectable options.
 */
export const Default: Story = {
  render: (args: CheckboxGroupArgs) => ({
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
          :disabled="args.disabled"
        >
          <CheckboxGroupItem value="option1">First Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option2">Second Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option3">Third Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option4">Fourth Option</CheckboxGroupItem>
        </CheckboxGroup>
        
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
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
        >
          <CheckboxGroupItem value="option1">First Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option2">Second Option (pre-selected)</CheckboxGroupItem>
          <CheckboxGroupItem value="option3">Third Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option4">Fourth Option (pre-selected)</CheckboxGroupItem>
        </CheckboxGroup>
        
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
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const spacing = ref<Array<"xs" | "sm" | "md" | "lg" | "xl">>(["xs", "sm", "md", "lg", "xl"]);
      const selections = ref({
        xs: [],
        sm: [],
        md: [],
        lg: [],
        xl: [],
      });
      return { spacing, selections };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="size in spacing" :key="size">
          <h4 class="mb-space-xs text-capitalize">{{ size }} (gap-space-{{ size === 'xs' ? 'xxs' : size === 'sm' ? 'xs' : size === 'md' ? 'sm' : size === 'lg' ? 'md' : 'lg' }})</h4>
          <CheckboxGroup v-model="selections[size]" :spacing="size">
            <CheckboxGroupItem value="1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="2">Option 2</CheckboxGroupItem>
            <CheckboxGroupItem value="3">Option 3</CheckboxGroupItem>
          </CheckboxGroup>
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
    components: { CheckboxGroup, CheckboxGroupItem },
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
      return { variants, selections };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="variant in variants" :key="variant">
          <h4 class="mb-space-xs text-capitalize">{{ variant }}</h4>
          <CheckboxGroup v-model="selections[variant]" :variant="variant" spacing="xs">
            <CheckboxGroupItem value="1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="2">Option 2</CheckboxGroupItem>
            <CheckboxGroupItem value="3">Option 3</CheckboxGroupItem>
          </CheckboxGroup>
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
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const sizes = ref(["sm", "md", "lg"]);
      const selections = ref({
        sm: ["1"],
        md: ["1"],
        lg: ["1"],
      });
      return { sizes, selections };
    },
    template: `
      <div class="d-flex gap-space-lg align-items-start">
        <div v-for="size in sizes" :key="size">
          <h4 class="mb-space-xs text-uppercase">{{ size }}</h4>
          <CheckboxGroup v-model="selections[size]" :size="size" spacing="xs">
            <CheckboxGroupItem value="1">Option 1</CheckboxGroupItem>
            <CheckboxGroupItem value="2">Option 2</CheckboxGroupItem>
            <CheckboxGroupItem value="3">Option 3</CheckboxGroupItem>
          </CheckboxGroup>
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
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <CheckboxGroup 
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
          :disabled="args.disabled"
        >
          <CheckboxGroupItem value="option1">First Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option2">Second Option (disabled)</CheckboxGroupItem>
          <CheckboxGroupItem value="option3">Third Option</CheckboxGroupItem>
        </CheckboxGroup>
        
        <div class="mt-space-md">
          <strong>Selected:</strong> {{ selected.length === 0 ? 'None' : selected.join(', ') }}
        </div>
      </div>
    `,
  }),
};

/**
 * Checkbox group with individual item disabled.
 */
export const IndividualDisabled: Story = {
  render: () => ({
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const selected = ref(["option2"]);
      return { selected };
    },
    template: `
      <div>
        <CheckboxGroup v-model="selected" spacing="sm">
          <CheckboxGroupItem value="option1">First Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option2" :disabled="true">Second Option (disabled)</CheckboxGroupItem>
          <CheckboxGroupItem value="option3">Third Option</CheckboxGroupItem>
          <CheckboxGroupItem value="option4">Fourth Option</CheckboxGroupItem>
        </CheckboxGroup>
        
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
  render: () => ({
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const selected = ref([]);
      return { selected };
    },
    template: `
      <div style="max-width: 500px;">
        <CheckboxGroup v-model="selected" spacing="md">
          <CheckboxGroupItem value="terms">
            I agree to the terms and conditions of this service
          </CheckboxGroupItem>
          <CheckboxGroupItem value="privacy">
            I have read and understand the privacy policy
          </CheckboxGroupItem>
          <CheckboxGroupItem value="marketing">
            I would like to receive marketing emails and promotional offers
          </CheckboxGroupItem>
          <CheckboxGroupItem value="newsletter">
            Subscribe to the monthly newsletter with product updates
          </CheckboxGroupItem>
        </CheckboxGroup>
        
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
  render: () => ({
    components: { CheckboxGroup, CheckboxGroupItem },
    setup() {
      const interests = ref([]);
      const handleSubmit = () => {
        alert(`Selected interests: ${interests.value.join(", ")}`);
      };
      return { interests, handleSubmit };
    },
    template: `
      <form @submit.prevent="handleSubmit" style="max-width: 400px;">
        <div class="mb-space-md">
          <label class="form-label"><strong>Select your interests:</strong></label>
          <CheckboxGroup v-model="interests" spacing="sm" variant="primary">
            <CheckboxGroupItem value="web">Web Development</CheckboxGroupItem>
            <CheckboxGroupItem value="mobile">Mobile Apps</CheckboxGroupItem>
            <CheckboxGroupItem value="design">UI/UX Design</CheckboxGroupItem>
            <CheckboxGroupItem value="data">Data Science</CheckboxGroupItem>
            <CheckboxGroupItem value="ai">Artificial Intelligence</CheckboxGroupItem>
          </CheckboxGroup>
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
        
        <div class="mt-space-sm text-muted">
          {{ interests.length }} interest(s) selected
        </div>
      </form>
    `,
  }),
};
