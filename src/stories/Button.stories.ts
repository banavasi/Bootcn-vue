import type { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '../components/ui/Button' // Assuming index.ts exports Button

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button.',
      table: {
        type: { summary: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button.',
      table: {
        type: { summary: "'default' | 'sm' | 'lg' | 'icon'" },
        defaultValue: { summary: 'default' },
      },
    },
    as: {
      control: { type: 'text' },
      description: 'The HTML tag to render the button as.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Whether to render the button as a child of its parent component.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    // Default slot content is handled by args.default and the render function
    // onClick is spied on via meta.args and handled by the actions addon
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked
  args: {
    variant: 'default',
    size: 'default',
    as: 'button',
    asChild: false,
    default: 'Button Text', // Default slot content using 'default' key
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    // Pass all args, Vue will bind props and Storybook handles slot content with 'default' arg
    template: '<Button v-bind="args">{{ args.default }}</Button>',
  }),
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    default: 'Default Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    default: 'Destructive Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    default: 'Outline Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Secondary Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    default: 'Ghost Button',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    default: 'Link Button',
  },
}

export const RouterLinkButton: Story = {
  name: 'Router Link Button',
  args: {
    default: 'Router Link',
    variant: 'link',
    asChild: true,
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args"><a href="/example-path">{{ args.default }}</a></Button>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'This button uses asChild with an anchor tag for navigation. The href specifies the path.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    default: 'Small Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    default: 'Large Button',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    default: '❤️', // Example icon, users can replace this with an SVG or icon component
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    // For the icon story, we might want to show how to use it with an actual icon
    template: '<Button v-bind="args"><span v-html="args.default"></span></Button>',
  }),
}

// Story to demonstrate asChild prop
export const AsChild: Story = {
  name: 'As a child (e.g. link)',
  args: {
    asChild: true,
    default: 'I am a link now',
  },
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args"><a href="#" target="_blank">{{ args.default }}</a></Button>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'The `asChild` prop allows the Button to compose its functionality onto a child element. Here, it is used with an `<a>` tag.',
      },
    },
  },
} 