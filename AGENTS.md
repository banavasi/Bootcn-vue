# Agent Guidelines for bootcn-vue

> **Project:** bootcn-vue - Bootstrap + Vue 3 Component Library with CLI
> **Package Scope:** `@bootcn-vue/*`

This document provides guidelines for AI coding agents working in this Vue 3 + Vite + TypeScript monorepo.

---

## Project Management Workflow

### Task Tracking

All work is tracked in `TASKS.md` using the Epic → Story → Task → Subtask hierarchy.

### Git Branching Strategy

**NEVER work directly on `main` branch.** Use the following branching strategy:

```
main (protected)
  ├── feature/multi-theme-support
  ├── feature/add-modal-component
  ├── bugfix/button-focus-ring
  └── hotfix/cli-installation-error
```

#### Branch Types

1. **`feature/*`** - New features or enhancements
   - Example: `feature/multi-theme-support`, `feature/add-modal-component`
   - For: New components, major enhancements, new functionality
   - Semantic version: **MINOR** bump (e.g., 0.2.0 → 0.3.0)

2. **`bugfix/*`** - Bug fixes for existing features
   - Example: `bugfix/button-focus-ring`, `bugfix/input-validation`
   - For: Fixing broken functionality, addressing issues
   - Semantic version: **PATCH** bump (e.g., 0.2.0 → 0.2.1)

3. **`hotfix/*`** - Critical production fixes
   - Example: `hotfix/cli-installation-error`, `hotfix/security-vulnerability`
   - For: Urgent fixes that need immediate release
   - Semantic version: **PATCH** bump (e.g., 0.2.0 → 0.2.1)
   - Branch from: `main`
   - Merge to: `main` immediately after fix

4. **`docs/*`** - Documentation-only changes
   - Example: `docs/update-readme`, `docs/storybook-guidelines`
   - For: README updates, documentation improvements
   - No version bump (unless significant)

5. **`chore/*`** - Maintenance tasks
   - Example: `chore/update-dependencies`, `chore/refactor-ci`
   - For: Dependency updates, CI/CD changes, refactoring
   - No version bump

#### Agent Branch Decision Logic

**Agent MUST automatically determine branch type based on work:**

| If work involves...           | Branch type | Bump type |
| ----------------------------- | ----------- | --------- |
| New component, new feature    | `feature/*` | MINOR     |
| Bug fix, error correction     | `bugfix/*`  | PATCH     |
| Critical production issue     | `hotfix/*`  | PATCH     |
| Documentation only            | `docs/*`    | None      |
| CI/CD, dependencies, refactor | `chore/*`   | None      |

**Agent Responsibilities:**

1. **Check current branch** - Never start work on `main`
2. **Create appropriate branch** - Based on work type
3. **Make atomic commits** - Small, focused commits with conventional commit messages
4. **Clean up before review** - Remove debug code, console.logs, unnecessary comments
5. **Ask user to review** - Present summary of changes before creating PR
6. **Create changeset** - For feature/bugfix/hotfix branches
7. **Create PR** - Only after user approves

### Workflow for Each Task

