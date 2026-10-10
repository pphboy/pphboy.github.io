# Service Specification

## Current behavior

A Service is a persisted, Work-scoped application definition. Core creates its container, manages enabled state, inspects readiness, and reconciles lifecycle after recovery.

The Harness reaches Core through the native `piwork-service-mcp` process and authenticated Work-scoped control channel. Core enforces ownership, runtime identity, policy, and quota. User applications run on the Work's private Docker network.

## Current definition and tools

Service creation declares a name, image, command, optional environment, working directory, workspace access, ports, readiness, and resource settings. The exact required fields, defaults, and nested limits are in the shipped [MCP JSON schemas](https://github.com/pphboy/piwork/blob/main/internal/servicemcp/tools.json). Use those schemas rather than a guessed Docker Compose document.

The current MCP surface contains:

| Tools | Purpose |
| --- | --- |
| `deployment_context` | Inspect available deployment context. |
| `service_create`, `service_update` | Declare or change a Service. |
| `service_list`, `service_get`, `service_logs` | Observe Services. |
| `service_start`, `service_stop`, `service_restart`, `service_retry`, `service_remove` | Manage lifecycle. |
| `operation_get` | Inspect an accepted operation. |

Tools are projected to the model under the `work-services__` namespace, subject to tool policy. Mutation requests require an `idempotencyKey` and return durable acceptance before the operation finishes. Retain the original Service and Operation IDs to inspect results.

## Memory policy

Application Service containers have no Piwork memory limit or Service memory reservation. An omitted `memoryBytes` normalizes to zero; valid historical positive values remain compatibility data and do not restore a cap. Negative, fractional and unsafe integer values remain invalid. Current projections report `memoryLimitMode=unlimited`, and deployment context reports `serviceMemoryPolicy=unlimited` with `defaultServiceMemoryBytes=0`.

Work/host memory accounting excludes historical Service reservations, including during configuration and import. Agent/helper memory policies and atomic CPU/service/volume admission remain in force. Managed recovery replaces older capped Service containers and retains their identity and workspace. Actual memory availability depends on the host and outer deployment.

The [Web development guide](/guide/web-development.html) covers the default base, single HTTP port, offline tools, persistence and automatic version adoption.

## Network and storage

Declared HTTP ports can be opened through Desktop's authenticated application gateway. Containers do not receive arbitrary public host-port exposure. Platform credentials remain separate from application cookies and authorization.

Services can mount the shared workspace at `/var/data/workspace` when authorized. Store portable application data in managed storage. Removing a Service retains shared workspace files; those files are not treated as disposable container data.

Stopping a Work retains Service definitions and enabled intent. Starting the Work restores enabled Services. Stopping an individual Service disables its intent until explicitly started again.

## Experimental and future direction

The experimental brain's Service capability contract adds structured observation, state versions, action identity, and verification. Applications must implement that contract to participate. An arbitrary web application is not automatically a verified-action endpoint.

Broader categories of capabilities may fit the product's Service concept over time. The current runtime contract is a managed application container.

See the authoritative [work-services spec](https://github.com/pphboy/piwork/blob/main/openspec/specs/work-services/spec.md), [Service MCP guide](https://github.com/pphboy/piwork/blob/main/docs/service-mcp.md), and [application access guide](https://github.com/pphboy/piwork/blob/main/docs/service-access.md).
