# Harness

The **Harness is the intelligent layer of a Work**. It connects model execution, tools, workspace context, conversations, and task verification to the environment that the Work actually runs.

Each Work has its own Harness. Chat is one interface to it. The Harness also uses files, Work-scoped Service tools, Skills, and Pi Packages to understand and operate the workspace.

## What it does today

Piwork runs a TypeScript Harness built on the **Pi Agent SDK** inside the Work's Agent container. It manages Sessions and Runs, loads instructions and tools, calls configured models, and keeps private conversation history.

It can use those tools to:

- Inspect workspace files and available Services.
- Execute tasks and work with application data.
- Build or change application source in the workspace.
- Declare, operate, and inspect Services through Core.
- Use Work-specific instructions, Skills, and packages.

For a Kanban Work, a useful task is: inspect the board's storage, add a feature, restart the relevant Service, then verify that the application still works. A model saying “done” is not the same as a verified change.

For new Web applications, the current default Brain selects the fixed FastAPI + React + TypeScript + Vite [Web base](/guide/web-development.html). After changing an application, it completes the required check/build and Service deployment, then verifies the actual loaded version and business result. Standard templates automatically update an open page; saving files alone does not complete delivery. Authorized sqlite3 bash runs in Agent, where the command is installed.

Administrators add independent connections in Serve UI **AI models**; Work Chat selects authorized models. Custom models with unknown Thinking support can send in **Normal**, while an existing nonempty Thinking preference requires explicit confirmation before switching. See [AI Models](/guide/ai-models.html) for setup, Test and compatible-build requirements.

## Why “evolvable”?

The Harness's context belongs to the Work. Its instructions, Skills, tools, and packages can become more useful as that workspace develops. These resources and their history move with the Work when it is exported.

The current **experimental `piwork-brain` package** adds structured Service interaction, task evidence, verified experience, and a controlled path for preparing changes to the package itself. A candidate experience becomes effective after successful task verification. A prepared package change requires an explicit user **Apply** and a behavioral check; editing a file does not hot-reload the running Harness.

This gives “evolve” a concrete meaning: adapt the resources used to operate a particular workspace, while keeping the saved configuration, running context, and verification results visible.

## The long-term direction

The goal is a Harness increasingly adapted to a specific Work and its user. That is a direction, not a promise of unrestricted automatic self-improvement. Current behavior depends on enabled packages, compatible images, available tools, and model configuration.

The Harness cannot bypass Core permissions, quotas, or Work lifecycle rules. Exporting its durable context does not export provider API keys or resume an in-flight task on the recipient.

Read [Harness Spec](/spec/harness) for current interfaces and experimental boundaries.
