# Globomantics Robot Token Format Guide

## Pattern Definition

```regex
gbot-(dev|prod)-[A-Fa-f0-9]{16}
```

## Pattern Breakdown

| Component | Description | Example |
|-----------|-------------|---------|
| `gbot-` | Static prefix identifying Globomantics bot tokens | `gbot-` |
| `(dev\|prod)` | Environment identifier, either 'dev' or 'prod' | `dev` or `prod` |
| `-` | Delimiter between environment and token | `-` |
| `[A-Fa-f0-9]{16}` | 16-character hexadecimal token | `1234abcd5678ef90` |

## Valid Examples

```plaintext
gbot-dev-0123456789abcdef  ✅ Development token
gbot-prod-fedcba9876543210 ✅ Production token
gbot-dev-aaaaaaaabbbbbbbb  ✅ Valid format with repeating chars
gbot-prod-0f1e2d3c4b5a6789 ✅ Valid format with mixed case
```

## Invalid Examples

```plaintext
gbot-stage-0123456789abcdef ❌ Invalid environment (stage)
gbot-dev-0123456789abcde   ❌ Too short (15 chars)
gbot-prod-0123456789abcdefg ❌ Too long (17 chars)
bot-dev-0123456789abcdef   ❌ Missing 'gbot-' prefix
gbot-dev-0123456789GHIJKL  ❌ Invalid chars (G-L)
gbot_dev_0123456789abcdef  ❌ Wrong delimiters
```

## Testing Your Pattern

1. **Using the Test Script**
   ```bash
   ./run-secret-test.sh
   ```
   Choose option 1 for pattern validation or 2 for alert testing.

2. **Manual Testing**
   ```bash
   # Test a valid token
   echo "gbot-dev-0123456789abcdef" | grep -P "gbot-(dev|prod)-[A-Fa-f0-9]{16}"

   # Test an invalid token
   echo "gbot-stage-0123456789abcdef" | grep -P "gbot-(dev|prod)-[A-Fa-f0-9]{16}"
   ```

## Security Considerations

1. **Token Length**: 16 hexadecimal characters provide 64 bits of entropy
2. **Environment Separation**: Distinct dev/prod prefixes prevent environment confusion
3. **Format Validation**: Strict format makes accidental matches unlikely
4. **Character Set**: Hexadecimal only (0-9, a-f, A-F) for compatibility

## Implementation Notes

1. **Case Sensitivity**: Pattern matches both upper and lower case hex digits
2. **Environment Scope**: Only dev and prod environments are valid
3. **Delimiter Requirements**: Must use hyphen (-) as delimiter
4. **Prefix Requirement**: Must start with 'gbot-'

## Best Practices

1. **Token Generation**
   ```python
   import secrets
   token = f"gbot-dev-{secrets.token_hex(8)}"  # Generates valid token
   ```

2. **Token Storage**
   - Store in secure credential stores
   - Never commit to source control
   - Use environment variables in development

3. **Token Rotation**
   - Rotate tokens regularly
   - Invalidate compromised tokens immediately
   - Maintain token inventory

## Related Resources

1. [GitHub Secret Scanning Documentation](https://docs.github.com/en/code-security/secret-scanning)
2. [Custom Pattern Creation Guide](https://docs.github.com/en/enterprise-cloud@latest/code-security/secret-scanning/defining-custom-patterns-for-secret-scanning)
3. [Regex Pattern Testing Tool](https://regex101.com)

## Contributing

Found a way to improve this pattern? Submit a PR following our [contribution guidelines](/.github/CONTRIBUTING.md).
