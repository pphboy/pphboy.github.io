# Verification

Verified on October 6, 2026.

## Result

- English: https://pphboy.github.io/piwork/
- Simplified Chinese: https://pphboy.github.io/piwork/zh/
- Source commit: `1f558bf02797ff4056f15738f5f2a3d65a6524e8`.
- Pages commit: `58ab012fa4c42dfe36dee18ec2b1aad5d7d07ac9`.
- [Product workflow](https://github.com/pphboy/pphboy.github.io/actions/runs/37485200825): build and deployment succeeded, including the explicit Pages build request.
- [Pages build](https://github.com/pphboy/pphboy.github.io/actions/runs/37485317566): succeeded for the published commit.

## Checks

- Frozen pnpm installation and VitePress 1.6.4 production build succeeded locally and in GitHub Actions with Node.js 24. Local build completed in 2.59 seconds with no warnings.
- Fifteen content pages in each language; matching paths and identical Bash/PowerShell instructions. No additional languages or custom theme/CSS.
- Reviewed all 30 content pages in Chromium locally and directly on the live site. Follow-up live checks covered language switching, localized search, code blocks, light/dark mode, and 390-pixel mobile layout/navigation. No missing internal paths or browser errors remained.
- Audited all 31 published HTML files, including 404, against the actual Pages tree: 959 links, anchors, and resource references had valid targets under `/piwork/`.
- Five isolated Git deployment tests passed locally and in Actions, including competing branch updates. Also exercised the registered Hexo deployer against an isolated repository with the actual generated blog.
- Root `pnpm clean`, `pnpm build`, and preview succeeded: 262 files generated. The Mini theme still points to original commit `ae3a3b53fe70c3d02ad5d7f001c7f492ec467444`.
- Compared Pages trees before and after publication: all 123 changed files were within `piwork/`; all 262 existing root files retained identical Git blob IDs and modes. Live blog homepage, archive, and an existing post retained their original SHA-256 hashes.
- All eight live installation downloads matched local source bytes. SHA256SUMS passed, Compose/env settings matched upstream, and all five distinct pinned Docker image manifests were anonymously accessible.
- Root dependencies, lockfile, articles, published URLs, and theme gitlink are unchanged. Existing unrelated untracked workspace files were excluded from commits. This task did not modify the separate Piwork implementation repository.

## Remaining limits

- Installation instructions were verified against source commands, actual Compose templates, and published image manifests. A new Docker installation and model task were not executed: this machine has Docker Engine 26.1.5, below the documented Engine 28+ requirement.
- Public GitHub Releases were empty at publication. The website provides existing digest-pinned `0.1.0` candidate setup files. The product repository subsequently prepared `0.0.1 Preview` documentation; switch to its release assets once those downloads are publicly verified.
- Kanban's public `.work` archive, recording, and screenshots are unavailable. Both demo pages mark this explicitly and provide a build/import/export walkthrough and a place for real assets.
- WSL2 Core and the native Windows CLI are not presented as fully verified platforms. Harness/brain experimental behavior and future direction remain labeled separately from current contracts.
