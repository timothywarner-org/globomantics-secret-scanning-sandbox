# Contributing to Globomantics Secret Scanning Sandbox

This repository is designed as a learning tool for GitHub Advanced Security custom secret scanning patterns.

## Getting Started

1. Fork the repository
2. Enable GitHub Advanced Security features
3. Install recommended VS Code extensions:
   - GitHub Security Alerts
   - GitHub Pull Requests and Issues

## Testing Custom Patterns

1. Use the provided test script:
   ```bash
   ./run-secret-test.sh
   ```

2. Choose your test:
   - Pattern validation
   - Alert generation
   - Both

3. Monitor results in:
   - GitHub Security tab
   - VS Code Security Alerts panel

## Pull Request Guidelines

1. Create a descriptive branch name
2. Include test results in PR description
3. Ensure all workflows pass
4. Do not include real tokens or secrets

## Code of Conduct

This project follows the [GitHub Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines). 