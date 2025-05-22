#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")" || exit

# Run the workflow dispatch
echo "🚀 Triggering secret pattern test workflow..."
gh workflow run "test-globo-secret-pattern.yml" || {
    echo "❌ Failed to trigger workflow. Make sure:"
    echo "  1. GitHub CLI (gh) is installed"
    echo "  2. You're authenticated (run 'gh auth login')"
    echo "  3. You have proper permissions"
    exit 1
}

echo "✅ Workflow triggered! Checking status..."
sleep 2
gh run list --workflow="test-globo-secret-pattern.yml" --limit 1 