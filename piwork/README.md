# Piwork website

English and Simplified Chinese product documentation at https://pphboy.github.io/piwork/.
English is the default; Chinese is at https://pphboy.github.io/piwork/zh/.
The [Piwork implementation](https://github.com/pphboy/piwork) is a separate repository.

## Development

Use Node.js 22+ and pnpm 10.29.2. From this directory:

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

Development defaults to http://localhost:5173/piwork/; preview defaults to
http://localhost:4173/piwork/. Edit Markdown in `docs/` and navigation in
`docs/.vitepress/config.ts`. The default theme provides light/dark mode and local search;
`docs/.vitepress/theme/style.css` adapts its colors to the logo's blue/cyan palette
with charcoal surfaces in dark mode. Keep shared theme changes consistent across locales.
Discussions stays next to GitHub in both the navigation and homepage actions.
Documentation links retain `.html` for direct GitHub Pages access.

Each English Markdown page has a corresponding page under `docs/zh/`. Keep both
versions in sync. The language menu preserves the current page, and each locale
has its own navigation and search index. Shared install files stay in `docs/public/`.
The supplied transparent logo is `docs/public/logo.png`, shared by both homepages,
the navigation, favicon, touch icon, and Open Graph metadata.

## Content maintenance

Installation and Quick Start were synchronized with Piwork commit
`ea2f2a053b707760c1c98242f0f7ba15842efd12` on 2026-10-09. The default path
starts Core and an interactive CLI with Docker run, waits for delivery readiness,
and completes login, automatic Work startup and a terminal model reply. Native
CLI is a folded alternative; Compose is an optional Core-only Demo.

Keep English and Chinese code blocks aligned with the upstream README. Preserve
command names, secret-input rules, Core same-path binds, persistent CLI state and
60-second Core shutdown. Do not add a CLI Compose or GUI prerequisite to the trial.

`docs/public/install/0.0.1/` uses fixed image references, metadata and original
setup files from the verified public 0.0.1 release, plus the upstream blank run
configuration template. README.txt records the separate documentation and image
provenance. Regenerate SHA256SUMS when changing these static files; never include
real env, API keys, passwords or tokens. Existing install/0.1.0/ candidate files
remain for old URLs. Website synchronization does not build or publish images.

The concept and Spec pages distinguish current, experimental and future behavior.
Kanban retains its slot for real media and a verified .work download; no demo
artifacts were invented.

## Build and deployment

Source: `main/piwork/`. Output: `docs/.vitepress/dist/`. Destination:
`gh-pages/piwork/`. The VitePress base is `/piwork/`.

The independent [workflow](../.github/workflows/piwork.yml) builds product changes
on main, validates PRs without publishing, and supports manual runs. It checks out
the existing Pages branch and replaces only `piwork/`. It explicitly requests a
Pages build because a GITHUB_TOKEN push does not trigger that build automatically.
Keep the existing GitHub Pages source set to `gh-pages` and `/`.

To publish a reviewed local build using your existing Git credentials:

```bash
pnpm build
pnpm run deploy
```

The publisher clones the existing branch into a temporary directory, stages and
checks its scope, and uses a normal push. Competing updates are fetched and the
owned files reapplied, up to three attempts. It never force-pushes.
The blog's existing `pnpm run deploy` / `hexo deploy` entry points use the same publisher
with blog scope, preserving `piwork/`, `CNAME`, and `.nojekyll`.

Run the isolated Git deployment checks:

```bash
pnpm test:deploy
```

Generated output, VitePress cache, and dependencies are ignored. Only the generated
distribution is committed on gh-pages; never commit it to main.
