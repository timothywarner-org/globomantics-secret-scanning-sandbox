---
name: Custom Pattern Suggestion
about: Suggest a new secret scanning pattern
title: '[PATTERN] '
labels: enhancement
assignees: ''
---

**Pattern Description**
A clear description of what type of secret this pattern would detect.

**Pattern Regex**
```regex
your-pattern-here
```

**Example Matches**
```
EXAMPLE-TOKEN-1234 (valid)
INVALID-TOKEN-XXX (should not match)
```

**Additional Context**
Add any other context about the pattern here.

**Testing Plan**
- [ ] Pattern validates with regex tester
- [ ] Test script runs successfully
- [ ] Alerts generated as expected 