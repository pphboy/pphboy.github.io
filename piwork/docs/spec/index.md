# Specification

These pages summarize the current Piwork implementation for developers. They adapt the source project's existing specifications; they do not define a competing API or package format.

Installation and Quick Start were synchronized with Piwork `ea2f2a053b707760c1c98242f0f7ba15842efd12` on October 9, 2026. The default path uses published [0.0.1 Preview](https://github.com/pphboy/piwork/releases/tag/v0.0.1) images built from `20fb8334f1dce93bfa79cb6b5c86acf1cc460963`. Fixed references, release metadata and template provenance are in the <a href="/piwork/install/0.0.1/README.txt" download>setup metadata</a>. Documentation updates and image releases are separate; this sync did not build or publish new images.

| Area | Read here | Authoritative source |
| --- | --- | --- |
| Portable Work | [Work Spec](/spec/work) | [Package format](https://github.com/pphboy/piwork/blob/main/docs/work-package-format.md) and [portable-work](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md) |
| Managed capabilities | [Service Spec](/spec/service) | [work-services](https://github.com/pphboy/piwork/blob/main/openspec/specs/work-services/spec.md) and [MCP tools](https://github.com/pphboy/piwork/blob/main/internal/servicemcp/tools.json) |
| Intelligent execution | [Harness Spec](/spec/harness) | [agent-conversation](https://github.com/pphboy/piwork/blob/main/openspec/specs/agent-conversation/spec.md) and [piwork-brain](https://github.com/pphboy/piwork/blob/main/openspec/specs/piwork-brain/spec.md) |

## Status labels

- **Current behavior / format:** implemented behavior and source contracts.
- **Experimental:** existing behavior whose contracts and user experience are still evolving.
- **Future direction:** a product goal that is not an implemented guarantee.

For mismatches, prefer current implementation over older design notes. [Open an issue](https://github.com/pphboy/piwork/issues) with the command, image version, and observed result.

## Current delivery boundary

Core manages one local Linux Docker Engine through its Unix API. Docker delivery targets `linux/amd64` and Engine 28+; Compose 2.24+ is only needed for the Core Demo or advanced Compose setups. The Go CLI has Windows and Linux targets; outstanding native Windows checks are documented in the source [CLI platform guide](https://github.com/pphboy/piwork/blob/main/docs/cli-platforms.md).

A Work requires ready runtime images and model configuration. Core shutdown stops managed runtime containers while retaining durable state. Closing Desktop or the CLI does not stop the Work.

<!-- docker-trial-route -->
[Terminal Quick Start](/guide/quick-start.html) uses independent Core/CLI images; Core also supports Core-only Compose, with combined usage in the single-host example; native builds and administrator operations have separate navigation.
<!-- docker-trial-route -->
