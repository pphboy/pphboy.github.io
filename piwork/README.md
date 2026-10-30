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
The homepage uses HomeStory.vue for the Creative Studio narrative; its single primary action leads to the desktop download page. Discussions stays next to GitHub in the navigation.
Documentation links retain `.html` for direct GitHub Pages access.

Each English Markdown page has a corresponding page under `docs/zh/`. Keep both
versions in sync. The language menu preserves the current page, and each locale
has its own navigation and search index. Shared install files stay in `docs/public/`.
The supplied transparent logo is `docs/public/logo.png`, shared by both homepages,
the navigation, favicon, touch icon, and Open Graph metadata.

## Content maintenance

The English and Chinese homepages explain **Create. Evolve. Take it anywhere.** through one real Creative Studio Work. HomeStory.vue owns the product layout; WorkShot.vue opens real screenshots at full size; ProductDemo.vue keeps the existing video behind an explicit play action.

Downloads and Quick Start follow one path: download the desktop GUI, start Piwork, complete account/model setup, and open a Work. Windows/Linux select assets for the same workflow. The published launcher version, included Piwork version, asset filenames, sizes and checksum links are maintained together in `docs/.vitepress/theme/download-release.json`; check them against the actual public release when updating. Run `pnpm check:content` to validate metadata and screenshot references. `pnpm build` also runs this check.

The upstream server sync owns only bilingual `guide/installation.md`, `guide/source-installation.md`, fixed `public/install/<releaseId>/` resources, and the explicit server-release block below. It must preserve the homepages, desktop downloads, Quick Start, First Work, guide/spec navigation, theme components and product screenshots. Upstream `check-docker-quickstart.mjs --website-root <this-directory>` verifies server materials separately. Product screenshots are real recorded UI; the owning OpenSpec change records their sources and verification limits.

<!-- server-release:start -->

Core server materials: 0.0.17-efadc31a58b3-c8d512cca1d1; state: published. Source: efadc31a58b37aea05692f159292eefa08be6614; input SHA256: c8d512cca1d1f316619054451f7d7660f61c99cca4c0f43521bdd30fb4dd71e2.
<!-- server-release:end -->

No real credentials or initialization secrets belong in static files. Synchronizing or building does not publish the site or new binaries. Existing versioned install downloads retain their original provenance.

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
