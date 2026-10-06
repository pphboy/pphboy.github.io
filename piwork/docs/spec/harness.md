# Harness Specification

## Current execution layer

The Harness runs in `apps/agentd` inside each Work's Agent container. It uses the Pi Agent SDK for model calls, tool execution, resource loading, Sessions, Runs, and SDK history. Core remains the lifecycle and authorization authority.

`AGENTS.md`, selected Skills, and Pi Packages form Work-owned context. The running Harness loads captured active configuration. Edits prepare desired state; explicit Apply changes what is loaded. Source edits do not hot-reload the current Run.

Only one Run is active per Work. Its model execution happens in the Agent; the browser and CLI do not proxy model calls. Model credentials supplied by Core remain private and are excluded from `.work` packages.

## Current context and history

| Resource | Role |
| --- | --- |
| `AGENTS.md` | Work-specific instructions. |
| Skills | Selected instruction resources. |
| Pi Packages | Prepared extensions, tools, prompts, themes, and other SDK resources. |
| Sessions and Runs | Conversations, execution records, and original SDK history. |
| Active / desired context | Loaded configuration versus pending changes. |

Core validates package compatibility before activation. The current portable package preserves prepared artifacts and dependencies; import does not rerun npm, Git, or package code to reconstruct them.

## Experimental: `piwork-brain`

The default brain is an ordinary Pi extension package. Core seeds it once; administrator changes are not reset on later starts. New default Works select it unless configuration explicitly omits packages.

Its implemented flow has four important boundaries:

1. **Observe and act:** the Harness reads a Service capability contract, observes state, records a stable Action identity, and sends the declared input and expected state version.
2. **Verify:** successful prose or a finished Run is insufficient. Synchronous changes require actual observation; asynchronous jobs retain the original Action/Job references for later verification.
3. **Retain experience:** candidate rules become an effective experience version only after successful verification of the associated task. An active Run keeps its adopted version; the next execution can use the new one.
4. **Prepare and Apply:** editable brain source can be captured and prepared as a candidate. The user explicitly Applies it, followed by the required behavior checks. Preparation or successful loading alone does not prove that the change works.

Service events can request bounded automatic execution when the Work is ready and has no active Run. Requests, cancellation, retry, and recovery have stable identities and deadlines. Restarting does not replay an unknown mutation.

Export preserves this durable history. Imported events and requests remain historical and cannot schedule or replay effects from the source installation.

## Future direction

A Harness increasingly adapted to its Work and user is the product direction. The current system does not guarantee unrestricted autonomous learning, invisible self-upgrades, or that every application exposes structured capabilities.

The authoritative sources are the [brain workflow](https://github.com/pphboy/piwork/blob/main/docs/piwork-brain.md), [brain spec](https://github.com/pphboy/piwork/blob/main/openspec/specs/piwork-brain/spec.md), [agent-conversation spec](https://github.com/pphboy/piwork/blob/main/openspec/specs/agent-conversation/spec.md), and [package activation spec](https://github.com/pphboy/piwork/blob/main/openspec/specs/pi-package-activation/spec.md).
