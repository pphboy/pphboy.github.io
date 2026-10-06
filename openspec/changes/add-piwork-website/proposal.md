# Proposal

## Why

Piwork needs a public entry point with English and Simplified Chinese documentation that explains Work, Service, and Harness and lets Docker users try the current implementation. The existing blog must keep working while the product site ships at `/piwork/`.

## What Changes

- Add an independent VitePress project under `piwork/` using the default theme.
- Write a small homepage, installation and first-Work guides, concept pages, a Kanban demo page, and source-grounded technical specifications.
- Provide matching English and Simplified Chinese pages, with English at the default path, Chinese under `/zh/`, and a language switch that keeps the current page.
- Provide English Docker setup files based on the actual Piwork deployment templates and existing digest-pinned public images; distinguish missing demo assets and experimental features.
- Add GitHub Actions to build and deploy only `gh-pages/piwork/`.
- Preserve the Hexo deployment entry point while protecting Piwork from subsequent blog deployments and refusing force pushes.

## Capabilities

### New Capabilities

- `piwork-website`: English and Simplified Chinese product documentation, correct commands, navigation, and a site built for `/piwork/`.
- `scoped-pages-deployment`: Independent product deployment with root-file preservation and blog deployment that retains the product subtree.

### Modified Capabilities

None.

## Impact

Adds VitePress and a separate pnpm lockfile; adds product Markdown, Docker setup assets, deployment code, and one GitHub Actions workflow. Changes only Hexo deployment integration and supporting repository documentation, leaving blog articles, URLs, theme reference, and the root dependency lockfile intact. Piwork implementation remains read-only.
