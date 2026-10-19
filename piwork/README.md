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

Docker Quick Start starts one unified Linux application with browser onboarding and the full workbench. Default startup requires no business environment variables; only an optional paired ADMIN test bootstrap remains. CLI is optional. Service ports and script Cookie limitations are documented alongside the main entry. The single-host example has separate data. Published provenance is preserved.

Keep both locales aligned with upstream commands and image defaults. Source: 62f2868cb8e24da3d08db7a7d6c00aabd6226cd4; input SHA256: d69916b5282972c9a336745e4efc30b749fad531a42ed5aac3c8b4dcad4c38ff; state: published. Image identities and anonymous readability have been verified; the versioned downloads match this release. Existing install/0.0.1 and install/0.1.0 files retain their provenance.

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
