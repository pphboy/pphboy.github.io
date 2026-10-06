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
`docs/.vitepress/config.ts`. The default theme provides light/dark mode and local search.
Documentation links retain `.html` for direct GitHub Pages access.

Each English Markdown page has a corresponding page under `docs/zh/`. Keep both
versions in sync. The language menu preserves the current page, and each locale
has its own navigation and search index. Shared install files stay in `docs/public/`.
The supplied transparent logo is `docs/public/logo.png`, shared by both homepages,
the navigation, favicon, touch icon, and Open Graph metadata.

## Content maintenance

The source was reviewed at Piwork commit `326837881f2a3561ae5911dab98a2248d758c2e0`.
Read its current implementation and specs before changing commands or formats.
The concept and Spec pages distinguish current, experimental, and future behavior.
Kanban has a walkthrough and a documented slot for a real recording, screenshot,
and `.work` download; no demo artifacts have been invented.

`docs/public/install/0.1.0/` contains English copies of the upstream Compose/env
templates and the existing digest-pinned candidate image set. Its `README.txt`
records provenance. Keep runtime configuration equivalent to upstream, leave
secrets blank, and regenerate `SHA256SUMS` when updating these files. Verify all
image digests can be pulled anonymously. Public GitHub Releases were empty at review.

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
