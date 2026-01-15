import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio";

interface RadioGroupArgs {
  modelValue?: string | number;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
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
  },
  args: {
    modelValue: undefined,
    spacing: "sm",
    variant: "rds-dark-3",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group with single selectable option.
 */
export const Default: Story = {
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
          :disabled="args.disabled"
        >
          <RadioGroupItem value="option1">First Option</RadioGroupItem>
          <RadioGroupItem value="option2">Second Option</RadioGroupItem>
          <RadioGroupItem value="option3">Third Option</RadioGroupItem>
          <RadioGroupItem value="option4">Fourth Option</RadioGroupItem>
        </RadioGroup>
        
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
  },
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
        >
          <RadioGroupItem value="option1">First Option</RadioGroupItem>
          <RadioGroupItem value="option2">Second Option (pre-selected)</RadioGroupItem>
          <RadioGroupItem value="option3">Third Option</RadioGroupItem>
          <RadioGroupItem value="option4">Fourth Option</RadioGroupItem>
        </RadioGroup>
        
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
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const spacing = ref<Array<"xs" | "sm" | "md" | "lg" | "xl">>(["xs", "sm", "md", "lg", "xl"]);
      const selections = ref({
        xs: "1",
        sm: "1",
        md: "1",
        lg: "1",
        xl: "1",
      });
      return { spacing, selections };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="size in spacing" :key="size">
          <h4 class="mb-space-xs text-capitalize">{{ size }} (gap-space-{{ size === 'xs' ? 'xxs' : size === 'sm' ? 'xs' : size === 'md' ? 'sm' : size === 'lg' ? 'md' : 'lg' }})</h4>
          <RadioGroup v-model="selections[size]" :spacing="size">
            <RadioGroupItem value="1">Option 1</RadioGroupItem>
            <RadioGroupItem value="2">Option 2</RadioGroupItem>
            <RadioGroupItem value="3">Option 3</RadioGroupItem>
          </RadioGroup>
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
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const variants = ref(["primary", "success", "danger", "warning", "info", "rds-dark-3"]);
      const selections = ref({
        primary: "1",
        success: "1",
        danger: "1",
        warning: "1",
        info: "1",
        "rds-dark-3": "1",
      });
      return { variants, selections };
    },
    template: `
      <div class="d-flex gap-space-lg flex-wrap">
        <div v-for="variant in variants" :key="variant">
          <h4 class="mb-space-xs text-capitalize">{{ variant }}</h4>
          <RadioGroup v-model="selections[variant]" :variant="variant" spacing="xs">
            <RadioGroupItem value="1">Option 1</RadioGroupItem>
            <RadioGroupItem value="2">Option 2</RadioGroupItem>
            <RadioGroupItem value="3">Option 3</RadioGroupItem>
          </RadioGroup>
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
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const sizes = ref(["sm", "md", "lg"]);
      const selections = ref({
        sm: "1",
        md: "1",
        lg: "1",
      });
      return { sizes, selections };
    },
    template: `
      <div class="d-flex gap-space-lg align-items-start">
        <div v-for="size in sizes" :key="size">
          <h4 class="mb-space-xs text-uppercase">{{ size }}</h4>
          <RadioGroup v-model="selections[size]" :size="size" spacing="xs">
            <RadioGroupItem value="1">Option 1</RadioGroupItem>
            <RadioGroupItem value="2">Option 2</RadioGroupItem>
            <RadioGroupItem value="3">Option 3</RadioGroupItem>
          </RadioGroup>
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
  },
  render: (args: RadioGroupArgs) => ({
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const selected = ref(args.modelValue);
      return { args, selected };
    },
    template: `
      <div>
        <RadioGroup 
          v-model="selected"
          :spacing="args.spacing"
          :variant="args.variant"
          :size="args.size"
          :disabled="args.disabled"
        >
          <RadioGroupItem value="option1">First Option</RadioGroupItem>
          <RadioGroupItem value="option2">Second Option (disabled)</RadioGroupItem>
          <RadioGroupItem value="option3">Third Option</RadioGroupItem>
        </RadioGroup>
        
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
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const selected = ref("option1");
      return { selected };
    },
    template: `
      <div>
        <RadioGroup v-model="selected" spacing="sm">
          <RadioGroupItem value="option1">First Option</RadioGroupItem>
          <RadioGroupItem value="option2" :disabled="true">Second Option (disabled)</RadioGroupItem>
          <RadioGroupItem value="option3">Third Option</RadioGroupItem>
          <RadioGroupItem value="option4">Fourth Option</RadioGroupItem>
        </RadioGroup>
        
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
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const selected = ref();
      return { selected };
    },
    template: `
      <div style="max-width: 500px;">
        <RadioGroup v-model="selected" spacing="md">
          <RadioGroupItem value="delivery-standard">
            Standard Delivery (5-7 business days) - Free
          </RadioGroupItem>
          <RadioGroupItem value="delivery-express">
            Express Delivery (2-3 business days) - $9.99
          </RadioGroupItem>
          <RadioGroupItem value="delivery-overnight">
            Overnight Delivery (Next business day) - $24.99
          </RadioGroupItem>
          <RadioGroupItem value="delivery-pickup">
            In-store Pickup (Available same day) - Free
          </RadioGroupItem>
        </RadioGroup>
        
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
    components: { RadioGroup, RadioGroupItem },
    setup() {
      const plan = ref();
      const handleSubmit = () => {
        alert(`Selected plan: ${plan.value}`);
      };
      return { plan, handleSubmit };
    },
    template: `
      <form @submit.prevent="handleSubmit" style="max-width: 400px;">
        <div class="mb-space-md">
          <label class="form-label"><strong>Choose your subscription plan:</strong></label>
          <RadioGroup v-model="plan" spacing="sm" variant="primary">
            <RadioGroupItem value="free">Free - $0/month</RadioGroupItem>
            <RadioGroupItem value="basic">Basic - $9/month</RadioGroupItem>
            <RadioGroupItem value="pro">Pro - $29/month</RadioGroupItem>
            <RadioGroupItem value="enterprise">Enterprise - $99/month</RadioGroupItem>
          </RadioGroup>
        </div>
        
        <button type="submit" class="btn btn-primary" :disabled="!plan">Submit</button>
        
        <div class="mt-space-sm text-muted">
          {{ plan ? 'Plan selected: ' + plan : 'Please select a plan' }}
        </div>
      </form>
    `,
  }),
};
