# Specification

These pages summarize the current Piwork implementation for developers. They adapt the source project's existing specifications; they do not define a competing API or package format.

The source was reviewed at commit [`326837881f2a`](https://github.com/pphboy/piwork/tree/326837881f2a3561ae5911dab98a2248d758c2e0) on October 6, 2026. The installation guide uses the existing public `0.1.0` candidate Docker image set; its pinned references and build provenance are recorded separately in the <a href="/piwork/install/0.1.0/README.txt" download>setup metadata</a>. Source changes and image delivery are separate versions.

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

Core manages one local Linux Docker Engine through its Unix API. Docker delivery targets `linux/amd64`, Engine 28+, and Compose 2.24+. The Go CLI has Windows and Linux targets; outstanding native Windows checks are documented in the source [CLI platform guide](https://github.com/pphboy/piwork/blob/main/docs/cli-platforms.md).

A Work requires ready runtime images and model configuration. Core shutdown stops managed runtime containers while retaining durable state. Closing Desktop or the CLI does not stop the Work.
