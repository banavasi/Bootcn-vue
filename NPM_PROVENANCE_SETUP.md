# npm Provenance Setup Guide

## What Changed

We've updated the project to use **npm provenance** with **GitHub OIDC** (OpenID Connect) for publishing packages. This approach:

- ✅ **Bypasses 2FA/OTP requirements** - No more authentication tokens needed
- ✅ **More secure** - Uses GitHub's identity provider
- ✅ **Supply chain transparency** - Provides cryptographic proof of package origin
- ✅ **Automated** - Works seamlessly in CI/CD

## What You Need to Do

### Configure npm Trusted Publishers

You need to configure **each** npm package to trust GitHub Actions as a publisher.

#### For Each Package:

1. **@bootcn-vue/core**
   - Go to: https://www.npmjs.com/package/@bootcn-vue/core/access
2. **@bootcn-vue/buttons** (⚠️ Not published yet - will configure after first publish)
   - Go to: https://www.npmjs.com/package/@bootcn-vue/buttons/access

3. **@bootcn-vue/cli** (⚠️ Not published yet - will configure after first publish)
   - Go to: https://www.npmjs.com/package/@bootcn-vue/cli/access

4. **@bootcn-vue/forms** (⚠️ Not published yet - will configure after first publish)
   - Go to: https://www.npmjs.com/package/@bootcn-vue/forms/access

**Note**: You can only configure trusted publishers for packages that have been published at least once. Only `@bootcn-vue/core@0.0.1` is currently published, so start with that one.

#### Configuration Steps:

For **each** package above:

1. **Scroll to "Publishing access" section**

2. **Change authentication requirement**:
   - Click the dropdown currently showing: "Require two-factor authentication or automation tokens"
   - Select: **"Require two-factor authentication or provide publishing provenance"**
   - Click "Update Settings"

3. **Add Trusted Publisher**:
   - Click **"Add Trusted Publisher"** button
   - Fill in the form:
     ```
     Provider: GitHub Actions
     Organization: banavasi
     Repository: Bootcn-vue
     Workflow file: .github/workflows/release.yml
     Environment: (leave empty)
     ```
   - Click **"Add"**

## How It Works

### Before (Traditional Token Approach)

```
GitHub Actions → NPM_TOKEN secret → npm registry → 2FA/OTP required ❌
```

### After (Provenance with OIDC)

```
GitHub Actions → GitHub OIDC token → npm registry → Trusted publisher ✅
```

## Testing the Setup

After configuring trusted publishers on npm:

1. The next push to `main` will trigger the Release workflow
2. If there are changesets, it will create a version PR
3. When you merge the version PR, packages will be published with provenance
4. You can verify provenance on npm package pages (shows GitHub Actions badge)

## Verification

Once published with provenance, you'll see:

- **On npm package page**: "Provenance" badge with GitHub Actions logo
- **Package details**: Link to exact GitHub Actions workflow run
- **Supply chain**: Cryptographic attestation of package origin

## Troubleshooting

### "Publishing requires provenance but none was provided"

- Ensure `"provenance": true` is in each `package.json` `publishConfig` (already done)
- Ensure `--provenance` flag is in publish command (already done)
- Ensure workflow has `id-token: write` permission (already done)

### "Workflow not authorized"

- Double-check trusted publisher configuration on npm
- Ensure workflow file path matches exactly: `.github/workflows/release.yml`
- Ensure organization and repository names are correct

### Still seeing 2FA errors

- Verify you selected "provide publishing provenance" option (not just "automation tokens")
- Ensure trusted publisher is added for ALL packages
- Check that NPM_TOKEN secret is still set (it's used as fallback)

## References

- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [GitHub OIDC Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Trusted Publishers Guide](https://github.blog/2023-04-19-introducing-npm-package-provenance/)

## Alternative: Automation Token (RECOMMENDED FOR NOW)

**Since only `@bootcn-vue/core` is published**, using an automation token is simpler:

1. Go to https://www.npmjs.com/settings/banavasi/tokens
2. Click **"Generate New Token"**
3. Select **"Automation"** type (NOT "Publish")
4. Copy the token
5. Update GitHub Secret:
   - Go to: https://github.com/banavasi/Bootcn-vue/settings/secrets/actions
   - Click `NPM_TOKEN` → **"Update secret"**
   - Paste the automation token
6. **Temporarily remove provenance flag** from release.yml:
   - Change `publish: pnpm changeset publish --provenance`
   - To: `publish: pnpm changeset publish`
7. Commit and push to trigger publish

**Why this is easier now**:

- Automation tokens bypass 2FA completely
- No need to configure trusted publishers for unpublished packages
- Once all packages are published, you can switch to provenance
- Automation tokens work immediately

**After successful publish**:

- All 4 packages will be on npm
- Then configure trusted publishers for all packages
- Re-enable `--provenance` flag in workflow
