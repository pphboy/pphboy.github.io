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

### 1. Download

**Latest Release: 0.0.10**

[📦 Download from GitHub Releases](https://github.com/pphboy/piwork/releases/latest) — Get Docker images, Compose files, and release notes

Quick install via Docker:
```sh
docker pull docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

Or browse [all download options](/guide/downloads.html) including Compose files and source builds.

### 2. Install and Setup

[Quick Start Guide](/guide/quick-start.html) — Get Piwork running in 5 minutes

One Docker container provides the complete workbench. Open the server IP, configure your administrator account and AI model, then start building.

### 3. Create Your First Work

[Follow the tutorial](/guide/first-work.html) to create your first AI-powered workspace

---

**Already installed?** Open `http://localhost:17891` in your browser · [Documentation](/guide/) · [Community Discussions](https://github.com/pphboy/piwork/discussions)
