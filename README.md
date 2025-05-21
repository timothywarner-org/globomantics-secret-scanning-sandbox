# GHAS Secret Scanning & Push Protection: Quick Test Tutorial

OPENAI_API_KEY="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"

## 1. Enable All Security Features (One-Liner)

Run this in your terminal (no leading slash!):

```sh
gh api -X PATCH -H "Accept: application/vnd.github+json" repos/timothywarner-org/deleteme1 \
  -f security_and_analysis.advanced_security.status=enabled \
  -f security_and_analysis.secret_scanning.status=enabled \
  -f security_and_analysis.secret_scanning_push_protection.status=enabled
```

**Why:** Ensures all required GitHub Advanced Security (GHAS) features are active for secret scanning and push protection.

---

## 2. Verify Security Settings

Check that all features are enabled:

```sh
gh api repos/timothywarner-org/deleteme1 | grep security_and_analysis
```

**Expected:** You should see `"status": "enabled"` for advanced_security, secret_scanning, and secret_scanning_push_protection.

---

## 3. Test Push Protection (Demo)

1. **Edit your code:**
   Add or change a fake GitHub PAT in your code (e.g. in `app.js`):
   ```js
   const GITHUB_PAT = 'ghp_FAKE11223344556677889900abcdefabcdefabcd'; // Demo
   ```
2. **Stage, commit, and push:**
   ```sh
   git add app.js
   git commit -m "Test push protection with new fake PAT"
   git push
   ```
3. **Observe:**
   - If push protection is working, you'll see a block or warning in your terminal.
   - If not, check the Security tab in your repo for post-push secret scanning alerts.

---

## 4. Check for Secret Scanning Alerts (Post-Push)

Go to your repo on GitHub:
- **Security** tab → **Secret scanning alerts**

**Why:** Even if push protection doesn't block the push, secret scanning will alert you after the fact.

---

## Troubleshooting
- If you get `invalid API endpoint`, remove the leading slash from the endpoint in your `gh api` command.
- Push protection only blocks supported secret types (GitHub PATs are the most reliable for demo).
- All features require GHAS (paid) to be enabled on your repo/org.

---

**Teach this!**
- Demo the error, the fix, and the rationale for each step.
- Show both push protection (pre-push block) and secret scanning (post-push alert) for maximum impact.
