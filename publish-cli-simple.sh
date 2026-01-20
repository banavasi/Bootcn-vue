#!/bin/bash
# Publish CLI - handles .npmrc override issue

set -e

echo "🚀 Publishing @bootcn-vue/cli"
echo ""

# Step 1: Build
echo "📦 Building CLI..."
cd packages/cli
pnpm build
cd ../..
echo "✅ Build complete"
echo ""

# Step 2: Publish with NPM_TOKEN from global config
echo "🚀 Publishing to npm..."
echo "Using your logged-in npm credentials..."
echo ""

# Extract token from global .npmrc
NPM_TOKEN=$(grep "_authToken" ~/.npmrc | cut -d'=' -f2)

if [ -z "$NPM_TOKEN" ]; then
  echo "❌ No npm token found in ~/.npmrc"
  echo "Please run: npm login"
  exit 1
fi

echo "Found auth token from ~/.npmrc"
echo ""

# Publish with the token from environment
cd packages/cli
NPM_TOKEN=$NPM_TOKEN npm publish --access public
cd ../..

echo ""
echo "✅ Published successfully!"
echo ""
echo "Test with:"
echo "  npx @bootcn-vue/cli@latest --version"
echo "  npx @bootcn-vue/cli@latest add checkbox"
