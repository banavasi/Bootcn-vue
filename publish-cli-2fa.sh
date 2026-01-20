#!/bin/bash
# Publish CLI with 2FA support

set -e

echo "🚀 Publishing @bootcn-vue/cli v0.7.0"
echo ""
echo "📦 Building..."
cd packages/cli
pnpm build
cd ../..
echo "✅ Build complete"
echo ""

# Get OTP from user
echo "🔐 Your npm account has 2FA enabled"
echo ""
read -p "Enter your OTP code from authenticator app: " OTP_CODE

if [ -z "$OTP_CODE" ]; then
  echo "❌ OTP code is required"
  exit 1
fi

echo ""
echo "🚀 Publishing to npm..."

# Extract token from global .npmrc
NPM_TOKEN=$(grep "_authToken" ~/.npmrc | cut -d'=' -f2)

# Publish with OTP
cd packages/cli
NPM_TOKEN=$NPM_TOKEN npm publish --access public --provenance false --otp=$OTP_CODE
cd ../..

echo ""
echo "✅ Published successfully!"
echo ""
echo "Test with:"
echo "  npx @bootcn-vue/cli@latest --version"
echo "  npx @bootcn-vue/cli@latest add checkbox"
echo "  npx @bootcn-vue/cli@latest add radio"
echo "  npx @bootcn-vue/cli@latest add field-ssn"
