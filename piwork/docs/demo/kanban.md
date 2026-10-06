# Kanban Work

The first demo is a Kanban workspace: a board application, its data, an application Service, and a Harness that helps build and operate it. It illustrates how the whole runnable workspace can be shared and continued.

::: info Demo status
A public Kanban `.work` archive, recording, and screenshots are not available yet. This page describes the demo structure and how to build or import a board with the current product. It does not claim that a prebuilt demo has been released.
:::

## What is inside?

| Part | Role in the demo |
| --- | --- |
| Workspace | Application source and board data in managed storage. |
| Service | A container running the board's web UI and API. |
| Harness | Models, tools, instructions, and history used to build and operate the board. |
| Configuration | The image, command, declared HTTP port, workspace mount, and readiness check. |

One application Service is sufficient for a first board. A separate database Service is optional; the actual implementation determines which Services are present. Inspect the Service list rather than assuming a fixed stack.

## Build a board in Piwork

[Install Piwork](/guide/installation), open Desktop, and create and start a Work named `Kanban`. In Chat, you can ask:

> Build a small Kanban board in the shared workspace with Todo, Doing, and Done columns. Persist its data in the managed workspace. Declare the application as a Service using the available Work Service tools, with an HTTP port and readiness check. Inspect the running Service and tell me what you verified.

This is an example task for the Harness. Its result depends on the model and environment; it is not an installation command or a validated downloadable demo.

Open the Service in Desktop. Add a card, move it, and reload the application. Check that the data persists. Inspect application files through **Files**.

## What the Harness does

The Harness can inspect the workspace, write the application, declare the Service, read logs, and verify its running state. Later, ask it to change the board and check the result.

A board that implements the experimental brain's capability contract can also expose structured board queries and actions. That integration needs application code; ordinary HTTP access does not provide it automatically. See [Harness Spec](/spec/harness).

## Demonstrate portability

1. Create a card with a recognizable title and confirm it persists.
2. Stop the Work and export it.
3. Save and inspect the `.work` file.
4. Import it into a compatible second Core with its own model configuration.
5. Start the imported Work and open its board Service.
6. Confirm the card and files are present, then continue changing the board.

The exact commands are in [Your First Work](/guide/first-work). They also work for an archive supplied by a trusted demo publisher. Use the ID returned by import; it identifies a new Work.

## Demo materials

The recording, screenshots, and archive link will be added here when they are published. For now, [GitHub Discussions](https://github.com/pphboy/piwork/discussions) is the place to share a reproducible board or report a problem.

<!-- Add verified media under docs/public/demo/, link the real archive and checksum,
     and record the tested image version, model, Services, and import result here. -->
