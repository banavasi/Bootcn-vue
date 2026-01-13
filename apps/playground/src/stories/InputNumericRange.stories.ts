import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { InputRoot, InputLabel, InputNumericRange, InputError, InputHelp } from "@bootcn-vue/forms";

const meta: Meta<typeof InputNumericRange> = {
  title: "Forms/Primitives/InputNumericRange",
  component: InputNumericRange,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: "number",
      description: "Minimum allowed value",
    },
    max: {
      control: "number",
      description: "Maximum allowed value",
    },
    defaultValue: {
      control: "number",
      description: "Default value when input is empty",
    },
    allowDecimal: {
      control: "boolean",
      description: "Allow decimal values",
    },
    decimalPlaces: {
      control: "number",
      description: "Number of decimal places",
    },
    suffix: {
      control: "text",
      description: "Suffix to display (e.g., %, kg, cm)",
    },
    prefix: {
      control: "text",
      description: "Prefix to display (e.g., $, €)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Percentage input that accepts values from 30 to 100
 * - Integer only (no decimals)
 * - Shows % suffix
 * - Default value is 0
 */
export const PercentageInput: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputNumericRange, InputHelp },
    setup() {
      const percentage = ref(0);

      return { percentage };
    },
    template: `
      <div style="max-width: 400px">
        <InputRoot>
          <InputLabel>Percentage (30-100%)</InputLabel>
          <InputNumericRange
            v-model="percentage"
            :min="30"
            :max="100"
            :default-value="0"
            :allow-decimal="false"
            suffix="%"
            placeholder="Enter percentage"
          />
          <InputHelp>Enter a value between 30 and 100</InputHelp>
        </InputRoot>
        
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
          <strong>Current Value:</strong> {{ percentage }}
        </div>
      </div>
    `,
  }),
};

/**
 * Decimal range input that accepts values from 0 to 5
 * - Allows decimals (e.g., 1.8, 3.5)
 * - Clamps values above 5 (e.g., 5.6 becomes 5.0)
 * - 2 decimal places
 */
export const DecimalRangeInput: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputNumericRange, InputHelp },
    setup() {
      const rating = ref(0);

      return { rating };
    },
    template: `
      <div style="max-width: 400px">
        <InputRoot>
          <InputLabel>Rating (0-5)</InputLabel>
          <InputNumericRange
            v-model="rating"
            :min="0"
            :max="5"
            :default-value="0"
            :allow-decimal="true"
            :decimal-places="2"
            placeholder="Enter rating"
          />
          <InputHelp>Enter a decimal value between 0 and 5 (e.g., 1.8, 3.5)</InputHelp>
        </InputRoot>
        
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
          <strong>Current Value:</strong> {{ rating }}
        </div>
      </div>
    `,
  }),
};

/**
 * Price input with $ prefix
 * - Allows decimals for cents
 * - Min: 0, Max: 10000
 */
export const PriceInput: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputNumericRange, InputHelp },
    setup() {
      const price = ref(0);

      return { price };
    },
    template: `
      <div style="max-width: 400px">
        <InputRoot>
          <InputLabel>Price</InputLabel>
          <InputNumericRange
            v-model="price"
            :min="0"
            :max="10000"
            :default-value="0"
            :allow-decimal="true"
            :decimal-places="2"
            prefix="$"
            placeholder="0.00"
          />
          <InputHelp>Enter price in dollars</InputHelp>
        </InputRoot>
        
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
          <strong>Current Value:</strong> $<span>{{ price }}</span>
        </div>
      </div>
    `,
  }),
};

/**
 * Weight input with kg suffix
 * - Allows decimals
 * - Min: 0, Max: 500
 */
export const WeightInput: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputNumericRange, InputHelp },
    setup() {
      const weight = ref(0);

      return { weight };
    },
    template: `
      <div style="max-width: 400px">
        <InputRoot>
          <InputLabel>Weight</InputLabel>
          <InputNumericRange
            v-model="weight"
            :min="0"
            :max="500"
            :default-value="0"
            :allow-decimal="true"
            :decimal-places="1"
            suffix="kg"
            placeholder="0.0"
          />
          <InputHelp>Enter weight in kilograms</InputHelp>
        </InputRoot>
        
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
          <strong>Current Value:</strong> {{ weight }}kg
        </div>
      </div>
    `,
  }),
};

