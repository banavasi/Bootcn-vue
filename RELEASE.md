# Release Process Guide

This document explains how to create releases for bootcn-vue packages using our automated Changesets workflow.

## Overview

We use **Changesets** for versioning and **GitHub Actions** for automated publishing. When you merge a PR with a changeset, the bot handles versioning and npm publishing automatically.

## Quick Reference

```bash
# 1. Create changeset
pnpm changeset

# 2. Commit and push
git add .changeset/*.md
git commit -m "feat: add new feature"
git push

# 3. Merge PR to main
# → Bot creates "Version Packages" PR

# 4. Merge Version PR
# → Auto-publishes to npm + creates GitHub release
```

## Detailed Workflow

### 1. Make Changes and Create Changeset

After making changes to any package:

```bash
# Run changeset CLI
pnpm changeset
```

**Prompts:**

1. **Which packages changed?**
   - Use `space` to select packages
   - Use `enter` to confirm

   ```
   ◯ @bootcn-vue/buttons
   ◉ @bootcn-vue/cli
   ◯ @bootcn-vue/core
   ◯ @bootcn-vue/forms
   ```

2. **Bump type?**
   - `patch` (0.0.X) - Bug fixes, internal changes
   - `minor` (0.X.0) - New features (backward compatible)
   - `major` (X.0.0) - Breaking changes

   Examples:

   ```
   patch: fix(cli): resolve import error
   minor: feat(cli): add remove command
   major: feat(cli)!: change init API (breaking)
   ```

3. **Summary?**
   Write a clear description (supports markdown):

   ```
   fix: export cva and VariantProps from utils.ts

   The Button component imports `cva` which are transformed from
   `@bootcn-vue/core` to `@/lib/utils` during the add command.
   The init command now properly exports these.
   ```

This creates `.changeset/{random-name}.md`:

```markdown
---
"@bootcn-vue/cli": patch
---

fix: export cva and VariantProps from utils.ts

The Button component imports `cva` which are transformed from
`@bootcn-vue/core` to `@/lib/utils` during the add command.
```

### 2. Commit Changeset with Your Changes

```bash
# Add changeset to git
git add .changeset/*.md

# Commit with conventional commit message
git commit -m "fix(cli): export cva from utils"

# Push to your branch
git push origin feature-branch
```

### 3. Create Pull Request

```bash
# Using GitHub CLI
gh pr create \
  --title "fix(cli): export cva from utils" \
  --body "Fixes #123

## Changes
- Export cva and VariantProps from utils.ts
- Update init command template

## Changeset
- [x] Changeset added (patch)"

# Or manually on GitHub
# https://github.com/banavasi/Bootcn-vue/compare
```

**PR Checklist:**

- ✅ CI checks passing (lint, typecheck, tests)
- ✅ Changeset file committed
- ✅ Code reviewed
- ✅ Ready to merge

### 4. Merge PR to Main

```bash
# Option 1: Merge via GitHub UI
# Click "Merge pull request" button

# Option 2: Merge via CLI
gh pr merge {PR-NUMBER} --merge

# Option 3: Admin bypass (if needed)
gh pr merge {PR-NUMBER} --merge --admin
```

### 5. Changesets Bot Creates "Version Packages" PR (Automatic)

**Within ~30 seconds**, the Changesets GitHub Action:

1. Detects changeset(s) on main
2. Creates/updates a PR titled: **"chore(release): version packages"**
3. PR contains:
   - Updated `package.json` versions
   - Updated `CHANGELOG.md` files
   - Deleted consumed changeset files

**Example Version PR:**

```markdown
# Releases

## @bootcn-vue/cli@0.3.2

### Patch Changes

- [`abc1234`](link) Thanks [@banavasi]! - fix: export cva and VariantProps from utils.ts

  The Button component imports `cva` which are transformed from
  `@bootcn-vue/core` to `@/lib/utils` during the add command.
```

**View the PR:**

```bash
gh pr list --repo banavasi/Bootcn-vue
# Look for "chore(release): version packages"

gh pr view {VERSION-PR-NUMBER}
```

### 6. Review and Merge Version PR

**Review:**

- Check version bumps are correct
- Review CHANGELOG updates
- Ensure CI passes

**Merge:**

```bash
# Merge (will trigger publish)
gh pr merge {VERSION-PR-NUMBER} --merge --admin
```

**Note:** You can merge immediately or wait to batch multiple changesets. Every time you merge a PR with a changeset, the Version PR updates automatically.

### 7. Automatic Publish to npm (Triggered by Version PR Merge)

The Release workflow automatically:

1. **Builds packages** (`pnpm turbo build --filter='./packages/*'`)
2. **Publishes to npm** (`pnpm changeset publish`)
3. **Creates GitHub releases** with changelogs

**Monitor workflow:**

```bash
# Watch workflow progress
gh run watch

# List recent runs
gh run list --workflow=release.yml --limit 3

# View specific run
gh run view {RUN-ID}
```

### 8. Verify Release

**Check npm:**

```bash
# View latest version
npm view @bootcn-vue/cli@latest version

# View package info
npm view @bootcn-vue/cli

# View all versions
npm view @bootcn-vue/cli versions
```

**Check GitHub Releases:**

```bash
# List releases
gh release list

# View specific release
gh release view @bootcn-vue/cli@0.3.2

# Or visit
open https://github.com/banavasi/Bootcn-vue/releases
```

