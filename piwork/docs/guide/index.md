# Getting Started

One Linux application provides **Core**, the web workbench, **Admin** and first-time setup. Open the server IP from a Linux or Windows browser; the independent CLI is optional.

1. [Start with one command](/guide/quick-start.html): run one Docker container, create an administrator with password confirmation through the private setup link, then sign in and configure a model in **Admin → Quick setup**.
2. [Installation and Deployment](/guide/installation.html): platforms, ports, persistence, optional Compose, troubleshooting and recovery.
3. [Your First Work](/guide/first-work.html): wait for preparation, select **Open workbench**, then create a Work and use Chat, Files and Services.

For an existing installation, open the workbench directly. Administrators return through **Overview → Quick setup**. **Save and continue** saves the model and binds CoreRuntime in sequence. Test is explicit and optional; the server release fixes the Agent image without an image field.

Building an application? [Web Development](/guide/web-development.html) covers the default environment, persistence and upgrades. See [AI Models](/guide/ai-models.html) for protocols, Keys, Test and Thinking.

## Current scope

Images target Linux amd64. Core uses rootful Docker Engine 28+ and its local Unix socket. Remote browsers need no domain, DNS, WSL or client CLI. The main port is 7171, Service entries use 17891–17954, and 7172 is internal Agent RPC. Compose 2.24+ is needed only for optional Compose deployment.

The [Spec overview](/spec/) records source and image provenance. For an application example, see [Kanban Work](/demo/kanban).

<!-- docker-trial-route -->
[Quick Start](/guide/quick-start.html) uses the unified application and browser onboarding. CLI is optional; native builds and administrator operations have separate navigation.
<!-- docker-trial-route -->
