#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Setting up Git hooks...${NC}"

# Ensure .hooks directory exists and has correct permissions
mkdir -p .hooks
chmod +x .hooks/pre-commit

# Configure Git to use our hooks directory
git config core.hooksPath .hooks

echo -e "${GREEN}✅ Git hooks setup complete!${NC}"
echo -e "${BLUE}Pre-commit hook will now scan for secrets in your commits.${NC}" 