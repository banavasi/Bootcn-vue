# Using Updated CLI with Checkbox and Radio Support

## Current Status

✅ Checkbox and radio components have been added to the CLI source code
✅ CLI has been rebuilt with the changes
✅ Storybook documentation has been updated
✅ CLI README has been updated
✅ Changeset has been created

## How to Use the Updated CLI

### Option 1: Use Local CLI (Testing)

Run the CLI directly from your local build:

```bash
# From the project root
./test-cli.sh add checkbox
./test-cli.sh add radio

# Or run directly
node packages/cli/dist/index.js add checkbox
node packages/cli/dist/index.js add radio
```

### Option 2: Publish to npm (Production)

To make the updated CLI available via `npx @bootcn-vue/cli`, you need to publish:

```bash
# 1. Build all packages
pnpm build

# 2. Apply changesets (bumps versions)
pnpm changeset version

# 3. Publish to npm
pnpm changeset publish

# 4. Push tags to GitHub
git push --follow-tags
```

After publishing, users can run:

```bash
npx @bootcn-vue/cli@latest add checkbox
npx @bootcn-vue/cli@latest add radio
```

## Testing Locally Before Publishing

To test in a different project without publishing:

```bash
# In this project root
cd packages/cli
pnpm link --global

# In your test project
bootcn-vue add checkbox
bootcn-vue add radio
```

Or use the test script from this repo:

```bash
# Copy the built CLI to your test project
cp -r packages/cli/dist /path/to/test-project/node_modules/@bootcn-vue/cli/
```

## Available Components After Update

### UI Components

- `button` - Button component
- `tooltip` - Tooltip components
- `checkbox` - Checkbox, CheckboxGroup, CheckboxGroupItem ✨ NEW
- `radio` - RadioGroup, RadioGroupItem, RadioYesNo ✨ NEW
- `field-text` - Text input field
- `field-password` - Password input field

### Form Primitives

- `input-root` - Form input container
- `input-label` - Form label
- `input-field` - Input field
- `input-password` - Password input
- `input-error` - Error display
- `input-help` - Help text
- `input-masked` - Masked input
- `input-numeric-range` - Numeric range

## What Was Changed

### 1. CLI Registry (`packages/cli/src/commands/add.ts`)

- Added checkbox component entry with all files
- Added radio component entry with all files
- Added import transformation functions

### 2. Documentation (`apps/playground/src/stories/Configure.mdx`)

- Added checkbox and radio to component list
- Updated usage examples
- Added CLI command examples

### 3. CLI README (`packages/cli/README.md`)

- Added comprehensive component tables
- Added usage examples for checkbox and radio

### 4. Version Bump

- CLI version bumped from 0.6.2 to 0.6.3
- Changeset created for publishing
