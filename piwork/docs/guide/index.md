# Getting Started

Piwork has two entry points: **Core** manages Works on a Linux Docker host; **CLI / Desktop** connects to it and opens the user interface in your browser. Core also manages the Agent, Service, and helper containers.

For a first local setup, run Core and Desktop on the same Linux computer. You will need a supported model provider and API key to run AI tasks.

1. [Install and configure Core](/guide/installation).
2. [Start Desktop, sign in, and create a Work](/guide/quick-start).
3. [Run, export, and import your first Work](/guide/first-work).

Already have access to a configured Core? Start at [Quick Start](/guide/quick-start).

## What you will try

Create a Work, start its Harness, ask it to create a file, and read that file through Desktop. Stop and export the Work, then import a new independent copy and continue from its files and history.

For an application example, follow the [Kanban Work walkthrough](/demo/kanban).

## Current scope

Core runs on one Linux host. The Docker image set is currently `linux/amd64`. The CLI container can run on Linux or on Windows Docker Desktop using Linux containers; the browser runs on the same computer as the CLI.

WSL2 users need a Linux environment with a reachable Docker Engine Unix socket for Core. Core under WSL2 is not a separately verified platform in the current delivery records. A Linux host is the documented starting point.

The first website uses the existing `0.1.0` Docker image set. The [Spec overview](/spec/) identifies the source revision and experimental behavior.
