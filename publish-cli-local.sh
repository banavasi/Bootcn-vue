#!/bin/bash
# Local publish script with auth handling

set -e

echo "🚀 Local Publishing Script for @bootcn-vue/cli"
echo ""

# Step 1: Check if logged in
echo "📝 Step 1: Checking npm authentication..."
if ! npm whoami &> /dev/null; then
  echo "❌ You are not logged in to npm"
  echo ""
  echo "Please login first:"
  echo "  npm login"
  echo ""
  echo "After logging in, run this script again."
  exit 1
fi

NPM_USER=$(npm whoami)
echo "✅ Logged in as: $NPM_USER"
echo ""

# Step 2: Temporarily rename .npmrc
echo "📝 Step 2: Temporarily moving .npmrc to avoid token issues..."
if [ -f .npmrc ]; then
  mv .npmrc .npmrc.backup
  echo "✅ .npmrc backed up"
fi

# Function to restore .npmrc on exit
cleanup() {
  echo ""
  echo "🔄 Restoring .npmrc..."
  if [ -f .npmrc.backup ]; then
    mv .npmrc.backup .npmrc
    echo "✅ .npmrc restored"
  fi
}
trap cleanup EXIT

# Step 3: Build
echo ""
echo "📦 Step 3: Building packages..."
pnpm build
echo "✅ Build complete"
echo ""

# Step 4: Version bump
echo "📝 Step 4: Applying changesets..."
pnpm changeset version
echo "✅ Version bump complete"
echo ""

# Step 5: Publish
echo "🚀 Step 5: Publishing to npm..."
echo "⚠️  Publishing with --no-git-checks and --provenance false"
echo ""
read -p "Press Enter to continue with publish, or Ctrl+C to cancel..."

pnpm changeset publish --no-git-checks --provenance false

# Step 6: Push tags
echo ""
echo "📤 Step 6: Pushing git tags..."
git push --follow-tags

echo ""
echo "✅ Done! The updated CLI is now published."
echo ""
echo "Users can now run:"
echo "  npx @bootcn-vue/cli@latest add checkbox"
echo "  npx @bootcn-vue/cli@latest add radio"
echo "  npx @bootcn-vue/cli@latest add field-ssn"
