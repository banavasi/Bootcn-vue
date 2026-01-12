import type { Meta, StoryObj } from "@storybook/vue3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { InputRoot, InputField, InputLabel } from "@bootcn-vue/forms";

const meta: Meta<typeof FontAwesomeIcon> = {
  title: "Icons/FontAwesome",
  component: FontAwesomeIcon,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FontAwesomeIcon>;

/**
 * Basic icon usage with string notation.
 * Format: "prefix icon-name" (e.g., "fas circle-info")
 *
 * Prefixes:
 * - fas: Font Awesome Solid
 * - far: Font Awesome Regular
 * - fab: Font Awesome Brands
 */
export const BasicUsage: Story = {
  render: () => ({
    components: { FontAwesomeIcon },
    template: `
      <div class="d-flex gap-space-md align-items-center">
        <FontAwesomeIcon :icon="['fas', 'circle-info']" />
        <FontAwesomeIcon :icon="['far', 'circle-info']" />
        <FontAwesomeIcon :icon="['fas', 'envelope']" />
        <FontAwesomeIcon :icon="['far', 'envelope']" />
      </div>
    `,
  }),
};

/**
 * Icons can be sized using the size prop.
 * Available sizes: xs, sm, lg, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x
 */
export const IconSizes: Story = {
  render: () => ({
    components: { FontAwesomeIcon },
    template: `
      <div class="d-flex gap-space-md align-items-center">
        <FontAwesomeIcon :icon="['fas', 'circle-info']" size="xs" />
        <FontAwesomeIcon :icon="['fas', 'circle-info']" size="sm" />
        <FontAwesomeIcon :icon="['fas', 'circle-info']" size="lg" />
        <FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" />
        <FontAwesomeIcon :icon="['fas', 'circle-info']" size="3x" />
        <FontAwesomeIcon :icon="['fas', 'circle-info']" size="4x" />
      </div>
    `,
  }),
};

/**
 * Icons support various transformations and animations.
 */
export const IconTransforms: Story = {
  render: () => ({
    components: { FontAwesomeIcon },
    template: `
      <div class="d-flex gap-space-lg align-items-center">
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" />
          <div class="small mt-2">Normal</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" rotation="90" />
          <div class="small mt-2">Rotate 90°</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" flip="horizontal" />
          <div class="small mt-2">Flip H</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" flip="vertical" />
          <div class="small mt-2">Flip V</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'spinner']" size="2x" spin />
          <div class="small mt-2">Spin</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'spinner']" size="2x" pulse />
          <div class="small mt-2">Pulse</div>
        </div>
      </div>
    `,
  }),
};

/**
 * Fixed width icons are useful for aligning icons in lists.
 */
export const FixedWidthIcons: Story = {
  render: () => ({
    components: { FontAwesomeIcon },
    template: `
      <div>
        <h6 class="mb-space-sm">Without fixed-width:</h6>
        <div class="mb-space-md">
          <div><FontAwesomeIcon :icon="['fas', 'home']" /> Home</div>
          <div><FontAwesomeIcon :icon="['fas', 'file']" /> File</div>
          <div><FontAwesomeIcon :icon="['fas', 'book']" /> Book</div>
        </div>
        
        <h6 class="mb-space-sm">With fixed-width:</h6>
        <div>
          <div><FontAwesomeIcon :icon="['fas', 'home']" fixed-width /> Home</div>
          <div><FontAwesomeIcon :icon="['fas', 'file']" fixed-width /> File</div>
          <div><FontAwesomeIcon :icon="['fas', 'book']" fixed-width /> Book</div>
        </div>
      </div>
    `,
  }),
};

/**
 * Common icon examples across different categories.
 */
export const CommonIcons: Story = {
  render: () => ({
    components: { FontAwesomeIcon },
    template: `
      <div>
        <h6 class="mb-space-sm">User Interface</h6>
        <div class="d-flex gap-space-md mb-space-md flex-wrap">
          <FontAwesomeIcon :icon="['fas', 'home']" size="lg" title="Home" />
          <FontAwesomeIcon :icon="['fas', 'user']" size="lg" title="User" />
          <FontAwesomeIcon :icon="['fas', 'cog']" size="lg" title="Settings" />
          <FontAwesomeIcon :icon="['fas', 'search']" size="lg" title="Search" />
          <FontAwesomeIcon :icon="['fas', 'bell']" size="lg" title="Notifications" />
          <FontAwesomeIcon :icon="['fas', 'envelope']" size="lg" title="Email" />
          <FontAwesomeIcon :icon="['fas', 'trash']" size="lg" title="Delete" />
          <FontAwesomeIcon :icon="['fas', 'edit']" size="lg" title="Edit" />
        </div>

        <h6 class="mb-space-sm">Status & Feedback</h6>
        <div class="d-flex gap-space-md mb-space-md flex-wrap">
          <FontAwesomeIcon :icon="['fas', 'check-circle']" size="lg" class="text-success" title="Success" />
          <FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" size="lg" class="text-warning" title="Warning" />
          <FontAwesomeIcon :icon="['fas', 'times-circle']" size="lg" class="text-danger" title="Error" />
          <FontAwesomeIcon :icon="['fas', 'circle-info']" size="lg" class="text-info" title="Info" />
          <FontAwesomeIcon :icon="['fas', 'question-circle']" size="lg" class="text-secondary" title="Help" />
        </div>

        <h6 class="mb-space-sm">Actions</h6>
        <div class="d-flex gap-space-md mb-space-md flex-wrap">
          <FontAwesomeIcon :icon="['fas', 'plus']" size="lg" title="Add" />
          <FontAwesomeIcon :icon="['fas', 'minus']" size="lg" title="Remove" />
          <FontAwesomeIcon :icon="['fas', 'download']" size="lg" title="Download" />
          <FontAwesomeIcon :icon="['fas', 'upload']" size="lg" title="Upload" />
          <FontAwesomeIcon :icon="['fas', 'share']" size="lg" title="Share" />
          <FontAwesomeIcon :icon="['fas', 'save']" size="lg" title="Save" />
          <FontAwesomeIcon :icon="['fas', 'print']" size="lg" title="Print" />
        </div>

        <h6 class="mb-space-sm">Social Media (Brands)</h6>
        <div class="d-flex gap-space-md flex-wrap">
          <FontAwesomeIcon :icon="['fab', 'github']" size="lg" title="GitHub" />
          <FontAwesomeIcon :icon="['fab', 'twitter']" size="lg" title="Twitter" />
          <FontAwesomeIcon :icon="['fab', 'facebook']" size="lg" title="Facebook" />
          <FontAwesomeIcon :icon="['fab', 'linkedin']" size="lg" title="LinkedIn" />
          <FontAwesomeIcon :icon="['fab', 'instagram']" size="lg" title="Instagram" />
          <FontAwesomeIcon :icon="['fab', 'youtube']" size="lg" title="YouTube" />
        </div>
      </div>
    `,
  }),
};

/**
 * Using icons with input fields (prefix and suffix slots).
 */
export const WithInputFields: Story = {
  render: () => ({
    components: { FontAwesomeIcon, InputRoot, InputField, InputLabel },
    template: `
      <div style="max-width: 400px">
        <InputRoot id="email-icon">
          <InputLabel>Email Address</InputLabel>
          <InputField type="email" placeholder="you@example.com" has-prefix>
            <template #prefix>
              <FontAwesomeIcon :icon="['fas', 'envelope']" />
            </template>
          </InputField>
        </InputRoot>

        <InputRoot id="search-icon" class="mt-space-md">
          <InputLabel>Search</InputLabel>
          <InputField type="search" placeholder="Search..." has-suffix>
            <template #suffix>
              <FontAwesomeIcon :icon="['fas', 'search']" />
            </template>
          </InputField>
        </InputRoot>

        <InputRoot id="phone-icon" class="mt-space-md">
          <InputLabel>Phone Number</InputLabel>
          <InputField type="tel" placeholder="(555) 123-4567" has-prefix>
            <template #prefix>
              <FontAwesomeIcon :icon="['fas', 'phone']" />
            </template>
          </InputField>
        </InputRoot>

        <InputRoot id="url-icon" class="mt-space-md">
          <InputLabel>Website</InputLabel>
          <InputField type="url" placeholder="https://example.com" has-prefix>
            <template #prefix>
              <FontAwesomeIcon :icon="['fas', 'globe']" />
            </template>
          </InputField>
        </InputRoot>

        <InputRoot id="password-icon" class="mt-space-md">
          <InputLabel>Password</InputLabel>
          <InputField type="password" placeholder="••••••••" has-prefix>
            <template #prefix>
              <FontAwesomeIcon :icon="['fas', 'lock']" />
            </template>
          </InputField>
        </InputRoot>
      </div>
    `,
  }),
};

/**
 * Combining solid and regular variants.
 */
export const SolidVsRegular: Story = {
  render: () => ({
    components: { FontAwesomeIcon },
    template: `
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>Icon Name</th>
              <th>Solid (fas)</th>
              <th>Regular (far)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>circle-info</td>
              <td><FontAwesomeIcon :icon="['fas', 'circle-info']" size="lg" /></td>
              <td><FontAwesomeIcon :icon="['far', 'circle-info']" size="lg" /></td>
            </tr>
            <tr>
              <td>envelope</td>
              <td><FontAwesomeIcon :icon="['fas', 'envelope']" size="lg" /></td>
              <td><FontAwesomeIcon :icon="['far', 'envelope']" size="lg" /></td>
            </tr>
            <tr>
              <td>heart</td>
              <td><FontAwesomeIcon :icon="['fas', 'heart']" size="lg" /></td>
              <td><FontAwesomeIcon :icon="['far', 'heart']" size="lg" /></td>
            </tr>
            <tr>
              <td>star</td>
              <td><FontAwesomeIcon :icon="['fas', 'star']" size="lg" /></td>
              <td><FontAwesomeIcon :icon="['far', 'star']" size="lg" /></td>
            </tr>
            <tr>
              <td>bookmark</td>
              <td><FontAwesomeIcon :icon="['fas', 'bookmark']" size="lg" /></td>
              <td><FontAwesomeIcon :icon="['far', 'bookmark']" size="lg" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};

/**
 * Color customization using Bootstrap utility classes.
 */
export const ColoredIcons: Story = {
  render: () => ({
    components: { FontAwesomeIcon },
    template: `
      <div class="d-flex gap-space-lg align-items-center flex-wrap">
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" class="text-primary" />
          <div class="small mt-2">Primary</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'check-circle']" size="2x" class="text-success" />
          <div class="small mt-2">Success</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" size="2x" class="text-danger" />
          <div class="small mt-2">Danger</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" size="2x" class="text-warning" />
          <div class="small mt-2">Warning</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'circle-info']" size="2x" class="text-info" />
          <div class="small mt-2">Info</div>
        </div>
        <div class="text-center">
          <FontAwesomeIcon :icon="['fas', 'moon']" size="2x" class="text-secondary" />
          <div class="small mt-2">Secondary</div>
        </div>
      </div>
    `,
  }),
};
