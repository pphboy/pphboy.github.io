# Specification

These pages summarize the current Piwork implementation for developers. They adapt the source project's existing specifications; they do not define a competing API or package format.

The unified Linux image set uses fixed release ID `0.0.7-62f2868cb8e2-d69916b52829-dirty` for Core, optional CLI, Agent, Files and Snapshots. Core includes the web workbench, Admin and first-time setup. Its build source is `62f2868cb8e24da3d08db7a7d6c00aabd6226cd4`, modified was true at build time, and input SHA256 is `d69916b5282972c9a336745e4efc30b749fad531a42ed5aac3c8b4dcad4c38ff`. Later documentation commits do not rewrite this provenance. See the [release manifest](/piwork/install/0.0.7-62f2868cb8e2-d69916b52829-dirty/release-manifest.json) for fixed references and availability. The independent [Web base receipt](/piwork/install/0.0.7-62f2868cb8e2-d69916b52829-dirty/web-base-release.json) identifies the NiceGUI environment. Historical installer directories retain their original provenance.

| Area | Read here | Authoritative source |
| --- | --- | --- |
| Portable Work | [Work Spec](/spec/work) | [Package format](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md) and [portable-work](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md) |
| Managed capabilities | [Service Spec](/spec/service) | [work-services](https://github.com/pphboy/piwork/blob/main/openspec/specs/work-services/spec.md) and [MCP tools](https://github.com/pphboy/piwork/blob/main/internal/servicemcp/tools.json) |
| Intelligent execution | [Harness Spec](/spec/harness) | [agent-conversation](https://github.com/pphboy/piwork/blob/main/openspec/specs/agent-conversation/spec.md) and [piwork-brain](https://github.com/pphboy/piwork/blob/main/openspec/specs/piwork-brain/spec.md) |

## Status labels

- **Current behavior / format:** implemented behavior and source contracts.
- **Experimental:** existing behavior whose contracts and user experience are still evolving.
- **Future direction:** a product goal that is not an implemented guarantee.

For mismatches, prefer current implementation over older design notes. [Open an issue](https://github.com/pphboy/piwork/issues) with the command, image version, and observed result.

## Current delivery boundary

Core manages one local Linux Docker Engine through its Unix API. The unified application targets `linux/amd64` and Engine 28+; Linux/Windows browsers connect remotely; Compose 2.24+ is only needed for the Core Demo or advanced Compose setups. The Go CLI has Windows and Linux targets; outstanding native Windows checks are documented in the source [CLI platform guide](https://github.com/pphboy/piwork/blob/main/openspec/specs/cli-runtime-portability/spec.md).

A Work requires ready runtime images and model configuration. Core shutdown stops managed runtime containers while retaining durable state. Closing Desktop or the CLI does not stop the Work.

<!-- docker-trial-route -->
[Quick Start](/guide/quick-start.html) uses the unified application and browser onboarding. CLI is optional; native builds and administrator operations have separate navigation.
<!-- docker-trial-route -->
