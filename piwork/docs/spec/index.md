# Specification

These pages summarize the current Piwork implementation for developers. They adapt the source project's existing specifications; they do not define a competing API or package format.

Current delivery is [Piwork 0.0.2 Preview](https://github.com/pphboy/piwork/releases/tag/v0.0.2), including the Web base and direct model management. All five runtime images were published, anonymously pulled and executed; see the [release manifest](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/release-manifest.json). Clean build source: `fb4f577da3b4d0008b97a59103b84efefbf9b508`; input SHA256: `512ec778b2671454ce1e66ceb11893f4f3ff908286ec2ae4947fd24fda100f37`. The release tag additionally includes publication materials and does not rewrite image build identity. The Web base retains its independent [published receipt](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/web-base-release.json). The native Windows client remains an experimental executable with formal native acceptance pending; see preview-verification.md in the release. Historical download directories keep their provenance.

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
