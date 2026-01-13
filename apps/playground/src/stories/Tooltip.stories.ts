import type { Meta, StoryObj } from "@storybook/vue3";
import { Tooltip, TooltipTrigger, TooltipContent } from "@bootcn-vue/tooltip";
import { Button } from "@bootcn-vue/buttons";

interface TooltipProps {
  delayDuration?: number;
  skipDelayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Prerequisites

Before adding components, initialize bootcn-vue in your project:

\`\`\`bash
npx @bootcn-vue/cli@latest init
\`\`\`

This will:
- Create \`bootcn.config.json\` configuration file
- Set up path aliases (\`@/*\`) in \`tsconfig.json\` and \`vite.config.ts\`
- Create \`src/lib/utils.ts\` with utility functions
- Create \`src/components/ui/\` directory
- Install base dependencies: \`bootstrap\`, \`reka-ui\`, \`class-variance-authority\`, \`clsx\`, \`tailwind-merge\`

## Installation

\`\`\`bash
npx @bootcn-vue/cli@latest add tooltip
\`\`\`

This command will:
- Install required dependencies: \`@bootcn-vue/core\`
- Install peer dependencies: \`reka-ui\`
- Copy the component files to \`src/components/ui/Tooltip/\`:
  - \`Tooltip.vue\`
  - \`TooltipTrigger.vue\`
  - \`TooltipContent.vue\`
  - \`tooltip.css\`
  - \`index.ts\`
- Transform imports to use local paths

## Import

\`\`\`vue
<script setup lang="ts">
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
</script>
\`\`\`

## Package

**[@bootcn-vue/tooltip](https://www.npmjs.com/package/@bootcn-vue/tooltip)** - Accessible tooltip component

**Note:** Components are copied to \`src/components/ui/\` for full control and customization.

## Overview

\`Tooltip\` provides accessible tooltip functionality built on Reka UI primitives. It supports customizable positioning, delays, and HTML content.

### Key Features

- ✅ Accessible with ARIA attributes
- ✅ Customizable positioning (top, right, bottom, left)
- ✅ Configurable delay duration
- ✅ HTML content support
- ✅ Custom styling support
        `,
      },
    },
  },
  argTypes: {
    delayDuration: {
      control: "number",
      description: "Delay in milliseconds before tooltip appears",
      defaultValue: 300,
    },
    skipDelayDuration: {
      control: "number",
      description: "Duration after which subsequent tooltips appear instantly",
      defaultValue: 300,
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Preferred side of the trigger to render the tooltip",
      defaultValue: "top",
    },
    sideOffset: {
      control: "number",
      description: "Distance in pixels from the trigger",
      defaultValue: 4,
    },
  },
} satisfies Meta<TooltipProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip positioned at the top of the trigger element.
 */
export const Default: Story = {
  render: (args: TooltipProps) => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    setup() {
      return { args };
    },
    template: `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
        <Tooltip v-bind="args">
          <TooltipTrigger as-child>
            <Button variant="primary">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent :side="args.side" :side-offset="args.sideOffset">
            This is a helpful tooltip
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
  args: {
    delayDuration: 300,
    side: "top",
    sideOffset: 4,
  },
};

/**
 * Tooltip positioned at the top of the trigger element.
 */
export const Top: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Top Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            Tooltip positioned at the top
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * Tooltip positioned at the bottom of the trigger element.
 */
export const Bottom: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Bottom Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Tooltip positioned at the bottom
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * Tooltip positioned to the left of the trigger element.
 */
export const Left: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Left Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            Tooltip positioned on the left
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * Tooltip positioned to the right of the trigger element.
 */
export const Right: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Right Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Tooltip positioned on the right
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * All four tooltip positions displayed together for comparison.
 */
export const AllPositions: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex flex-column align-items-center gap-space-lg" style="min-height: 400px; padding: 4rem;">
        <div class="d-flex gap-space-md">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="primary">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Top position
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div class="d-flex gap-space-xl align-items-center">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="primary">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              Left position
            </TooltipContent>
          </Tooltip>
          
          <span class="text-muted">Hover over buttons</span>
          
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="primary">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Right position
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div class="d-flex gap-space-md">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="primary">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Bottom position
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    `,
  }),
};

/**
 * Tooltip with custom delay duration.
 */
export const CustomDelay: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center gap-space-md" style="min-height: 200px;">
        <Tooltip :delay-duration="0">
          <TooltipTrigger as-child>
            <Button variant="primary">Instant (0ms)</Button>
          </TooltipTrigger>
          <TooltipContent>
            Appears instantly
          </TooltipContent>
        </Tooltip>
        
        <Tooltip :delay-duration="1000">
          <TooltipTrigger as-child>
            <Button variant="primary">Slow (1000ms)</Button>
          </TooltipTrigger>
          <TooltipContent>
            Takes 1 second to appear
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * Tooltip with custom side offset (distance from trigger).
 */
export const CustomOffset: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center gap-space-md" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Close (4px)</Button>
          </TooltipTrigger>
          <TooltipContent :side-offset="4">
            Close to button
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Far (20px)</Button>
          </TooltipTrigger>
          <TooltipContent :side-offset="20">
            Far from button
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * Tooltip with longer content demonstrating text wrapping.
 */
export const LongContent: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Hover for details</Button>
          </TooltipTrigger>
          <TooltipContent>
            This tooltip contains longer text to demonstrate how the component handles multi-line content with proper wrapping and styling.
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * Tooltip with icon trigger demonstrating the info icon pattern used in forms.
 */
export const IconTrigger: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent },
    template: `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
        <div class="d-flex align-items-center gap-space-xxs">
          <label class="form-label mb-0">Company Name</label>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                class="btn btn-link p-0 border-0 text-info"
                style="line-height: 1;"
                aria-label="More information"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Enter your company's legal name as it appears on official documents
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    `,
  }),
};

/**
 * Multiple tooltips demonstrating the skip delay feature.
 * After hovering one tooltip, subsequent tooltips appear instantly for a short period.
 */
export const MultipleTooltips: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex justify-content-center align-items-center gap-space-sm" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline-primary" size="sm">Save</Button>
          </TooltipTrigger>
          <TooltipContent>
            Save your changes
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline-secondary" size="sm">Cancel</Button>
          </TooltipTrigger>
          <TooltipContent>
            Discard changes
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline-danger" size="sm">Delete</Button>
          </TooltipTrigger>
          <TooltipContent>
            Permanently delete item
          </TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};

/**
 * Tooltip with different button variants.
 */
export const WithButtonVariants: Story = {
  render: () => ({
    components: { Tooltip, TooltipTrigger, TooltipContent, Button },
    template: `
      <div class="d-flex flex-wrap justify-content-center align-items-center gap-space-sm" style="min-height: 200px;">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="primary">Primary</Button>
          </TooltipTrigger>
          <TooltipContent>Primary action button</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="secondary">Secondary</Button>
          </TooltipTrigger>
          <TooltipContent>Secondary action button</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="success">Success</Button>
          </TooltipTrigger>
          <TooltipContent>Success action button</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="danger">Danger</Button>
          </TooltipTrigger>
          <TooltipContent>Destructive action button</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline-primary">Outline</Button>
          </TooltipTrigger>
          <TooltipContent>Outline button style</TooltipContent>
        </Tooltip>
      </div>
    `,
  }),
};
