# Work

A **Work packages a runnable workspace**. It is the unit you name, start, stop, export, and import in Piwork.

For example, a Kanban Work can hold the board application, its saved data, tools for operating it, instructions for its Harness, and the history of changes made together. Keeping these resources in one Work gives you an environment you can continue using.

## What belongs to a Work?

- Workspace files, source code, and application data stored in managed volumes.
- Service definitions and fixed container images.
- Its Harness configuration, `AGENTS.md`, Skills, and Pi Packages.
- Conversation history and durable control history.
- Active, desired, and retained configuration needed to restore that workspace.

The Agent has a private data volume and a shared workspace at `/var/data/workspace`. Services can share that workspace when their configuration allows it. Store data you want to move in managed storage; temporary container files are outside the portable boundary.

## Running and changing

Starting a Work runs its Harness and restores enabled Services. Stopping it preserves persistent files, history, and definitions.

Some configuration edits create a **desired** configuration. They take effect when you explicitly **Apply** them. Keep the saved configuration and the running Harness's loaded configuration distinct.

## Moving a Work

**Stop → Export → Share → Import → Start → Continue**

Export creates a `.work` archive from a stopped Work. Import creates a new independent Work with new platform identities and leaves it stopped. Start it when you are ready to continue.

The archive carries fixed image content and durable workspace state. It does not contain live process memory or services running outside Piwork. The recipient must configure compatible models and credentials separately.

Files and history are copied without filtering user content. Check what you saved before sharing a Work: a credential in a source file or conversation travels with it.

Follow [Your First Work](/guide/first-work) for the commands, or read the [Work package specification](/spec/work).
