# Agent Guidelines for reka-bootstrap

This document provides guidelines for AI coding agents working in this Vue 3 + Vite + TypeScript project.

## Build, Test & Lint Commands

### Development
- `pnpm dev` - Start dev server (opens at http://localhost:8080)
- `pnpm build` - Type-check and build for production
- `pnpm preview` - Preview production build

### Testing
- `pnpm test:unit` - Run all unit tests (Vitest)
- `pnpm test:unit -- Button.spec.ts` - Run specific test file
- `pnpm test:unit -- --watch` - Run tests in watch mode
- `pnpm test:e2e` - Run E2E tests (Playwright)
- `pnpm test:e2e -- --project=chromium` - Run E2E on specific browser
- `pnpm test:e2e -- --debug` - Run E2E tests in debug mode

### Type Checking & Linting
- `pnpm type-check` - Type check without building
- `pnpm lint` - Run both oxlint and eslint (with auto-fix)
- `pnpm lint:eslint` - Run eslint only
- `pnpm lint:oxlint` - Run oxlint only

### Storybook
- `pnpm storybook` - Start Storybook dev server (port 6006)
- `pnpm build-storybook` - Build Storybook static site

## Code Style Guidelines

### Imports
- Use `@/` alias for src imports: `import { Button } from '@/components/ui/Button'`
- Group imports: external packages → Vue imports → internal modules → types
- Prefer named exports over default exports for components in barrel files

### TypeScript
- Always use strict TypeScript - no `any` types
- Define interfaces for component props using `interface Props extends ...`
- Use type inference where obvious, explicit types for public APIs
- Export types alongside components: `export type ButtonVariants = VariantProps<...>`

### Vue 3 Composition API
- Use `<script setup lang="ts">` for all components
- Use `defineProps<Props>()` with TypeScript interfaces, not runtime props
- Use `withDefaults()` for default prop values
- Prefer composables over mixins
- Use `type` imports for types: `import type { HTMLAttributes } from 'vue'`

### Component Structure
```vue
<script setup lang="ts">
// 1. Type imports
import type { HTMLAttributes } from 'vue'
// 2. External imports
import { Primitive, type PrimitiveProps } from 'reka-ui'
// 3. Internal imports
import { cn } from '@/lib/utils'

// 4. Types/Interfaces
interface Props extends PrimitiveProps {
  variant?: string
  class?: HTMLAttributes['class']
}

// 5. Props with defaults
const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <!-- Clean, semantic HTML -->
</template>
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Button.vue`, `HelloWorld.vue`)
- **Files**: Match component name (e.g., `Button.vue`, `Button.spec.ts`, `index.ts`)
- **UI Components**: Store in `src/components/ui/{ComponentName}/` with barrel export
- **Props**: camelCase
- **CSS Classes**: kebab-case or use utility functions (Bootstrap + Tailwind merge)

### UI Components Pattern
- Place in `src/components/ui/{ComponentName}/` directory
- Include: `{ComponentName}.vue`, `index.ts` (barrel export), `{ComponentName}.spec.ts`
- Use `class-variance-authority` (cva) for variant styling
- Export both component and variant types from `index.ts`
- Multi-word component names not required for UI components (ESLint rule disabled)

### Testing
- **Unit Tests**: Vitest + @vue/test-utils
- Place tests alongside components: `Button.spec.ts` next to `Button.vue`
- Test structure:
  ```ts
  describe('ComponentName', () => {
    it('renders with default props', () => {
      const wrapper = mount(Component, { ... })
      expect(wrapper.find('button').exists()).toBe(true)
    })
  })
  ```
- Test all variants and sizes for UI components
- Use `mount()` from `@vue/test-utils`
- Test custom classes, slots, and asChild behavior

### Styling
- **CSS Framework**: Bootstrap 5.3.6 (SCSS) + utility classes
- **Utility Function**: Use `cn()` from `@/lib/utils` to merge classes (clsx + tailwind-merge)
- **Preprocessor**: SCSS with Bootstrap auto-import
- **Alias**: `~bootstrap` for Bootstrap imports
- **Data Attributes**: Use `data-slot` for component identification

### RDS Spacing System
Use RDS spacing classes instead of Bootstrap's numeric spacing (m-1, m-2, etc.):
- **RDS Spacing Scale**:
  - `space-xxxs`: 0.25rem (4px)
  - `space-xxs`: 0.5rem (8px)
  - `space-xs`: 1rem (16px)
  - `space-sm`: 1.5rem (24px)
  - `space-md`: 2rem (32px)
  - `space-lg`: 3rem (48px)
  - `space-xl`: 4rem (64px)
  - `space-xxl`: 6rem (96px)
  - `space-xxxl`: 8rem (128px)
- **Usage Examples**:
  - Margin: `mb-space-sm`, `mt-space-xs`, `me-space-xxs`, `ms-space-lg`
  - Padding: `px-space-md`, `py-space-xs`, `p-space-sm`
  - Gap: `gap-space-xs`, `column-gap-space-sm`, `row-gap-space-md`
- **Typography**: Use RDS heading sizes (`h1-small`, `h2-medium`, `h3-large`) and body text classes
- **Always prefer RDS spacing over Bootstrap numeric spacing** (e.g., use `mb-space-sm` instead of `mb-3`)

### Error Handling
- Use TypeScript's type system to prevent errors at compile time
- Validate props with TypeScript interfaces
- Handle edge cases in component logic
- Write defensive code for user inputs

### Formatting
- **Indentation**: 2 spaces (enforced by .editorconfig)
- **Line Length**: 100 characters max
- **Quotes**: Single quotes for strings
- **Semicolons**: Not required (Vue style)
- **Trailing Commas**: Yes
- **Final Newline**: Yes (enforced)

### Path Aliases
- `@/` → `./src/`
- `~bootstrap` → `node_modules/bootstrap`

## Project-Specific Rules

### Content Management (i18n)
- All user-facing text must be stored in JSON files in `content/en/`
- Pattern: `${PageName}Page.json` or `${WidgetName}Widget.json`
- Run `pnpm content:create` after editing content files
- Use `t('FileName.key')` in templates via `useI18n()`
- Escape `@` symbols as `&#64;` in content, replace in template
- Every content file must include `meta.title`

### Special Characters
- Email addresses: Use `&#64;` instead of `@` in JSON files
- Replace in template: `t('key').replace(/&#64;/g, '@')`

## Common Patterns

### Creating a New UI Component
1. Create directory: `src/components/ui/{ComponentName}/`
2. Create `{ComponentName}.vue` with `<script setup lang="ts">`
3. Create `index.ts` with cva variants and barrel exports
4. Create `{ComponentName}.spec.ts` with comprehensive tests
5. Import and use: `import { ComponentName } from '@/components/ui/{ComponentName}'`

### Component Props Pattern
```ts
interface Props extends PrimitiveProps {
  variant?: ComponentVariants['variant']
  size?: ComponentVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  asChild: false,
})
```

## CI/CD Notes
- E2E tests run in headless mode on CI
- Type checking required before build
- ESLint forbids `test.only` on CI
- Retries: 2 on CI, 0 locally

## Package Manager
- **Use pnpm** exclusively (not npm or yarn)
- Lock file: `pnpm-lock.yaml`
