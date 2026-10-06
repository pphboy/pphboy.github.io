# Service

A **Service provides a capability inside a Work**. In the current implementation, it is an application container with a persisted definition managed by Core.

A Service might run a web application, database, local API, or another runtime process. A tool that is part of the Harness is not automatically a Service; a Service is the managed application resource.

## What the workspace can do

In a Kanban Work, a board Service serves the UI and its API. Board data can live in the shared workspace. The Harness can inspect the files, change the application, declare its Service, and check whether it is ready.

The application still needs a real implementation. A Service name or a deployment request alone does not make a working application.

## How the Harness operates Services

Piwork supplies Work-scoped Service tools for creation, inspection, updates, starting, stopping, restarting, and logs. Core performs the Docker operations and enforces authorization and quotas.

Each definition specifies its image, command, environment, network ports, workspace access, and readiness check. The Harness should use returned Service and Operation IDs to verify actual state after a change.

Applications can also expose capability contracts for the experimental `piwork-brain` package. That supports structured queries and verified actions; it is an additional application contract, not something every HTTP server provides automatically.

## Access and persistence

Desktop exposes declared HTTP Services through authenticated local application access. Open an application from its Service entry rather than looking for an exposed container IP.

Stopping a Work stops its runtime while retaining Service definitions and workspace data. Starting it restores enabled Services. Stopping one Service disables that Service's running intent until it is started again.

For portability, put persistent application data in the Work's managed storage. Container temporary layers and external databases are not copied into a `.work` archive.

See [Service Spec](/spec/service) for the current definition and network boundaries.
