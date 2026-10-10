# Getting Started

**Core** manages Works, Agents, Services and data on a Linux Docker host. **CLI** provides terminal user commands. The first trial uses one Linux computer and needs a supported model provider and API key.

1. [Quick Start](/guide/quick-start): Docker run by default, terminal login, Work creation and the first reply; native CLI is a folded alternative.
2. [Installation and Deployment](/guide/installation): prerequisites, optional Core Compose Demo, troubleshooting and recovery.
3. [Your First Work](/guide/first-work): a terminal file task, followed by stop, export, import and continuation.

Already have a configured Core? Use the CLI entry in Quick Start directly.

Building an application? [Web Development](/guide/web-development.html) covers the default base, automatic adoption, sqlite3, persistence and upgrades.

For model setup, see [AI Models](/guide/ai-models.html): one-form connections, message Test, Runtime defaults and Work/Thinking upgrade boundaries.

## Current scope

Published 0.0.2 Preview images target linux/amd64. Core uses Linux rootful Docker Engine 28+ and its local Unix socket. CLI runs on Linux or Windows Docker Desktop in Linux-container mode; Windows clients connect to Linux Core. Compose 2.24+ is only needed for the optional Core Demo or advanced setups.

WSL2 users need an available Linux Engine Unix socket; tested environments and boundaries are recorded in the [upstream terminal acceptance](https://github.com/pphboy/piwork/blob/main/docs/docker-quickstart-acceptance.md). Desktop remains an independent entry; the terminal trial does not depend on it.

The [Spec overview](/spec/) records source and image provenance. For an application example, see [Kanban Work](/demo/kanban).

<!-- docker-trial-route -->
[Terminal Quick Start](/guide/quick-start.html) uses independent Core/CLI images; Core also supports Core-only Compose, with combined usage in the single-host example; native builds and administrator operations have separate navigation.
<!-- docker-trial-route -->
