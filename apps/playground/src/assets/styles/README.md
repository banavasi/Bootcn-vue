# Theme Styles for bootcn-vue Storybook

This directory contains theme files for demonstrating components in Storybook with different design systems.

## Theme Files

### Bootstrap Theme (`bootstrap-theme.scss`)

- Standard Bootstrap 5 implementation
- Default theme for bootcn-vue components
- What users install when they run `npx @bootcn-vue/cli init`

### RDS Theme (`rds-theme.scss` + `rds-theme-base.scss`)

- **RDS = Rocket Design System** (ASU EdPlus Foundation)
- Built **on top of Bootstrap**, not separate from it
- Adds custom spacing utilities, colors, and typography
- **For Storybook demonstration only** - not shipped to users

## How It Works

### For Component Authors (You)

Both themes are loaded in Storybook (`.storybook/preview.ts`) to demonstrate:

- Components work with standard Bootstrap classes
- Components work with RDS spacing utilities (`mb-space-sm`, etc.)
- Theme switcher in Storybook toolbar to toggle between views

### For End Users

When users run `npx @bootcn-vue/cli init`:

- **Only Bootstrap 5 is installed** (`bootstrap` npm package)
- Components use Bootstrap structure and classes
- If users want RDS spacing, they can add it themselves

## RDS Spacing System

RDS extends Bootstrap's spacing utilities with semantic names:

| RDS Class       | Value         | Bootstrap Equivalent    |
| --------------- | ------------- | ----------------------- |
| `mb-space-xxxs` | 0.25rem (4px) | Similar to `mb-1`       |
| `mb-space-xxs`  | 0.5rem (8px)  | Similar to `mb-2`       |
| `mb-space-xs`   | 1rem (16px)   | Similar to `mb-3`       |
| `mb-space-sm`   | 1.5rem (24px) | Similar to `mb-4`       |
| `mb-space-md`   | 2rem (32px)   | Similar to `mb-5`       |
| `mb-space-lg`   | 3rem (48px)   | No Bootstrap equivalent |
| `mb-space-xl`   | 4rem (64px)   | No Bootstrap equivalent |
| `mb-space-xxl`  | 6rem (96px)   | No Bootstrap equivalent |
| `mb-space-xxxl` | 8rem (128px)  | No Bootstrap equivalent |

Works with all Bootstrap spacing utilities: `m-`, `mt-`, `mb-`, `ms-`, `me-`, `mx-`, `my-`, `p-`, `pt-`, `pb-`, `ps-`, `pe-`, `px-`, `py-`, `gap-`

## RDS Colors

ASU brand colors added to Bootstrap theme colors:

| Color          | Value   | Usage                 |
| -------------- | ------- | --------------------- |
| `$asu-maroon`  | #8c1d40 | Primary brand color   |
| `$asu-gold`    | #ffc627 | Secondary brand color |
| `$asu-success` | #446D12 | Success state         |
| `$asu-info`    | #00a3e0 | Info state            |
| `$asu-warning` | #ff7f32 | Warning state         |
| `$asu-danger`  | #B72A2A | Danger state          |

Additional grays: `$asu-light-1` through `$asu-light-5`, `$asu-dark-1` through `$asu-dark-3`

## RDS Typography

Custom heading size classes:

| Class        | Mobile Size | Desktop Size |
| ------------ | ----------- | ------------ |
| `.h1-small`  | 24px        | 36px         |
| `.h1-medium` | 30px        | 48px         |
| `.h1-large`  | 36px        | 56px         |
| `.h1-xl`     | 56px        | 72px         |
| `.h2-small`  | 18px        | 24px         |
| `.h2-medium` | 24px        | 36px         |
| `.h2-large`  | 30px        | 48px         |
| `.h2-xl`     | 48px        | 60px         |
| `.h3-small`  | 16px        | 16px         |
| `.h3-medium` | 18px        | 18px         |
| `.h3-large`  | 18px        | 24px         |
| `.h3-xl`     | 30px        | 36px         |

## Why This Structure?

1. **No extra dependencies** - Users only need Bootstrap
2. **RDS is Bootstrap-compatible** - All Bootstrap classes work in RDS
3. **Flexibility** - Users can adopt RDS spacing if they want
4. **Documentation** - Storybook shows both approaches

## Component Guidelines

When building components:

✅ **DO:**

- Use Bootstrap classes primarily (`btn`, `btn-primary`, `mb-3`)
- Accept custom classes via `class` prop
- Use CVA for variant management
- Let users pass RDS spacing classes if they want

❌ **DON'T:**

- Hardcode RDS-specific classes
- Assume users have RDS installed
- Make components dependent on RDS theme

## Example Component Usage

```vue
<!-- Works with Bootstrap (default) -->
<Button variant="primary" class="mb-3">Click me</Button>

<!-- Also works if user adds RDS spacing -->
<Button variant="primary" class="mb-space-sm">Click me</Button>
```

Both approaches work because:

- Bootstrap structure is the foundation
- RDS extends Bootstrap with additional utilities
- Components don't care which spacing system you use
