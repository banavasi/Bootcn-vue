# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**bootcn-vue** is a modern, type-safe Bootstrap + Vue 3 component library with a copy-paste philosophy. Components are added directly to user projects via CLI (similar to shadcn/ui), giving full control and customization. Built as a monorepo with pnpm workspaces and Turborepo.

**Key Characteristics:**

- Copy-paste component architecture (not traditional npm library)
- Bootstrap 5 design system with modern Vue 3 tooling
- TypeScript-first with strict type safety
- Accessible components built on Reka UI primitives
- Variant-based styling with class-variance-authority (CVA)

## Common Commands

### Development

```bash
pnpm dev              # Start Storybook dev server (port 6006)
pnpm build            # Build all packages
pnpm create:module    # Interactive CLI to scaffold new component package
```

### Testing & Validation

```bash
pnpm test:unit                     # Run all unit tests (Vitest)
pnpm test:unit -- Button.spec.ts   # Run specific test file
pnpm test:unit -- --watch          # Watch mode
pnpm test:e2e                      # Run E2E tests (Playwright)
pnpm type-check                    # Type check without building
pnpm lint                          # Run oxlint + eslint with auto-fix
```

### Release & Publishing

```bash
pnpm changeset          # Create changeset for version bump
pnpm version-packages   # Apply changesets and bump versions
pnpm release            # Build and publish to npm
```

## High-Level Architecture

### Monorepo Structure

This is a **pnpm workspace** monorepo orchestrated by **Turborepo**:

```
bootcn-vue/
├── apps/
│   └── playground/          # Storybook documentation & dev environment
├── packages/
│   ├── cli/                 # CLI tool (init, add, remove commands)
│   ├── core/                # Shared utilities (cn function, cva)
│   ├── buttons/             # Button component
│   ├── checkbox/            # Checkbox component
│   ├── tooltip/             # Tooltip component
│   ├── field-text/          # Text input field
│   ├── field-password/      # Password field
│   └── forms/               # Form primitives & components
└── scripts/
    └── create-module.mjs    # Package scaffolding script
```

### Core Architectural Patterns

**1. Component Architecture (Copy-Paste Model)**

Components are NOT consumed from npm but copied to user projects:

- CLI reads component source from packages/
- Transforms imports (`@bootcn-vue/core` → `@/lib/utils`)
- Writes files to user's `src/components/ui/`
- User owns and can modify components

**2. Variant-Based Styling System**

All UI components use **class-variance-authority (CVA)**:

```ts
// packages/buttons/src/index.ts
const buttonVariants = cva({
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      // ... Bootstrap variants
    },
    size: {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    },
  },
});
```

**3. Reka UI Primitive Composition**

Components extend accessible primitives:

```vue
<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  class?: HTMLAttributes["class"];
}
</script>
```

**4. Package Build System**

Each package uses **tsup** for fast TypeScript bundling:

- Outputs: ESM, CJS, TypeScript declarations (.d.ts)
- Zero-config: `tsup.config.ts` in each package
- Turborepo orchestrates builds with dependency graph

**5. CLI Architecture**

The `@bootcn-vue/cli` package powers the copy-paste workflow:

- **init**: Detects Vue 3 + Vite projects, sets up aliases, installs dependencies
- **add**: Copies components from packages to user project, transforms imports
- **remove**: Removes components and configuration
- Uses Commander.js for CLI framework, @clack/prompts for interactive UX

### Design System Integration

**Bootstrap 5.3.6** with **RDS Spacing System**:

- Bootstrap utility classes for component styling
- RDS spacing scale (`space-xs`, `space-sm`, etc.) instead of Bootstrap numeric spacing
- Example: `class="mb-space-sm px-space-md"` NOT `class="mb-3 px-4"`

**FontAwesome Integration:**

- Icons via `@fortawesome/fontawesome-svg-core` and `@fortawesome/vue-fontawesome`
- See `FONTAWESOME.md` for usage patterns

## Development Workflow

### Task Workflow (8-Step Process)

1. **Update TASKS.md** - Mark task as `[~]` In Progress
2. **Implement** - Follow code standards
3. **Validate** - Run: `pnpm lint && pnpm type-check && pnpm test:unit`
4. **User Testing Checkpoint** - Add to Storybook, request user testing
5. **Write Tests** - Unit tests (Vitest), E2E (Playwright)
6. **Documentation** - Update Storybook docs, README
7. **Complete** - Mark `[x]` in TASKS.md, create changeset (if needed)
8. **Commit** - Use commit skill (see below)
9. **Merge to Main** - CI will build/test/deploy/publish

### Committing Code (Required)

**ALWAYS use the `/commit` skill** to create commits. This ensures proper conventional commit format and includes co-authorship.

**When you commit:**

1. Use `/commit` command (this invokes the commit skill)
2. The skill will:
   - Stage all changes
   - Check git status and diff
   - Analyze changes and create appropriate conventional commit message
   - Include Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   - Run git status to verify

**Commit Message Format (auto-generated by skill):**

