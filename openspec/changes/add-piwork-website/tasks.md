# Tasks

## 1. Product site

- [x] 1.1 Create the independent VitePress package, lockfile, `/piwork/` config, and navigation; verify frozen installation and site build.
- [x] 1.2 Write the English homepage, guides, concepts, Kanban page, and specifications; verify every documented command and format against Piwork source and inspect rendered pages.
- [x] 1.3 Add English Docker setup files based on real templates and public image digests; verify checksums and configuration equivalence and document source provenance.
- [x] 1.4 Add development/build/preview and content-maintenance instructions in `piwork/README.md`; verify the scripts run as documented.
- [x] 1.5 Add matching Simplified Chinese pages, localized navigation/search, and page-preserving language switching; verify coverage and shared commands.

## 2. Independent deployment

- [x] 2.1 Implement scoped Git publication and integrate it with the existing Hexo deploy command; verify product and blog preservation, obsolete-file removal, and racing updates with isolated Git tests.
- [x] 2.2 Add the product build and deploy GitHub Action, using locked dependencies and the existing Pages branch; verify PRs cannot publish and deployment changes only `piwork/`.
- [x] 2.3 Document blog and product deployment behavior and the restored Mini theme mapping; verify the original theme commit and root build/preview.

## 3. Integration and publication

- [x] 3.1 Review both languages' built internal links, asset paths, code blocks, local search, desktop/mobile, light/dark rendering, and language switching; fix any observed errors.
- [x] 3.2 Commit and publish the authorized source and product distribution; verify the Action result, live `/piwork/` and deep links, and unchanged root Pages tree.
- [x] 3.3 Record build/deployment results and remaining verification limits; verify the final diff is scoped and this task made no changes to the Piwork implementation checkout.
