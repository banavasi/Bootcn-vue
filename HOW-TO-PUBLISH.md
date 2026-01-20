# How to Publish @bootcn-vue/cli Locally

## The Problem

The error you encountered:

```
error an error occurred while publishing @bootcn-vue/cli:
EUSAGE Automatic provenance generation not supported for provider: null
```

This happens because:

1. npm is trying to generate provenance (proof of origin) but can't detect a CI environment
2. The `.npmrc` file uses `${NPM_TOKEN}` which is only available in CI

## Solution: Publish Locally

### Option 1: Use the Automated Script (Recommended)

```bash
# Step 1: Login to npm first
npm login

# Step 2: Run the local publish script
./publish-cli-local.sh
```

The script will:

- ✅ Check you're logged in
- ✅ Temporarily move .npmrc to avoid token issues
- ✅ Build all packages
- ✅ Apply changesets (version bump)
- ✅ Publish with `--provenance false` flag
- ✅ Restore .npmrc when done

---

### Option 2: Manual Publishing

If you prefer to do it manually:

```bash
# 1. Login to npm
npm login

# 2. Temporarily rename .npmrc
mv .npmrc .npmrc.backup

# 3. Build packages
pnpm build

# 4. Apply changesets
pnpm changeset version

# 5. Publish with flags to avoid provenance error
pnpm changeset publish --no-git-checks --provenance false

# 6. Restore .npmrc
mv .npmrc.backup .npmrc

# 7. Push git tags
git push --follow-tags
```

---

### Option 3: Publish Only CLI Package

If you only want to publish the CLI package:

```bash
# 1. Login to npm
npm login

# 2. Temporarily rename .npmrc
mv .npmrc .npmrc.backup

# 3. Go to CLI package
cd packages/cli

# 4. Publish directly
npm publish --access public --provenance false

# 5. Go back and restore .npmrc
cd ../..
mv .npmrc.backup .npmrc
```

---

## Understanding the Flags

- `--provenance false` - Disables automatic provenance generation (only works in CI)
- `--no-git-checks` - Skips git checks if you have uncommitted changes
- `--access public` - Required for @bootcn-vue scoped packages to be public

---

## After Publishing

Once published, users can install with:

```bash
npx @bootcn-vue/cli@latest add checkbox
npx @bootcn-vue/cli@latest add radio
npx @bootcn-vue/cli@latest add field-ssn
```

---

## CI/CD Publishing (For Future Reference)

The `.npmrc` with `${NPM_TOKEN}` is designed for GitHub Actions:

```yaml
# .github/workflows/publish.yml
- name: Publish
  run: pnpm changeset publish
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

In CI, provenance will work automatically because GitHub provides the necessary environment.

---

## Current CLI Version

After the changes:

- **Version**: 0.6.3
- **New components**: checkbox, radio, field-ssn
- **Total components**: 15

---

## Quick Command Reference

```bash
# Check if logged in
npm whoami

# Login to npm
npm login

# Publish with local script
./publish-cli-local.sh

# Test published version
npx @bootcn-vue/cli@latest --version
npx @bootcn-vue/cli@latest add checkbox
```
