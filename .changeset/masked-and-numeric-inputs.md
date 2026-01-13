---
"@bootcn-vue/forms": minor
---

Add InputMasked and InputNumericRange primitive components

**InputMasked**

- Pattern-based input masking with customizable tokens (#, %, @, \*)
- Auto-formats input as user types (e.g., phone numbers, dates, SSN)
- Returns unmasked value via v-model
- Prevents invalid characters from appearing
- Enforces maximum length based on mask pattern
- Includes comprehensive Storybook stories

**InputNumericRange**

- Numeric input with min/max validation
- Supports integer-only or decimal inputs
- Configurable prefix/suffix (e.g., $, %, kg)
- Real-time character validation via beforeinput
- Auto-clamps values to range on blur
- Includes comprehensive Storybook stories for percentage, rating, price, weight, and age inputs
