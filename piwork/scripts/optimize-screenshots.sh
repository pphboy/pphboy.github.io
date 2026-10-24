#!/bin/bash
# Optimize screenshots using pngquant
# Usage: ./optimize-screenshots.sh

set -e

SCREENSHOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs/public/screenshots" && pwd)"

# Check if pngquant is installed
if ! command -v pngquant &> /dev/null; then
    echo "Error: pngquant is not installed."
    echo "Install it with:"
    echo "  Ubuntu/Debian: sudo apt install pngquant"
    echo "  macOS: brew install pngquant"
    exit 1
fi

echo "Optimizing screenshots in $SCREENSHOT_DIR..."
echo

# Count total files
TOTAL=$(find "$SCREENSHOT_DIR" -name "*.png" -type f | wc -l)
CURRENT=0

# Optimize all PNG files
find "$SCREENSHOT_DIR" -name "*.png" -type f | while read file; do
    CURRENT=$((CURRENT + 1))
    SIZE_BEFORE=$(du -h "$file" | cut -f1)

    # Create optimized version
    pngquant --quality=65-80 --ext .png --force "$file" 2>/dev/null

    SIZE_AFTER=$(du -h "$file" | cut -f1)

    echo "[$CURRENT/$TOTAL] $(basename "$file"): $SIZE_BEFORE → $SIZE_AFTER"
done

echo
echo "✅ Optimization complete!"
echo
echo "Verify file sizes:"
find "$SCREENSHOT_DIR" -name "*.png" -type f -exec ls -lh {} \; | awk '{if ($5 > "200K") print "⚠️  " $9 " is " $5 " (target: <200KB)"; else print "✓ " $9 " (" $5 ")"}'
