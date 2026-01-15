---
"@bootcn-vue/checkbox": minor
---

Add CheckboxGroup component for managing multiple checkboxes with vertical layout. Includes CheckboxGroup and CheckboxGroupItem components with features:

- Array-based selection model with pre-selection support
- Configurable spacing (xs/sm/md/lg/xl) using RDS gap utilities
- Prop inheritance (variant, size, disabled)
- Provide/inject pattern for context sharing
- Full accessibility support
- Comprehensive test coverage
- Storybook documentation with 9 interactive examples

**Breaking Change**: Updated Checkbox component to use Reka UI's new v-model API (changed from v-model:checked to v-model). This fixes initial checked state rendering issues.
