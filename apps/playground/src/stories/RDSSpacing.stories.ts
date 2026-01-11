import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: "Examples/RDS Spacing",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: () => ({
    template: `
      <div>
        <h1 class="mb-space-md">RDS Spacing System</h1>
        <p class="mb-space-sm">
          The RDS spacing system provides semantic spacing utilities that extend Bootstrap's default spacing.
        </p>

        <div class="card p-space-md mb-space-lg" style="max-width: 600px;">
          <h2 class="mb-space-sm">Margin Examples</h2>
          
          <div class="mb-space-xs" style="background: #e9ecef; padding: 8px;">
            <code>.mb-space-xs</code> - 16px bottom margin
          </div>
          
          <div class="mb-space-sm" style="background: #e9ecef; padding: 8px;">
            <code>.mb-space-sm</code> - 24px bottom margin
          </div>
          
          <div class="mb-space-md" style="background: #e9ecef; padding: 8px;">
            <code>.mb-space-md</code> - 32px bottom margin
          </div>
          
          <div style="background: #e9ecef; padding: 8px;">
            Last item (no margin)
          </div>
        </div>

        <div class="card p-space-lg mb-space-lg" style="max-width: 600px;">
          <h2 class="mb-space-sm">Padding Examples</h2>
          
          <div class="p-space-xs mb-space-xs" style="background: #d1ecf1; border: 1px dashed #0c5460;">
            <code>.p-space-xs</code> - 16px padding
          </div>
          
          <div class="p-space-sm mb-space-xs" style="background: #d1ecf1; border: 1px dashed #0c5460;">
            <code>.p-space-sm</code> - 24px padding
          </div>
          
          <div class="p-space-md" style="background: #d1ecf1; border: 1px dashed #0c5460;">
            <code>.p-space-md</code> - 32px padding
          </div>
        </div>

        <div class="card p-space-md" style="max-width: 600px;">
          <h2 class="mb-space-sm">Gap Examples (Flexbox)</h2>
          
          <div class="d-flex gap-space-xs mb-space-sm">
            <div class="p-space-xs" style="background: #c3e6cb; flex: 1;">Item</div>
            <div class="p-space-xs" style="background: #c3e6cb; flex: 1;">Item</div>
            <div class="p-space-xs" style="background: #c3e6cb; flex: 1;">Item</div>
          </div>
          <p class="text-muted mb-space-sm"><small><code>.gap-space-xs</code> - 16px gap</small></p>
          
          <div class="d-flex gap-space-md mb-space-sm">
            <div class="p-space-xs" style="background: #c3e6cb; flex: 1;">Item</div>
            <div class="p-space-xs" style="background: #c3e6cb; flex: 1;">Item</div>
            <div class="p-space-xs" style="background: #c3e6cb; flex: 1;">Item</div>
          </div>
          <p class="text-muted"><small><code>.gap-space-md</code> - 32px gap</small></p>
        </div>

        <div class="card p-space-md mt-space-lg" style="max-width: 600px;">
          <h2 class="mb-space-sm">Full Scale Reference</h2>
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Class</th>
                <th>Value</th>
                <th>Pixels</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>*-space-xxxs</code></td><td>0.25rem</td><td>4px</td></tr>
              <tr><td><code>*-space-xxs</code></td><td>0.5rem</td><td>8px</td></tr>
              <tr><td><code>*-space-xs</code></td><td>1rem</td><td>16px</td></tr>
              <tr><td><code>*-space-sm</code></td><td>1.5rem</td><td>24px</td></tr>
              <tr><td><code>*-space-md</code></td><td>2rem</td><td>32px</td></tr>
              <tr><td><code>*-space-lg</code></td><td>3rem</td><td>48px</td></tr>
              <tr><td><code>*-space-xl</code></td><td>4rem</td><td>64px</td></tr>
              <tr><td><code>*-space-xxl</code></td><td>6rem</td><td>96px</td></tr>
              <tr><td><code>*-space-xxxl</code></td><td>8rem</td><td>128px</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
  }),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
