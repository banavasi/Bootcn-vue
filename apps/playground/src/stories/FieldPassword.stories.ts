import type { Meta, StoryObj } from "@storybook/vue3";
import { FieldPassword } from "@bootcn-vue/field-password";

const meta = {
  title: "Components/FieldPassword",
  component: FieldPassword,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default"],
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<typeof FieldPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { FieldPassword },
    setup() {
      return { args };
    },
    template: `
      <FieldPassword v-bind="args">
        FieldPassword Content
      </FieldPassword>
    `,
  }),
};
