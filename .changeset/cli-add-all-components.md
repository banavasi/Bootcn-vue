---
"@bootcn-vue/cli": patch
---

fix(cli): add all components and primitives to registry with auto-dependency installation

Adds support for all available components and primitives in the CLI:

**New Components:**

- `tooltip` - Tooltip component with trigger and content
- `field-text` - Complete text input field
- `field-password` - Password field with show/hide toggle

**New Form Primitives:**

- `input-root` - Form input root container
- `input-label` - Input label with tooltip support
- `input-field` - Base input field component
- `input-password` - Password input with visibility toggle
- `input-error` - Error message display
- `input-help` - Help text display
- `input-masked` - Masked input component
- `input-numeric-range` - Numeric range input

**Features:**

- Automatic dependency installation (reka-ui, FontAwesome packages, etc.)
- Proper import transformation for all component types
- Context file copying for form primitives
- CSS file support (tooltip.css, InputField.css)
- Updated remove command registry

This fixes the issue where `field-password` and other components were not available via the CLI add command.
