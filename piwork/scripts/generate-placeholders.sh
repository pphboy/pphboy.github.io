#!/bin/bash
# Generate placeholder screenshots using ImageMagick
# Usage: ./generate-placeholders.sh

set -e

SCREENSHOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs/public/screenshots" && pwd)"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed."
    echo "Install it with:"
    echo "  Ubuntu/Debian: sudo apt install imagemagick"
    echo "  macOS: brew install imagemagick"
    exit 1
fi

# Function to create placeholder
create_placeholder() {
    local file=$1
    local text=$2
    local dir=$(dirname "$SCREENSHOT_DIR/$file")

    mkdir -p "$dir"

    convert -size 1600x900 xc:#f8f9fa \
        -gravity center \
        -pointsize 32 -fill "#1f2937" \
        -annotate +0-40 "📸 Screenshot Placeholder" \
        -pointsize 24 -fill "#6b7280" \
        -annotate +0+20 "$text" \
        -pointsize 18 -fill "#9ca3af" \
        -annotate +0+60 "File: $file" \
        "$SCREENSHOT_DIR/$file"

    echo "✓ Created $file"
}

echo "Generating placeholder screenshots..."
echo

# Quick Start placeholders
echo "Quick Start screenshots:"
create_placeholder "quick-start/browser-initial.png" "Initial browser screen - Create administrator"
create_placeholder "quick-start/admin-creation.png" "Administrator creation form"
create_placeholder "quick-start/model-config.png" "Model configuration in Admin Quick setup"
create_placeholder "quick-start/preparation-ready.png" "Preparation page with Ready status"
create_placeholder "quick-start/workbench-entry.png" "Main workbench interface"

echo
echo "First Work screenshots:"
create_placeholder "first-work/new-work-button.png" "Workbench with New Work button"
create_placeholder "first-work/work-interface-tabs.png" "Work interface showing all tabs"
create_placeholder "first-work/chat-interaction.png" "Chat conversation example"

echo
echo "✅ Placeholder generation complete!"
echo
echo "Replace these placeholders with real screenshots by:"
echo "1. Following the capture guide in docs/public/screenshots/README.md"
echo "2. Saving real screenshots with the same filenames"
echo "3. Running: ./scripts/optimize-screenshots.sh"
