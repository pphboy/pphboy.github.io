# Screenshot Placeholder Images

This directory contains placeholder images for the Piwork website documentation.

## Required Screenshots

### Admin Section
- `admin-quick-setup.png` - Admin Quick Setup page showing model configuration
- `admin-preparation.png` - Runtime preparation progress

### Workbench Section
- `workbench-main.png` - Main workbench view with New Work button
- `workbench-list.png` - List of Works

### First Work Section
- `create-work-dialog.png` - Create Work dialog with name input
- `chat-interface.png` - Chat interface in a Work
- `files-browser.png` - Files browser showing workspace
- `service-preview.png` - Service list with preview options

### Setup Section
- `docker-run-success.png` - Successful Docker run output
- `browser-initial.png` - First browser visit showing setup

## Placeholder Creation

Until real screenshots are available, you can create placeholders using:

1. **ImageMagick**:
```bash
convert -size 1200x800 xc:#f0f0f0 \
  -pointsize 48 -fill black \
  -gravity center -annotate +0+0 "Screenshot Placeholder\nFilename: workbench-main.png" \
  workbench-main.png
```

2. **Online tools**:
- https://placeholder.com/
- https://via.placeholder.com/1200x800

3. **Browser screenshots**:
- Use browser dev tools (F12) → Device toolbar
- Set viewport to 1280x800
- Take screenshot with built-in tool

## Screenshot Capture Guide

When capturing real screenshots:

1. **Prepare the environment**:
   - Clean Docker installation
   - Default configuration
   - No personal/sensitive data
   - Consistent window size (1280x800)

2. **Capture tool**:
   - macOS: Cmd+Shift+4, then Space
   - Linux: GNOME Screenshot, Flameshot
   - Windows: Snipping Tool, Win+Shift+S

3. **Optimize**:
   ```bash
   # Install pngquant
   sudo apt install pngquant  # Ubuntu/Debian
   brew install pngquant      # macOS
   
   # Optimize screenshot
   pngquant --quality=65-80 screenshot.png
   ```

4. **Verify**:
   - File size < 200KB
   - Clear and readable
   - No UI glitches or loading states
