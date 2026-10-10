# Web Development

Use the reusable `pphboy/piwork-web-base` environment to build Web applications inside a Work. New applications with the current default Brain use **FastAPI + React + TypeScript + Vite**. You can choose another stack or derive your own image.

The Harness edits the Work's shared workspace from the Agent container. Core runs the application in a separate Service. The base image provides the toolchain, locked offline dependencies and common commands; application code and data belong to the Work.

## Build your first application

After [Quick Start](/guide/quick-start.html), send a task to the existing Work from the CLI container:

```sh
piwork-cli chat WORK_ID \
    --message 'Build a task board using the default Web base. Persist its data, deploy it as a Service, and verify the running application.'
```

Replace `WORK_ID` with your actual Work ID. The default deployment Skill initializes a writable application, maintains its Spec, and uses the existing Service tools to deploy and verify it. Existing application targets are refused before any overwrite; maintaining an application uses its actual files.

Open the declared Web port from the Service entry in Desktop. A natural-language request starts the work; check its actual Service, Operation and business results before treating the task as complete.

## Modify without manual refresh

Ask the same Work to change the application. Delivery includes the necessary tests, checks, build, Service update or restart, and verification of the actual running code and affected business behavior.

The standard templates check the ready application version every five seconds while visible, and when visibility or connectivity returns. They automatically adopt a new frontend and restore supported non-secret drafts and the current path. Backend-only changes and ordinary Agent Actions update business queries. Explicit development mode supports React Fast Refresh and backend reload.

Versions bind the corresponding source, locks and actual image environment. Upgrading only the base environment also makes an open page adopt the new build. Failed builds, unchanged versions and disconnections do not cause a reload loop. This behavior comes from the templates; existing or third-party applications need their own update support.

Application version reads do not start another Agent Run or Apply a Brain package.

## Environment and runtime

The published base supports `linux/amd64` and pins Python 3.13.16, Node 24.21.0, FastAPI 0.143.0, React 19.3.0, TypeScript 7.0.2, Vite 8.3.4 and sqlite3 CLI 3.40.1. Exact dependency integrity is recorded in the [upstream environment and locks](https://github.com/pphboy/piwork/tree/main/deploy/images/web-base).

```text
docker.io/pphboy/piwork-web-base:0.1.0-03395d0810f7-bbb24bdd0167-dirty@sha256:e83902fb568e97b2d01d488ce7c9c3d15f373ab58b46e041337baa832b8cfb81
```

The default Service explicitly runs `/usr/local/bin/piwork-web` with arguments `["run", "--app", "/var/data/workspace/apps/<service-name>"]`. FastAPI serves built frontend assets, API, application interaction endpoints and health on the single declared HTTP port **8080**. Core grants workspace access and supplies the managed interaction identity; a standalone container does not supply that identity.

| Command | Purpose |
| --- | --- |
| `piwork-web prepare` | Prepare workspace-local dependencies from locked offline caches. |
| `piwork-web check` | Run isolated backend/frontend tests and type checks. |
| `piwork-web build` | Publish frontend output matching the checked source and environment. |
| `piwork-web serve` | Serve the checked application. |
| `piwork-web run` | Prepare, check, build and serve. |
| `piwork-web dev` | Run the explicit frontend/backend development mode. |

These commands run in the application container. The default Skill selects the appropriate Service command and checks its result. The standard dependency set works offline; additional dependencies need matching locked artifacts or a derived image.

## Persistent files and sqlite3

Application source, locks, writable dependencies and build output live in `apps/<service-name>`; business data lives in `data/<service-name>`. Agent and Service share the existing file identity, while the Service root filesystem is read-only. Restarting or replacing a Service does not initialize the template again or clear business data.

Both the published Agent and Web base provide a real sqlite3 command. AI bash runs in **Agent** and follows the Work's tool policy. For the workstation template, an authorized read-only inspection can use:

```sh
sqlite3 -readonly -json /var/data/workspace/data/workstation/workstation.sqlite 'SELECT name FROM sqlite_master WHERE type="table";'
```

Other applications choose their own database names. Ordinary business mutations keep the Action/Query contract; platform-managed Core/history/Memory databases are outside this application workflow. Core and CLI hosts need no Python, Node or sqlite3 installation.

## Resource policy and upgrades

Application Services have **no Piwork memory cap or Service memory reservation**. CPU, service/volume counts and Agent/helper memory policies still apply; actual memory availability depends on the host and outer deployment. Legacy Service `memoryBytes` values are compatibility history, and zero represents unlimited memory.

Upgrade Core through its normal shutdown/start procedure. Managed recovery replaces older capped Service containers and retains workspace content. Existing Works retain their captured Brain and Agent image; adopting new package guidance or Agent tools requires the normal package update/image selection and explicit Apply. A Core upgrade does not overwrite administrator defaults or convert existing applications.

## Maintain or extend the base

The maintenance source is **`deploy/images/web-base/` in the Piwork repository**. DockerHub stores published images; a running Work or Brain reference is not the source of the environment.

| Location | Responsibility |
| --- | --- |
| `deploy/images/web-base/` | Dockerfile, environment, locks, tools and bilingual manual. |
| `scripts/` and `Makefile` | Build, validation and independent publication entry points. |
| `internal/coreassets/piwork-brain/` | Deployment guidance, templates and fixed image reference. |
| `dist/web-base/` | Ignored local candidates and validation output. |

Downstream maintainers can use `FROM` with the fixed tag and digest, install locked dependencies at image build time, and keep the runtime identity `10001:10001`. Work itself does not gain Docker build or socket access.

See the [base manual](https://github.com/pphboy/piwork/blob/main/deploy/images/web-base/README.md) for commands, derivation and release maintenance, and the [acceptance record](https://github.com/pphboy/piwork/blob/main/docs/web-base-acceptance.md) for tested scope.