```
┌─────────────────────────────────────────────────────────────────┐
│                        TASK WORKFLOW                            │
├─────────────────────────────────────────────────────────────────┤
│  0. BRANCHING                                                   │
│     - Check current branch (NEVER work on main)                 │
│     - Determine branch type (feature/bugfix/hotfix)             │
│     - Create branch: git checkout -b <type>/<description>       │
│     - Example: git checkout -b feature/multi-theme-support      │
│                                                                 │
│  1. UPDATE TASKS.MD                                             │
│     - Mark task as [~] In Progress                              │
│     - Note start date if significant                            │
│                                                                 │
│  2. IMPLEMENT                                                   │
│     - Follow code standards below                               │
│     - Commit with conventional commits                          │
│     - Keep commits atomic and focused                           │
│     - NO debug code, console.logs, or unnecessary comments      │
│                                                                 │
│  3. VALIDATE                                                    │
│     - Run: pnpm lint && pnpm type-check && pnpm test:unit       │
│     - Fix any failures before proceeding                        │
│                                                                 │
│  4. USER TESTING CHECKPOINT (for UI components)                 │
│     - Add component to Storybook                                │
│     - Ask user to test in Storybook                             │
│     - Collect feedback, iterate if needed                       │
│                                                                 │
│  5. WRITE TESTS                                                 │
│     - Unit tests (Vitest)                                       │
│     - E2E tests if applicable (Playwright)                      │
│                                                                 │
│  6. DOCUMENTATION                                               │
│     - Update Storybook documentation                            │
│     - Update README if needed                                   │
│     - Ask user to review documentation                          │
│                                                                 │
│  7. CLEANUP & REVIEW                                            │
│     - Remove ALL debug code and console.logs                    │
│     - Remove unnecessary comments                               │
│     - Verify code quality and consistency                       │
│     - Present summary to user for review                        │
│     - Wait for user approval before proceeding                  │
│                                                                 │
│  8. COMPLETE                                                    │
│     - Mark task as [x] Complete in TASKS.md                     │
│     - Create changeset: pnpm changeset                          │
│     - Choose appropriate bump type (patch/minor/major)          │
│     - Commit all changes                                        │
│                                                                 │
│  9. CREATE PULL REQUEST                                         │
│     - Push branch to remote                                     │
│     - Create PR to main branch                                  │
│     - PR will trigger CI: build, test, type-check               │
│     - DO NOT MERGE YET - wait for user approval                 │
│                                                                 │
│  10. MERGE & RELEASE (after user approval)                      │
│      - User or Agent merges PR to main                          │
│      - Changesets bot creates "Version Packages" PR             │
│      - User or Agent merges Version PR                          │
│      - CI auto-publishes to npm + creates GitHub release        │
└─────────────────────────────────────────────────────────────────┘
```

### Agent Code Cleanup Requirements

Before asking user for review, Agent MUST:

✅ **Remove:**

- `console.log()`, `console.error()`, `console.warn()` statements
- Debug code and temporary hacks
- Commented-out code blocks
- TODO comments (move to TASKS.md)
- Unused imports
- Unnecessary comments that don't add value

✅ **Verify:**

- All tests pass
- No linting errors
- No type errors
- Code follows style guidelines
- Documentation is complete

✅ **Present to User:**

```markdown
## Work Complete - Ready for Review

**Branch:** feature/multi-theme-support
**Type:** Feature (MINOR version bump)

**Changes:**

- Added RDS theme support to Storybook
- Created theme switcher in toolbar
- Documented multi-theme architecture

**Files Modified:**

- apps/playground/.storybook/preview.ts
- apps/playground/src/assets/styles/\* (new)
- AGENTS.md

**Tests:** ✅ All passing
**Linting:** ✅ No errors
**Type Check:** ✅ No errors

**Changeset:** MINOR bump (0.2.0 → 0.3.0)

Please review the changes. Reply "approve" to create PR or provide feedback.
```

### Commit Convention

Use **Conventional Commits** (enforced by commitlint):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code change that neither fixes bug nor adds feature
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `build`: Build system or dependencies
- `ci`: CI configuration
- `chore`: Other changes (e.g., updating tasks)

**Scopes:** `core`, `buttons`, `forms`, `cli`, `docs`, `ci`

**Examples:**

```bash
feat(buttons): add ButtonGroup component
fix(forms): correct Input focus border color
docs(cli): add init command usage guide
chore(tasks): mark E1.S1.1 as complete
```

### Changesets

For any publishable change, create a changeset:

```bash
pnpm changeset
# Select packages affected
# Choose bump type (patch/minor/major)
# Write change description
```

### Epic/Story/Task Status Updates

When working on tasks, update TASKS.md:

```markdown
# Before starting:

- [ ] **T1.1.1:** Create monorepo directory structure

# While working:

- [~] **T1.1.1:** Create monorepo directory structure

# When blocked:

- [!] **T1.1.1:** Create monorepo directory structure
  - Blocked: waiting for npm org creation

# When complete:

- [x] **T1.1.1:** Create monorepo directory structure
```

