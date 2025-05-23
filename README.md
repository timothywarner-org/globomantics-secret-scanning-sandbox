# Globomantics Secret Scanning Sandbox 🤖

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-TechTrainerTim.com-blue?style=flat-square)](https://techtrainertim.com)

[![Test Globomantics Secret Pattern](https://github.com/timothywarner-org/globomantics-secret-scanning-sandbox/actions/workflows/test-globo-secret-pattern.yml/badge.svg)](https://github.com/timothywarner-org/globomantics-secret-scanning-sandbox/actions/workflows/test-globo-secret-pattern.yml)

[![Test Secret Scanning Alert](https://github.com/timothywarner-org/globomantics-secret-scanning-sandbox/actions/workflows/test-secret-alert.yml/badge.svg)](https://github.com/timothywarner-org/globomantics-secret-scanning-sandbox/actions/workflows/test-secret-alert.yml)

> A practical sandbox for testing GitHub Advanced Security (GHAS) custom secret scanning patterns
>
> From the Office of the CTO, Globomantics Corp.

## Overview

This repository serves as a learning sandbox for implementing and testing custom secret scanning patterns with GitHub Advanced Security. It's specifically designed for teams learning how to protect their unique authentication token formats using GHAS.

## 🎯 What You'll Learn

- How to define custom secret scanning patterns
- Testing your patterns in a safe environment
- Implementing push protection for custom secrets
- Best practices for secret pattern definition

## 🚀 Quick Start

1. Fork this repository to your organization
2. Enable GitHub Advanced Security features:
   ```bash
   gh api -X PATCH repos/YOUR-ORG/globomantics-secret-sandbox \
     -f security_and_analysis.advanced_security.status=enabled \
     -f security_and_analysis.secret_scanning.status=enabled \
     -f security_and_analysis.secret_scanning_push_protection.status=enabled
   ```
3. Run the test script:
   ```bash
   ./run-secret-test.sh
   ```

## 📋 Custom Pattern Example

This repository includes a sample custom pattern for Globomantics robot authentication tokens:

```regex
gbot-(dev|prod)-[A-Fa-f0-9]{16}
```

This pattern matches our standard robot token format:
- `gbot-dev-xxxxabcd5678ef90`
- `gbot-prod-A1B2C3D4E5F6xxxx`

## 🔍 Testing Your Pattern

1. Check the pattern definition in `globomantics-robot-auth-token-formats.md`
2. Use the provided test script: `run-secret-test.sh`
3. Monitor results in GitHub Security tab

## 📚 Learning Resources

- [GitHub Docs: Custom Patterns for Secret Scanning](https://docs.github.com/en/enterprise-cloud@latest/code-security/secret-scanning/defining-custom-patterns-for-secret-scanning)
- [Pluralsight Course: GitHub Advanced Security Deep Dive](https://www.pluralsight.com/authors/tim-warner)

## ⚠️ Important Notes

- This is a sandbox environment - perfect for learning and testing
- Never use real secrets or tokens
- Pattern testing may take a few minutes to complete
- Push protection requires additional configuration

## 🤝 Contributing

Found a way to improve the patterns or tests? Submit a PR! We're always looking to enhance our security practices.

## 📄 License

MIT - See [LICENSE](LICENSE) for details

## Git Hooks Setup

This repository includes Git hooks for security scanning. To enable them, either:

1. Run the setup script:
   ```bash
   ./setup-hooks.sh
   ```

2. Or manually configure:
   ```bash
   git config core.hooksPath .hooks
   ```

The pre-commit hook will:
- Scan staged files for AWS keys
- Block commits that contain potential secrets
- Show which files contain secrets

---
*"Security is not a product, but a process." - Bruce Schneier*
