# Core Concepts

A Work is the unit you create, run, and share. Services give it concrete capabilities. The Harness understands the workspace and uses its tools and Services to perform tasks.

| Concept | A concrete example | What to read |
| --- | --- | --- |
| Work | A Kanban workspace with source files, board data, a running application, and conversation history. | [Work](/concepts/work) |
| Service | The container running the board's web application and API. | [Service](/concepts/service) |
| Harness | The layer that uses models and tools to build the board, inspect its state, and make changes. | [Harness](/concepts/harness) |

## How they fit together

The **Work contains** Services, data, tools, configuration, and its Harness. The **Harness understands and operates** those resources. **Core manages** the Work's lifecycle and Docker resources. **Desktop / CLI** gives you access to the Work.

The portable unit includes the runnable environment and its durable state. A conversation can explain a task; a Work also retains the files, Service definitions, fixed images, and context needed to continue it.

The [technical specifications](/spec/) describe the current implementation and its boundaries.