### User Testing Checkpoints

For UI components, ALWAYS request user testing:

```markdown
## User Testing Checkpoint

**Component:** Button
**Location:** Storybook → Buttons → Button

Please test the following:

1. [ ] All variants render correctly
2. [ ] All sizes render correctly
3. [ ] Disabled state works
4. [ ] Click interactions work
5. [ ] Accessibility (keyboard nav, screen reader)

**Feedback:** (user fills this in)

**Status:** Awaiting feedback / Approved / Changes requested
```

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

### Creating New Modules

- `pnpm create:module` - Interactive CLI to scaffold a new component module

This command creates a complete module structure:

- Package with all config files (tsconfig, tsup, vitest)
- Component Vue file with tests and barrel exports
- Storybook story
- README and CHANGELOG
- Prompts for: module name, description, component name, author

Example workflow:

```bash
pnpm create:module
# Module name: alerts
# Description: Accessible, customizable alert components
# Component name: Alert
# Author: Your Name

# Then:
pnpm install
pnpm turbo build --filter=@bootcn-vue/alerts
pnpm dev  # See it in Storybook
```

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
import type { HTMLAttributes } from "vue";
// 2. External imports
import { Primitive, type PrimitiveProps } from "reka-ui";
// 3. Internal imports
import { cn } from "@/lib/utils";

// 4. Types/Interfaces
interface Props extends PrimitiveProps {
  variant?: string;
  class?: HTMLAttributes["class"];
}

// 5. Props with defaults
const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
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
  variant?: ComponentVariants["variant"];
  size?: ComponentVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  asChild: false,
});
```

## CI/CD Notes

- E2E tests run in headless mode on CI
- Type checking required before build
- ESLint forbids `test.only` on CI
- Retries: 2 on CI, 0 locally

## Package Manager

- **Use pnpm** exclusively (not npm or yarn)
- Lock file: `pnpm-lock.yaml`

## Multi-Theme Support (Bootstrap + RDS)

### Overview

Storybook supports **two design systems**:

1. **Bootstrap** - Standard Bootstrap 5 (default for end users)
2. **RDS** - Rocket Design System (ASU EdPlus Foundation)

### Architecture

```
apps/playground/src/assets/styles/
├── bootstrap-theme.scss    # Standard Bootstrap 5
├── rds-theme.scss          # RDS theme entry point
├── rds-theme-base.scss     # RDS Bootstrap customizations
├── _colors.scss            # ASU color palette
├── _spacing-vars.scss      # RDS spacing scale
├── _typography.scss        # RDS typography classes
├── _variables.scss         # RDS Bootstrap variable overrides
└── _main.scss              # RDS custom CSS

