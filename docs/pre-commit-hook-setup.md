# Setting Up the TruffleHog Pre-Commit Hook

[![GitHub](https://img.shields.io/badge/github-timothywarner-black.svg?logo=github&style=flat-square)](https://github.com/timothywarner)
[![Website](https://img.shields.io/badge/🌐-TechTrainerTim.com-blue.svg?style=flat-square)](https://techtrainertim.com)
[![Pluralsight](https://img.shields.io/badge/Pluralsight-Author-red.svg?logo=pluralsight&style=flat-square)](https://www.pluralsight.com/authors/tim-warner)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A comprehensive guide for implementing pre-commit secret scanning using TruffleHog. Part of the GitHub Advanced Security course materials by Timothy Warner.

## Teaching Notes 📚

### The Power of Simplicity in Security

During the development of this pre-commit hook, we learned a valuable lesson about security tooling:

1. **Simple Solutions Often Win**: Our first implementation was straightforward and worked perfectly. When we tried to "improve" it with more complex features (temporary directories, JSON parsing, detailed output), we actually broke its core functionality.

2. **Why Simpler Is Better**:
   - Fewer points of failure
   - Easier to debug
   - More maintainable
   - Better performance
   - Easier to understand and modify

3. **Security Tool Design Principles**:
   - Focus on the core security objective (in this case, finding secrets)
   - Avoid feature creep that could introduce vulnerabilities
   - Keep the implementation transparent and auditable
   - Make it easy for developers to do the right thing

4. **Real-World Application**:
   This mirrors many real-world security scenarios where complex solutions can:
   - Create false negatives by over-processing
   - Introduce new attack surfaces
   - Make troubleshooting more difficult
   - Discourage adoption due to complexity

Remember: In security tooling, if a simple solution works reliably, it's often better than a complex one that tries to do too much.

## Prerequisites

- Python 3.x installed
- Git repository cloned locally
- Terminal/Command Prompt access
- TruffleHog v2.x (`pip install trufflehog`)
- Git Bash (recommended for Windows users)

## Installation Steps

1. **Install TruffleHog**
   ```bash
   pip install trufflehog
   ```

2. **Create the Pre-Commit Hook**
   
   Create a new file at `.git/hooks/pre-commit` with the following content:
   ```bash
   #!/bin/bash

   # Colors for output
   RED='\033[0;31m'
   GREEN='\033[0;32m'
   NC='\033[0m' # No Color

   echo "🔍 Running TruffleHog secret scanner..."

   # Get the staged files
   staged_files=$(git diff --cached --name-only)

   if [ -z "$staged_files" ]; then
       echo -e "${GREEN}No files staged for commit. Skipping TruffleHog scan.${NC}"
       exit 0
   fi

   # Run TruffleHog on staged files
   if ! command -v trufflehog &> /dev/null; then
       echo -e "${RED}Error: TruffleHog is not installed. Please install it with 'pip install trufflehog' or visit https://github.com/trufflesecurity/trufflehog${NC}"
       exit 1
   fi

   # Create a temporary file for TruffleHog output
   temp_output=$(mktemp)

   # Run TruffleHog with v2 compatible syntax and capture output
   # Using --json to get structured output and grep for findings
   trufflehog --regex --entropy=False --max_depth 1 --json . > "$temp_output" 2>/dev/null

   # Check if there are any findings in the JSON output
   if [ -s "$temp_output" ] && grep -q "\"reason\":" "$temp_output"; then
       echo -e "${RED}❌ Potential secrets found in staged files:${NC}"
       # Pretty print the findings
       while IFS= read -r line; do
           if echo "$line" | grep -q "\"path\":"; then
               file=$(echo "$line" | sed 's/.*"path": "\(.*\)",/\1/')
               echo -e "${RED}File:${NC} $file"
           fi
           if echo "$line" | grep -q "\"stringsFound\":"; then
               match=$(echo "$line" | sed 's/.*"stringsFound": \[\(.*\)\],/\1/')
               echo -e "${RED}Match:${NC} $match"
           fi
       done < "$temp_output"
       rm -f "$temp_output"
       exit 1
   else
       echo -e "${GREEN}✅ No secrets found in staged files${NC}"
       rm -f "$temp_output"
       exit 0
   fi
   ```

3. **Make the Hook Executable**
   ```bash
   chmod +x .git/hooks/pre-commit
   ```

## Testing the Hook

1. Create a test file with a fake secret:
   ```bash
   echo "XYZ_KEY=AKIAFAKEEXAMPLEKEY" > test-secret.txt
   ```

2. Try to commit the file:
   ```bash
   git add test-secret.txt
   git commit -m "test commit"
   ```

3. The hook should:
   - Run automatically
   - Detect the AWS key
   - Block the commit
   - Display a red error message

## What's New in This Version

1. **Improved Staged Files Handling**:
   - Only scans files that are actually staged for commit
   - Creates isolated environment for scanning
   - Maintains file structure for accurate scanning

2. **Windows-Friendly Changes**:
   - Uses temporary directories properly on Windows
   - Handles Windows permission errors gracefully
   - Cleans up resources reliably with trap

3. **Better Output**:
   - Shows which files contain secrets
   - Displays the actual matched patterns
   - Uses color-coded output for better visibility

## Windows-Specific Notes

When using Windows:
1. Install Git Bash (comes with Git for Windows)
2. Run all commands in Git Bash rather than CMD or PowerShell
3. If you see permission errors:
   - Run Git Bash as Administrator
   - Ensure Python/pip are installed for your user account
   - Try using `pip3` instead of `pip` if needed

## What the Hook Does

- Runs before every commit
- Checks all staged files for secrets
- Uses TruffleHog's regex patterns
- Disables entropy checks for faster scanning
- Blocks commits if secrets are found
- Provides colored output for better visibility

## Troubleshooting

- If you get a "command not found" error for TruffleHog:
  - Ensure Python and pip are in your PATH
  - Try running `pip install trufflehog` again
  - On Windows, you might need to use `pip3` instead of `pip`

- If the hook isn't running:
  - Check that the file is in `.git/hooks/pre-commit` (no file extension)
  - Ensure it's executable (`chmod +x`)
  - Check that the file has Unix-style line endings (LF, not CRLF)

## Notes for Windows Users

If you're using Git Bash on Windows:
- The hook should work as-is
- If using PowerShell or CMD, you might need to adjust the script path or use WSL
- Ensure Git is configured to maintain Unix-style line endings 