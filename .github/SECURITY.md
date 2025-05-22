# Security Policy

## Supported Versions

This is a learning repository for GitHub Advanced Security custom secret scanning patterns. All commits to main are supported.

## Reporting a Vulnerability

This repository is intended for educational purposes and contains deliberately embedded test tokens. However, if you discover any real security vulnerabilities:

1. **Do not** create a GitHub issue
2. Email security@globomantics.com (fictional email for training)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact

## Custom Secret Scanning Patterns

This repository demonstrates custom secret scanning patterns for Globomantics robot tokens. The pattern format is:

```regex
gbot-(dev|prod)-[A-Fa-f0-9]{16}
```

### Testing Patterns

1. Use the provided `run-secret-test.sh` script
2. Monitor alerts in GitHub Security tab
3. Use VS Code with the GitHub Security Alerts extension 