apps/playground/.storybook/preview.ts
└── Theme switcher + decorator
```

### Key Principles

1. **RDS is built ON TOP of Bootstrap** - not separate
2. **Users only install Bootstrap** - RDS is for Storybook demonstration only
3. **Components use Bootstrap structure** - work with both themes
4. **RDS files live in playground** - for documentation purposes

### RDS Spacing System

RDS extends Bootstrap with semantic spacing utilities:

| RDS Class       | Value         | Bootstrap Equivalent |
| --------------- | ------------- | -------------------- |
| `mb-space-xxxs` | 0.25rem (4px) | `mb-1`               |
| `mb-space-xxs`  | 0.5rem (8px)  | `mb-2`               |
| `mb-space-xs`   | 1rem (16px)   | `mb-3`               |
| `mb-space-sm`   | 1.5rem (24px) | `mb-4`               |
| `mb-space-md`   | 2rem (32px)   | `mb-5`               |
| `mb-space-lg`   | 3rem (48px)   | -                    |
| `mb-space-xl`   | 4rem (64px)   | -                    |
| `mb-space-xxl`  | 6rem (96px)   | -                    |
| `mb-space-xxxl` | 8rem (128px)  | -                    |

**Works with all spacing utilities:** `m-`, `mt-`, `mb-`, `ms-`, `me-`, `mx-`, `my-`, `p-`, `pt-`, `pb-`, `ps-`, `pe-`, `px-`, `py-`, `gap-`

### RDS Colors

ASU brand colors mapped to Bootstrap theme colors:

```scss
$primary: $asu-maroon (#8c1d40)
$secondary: $asu-gold (#ffc627)
$success: $asu-success (#446D12)
$info: $asu-info (#00a3e0)
$warning: $asu-warning (#ff7f32)
$danger: $asu-danger (#B72A2A)
```

Additional colors: `$asu-light-1` through `$asu-light-5`, `$asu-dark-1` through `$asu-dark-3`

### RDS Typography

Custom responsive heading classes:

```html
<h1 class="h1-small">24px mobile, 36px desktop</h1>
<h1 class="h1-medium">30px mobile, 48px desktop</h1>
<h1 class="h1-large">36px mobile, 56px desktop</h1>
<h1 class="h1-xl">56px mobile, 72px desktop</h1>

<h2 class="h2-small">18px mobile, 24px desktop</h2>
<h2 class="h2-medium">24px mobile, 36px desktop</h2>
<!-- etc. -->
```

### Using the Theme Switcher in Storybook

1. Start Storybook: `pnpm storybook` (in playground directory)
2. Open http://localhost:6006/
3. Click the **paintbrush icon** in the toolbar
4. Select "Bootstrap" or "RDS (ASU EdPlus)"
5. All components re-render with the selected theme

### Component Guidelines for Multi-Theme Support

#### ✅ DO:

- Use Bootstrap classes primarily (`btn`, `btn-primary`, `mb-3`)
- Accept custom classes via `class` prop
- Use CVA for variant management
- Let users pass RDS spacing if they want
- Test components in both themes in Storybook

#### ❌ DON'T:

- Hardcode RDS-specific classes in components
- Assume users have RDS installed
- Make components dependent on RDS theme
- Ship RDS theme files to users

### Example Component Usage

```vue
<!-- Button.vue - Works with both themes -->
<script setup lang="ts">
import { cn } from "@bootcn-vue/core";
import { buttonVariants, type ButtonVariants } from ".";

interface Props {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <button :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </button>
</template>
```

```vue
<!-- Usage in Storybook or user apps -->
<!-- Works with Bootstrap (default) -->
<Button variant="primary" class="mb-3">Click me</Button>

<!-- Also works if user adds RDS spacing -->
<Button variant="primary" class="mb-space-sm">Click me</Button>
```

### Adding New RDS Utilities

If you need to add RDS-specific styles for Storybook:

1. Edit files in `apps/playground/src/assets/styles/`
2. Add to `_spacing-vars.scss` (spacing), `_colors.scss` (colors), or `_typography.scss` (text)
3. Styles automatically available in Storybook RDS theme
4. **Remember:** These are for demonstration only, not shipped to users

### CLI Behavior

When users run `npx @bootcn-vue/cli init`:

- **Only Bootstrap 5 is installed** (`bootstrap` npm package)
- RDS theme is NOT installed
- Components work perfectly with Bootstrap classes
- If users want RDS, they can add it themselves

### Documentation

For detailed RDS theme information, see:

- `apps/playground/src/assets/styles/README.md` - Complete RDS documentation
- ASU EdPlus Storybook: https://master.d34gtp7q60k178.amplifyapp.com/

### Testing Both Themes

When developing components:

1. Create component with Bootstrap classes
2. Add to Storybook
3. Switch theme in toolbar
4. Verify component works in both Bootstrap and RDS
5. Check spacing, colors, and typography
6. Test with RDS spacing classes (`mb-space-sm`, etc.)

### Why This Approach?

- **Simplicity:** Users only need Bootstrap
- **Flexibility:** Components work in both design systems
- **Documentation:** Storybook shows both approaches
- **No lock-in:** Users choose their design system
- **Compatibility:** RDS extends Bootstrap, no conflicts
