#!/bin/bash
# Test script to run local CLI with updated checkbox and radio support

cd "$(dirname "$0")"

echo "Testing local @bootcn-vue/cli with checkbox and radio support"
echo ""

# Run the local CLI
node packages/cli/dist/index.js "$@"
