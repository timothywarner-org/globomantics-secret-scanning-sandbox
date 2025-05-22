#!/bin/bash

# Ensure we're in the right directory
cd "$(dirname "$0")" || exit

# Function to check prerequisites
check_prereqs() {
    if ! command -v gh &> /dev/null; then
        echo "❌ GitHub CLI (gh) not found. Please:"
        echo "  1. Install GitHub CLI (https://cli.github.com)"
        echo "  2. Run 'gh auth login'"
        exit 1
    fi
}

# Function to run pattern validation workflow
run_pattern_test() {
    echo "🔍 Running pattern validation tests..."
    gh workflow run "test-globo-secret-pattern.yml" || {
        echo "❌ Failed to trigger pattern validation workflow"
        exit 1
    }
    echo "✅ Pattern validation workflow triggered!"
}

# Function to run secret alert workflow
run_alert_test() {
    echo "🚨 Running secret scanning alert test..."
    gh workflow run "test-secret-alert.yml" || {
        echo "❌ Failed to trigger alert test workflow"
        exit 1
    }
    echo "✅ Alert test workflow triggered!"
}

# Main menu
main_menu() {
    echo "🤖 Globomantics Secret Scanning Test Suite"
    echo "----------------------------------------"
    echo "1) Run pattern validation tests"
    echo "2) Run secret alert test"
    echo "3) Run both tests"
    echo "4) Exit"
    echo ""
    read -p "Select an option (1-4): " choice

    case $choice in
        1) run_pattern_test ;;
        2) run_alert_test ;;
        3) 
            run_pattern_test
            run_alert_test
            ;;
        4) exit 0 ;;
        *) 
            echo "❌ Invalid option"
            main_menu
            ;;
    esac

    echo "✨ Checking workflow status..."
    sleep 2
    gh run list --limit 2
}

# Run the script
check_prereqs
main_menu 