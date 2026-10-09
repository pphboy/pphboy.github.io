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

Docker Quick Start runs Core and CLI independently. Core supports Core-only Compose. The optional combined example lives in examples/single-host/ and has its own data and credentials. Inputs come from the existing host environment; CLI startup waits for complete readiness and opens a terminal. Native CLI is a folded alternative. The advanced Core-only Demo uses a separate data directory.

Keep both locales aligned with upstream commands and image defaults. Source: fc409adc1a0bcd7cdf48d711fe7e6efca92a4bdb; input SHA256: 808d890c66072207aea4d453459cc7ff7837af2e64464243a22f9e2010295523; state: published. Images are published and anonymous pulls/cold readiness are verified. Website changes and downloads await final user confirmation; pushing website main triggers the existing Piwork deployment workflow. Existing install/0.0.1 and install/0.1.0 files retain their provenance.

Run upstream check-docker-quickstart.mjs with --website-root pointing at this directory after synchronizing. No real credentials or initialization env belongs in static files. Website synchronization does not push images or publish pages.

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
