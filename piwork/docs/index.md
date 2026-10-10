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

Default Web development uses a reusable FastAPI + React + TypeScript + Vite environment. Standard templates adopt deployed updates automatically; see [Web Development](/guide/web-development.html) for usage and maintenance.

## How it works

**Create → Run → Evolve → Export → Share → Import → Continue**

Export a stopped Work as a `.work` file. Import it into a compatible installation and start it explicitly. The target supplies its own model credentials.

## Demo: Kanban Work

A board, its data, an application Service, and a Harness that helps build and operate it form one workspace. [Read the Kanban walkthrough](/demo/kanban). A downloadable demo and recording are still being prepared.

## Get started

[Try Core and CLI in the terminal](/guide/quick-start.html): use the existing initialization environment, one Docker command per entry, or deploy Core alone using [docker-compose.yml](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/docker-compose.yml). Log in, create a Work and receive the first reply. Piwork 0.0.2 Preview images are published and anonymously verified.

Native CLI remains a folded Quick Start alternative. See [Installation](/guide/installation.html#core-compose-demo) for the advanced Core-only Demo.
