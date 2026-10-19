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
      text: Watch Demo
      link: /demo/product-demo.html
    - theme: alt
      text: GitHub
      link: https://github.com/pphboy/piwork
    - theme: alt
      text: Discussions
      link: https://github.com/pphboy/piwork/discussions
---

## Piwork in 70 seconds

AI creates a real content studio, evolves it while preserving existing ideas, and the entire Work moves to another Piwork environment. [View the demo and recording details](/demo/product-demo.html).

<ProductDemo />

## What is Piwork?

Piwork packages a runnable AI workspace into a portable unit called a **Work**. Keep the applications, files, conversation history, and execution environment together, then export them and continue on another Piwork installation.

| Concept | Role |
| --- | --- |
| [Work](/concepts/work) | **The workspace.** Holds the environment and its durable state. |
| [Service](/concepts/service) | **The capability.** Runs an application, API, or other container service. |
| [Harness](/concepts/harness) | **The intelligence.** Uses models, tools, and workspace-specific instructions to understand and operate the Work. |

The Harness can help build and change the workspace it runs in. Its instructions, Skills, packages, and verified experience can evolve with that Work.

Default Web development uses a reusable Python + NiceGUI + SQLite environment. Standard templates adopt deployed updates automatically; see [Web Development](/guide/web-development.html) for usage and maintenance.

## How it works

**Create → Run → Evolve → Export → Share → Import → Continue**

Export a stopped Work as a `.work` file. Import it into a compatible installation and start it explicitly. The target supplies its own model credentials.

## Example: Kanban Work

A board, its data, an application Service, and a Harness that helps build and operate it form one workspace. [Read the Kanban walkthrough](/demo/kanban). The Kanban example's downloadable package and recording are still being prepared.

## Get started

[Start Piwork with one command](/guide/quick-start.html): one Docker container, then open the server IP to configure the administrator, model and CoreRuntime and use the full workbench. No CLI, domain or initialization environment is required. Optional [docker-compose.yml](/piwork/install/0.0.7-62f2868cb8e2-d69916b52829-dirty/docker-compose.yml). State: published. Images are published and anonymously verified.
