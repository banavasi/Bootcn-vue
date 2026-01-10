import type { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '../components/ui/Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-danger',
        'outline-warning',
        'outline-info',
        'outline-light',
        'outline-dark',
        'link',
      ],
      description: 'The visual style of the button (Bootstrap variants).',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button.',
    },
    as: {
      control: { type: 'text' },
      description: 'The HTML tag to render the button as.',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Whether to render the button as a child of its parent component.',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    as: 'button',
    asChild: false,
    default: 'Button',
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">{{ args.default }}</Button>',
  }),
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Solid Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Secondary',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    default: 'Success',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    default: 'Danger',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    default: 'Warning',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    default: 'Info',
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    default: 'Light',
  },
}

export const Dark: Story = {
  args: {
    variant: 'dark',
    default: 'Dark',
  },
}

// Outline Variants
export const OutlinePrimary: Story = {
  name: 'Outline Primary',
  args: {
    variant: 'outline-primary',
    default: 'Outline Primary',
  },
}

export const OutlineSecondary: Story = {
  name: 'Outline Secondary',
  args: {
    variant: 'outline-secondary',
    default: 'Outline Secondary',
  },
}

export const OutlineSuccess: Story = {
  name: 'Outline Success',
  args: {
    variant: 'outline-success',
    default: 'Outline Success',
  },
}

export const OutlineDanger: Story = {
  name: 'Outline Danger',
  args: {
    variant: 'outline-danger',
    default: 'Outline Danger',
  },
}

export const OutlineWarning: Story = {
  name: 'Outline Warning',
  args: {
    variant: 'outline-warning',
    default: 'Outline Warning',
  },
}

export const OutlineInfo: Story = {
  name: 'Outline Info',
  args: {
    variant: 'outline-info',
    default: 'Outline Info',
  },
}

export const OutlineLight: Story = {
  name: 'Outline Light',
  args: {
    variant: 'outline-light',
    default: 'Outline Light',
  },
}

export const OutlineDark: Story = {
  name: 'Outline Dark',
  args: {
    variant: 'outline-dark',
    default: 'Outline Dark',
  },
}

// Link variant
export const Link: Story = {
  args: {
    variant: 'link',
    default: 'Link Button',
  },
}

// Size variants
export const SmallButton: Story = {
  name: 'Small',
  args: {
    size: 'sm',
    default: 'Small Button',
  },
}

export const MediumButton: Story = {
  name: 'Medium (Default)',
  args: {
    size: 'md',
    default: 'Medium Button',
  },
}

export const LargeButton: Story = {
  name: 'Large',
  args: {
    size: 'lg',
    default: 'Large Button',
  },
}

// All Sizes Comparison
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <Button size="sm" variant="primary">Small</Button>
        <Button size="md" variant="primary">Medium</Button>
        <Button size="lg" variant="primary">Large</Button>
      </div>
    `,
  }),
}

// All Solid Variants
export const AllSolidVariants: Story = {
  name: 'All Solid Variants',
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
      </div>
    `,
  }),
}

// All Outline Variants
export const AllOutlineVariants: Story = {
  name: 'All Outline Variants',
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <Button variant="outline-primary">Primary</Button>
        <Button variant="outline-secondary">Secondary</Button>
        <Button variant="outline-success">Success</Button>
        <Button variant="outline-danger">Danger</Button>
        <Button variant="outline-warning">Warning</Button>
        <Button variant="outline-info">Info</Button>
        <Button variant="outline-light">Light</Button>
        <Button variant="outline-dark">Dark</Button>
      </div>
    `,
  }),
}

// Disabled state
export const Disabled: Story = {
  args: {
    variant: 'primary',
    default: 'Disabled Button',
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" disabled>{{ args.default }}</Button>',
  }),
}

// Block button (full width)
export const BlockButton: Story = {
  name: 'Block Button (Full Width)',
  render: () => ({
    components: { Button },
    template: `
      <div style="width: 100%;">
        <Button variant="primary" class="w-100">Block Button</Button>
      </div>
    `,
  }),
}

// As link with asChild
export const AsLink: Story = {
  name: 'As Link (with asChild)',
  args: {
    asChild: true,
    variant: 'primary',
    default: 'Button as Link',
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args"><a href="/example" style="color: inherit; text-decoration: none;">{{ args.default }}</a></Button>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'The `asChild` prop allows the Button to compose its functionality onto a child element like an anchor tag.',
      },
    },
  },
}
