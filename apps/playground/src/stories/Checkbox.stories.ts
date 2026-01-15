import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { Checkbox } from "../components/ui/Checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "select" },
      options: ["Y", "N", null],
      description:
        "The checkbox state: 'Y' (checked), 'N' (unchecked), or null (unchecked, no action)",
    },
    variant: {
      control: { type: "select" },
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
      description: "The color variant (Bootstrap or RDS colors)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The size of the checkbox",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled",
    },
  },
  args: {
    modelValue: null,
    variant: "rds-dark-3",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue);
      return { args, checked };
    },
    template: `
      <div class="d-flex align-items-center gap-3">
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox 
            v-model="checked" 
            :variant="args.variant"
            :size="args.size"
            :disabled="args.disabled"
          />
          <span>Accept terms and conditions</span>
        </label>
        <div class="ms-auto text-sm text-muted">State: {{ checked }}</div>
      </div>
    `,
  }),
};

// Size variants
export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const small = ref<"Y" | "N" | null>("Y");
      const medium = ref<"Y" | "N" | null>("Y");
      const large = ref<"Y" | "N" | null>("Y");
      return { small, medium, large };
    },
    template: `
      <div class="d-flex flex-column gap-3">
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="small" size="sm" />
          <span>Small checkbox (18px)</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="medium" size="md" />
          <span>Medium checkbox - default (24px)</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="large" size="lg" />
          <span>Large checkbox (30px)</span>
        </label>
      </div>
    `,
  }),
};

// Bootstrap color variants
export const BootstrapColors: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const values = ref({
        primary: "Y",
        secondary: "Y",
        success: "Y",
        danger: "Y",
        warning: "Y",
        info: "Y",
        dark: "Y",
        light: "Y",
      });
      return { values };
    },
    template: `
      <div class="d-flex flex-column gap-3">
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.primary" variant="primary" />
          <span>Primary</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.secondary" variant="secondary" />
          <span>Secondary</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.success" variant="success" />
          <span>Success</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.danger" variant="danger" />
          <span>Danger</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.warning" variant="warning" />
          <span>Warning</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.info" variant="info" />
          <span>Info</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.dark" variant="dark" />
          <span>Dark</span>
        </label>
        <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
          <Checkbox v-model="values.light" variant="light" />
          <span class="text-dark">Light</span>
        </label>
      </div>
    `,
  }),
};

// Test prop binding (model-value) vs v-model
export const PropBindingTest: Story = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const vModelValue = ref<"Y" | "N" | null>("Y");
      const propValue = "Y";
      return { vModelValue, propValue };
    },
    template: `
      <div class="d-flex flex-column gap-3">
        <div>
          <h4>Using v-model (works):</h4>
          <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
            <Checkbox v-model="vModelValue" />
            <span>v-model checkbox (initialized with "Y")</span>
          </label>
          <p class="text-sm text-muted">Value: {{ vModelValue }}</p>
        </div>
        
        <div>
          <h4>Using :model-value prop (testing):</h4>
          <label class="d-flex align-items-center gap-2 cursor-pointer user-select-none">
            <Checkbox :model-value="propValue" />
            <span>:model-value checkbox (set to "Y")</span>
          </label>
          <p class="text-sm text-muted">Value: {{ propValue }}</p>
        </div>
      </div>
    `,
  }),
};
