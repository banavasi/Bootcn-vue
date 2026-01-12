import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta = {
  title: "Design System/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# RDS Color System

The RDS (Reka Design System) color palette provides a consistent set of neutral colors for the component library.

## Color Scale

- **Light Shades (1-5)**: From lightest to medium gray
- **Dark Shades (1-3)**: From medium gray to darkest

## Usage

Colors can be used in three ways:

1. **Utility Classes**: \`text-rds-light-1\`, \`bg-rds-dark-2\`, \`border-rds-light-4\`
2. **CSS Variables**: \`var(--rds-light-3)\`
3. **SCSS Variables**: \`$rds-dark-2\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Complete color palette showing all light and dark shades.
 */
export const AllColors: Story = {
  render: () => ({
    template: `
      <div>
        <h2 class="mb-space-md">Light Shades</h2>
        <div class="row g-3 mb-space-lg">
          <div class="col-md-4">
            <div class="p-space-md bg-rds-light-1 border border-rds-light-4">
              <h5 class="mb-space-xs">light-1</h5>
              <p class="mb-space-xxs font-monospace">#fafafa</p>
              <code class="d-block mb-1">text-rds-light-1</code>
              <code class="d-block mb-1">bg-rds-light-1</code>
              <code class="d-block">var(--rds-light-1)</code>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="p-space-md bg-rds-light-2 border border-rds-light-4">
              <h5 class="mb-space-xs">light-2</h5>
              <p class="mb-space-xxs font-monospace">#f1f1f1</p>
              <code class="d-block mb-1">text-rds-light-2</code>
              <code class="d-block mb-1">bg-rds-light-2</code>
              <code class="d-block">var(--rds-light-2)</code>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="p-space-md bg-rds-light-3 border border-rds-light-4">
              <h5 class="mb-space-xs">light-3</h5>
              <p class="mb-space-xxs font-monospace">#e8e8e8</p>
              <code class="d-block mb-1">text-rds-light-3</code>
              <code class="d-block mb-1">bg-rds-light-3</code>
              <code class="d-block">var(--rds-light-3)</code>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="p-space-md bg-rds-light-4 border border-rds-light-4">
              <h5 class="mb-space-xs">light-4</h5>
              <p class="mb-space-xxs font-monospace">#d0d0d0</p>
              <code class="d-block mb-1">text-rds-light-4</code>
              <code class="d-block mb-1">bg-rds-light-4</code>
              <code class="d-block">var(--rds-light-4)</code>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="p-space-md bg-rds-light-5 border border-rds-light-4">
              <h5 class="mb-space-xs">light-5</h5>
              <p class="mb-space-xxs font-monospace">#bfbfbf</p>
              <code class="d-block mb-1">text-rds-light-5</code>
              <code class="d-block mb-1">bg-rds-light-5</code>
              <code class="d-block">var(--rds-light-5)</code>
            </div>
          </div>
        </div>

        <h2 class="mb-space-md">Dark Shades</h2>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="p-space-md bg-rds-dark-1 text-white border border-rds-dark-2">
              <h5 class="mb-space-xs text-white">dark-1</h5>
              <p class="mb-space-xxs font-monospace text-white">#747474</p>
              <code class="d-block mb-1 text-white">text-rds-dark-1</code>
              <code class="d-block mb-1 text-white">bg-rds-dark-1</code>
              <code class="d-block text-white">var(--rds-dark-1)</code>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="p-space-md bg-rds-dark-2 text-white border border-rds-dark-3">
              <h5 class="mb-space-xs text-white">dark-2</h5>
              <p class="mb-space-xxs font-monospace text-white">#484848</p>
              <code class="d-block mb-1 text-white">text-rds-dark-2</code>
              <code class="d-block mb-1 text-white">bg-rds-dark-2</code>
              <code class="d-block text-white">var(--rds-dark-2)</code>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="p-space-md bg-rds-dark-3 text-white border border-rds-dark-3">
              <h5 class="mb-space-xs text-white">dark-3</h5>
              <p class="mb-space-xxs font-monospace text-white">#191919</p>
              <code class="d-block mb-1 text-white">text-rds-dark-3</code>
              <code class="d-block mb-1 text-white">bg-rds-dark-3</code>
              <code class="d-block text-white">var(--rds-dark-3)</code>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Text color utilities applied to text elements.
 */
export const TextColors: Story = {
  render: () => ({
    template: `
      <div>
        <h3 class="mb-space-md">Light Text Colors</h3>
        <div class="mb-space-lg bg-rds-dark-3 p-space-md">
          <p class="text-rds-light-1 mb-2">This text uses text-rds-light-1 (#fafafa)</p>
          <p class="text-rds-light-2 mb-2">This text uses text-rds-light-2 (#f1f1f1)</p>
          <p class="text-rds-light-3 mb-2">This text uses text-rds-light-3 (#e8e8e8)</p>
          <p class="text-rds-light-4 mb-2">This text uses text-rds-light-4 (#d0d0d0)</p>
          <p class="text-rds-light-5 mb-0">This text uses text-rds-light-5 (#bfbfbf)</p>
        </div>

        <h3 class="mb-space-md">Dark Text Colors</h3>
        <div class="bg-rds-light-1 p-space-md">
          <p class="text-rds-dark-1 mb-2">This text uses text-rds-dark-1 (#747474)</p>
          <p class="text-rds-dark-2 mb-2">This text uses text-rds-dark-2 (#484848)</p>
          <p class="text-rds-dark-3 mb-0">This text uses text-rds-dark-3 (#191919)</p>
        </div>
      </div>
    `,
  }),
};

/**
 * Background color utilities applied to containers.
 */
export const BackgroundColors: Story = {
  render: () => ({
    template: `
      <div>
        <h3 class="mb-space-md">Light Backgrounds</h3>
        <div class="row g-3 mb-space-lg">
          <div class="col-md-6">
            <div class="bg-rds-light-1 p-space-md border border-rds-light-4">
              <strong>bg-rds-light-1</strong>
              <p class="mb-0">Lightest background shade</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-rds-light-2 p-space-md border border-rds-light-4">
              <strong>bg-rds-light-2</strong>
              <p class="mb-0">Very light background</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-rds-light-3 p-space-md border border-rds-light-4">
              <strong>bg-rds-light-3</strong>
              <p class="mb-0">Light gray background</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-rds-light-4 p-space-md border border-rds-light-4">
              <strong>bg-rds-light-4</strong>
              <p class="mb-0">Medium light background</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="bg-rds-light-5 p-space-md border border-rds-light-4">
              <strong>bg-rds-light-5</strong>
              <p class="mb-0">Medium gray background</p>
            </div>
          </div>
        </div>

        <h3 class="mb-space-md">Dark Backgrounds</h3>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="bg-rds-dark-1 text-white p-space-md">
              <strong>bg-rds-dark-1</strong>
              <p class="mb-0">Medium dark background</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-rds-dark-2 text-white p-space-md">
              <strong>bg-rds-dark-2</strong>
              <p class="mb-0">Dark background</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-rds-dark-3 text-white p-space-md">
              <strong>bg-rds-dark-3</strong>
              <p class="mb-0">Darkest background</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Border color utilities applied to elements.
 */
export const BorderColors: Story = {
  render: () => ({
    template: `
      <div>
        <h3 class="mb-space-md">Light Border Colors</h3>
        <div class="row g-3 mb-space-lg">
          <div class="col-md-6">
            <div class="border border-rds-light-1 border-3 p-space-md">
              <strong>border-rds-light-1</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="border border-rds-light-2 border-3 p-space-md">
              <strong>border-rds-light-2</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="border border-rds-light-3 border-3 p-space-md">
              <strong>border-rds-light-3</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="border border-rds-light-4 border-3 p-space-md">
              <strong>border-rds-light-4</strong>
            </div>
          </div>
          <div class="col-md-6">
            <div class="border border-rds-light-5 border-3 p-space-md">
              <strong>border-rds-light-5</strong>
            </div>
          </div>
        </div>

        <h3 class="mb-space-md">Dark Border Colors</h3>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="border border-rds-dark-1 border-3 p-space-md">
              <strong>border-rds-dark-1</strong>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border border-rds-dark-2 border-3 p-space-md">
              <strong>border-rds-dark-2</strong>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border border-rds-dark-3 border-3 p-space-md">
              <strong>border-rds-dark-3</strong>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Real-world UI examples using the RDS color system.
 */
export const UIExamples: Story = {
  render: () => ({
    template: `
      <div>
        <h3 class="mb-space-md">Card Components</h3>
        <div class="row g-3 mb-space-lg">
          <div class="col-md-6">
            <div class="bg-rds-light-1 border border-rds-light-4 p-space-md">
              <h5 class="text-rds-dark-3 mb-space-xs">Light Card</h5>
              <p class="text-rds-dark-2 mb-space-sm">
                Using light-1 background with dark-3 heading and dark-2 body text.
              </p>
              <button class="btn btn-sm bg-rds-dark-3 text-rds-light-1 border-0">
                Action Button
              </button>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="bg-rds-dark-3 border border-rds-dark-2 p-space-md">
              <h5 class="text-rds-light-1 mb-space-xs">Dark Card</h5>
              <p class="text-rds-light-3 mb-space-sm">
                Using dark-3 background with light-1 heading and light-3 body text.
              </p>
              <button class="btn btn-sm bg-rds-light-1 text-rds-dark-3 border-0">
                Action Button
              </button>
            </div>
          </div>
        </div>

        <h3 class="mb-space-md">Alert/Banner Components</h3>
        <div class="mb-space-lg">
          <div class="bg-rds-light-2 border-start border-5 border-rds-light-5 p-space-md mb-space-sm">
            <h6 class="text-rds-dark-3 mb-1">Information Notice</h6>
            <p class="text-rds-dark-2 mb-0 small">
              This is an informational message using the light color palette.
            </p>
          </div>
          
          <div class="bg-rds-dark-2 border-start border-5 border-rds-light-3 p-space-md">
            <h6 class="text-rds-light-1 mb-1">Dark Theme Notice</h6>
            <p class="text-rds-light-3 mb-0 small">
              This is a dark-themed message with light text.
            </p>
          </div>
        </div>

        <h3 class="mb-space-md">Navigation</h3>
        <nav class="bg-rds-dark-3 p-space-md mb-space-lg">
          <ul class="nav">
            <li class="nav-item">
              <a href="#" class="nav-link text-rds-light-1">Home</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-rds-light-3">About</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-rds-light-3">Contact</a>
            </li>
          </ul>
        </nav>

        <h3 class="mb-space-md">Tables</h3>
        <table class="table table-bordered">
          <thead class="bg-rds-light-2">
            <tr>
              <th class="text-rds-dark-3">Name</th>
              <th class="text-rds-dark-3">Status</th>
              <th class="text-rds-dark-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-rds-light-1">
              <td class="text-rds-dark-2">Item 1</td>
              <td><span class="badge bg-rds-dark-1 text-white">Active</span></td>
              <td>
                <button class="btn btn-sm bg-rds-dark-3 text-white border-0">Edit</button>
              </td>
            </tr>
            <tr>
              <td class="text-rds-dark-2">Item 2</td>
              <td><span class="badge bg-rds-light-5 text-rds-dark-3">Pending</span></td>
              <td>
                <button class="btn btn-sm bg-rds-dark-3 text-white border-0">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};

/**
 * Examples showing color combinations and accessibility.
 */
export const ColorCombinations: Story = {
  render: () => ({
    template: `
      <div>
        <h3 class="mb-space-md">Recommended Combinations</h3>
        
        <div class="row g-3">
          <div class="col-md-6">
            <h6 class="mb-space-xs">Light Background + Dark Text</h6>
            <div class="bg-rds-light-1 border border-rds-light-4 p-space-md mb-space-sm">
              <p class="text-rds-dark-3 mb-0">light-1 + dark-3 (Excellent contrast)</p>
            </div>
            <div class="bg-rds-light-2 border border-rds-light-4 p-space-md mb-space-sm">
              <p class="text-rds-dark-2 mb-0">light-2 + dark-2 (Good contrast)</p>
            </div>
            <div class="bg-rds-light-3 border border-rds-light-4 p-space-md">
              <p class="text-rds-dark-3 mb-0">light-3 + dark-3 (Good contrast)</p>
            </div>
          </div>
          
          <div class="col-md-6">
            <h6 class="mb-space-xs">Dark Background + Light Text</h6>
            <div class="bg-rds-dark-3 p-space-md mb-space-sm">
              <p class="text-rds-light-1 mb-0">dark-3 + light-1 (Excellent contrast)</p>
            </div>
            <div class="bg-rds-dark-2 p-space-md mb-space-sm">
              <p class="text-rds-light-2 mb-0">dark-2 + light-2 (Good contrast)</p>
            </div>
            <div class="bg-rds-dark-1 p-space-md">
              <p class="text-rds-light-1 mb-0">dark-1 + light-1 (Good contrast)</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Bootstrap utilities automatically generated for RDS colors.
 * These are created by adding RDS colors to Bootstrap's $colors map.
 */
export const BootstrapIntegration: Story = {
  render: () => ({
    template: `
      <div>
        <h3 class="mb-space-md">Bootstrap Auto-Generated Utilities</h3>
        <p class="mb-space-sm">
          By adding RDS colors to Bootstrap's <code>$colors</code> map, 
          we automatically get text, background, and border utilities!
        </p>

        <h4 class="mb-space-sm">Text Colors (Bootstrap Format)</h4>
        <div class="mb-space-md">
          <p class="text-rds-light-1 bg-dark p-2 mb-1">text-rds-light-1</p>
          <p class="text-rds-light-2 bg-dark p-2 mb-1">text-rds-light-2</p>
          <p class="text-rds-light-3 bg-dark p-2 mb-1">text-rds-light-3</p>
          <p class="text-rds-light-4 bg-dark p-2 mb-1">text-rds-light-4</p>
          <p class="text-rds-light-5 bg-dark p-2 mb-1">text-rds-light-5</p>
          <p class="text-rds-dark-1 p-2 mb-1">text-rds-dark-1</p>
          <p class="text-rds-dark-2 p-2 mb-1">text-rds-dark-2</p>
          <p class="text-rds-dark-3 p-2 mb-0">text-rds-dark-3</p>
        </div>

        <h4 class="mb-space-sm">Background Colors (Bootstrap Format)</h4>
        <div class="row g-2 mb-space-md">
          <div class="col-md-3">
            <div class="bg-rds-light-1 p-3 border">bg-rds-light-1</div>
          </div>
          <div class="col-md-3">
            <div class="bg-rds-light-2 p-3 border">bg-rds-light-2</div>
          </div>
          <div class="col-md-3">
            <div class="bg-rds-light-3 p-3 border">bg-rds-light-3</div>
          </div>
          <div class="col-md-3">
            <div class="bg-rds-light-4 p-3 border">bg-rds-light-4</div>
          </div>
          <div class="col-md-3">
            <div class="bg-rds-light-5 p-3 border">bg-rds-light-5</div>
          </div>
          <div class="col-md-3">
            <div class="bg-rds-dark-1 text-white p-3">bg-rds-dark-1</div>
          </div>
          <div class="col-md-3">
            <div class="bg-rds-dark-2 text-white p-3">bg-rds-dark-2</div>
          </div>
          <div class="col-md-3">
            <div class="bg-rds-dark-3 text-white p-3">bg-rds-dark-3</div>
          </div>
        </div>

        <h4 class="mb-space-sm">Theme Colors (Buttons & Alerts)</h4>
        <p class="mb-space-sm">
          <code>rds-light</code> and <code>rds-dark</code> are added to theme-colors 
          for component variants like buttons and alerts.
        </p>
        
        <div class="mb-space-md">
          <button class="btn btn-rds-light me-2">Light Button</button>
          <button class="btn btn-rds-dark me-2">Dark Button</button>
          <button class="btn btn-outline-rds-light me-2">Outline Light</button>
          <button class="btn btn-outline-rds-dark">Outline Dark</button>
        </div>

        <div class="alert alert-rds-light mb-2" role="alert">
          This is an RDS light alert!
        </div>
        <div class="alert alert-rds-dark text-white mb-0" role="alert">
          This is an RDS dark alert!
        </div>
      </div>
    `,
  }),
};
