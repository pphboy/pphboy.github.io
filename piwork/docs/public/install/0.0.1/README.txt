Piwork website setup materials, published image set 0.0.1

Image references, manifest and original Compose/env templates were copied from
piwork-docker-0.0.1.tar.gz at the existing v0.0.1 GitHub Release. The archive
and its internal SHA256SUMS were verified before copying. The image source is
20fb8334f1dce93bfa79cb6b5c86acf1cc460963, sourceModified=false.

The added core.run.env.example is a blank Docker run template from Piwork
ea2f2a053b707760c1c98242f0f7ba15842efd12. It is a website documentation material, not a replacement
published release archive or a newly built image set. Configuration contains
no real administrator passwords, model keys, or client tokens.

The default terminal path uses Linux amd64 Core and Docker Engine 28+.
Compose 2.24+ is needed only for the optional Core Compose Demo. CLI state
persists in its own named volume; the first conversation needs no exchange
volume, Desktop process, or published client port.

This website update was prepared locally on 2026-10-09. Existing fixed image
references were used for real terminal and recovery validation on 2026-10-08.
The old install/0.1.0/ candidate materials remain available for previous links.

Release: https://github.com/pphboy/piwork/releases/tag/v0.0.1
Quick Start: https://pphboy.github.io/piwork/guide/quick-start.html
Source: https://github.com/pphboy/piwork
License: Apache-2.0, https://github.com/pphboy/piwork/blob/main/LICENSE
