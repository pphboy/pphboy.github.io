---
layout: home
hero:
  name: Piwork
  text: A shareable, runnable AI workspace
  tagline: Powered by an evolvable Harness.
  image:
    src: /logo.png
    alt: Piwork
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: GitHub
      link: https://github.com/pphboy/piwork
    - theme: alt
      text: Discussions
      link: https://github.com/pphboy/piwork/discussions
---

## What is Piwork?

Piwork packages a runnable AI workspace into a portable unit called a **Work**. Keep the applications, files, conversation history, and execution environment together, then export them and continue on another Piwork installation.

| Concept | Role |
| --- | --- |
| [Work](/concepts/work) | **The workspace.** Holds the environment and its durable state. |
| [Service](/concepts/service) | **The capability.** Runs an application, API, or other container service. |
| [Harness](/concepts/harness) | **The intelligence.** Uses models, tools, and workspace-specific instructions to understand and operate the Work. |

The Harness can help build and change the workspace it runs in. Its instructions, Skills, packages, and verified experience can evolve with that Work.

## How it works

**Create → Run → Evolve → Export → Share → Import → Continue**

Export a stopped Work as a `.work` file. Import it into a compatible installation and start it explicitly. The target supplies its own model credentials.

## Demo: Kanban Work

A board, its data, an application Service, and a Harness that helps build and operate it form one workspace. [Read the Kanban walkthrough](/demo/kanban). A downloadable demo and recording are still being prepared.

## Get started

If you can run Docker, you can try Piwork. You need a Linux x86-64 Core host, Docker Engine 28+, Compose 2.24+, and a model provider account. Linux and Windows Docker Desktop clients are supported.

[Download and configure the Docker setup files](/guide/installation), then start Core:

```bash
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml up -d --wait --wait-timeout 600 core
```

[Open Desktop and run your first Work](/guide/quick-start). Questions and feedback belong in [GitHub Discussions](https://github.com/pphboy/piwork/discussions).
