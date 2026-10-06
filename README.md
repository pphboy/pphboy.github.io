# pphboy.github.io

hexo project 

皮豪的个人博客

## Local development

The Mini theme remains pinned to its original commit. Initialize it before building:

```bash
git submodule update --init themes/mini
pnpm install --frozen-lockfile
pnpm clean
pnpm build
pnpm run server
```

## Publishing

`pnpm run deploy` publishes the generated blog to the existing `gh-pages` branch through
the `git-preserve-piwork` Hexo deployer. It preserves `piwork/`, `CNAME`, and
`.nojekyll`, and uses normal Git pushes with retries for concurrent updates.
Build the blog before deploying. The deployment script refuses missing output.

The independent English and Chinese [Piwork website](piwork/README.md) lives under `piwork/`
and is built with VitePress. Its GitHub Action replaces only `gh-pages/piwork/`.
The root Hexo dependencies, article paths, and theme selection remain unchanged.
