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
      link: /guide/quick-start
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

[Try Core and CLI in the terminal](/guide/quick-start): download the installer, fill five Core settings, use one Docker run for Core and one for the interactive CLI, then log in, create a Work and receive your first reply. You need a Linux x86-64 Core host, Docker Engine 28+ and an available model; the first trial does not require Compose.

The CLI entry is below; its image variable comes from the verified installer:

```sh
docker run --rm --init -it \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    --entrypoint /bin/sh \
    "$PIWORK_CLI_IMAGE" -i
```

The native CLI is a folded Quick Start alternative. The [Core Compose Demo](/guide/installation#core-compose-demo) is optional and needs Compose 2.24+. Questions and feedback belong in [GitHub Discussions](https://github.com/pphboy/piwork/discussions).
