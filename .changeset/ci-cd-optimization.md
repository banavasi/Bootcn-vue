---
"@bootcn-vue/cli": patch
---

chore(ci): optimize CI/CD workflows for monorepo

## CI/CD Improvements

### GitHub Actions CI

- Added fetch-depth: 0 for proper Turbo caching
- Turbo automatically uses smart caching based on git history
- Only rebuilds packages that have changed

### GitHub Actions Deploy Docs

- Added path filters to only trigger when relevant files change
- Deploys only when apps/playground/ or packages/ change
- Saves unnecessary Storybook builds

### GitHub Actions Release

- Changesets automatically handles only publishing changed packages
- Proper git history for version bumping
