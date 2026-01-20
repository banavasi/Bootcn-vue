#!/bin/bash
# Quick publish script for CLI updates

set -e  # Exit on error

echo "🚀 Publishing updated @bootcn-vue/cli with checkbox and radio support"
echo ""

# Step 1: Build
echo "📦 Step 1: Building packages..."
pnpm build
echo "✅ Build complete"
echo ""

# Step 2: Version bump
echo "📝 Step 2: Applying changesets..."
pnpm changeset version
echo "✅ Version bump complete"
echo ""

# Step 3: Publish
echo "🚀 Step 3: Publishing to npm..."
echo "⚠️  Make sure you're logged in to npm (npm login)"
echo "⚠️  Make sure you have publish access to @bootcn-vue org"
read -p "Press Enter to continue with publish, or Ctrl+C to cancel..."

pnpm changeset publish

# Step 4: Push tags
echo ""
echo "📤 Step 4: Pushing git tags..."
git push --follow-tags

echo ""
echo "✅ Done! The updated CLI is now published."
echo ""
echo "Users can now run:"
echo "  npx @bootcn-vue/cli@latest add checkbox"
echo "  npx @bootcn-vue/cli@latest add radio"