## Multiple Package Releases

When changes affect multiple packages:

```bash
pnpm changeset
# Select multiple packages with space
◉ @bootcn-vue/buttons
◉ @bootcn-vue/cli
◯ @bootcn-vue/core
```

All selected packages will be versioned and published together.

## Batching Changes

You can accumulate multiple changesets before releasing:

1. **PR #1**: Merge with changeset A → Version PR created
2. **PR #2**: Merge with changeset B → Version PR updated
3. **PR #3**: Merge with changeset C → Version PR updated
4. **Merge Version PR** → All 3 changes released together

## Version Bump Guidelines

### Patch (0.0.X)

Bug fixes and internal changes that don't affect the API:

```bash
# Examples
fix(cli): resolve import error
fix(buttons): correct hover state
chore(core): update dependencies
docs(cli): fix typo in README
```

### Minor (0.X.0)

New features that are backward compatible:

```bash
# Examples
feat(cli): add remove command
feat(buttons): add new variant
feat(forms): add Input component
```

### Major (X.0.0)

Breaking changes that require users to update their code:

```bash
# Examples
feat(cli)!: change config file format
feat(buttons)!: rename prop from variant to style
feat(core)!: remove deprecated cn() function
```

**Note:** Add `!` after the scope to indicate breaking change.

## Rollback a Release

If you need to rollback a bad release:

```bash
# 1. Unpublish from npm (within 72 hours)
npm unpublish @bootcn-vue/cli@0.3.2

# 2. Delete GitHub release
gh release delete @bootcn-vue/cli@0.3.2

# 3. Revert the version commit
git revert {COMMIT-SHA}
git push origin main

# 4. Publish corrected version
pnpm changeset
# ... follow normal process
```

## Troubleshooting

### Version PR Not Created

**Symptoms:** PR merged but no Version PR appears

**Causes:**

- No changeset in the PR
- Workflow failed

**Fix:**

```bash
# Check workflow status
gh run list --workflow=release.yml --limit 3

# Re-run failed workflow
gh run rerun {RUN-ID}

# Or manually create changeset and push to main
pnpm changeset
git add .changeset/*.md
git commit -m "chore: add missing changeset"
git push origin main
```

### Publish Failed

**Symptoms:** Version PR merged but packages not on npm

**Causes:**

- Build failed
- npm authentication failed
- Network error

**Fix:**

```bash
# Check workflow logs
gh run view {RUN-ID} --log-failed

# Common issues:
# 1. NPM_TOKEN expired → Update in GitHub Secrets
# 2. Build error → Fix and create new changeset
# 3. Already published → Check npm, may have succeeded

# Manual publish (last resort)
pnpm turbo build --filter='./packages/*'
pnpm changeset publish
```

### Wrong Version Bumped

**Symptoms:** Version PR shows wrong bump type

**Cause:** Wrong bump type selected in changeset

**Fix:**

```bash
# 1. Don't merge Version PR yet
# 2. Edit the changeset file before merging original PR
# 3. Or create a correcting changeset

# Example: Should have been minor, not patch
pnpm changeset
# Select same package, choose "minor", write "correction: should be minor"
# Commit and merge
# Version PR will update with correct version
```

## Configuration Files

### `.changeset/config.json`

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.3/schema.json",
  "changelog": [
    "@changesets/changelog-github",
    { "repo": "banavasi/Bootcn-vue" }
  ],
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### `.github/workflows/release.yml`

Key settings:

- **Trigger:** Push to main
- **Version command:** `pnpm changeset version`
- **Publish command:** `pnpm changeset publish`
- **GitHub Releases:** `createGithubReleases: true`

## Best Practices

1. **Always create changeset** for user-facing changes
2. **Write clear descriptions** - users will see these in CHANGELOG
3. **Choose correct bump type** - follow semver strictly
4. **Batch related changes** - accumulate changesets for related features
5. **Review Version PR carefully** - last chance before publish
6. **Test locally first** - run `pnpm build` before merging
7. **Monitor publish workflow** - ensure it completes successfully
8. **Verify on npm** - check published version works

## FAQ

**Q: Can I skip changesets for some changes?**
A: Yes! Internal changes (tests, docs, build config) don't need changesets. Only user-facing changes require them.

**Q: Can I edit a changeset after creating it?**
A: Yes! They're just markdown files in `.changeset/`. Edit before merging.

**Q: Can I have multiple changesets in one PR?**
A: Yes! Run `pnpm changeset` multiple times for complex changes.

**Q: What if I forget to create a changeset?**
A: Add it in a follow-up PR or directly to main (but prefer doing it in the original PR).

**Q: Can I manually publish without changesets?**
A: Yes, but not recommended. Use `pnpm changeset publish` directly, but this bypasses version tracking.

**Q: How do I publish a prerelease?**
A: Use `pnpm changeset pre enter alpha/beta/rc`, create changesets, merge. See [Changesets docs](https://github.com/changesets/changesets/blob/main/docs/prereleases.md).

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Changesets Action](https://github.com/changesets/action)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

## Summary

**One-liner:** Create changeset → Merge PR → Bot creates Version PR → Merge Version PR → Auto-publishes 🚀

The entire process is automated after you create the changeset. No manual versioning or publishing needed!