```
<type>(<scope>): <description>

[optional body]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**Valid Commit Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, no code change
- `refactor` - Code change that neither fixes bug nor adds feature
- `perf` - Performance improvement
- `test` - Adding/updating tests
- `build` - Build system or dependencies
- `ci` - CI configuration
- `chore` - Other changes

**Valid Scopes:**
`core`, `buttons`, `forms`, `field-text`, `field-password`, `tooltip`, `checkbox`, `cli`, `playground`, `docs`, `ci`, `deps`, `release`, `build`, `monorepo`

**Examples of what the skill generates:**

```bash
feat(buttons): add ButtonGroup component
fix(forms): correct Input focus border color
docs(cli): update installation guide
chore(tasks): mark E1.S1.1 as complete
```

**Important:**

- NEVER commit without running validation first: `pnpm lint && pnpm type-check && pnpm test:unit`
- The commit skill will handle proper formatting automatically
- See `.cursorrules` for complete commit standards

### Changesets (For Publishable Changes)

```bash
pnpm changeset
# Select affected packages
# Choose bump type (patch/minor/major)
# Write change description
```

Changeset creates `.changeset/{name}.md` that triggers version bump on merge.

See `RELEASE.md` for complete release workflow.

## Component Development Standards

### Component Structure

```
src/components/ui/{ComponentName}/
├── {ComponentName}.vue        # Implementation
├── index.ts                   # Barrel export with cva variants
└── {ComponentName}.spec.ts    # Unit tests
```

### Vue Component Template

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
  variant?: ComponentVariants["variant"];
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

### Path Aliases

- `@/` → `./src/`
- `~bootstrap` → `node_modules/bootstrap`

### Creating New Packages

When creating a new component package (using `pnpm create:module`), you must update **TWO** files for the package to be discoverable and commits to pass validation:

**1. Add to CLI Registry** (`packages/cli/src/commands/add.ts`)

Add the component to the `REGISTRY` object so users can add it via `bootcn-vue add`:

```ts
const REGISTRY: Record<string, ComponentRegistry> = {
  // ... existing components

  "your-component": {
    name: "YourComponent",
    type: "component", // or "primitive" for form building blocks
    package: "your-package", // Package name without @bootcn-vue/ prefix
    files: ["YourComponent.vue", "index.ts"],
    dependencies: ["@bootcn-vue/core"],
    peerDependencies: ["reka-ui"],
  },
};
```

**2. Add to Commitlint Scopes** (`commitlint.config.js`)

Add the package name to the `scope-enum` array so commits with that scope pass validation:

```js
"scope-enum": [
  2,
  "always",
  [
    "core",
    "buttons",
    "your-package", // Add here
    // ... other scopes
  ],
],
```

**3. Update Documentation Files**

Update the following files to include the new package scope:

- `.cursorrules` - Add to "Required Commit Scopes" list
- `CLAUDE.md` - Add to "Valid Scopes" lists (2 locations)

**Example: Adding a "checkbox" package**

```bash
# 1. Create the package
pnpm create:module
# Module name: checkbox
# Component name: Checkbox

# 2. Edit packages/cli/src/commands/add.ts
# Add "checkbox" to REGISTRY

# 3. Edit commitlint.config.js
# Add "checkbox" to scope-enum

# 4. Edit .cursorrules
# Add "checkbox" to commit scopes list

# 5. Edit CLAUDE.md
# Add "checkbox" to valid scopes (2 places)

# 6. Now you can commit with the new scope
# /commit  # Will create commit like: feat(checkbox): add Checkbox component
```

**IMPORTANT:** If you skip these steps:

- Users won't see the component in `bootcn-vue add` list
- Commits like `feat(your-package): ...` will **FAIL** commitlint validation

## Code Standards Summary

**TypeScript:**

- Strict mode, NO `any` types
- `interface Props extends PrimitiveProps` pattern
- Export types: `export type ButtonVariants = VariantProps<...>`

**Vue 3:**

- `<script setup lang="ts">` required
- `defineProps<Props>()` with TypeScript interfaces
- `withDefaults()` for default values

**Styling:**

- Use RDS spacing: `space-xs`, `space-sm`, `space-md`
- Use `cn()` utility for class merging (clsx + tailwind-merge)
- Bootstrap 5 classes + CVA variants

**Testing:**

- Vitest + @vue/test-utils
- Test all variants and sizes
- Place tests alongside components

**Formatting:**

- 2 spaces indentation
- 100 char line max
- Single quotes, trailing commas

## Critical Rules

**❌ NEVER:**

- Use `any` type
- Use Bootstrap numeric spacing (`m-1`, `m-2`)
- Use runtime props (use TypeScript)
- Commit without `pnpm lint && pnpm type-check && pnpm test:unit`
- Manually create git commits - ALWAYS use `/commit` skill
- Use git commit directly - let the skill handle formatting
- Create new packages without updating CLI registry and commitlint scopes

**✅ ALWAYS:**

- Use RDS spacing system
- Follow component structure order
- Write unit tests
- Create changesets for publishable changes
- Use `/commit` skill for all commits (ensures proper conventional commits and co-authorship)
- Validate before committing: `pnpm lint && pnpm type-check && pnpm test:unit`
- When creating packages: update `packages/cli/src/commands/add.ts` REGISTRY, `commitlint.config.js` scope-enum, `.cursorrules`, and `CLAUDE.md`

## Reference Files

- **AGENTS.md** - Comprehensive development guidelines
- **TASKS.md** - Project roadmap and task tracking
- **RELEASE.md** - Release process and publishing workflow
- **FONTAWESOME.md** - Icon integration guide
- **.cursorrules** - Code style and commit standards

## Package Manager

**Use pnpm exclusively** (>= 9.0.0). Lock file: `pnpm-lock.yaml`
