# Design

## Context

The root is a Hexo 7 blog deployed to `gh-pages`. Its Git deployer clears the deployment directory and force-pushes, so later blog deploys would erase a product subtree. The live root responds successfully and must stay byte-identical during product publication. Piwork lives in the sibling checkout and provides authoritative Go commands, Docker templates, and specifications.

## Goals / Non-Goals

**Goals:** Isolate dependencies and content, make maintenance ordinary Markdown editing, and prove deployment boundaries before publication.

**Non-Goals:** Product code changes, new product binary releases, custom UI frameworks, blog migration, or site design work.

## Decisions

- Keep a separate package and pnpm lockfile in `piwork/`; use stable VitePress, its default theme, local search, and `base: '/piwork/'`. Use prose and tables for relationships and clean text for the lifecycle so no diagram runtime is needed.
- Use VitePress locales for English at the default path and Simplified Chinese under `/zh/`. Keep matching page paths, localized navigation, and separate local search indexes; installation assets are shared. Maintain both Markdown versions together without a localization service.
- Adapt existing Piwork docs and implementation. Provide English copies of the small Compose/env setup files with digest references from the existing local release manifest, after anonymous registry checks. No new images, accounts, or service implementation are published. Link source specifications and mark experimental Harness behavior and missing Kanban materials.
- Use one scoped Git publisher for product and blog. Product publication synchronizes only `piwork/`; blog publication synchronizes the root excluding `piwork/`, `.git`, and hosting controls. Validate staged paths, use normal pushes, and retry by fetching the newest remote branch. A custom Hexo deployer keeps `pnpm run deploy` and direct `hexo deploy` working through the safe publisher.
- GitHub Actions builds only the product project. A second checkout supplies the authenticated existing `gh-pages` branch; publishing uses that checkout and does not replace the Pages deployment source. Local publication clones the same branch through existing Git credentials.

## Risks / Trade-offs

- Public GitHub Releases are empty → use verified existing image digests and site-hosted setup files, with a documented source-build alternative.
- Docker templates are copied → record their provenance and verify configuration equivalence; update them with the source project.
- External pushes can race Actions → normal pushes refuse stale updates; reapply only the owned scope against the latest remote state.
- Harness evolution is still experimental → document explicit Apply and verification boundaries rather than claiming automatic learning or arbitrary self-modification.

## Migration Plan

Build and preview both sites locally. Test publication against isolated bare Git repositories, including branch races. Commit only this task's source changes to main, run the independent Action, and compare Pages tree objects outside `piwork/` to the previous commit. Check live root and product URLs. Rollback removes or restores only the product subtree through a normal scoped commit.
