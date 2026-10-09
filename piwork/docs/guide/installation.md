# Installation and Deployment

Use [Quick Start](/guide/quick-start.html) for the default trial. Run Core and CLI independently; for Core-only Compose download [docker-compose.yml](/piwork/install/0.0.1-fc409adc1a0b-808d890c6607-dirty/docker-compose.yml); initialization comes from the existing host environment. No installer, configuration file editing or Desktop is required. Images are published and verified for anonymous pulls; download links become available with this website update.

## Platforms and persistence

Core runs on Linux x86-64 with rootful Docker Engine 28+, its local Unix socket, host networking and ports 7171/7172. CLI runs on Linux or Windows Docker Desktop Linux containers and connects to Linux Core. Core Compose and the single-host example require Compose 2.24+; direct Docker run does not. Core same-path binds and CLI credential storage remain separate, and model endpoints must be reachable from Work networks.

For combined Core and CLI usage, see [Single-host deployment](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md) and its [example Compose](/piwork/install/0.0.1-fc409adc1a0b-808d890c6607-dirty/single-host-compose.yml).

## Core Compose Demo

<!-- core-compose-demo:start -->

This optional advanced Core-only Demo uses a separate `/var/lib/piwork/core` installation and the same Docker terminal CLI. It shares ports 7171/7172 with the default examples; stop the previous Core normally before switching. Use the existing initialization environment above. Mounting and safe initialization create a new empty directory; retain existing ownership and permissions.

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.1-fc409adc1a0b-808d890c6607-dirty \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

Run this CLI command on the same host, then follow Quick Start inside the container to log in to this Demo, create a Work and chat. Readiness waiting is built into the image entrypoint:

```sh
docker run --rm --init --interactive --tty \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    docker.io/pphboy/piwork-cli:0.0.1-fc409adc1a0b-808d890c6607-dirty
```

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

Inspect the default Docker run Core in the host terminal. Full readiness is different from process health; fix environment, socket, image or port failures before retrying the CLI:

```sh
docker exec piwork-core-quickstart piwork-serve --json status
docker logs --tail 100 piwork-core-quickstart
```

For Core-only Compose, use:

```sh
docker compose -f docker-compose.yml exec -T core piwork-serve --json status
docker compose -f docker-compose.yml logs --tail 100 core
```

Inside the CLI container, use the original returned IDs to recover an accepted Operation/Run without creating or sending again:

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

`--wait` observes for up to 120 seconds. Ctrl+C during chat requests cancellation under the existing contract; continue a conversation using its original `SESSION_ID`. Credentials live in the separate volume. Exiting or rebuilding the CLI does not stop Work; repeat its startup command to return. Changed valid initialization values do not replace saved administrator/model settings; use existing operator commands for changes.

Stop the default Core normally and verify successful exit. Managed Works stop while IDs, history, volumes and desired state remain. Retain logs on failure; do not report confirmed shutdown:

```sh
docker stop --time 60 piwork-core-quickstart
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
```

Restart with the retained data:

```sh
docker start piwork-core-quickstart
```

Use the following for Compose stop/restart. Normal operation does not use `down -v` or global prune. Back up the consistent Core directory and matching Work volumes; SQLite or an image alone cannot recover a complete Work. Pin release references for upgrade/rollback, retain the old Compose and manifest, and check format compatibility first. File exchange and custom CAs are optional advanced steps; the first chat needs no exchange volume.

```sh
docker compose -f docker-compose.yml stop core
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

Windows Docker Desktop uses Linux containers; the terminal CLI connects to a reachable Linux Core. Replace `CORE_URL` with the actual address in PowerShell; login still prompts for a hidden password inside the container:

```powershell
docker run --rm --init --interactive --tty `
    --env PIWORK_CORE_URL=CORE_URL `
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client `
    docker.io/pphboy/piwork-cli:0.0.1-fc409adc1a0b-808d890c6607-dirty
if ($LASTEXITCODE -ne 0) { throw 'CLI container failed' }
```

Remote Linux clients likewise replace the Core URL. HTTPS retains certificate verification. Model/MCP endpoints must be reachable from Core Work networks; the client host alias does not replace them.

<!-- terminal-operations:end -->

## Advanced and older-version entry points

For source/native builds, see [Build from Source](/guide/source-installation.html). The older 0.0.1 installer, release.env, templates and Desktop operations remain in the [versioned upstream guide](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.md#legacy-001-installer). Existing install/0.0.1 and install/0.1.0 links retain their older provenance.

Actual image digests and provenance: [release manifest](/piwork/install/0.0.1-fc409adc1a0b-808d890c6607-dirty/release-manifest.json).
