import type { Meta, StoryObj } from '@storybook/vue3';
import HelloWorld from '../components/HelloWorld.vue';

const meta = {
  title: 'Components/HelloWorld',
  component: HelloWorld,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    },
  },
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}; 