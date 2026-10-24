# Screenshots Guide

## Directory Structure

```
docs/public/screenshots/
├── admin/           # Admin interface screenshots
├── workbench/       # Workbench UI screenshots
├── setup/           # Setup and configuration screenshots
├── first-work/      # First Work tutorial screenshots
└── demo/            # Product demo screenshots
```

## Naming Convention

Use descriptive, kebab-case names:
- `admin-quick-setup.png` - Admin Quick Setup page
- `workbench-create-work.png` - Create Work dialog
- `work-chat-interface.png` - Chat interface in a Work
- `work-files-browser.png` - Files browser
- `service-preview.png` - Service preview

## Image Specifications

- **Format**: PNG for UI screenshots (lossless), WebP for photos
- **Max Width**: 1200px (responsive scaling in browser)
- **Optimization**: Use `pngquant` or similar before committing
- **File Size**: Target < 200KB per image after optimization

## Markdown Usage

### Standard Screenshot

```markdown
![Alt text description](/piwork/screenshots/category/filename.png)
```

### With Caption

```markdown
<figure>
  <img src="/piwork/screenshots/category/filename.png" alt="Alt text" />
  <figcaption>Caption text explaining the screenshot</figcaption>
</figure>
```

### Responsive Screenshot

```markdown
<picture>
  <source media="(max-width: 768px)" srcset="/piwork/screenshots/category/filename-mobile.png">
  <img src="/piwork/screenshots/category/filename.png" alt="Alt text" />
</picture>
```

## Alt Text Guidelines

Good alt text should:
- Describe the content and purpose
- Be concise (< 125 characters ideal)
- Not start with "Image of" or "Screenshot of"
- Focus on what the user can learn from the image

Examples:
- ✅ "Admin Quick Setup page with model configuration form"
- ✅ "Creating a new Work with name input field"
- ❌ "Screenshot of the interface"
- ❌ "Image showing the screen"

## Screenshot Checklist

Before capturing:
- [ ] Clean, default state (no personal data)
- [ ] Consistent browser window size (1280x800 or 1920x1080)
- [ ] No scrollbars if possible
- [ ] Proper zoom level (100%)
- [ ] Dark mode or light mode? (choose one consistently)

After capturing:
- [ ] Optimize file size
- [ ] Add to correct directory
- [ ] Use proper naming convention
- [ ] Write descriptive alt text
- [ ] Test in both desktop and mobile views

## Priority Screenshots Needed

### High Priority
1. Admin Quick Setup page
2. Create Work dialog
3. Work Chat interface
4. Files browser
5. Service preview/open

### Medium Priority
6. Login page
7. Workbench list view
8. Work Settings
9. Model configuration
10. Docker run success message

### Low Priority
11. Various Service examples
12. CLI usage examples
13. Error states