/**
 * Age input - integer only
 * - No decimals
 * - Min: 0, Max: 120
 */
export const AgeInput: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputNumericRange, InputHelp },
    setup() {
      const age = ref(0);

      return { age };
    },
    template: `
      <div style="max-width: 400px">
        <InputRoot>
          <InputLabel>Age</InputLabel>
          <InputNumericRange
            v-model="age"
            :min="0"
            :max="120"
            :default-value="0"
            :allow-decimal="false"
            placeholder="Enter age"
          />
          <InputHelp>Enter age in years</InputHelp>
        </InputRoot>
        
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
          <strong>Current Value:</strong> {{ age }}
        </div>
      </div>
    `,
  }),
};

/**
 * Input with error state
 */
export const WithError: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputNumericRange, InputError, InputHelp },
    setup() {
      const percentage = ref(0);

      return { percentage };
    },
    template: `
      <div style="max-width: 400px">
        <InputRoot :invalid="true">
          <InputLabel>Percentage</InputLabel>
          <InputNumericRange
            v-model="percentage"
            :min="30"
            :max="100"
            :default-value="0"
            :allow-decimal="false"
            suffix="%"
            placeholder="Enter percentage"
          />
          <InputError>Value must be between 30 and 100</InputError>
          <InputHelp>Enter a valid percentage</InputHelp>
        </InputRoot>
        
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px">
          <strong>Current Value:</strong> {{ percentage }}%
        </div>
      </div>
    `,
  }),
};

/**
 * Interactive demo with all input types
 */
export const Interactive: Story = {
  render: () => ({
    components: { InputRoot, InputLabel, InputNumericRange, InputHelp },
    setup() {
      const percentage = ref(0);
      const rating = ref(0);
      const price = ref(0);
      const weight = ref(0);

      return { percentage, rating, price, weight };
    },
    template: `
      <div style="max-width: 600px">
        <h3>Interactive Demo</h3>
        
        <div style="display: grid; gap: 24px; margin-top: 20px">
          <!-- Percentage -->
          <InputRoot>
            <InputLabel>Percentage (30-100%)</InputLabel>
            <InputNumericRange
              v-model="percentage"
              :min="30"
              :max="100"
              :default-value="0"
              :allow-decimal="false"
              suffix="%"
              placeholder="Enter percentage"
            />
            <InputHelp>Integer only, range 30-100</InputHelp>
          </InputRoot>

          <!-- Rating -->
          <InputRoot>
            <InputLabel>Rating (0-5)</InputLabel>
            <InputNumericRange
              v-model="rating"
              :min="0"
              :max="5"
              :default-value="0"
              :allow-decimal="true"
              :decimal-places="2"
              placeholder="Enter rating"
            />
            <InputHelp>Decimals allowed, range 0-5</InputHelp>
          </InputRoot>

          <!-- Price -->
          <InputRoot>
            <InputLabel>Price ($)</InputLabel>
            <InputNumericRange
              v-model="price"
              :min="0"
              :max="10000"
              :default-value="0"
              :allow-decimal="true"
              :decimal-places="2"
              prefix="$"
              placeholder="0.00"
            />
            <InputHelp>Price with $ prefix</InputHelp>
          </InputRoot>

          <!-- Weight -->
          <InputRoot>
            <InputLabel>Weight (kg)</InputLabel>
            <InputNumericRange
              v-model="weight"
              :min="0"
              :max="500"
              :default-value="0"
              :allow-decimal="true"
              :decimal-places="1"
              suffix="kg"
              placeholder="0.0"
            />
            <InputHelp>Weight with kg suffix</InputHelp>
          </InputRoot>
        </div>
        
        <div style="margin-top: 32px; padding: 16px; background: #f5f5f5; border-radius: 4px">
          <h4 style="margin-top: 0">Current Values:</h4>
          <ul style="margin-bottom: 0">
            <li><strong>Percentage:</strong> {{ percentage }}%</li>
            <li><strong>Rating:</strong> {{ rating }}</li>
            <li><strong>Price:</strong> $<span>{{ price }}</span></li>
            <li><strong>Weight:</strong> {{ weight }}kg</li>
          </ul>
        </div>
      </div>
    `,
  }),
};
