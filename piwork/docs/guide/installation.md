# Installation and Deployment

For a first trial, go directly to [Quick Start](/guide/quick-start) using the published [0.0.1 Preview](https://github.com/pphboy/piwork/releases/tag/v0.0.1) installer. Core and CLI both use Docker run by default; log in, create a Work and receive a reply in the terminal. Core manages the Agent and helpers automatically.

## Prerequisites

- A Linux x86-64 Core host with a local rootful Docker Engine 28+ and Unix socket.
- Ports 7171 and 7172 available on the Core host, plus a model provider, model ID and API key reachable from the Work network.
- CLI on Linux or Windows Docker Desktop in Linux-container mode. Windows clients connect to a reachable Linux Core.
- Compose 2.24+ only when choosing the optional Core Compose Demo below.

Installation does not require Go, Node.js or npm. Core's installation directory uses the same absolute path on the host and in the container. HTTP 7171 retains user authentication; remote deployments can use an existing HTTPS endpoint.

## Setup files

Quick Start verifies the archive and its internal checksums. The installer does not bundle offline images; subsequent image pulls need network access. If the published installer lacks the new run template, Quick Start supplies the same blank configuration without requiring a new release.

This website also keeps the <a href="/piwork/install/0.0.1/release.env" download>image references</a>, <a href="/piwork/install/0.0.1/release-manifest.json" download>release metadata</a>, <a href="/piwork/install/0.0.1/core.run.env.example" download>blank run template</a>, <a href="/piwork/install/0.0.1/compose.core.yaml" download>Core Compose</a>, <a href="/piwork/install/0.0.1/core.env.example" download>blank Compose template</a>, <a href="/piwork/install/0.0.1/README.txt" download>provenance</a> and <a href="/piwork/install/0.0.1/SHA256SUMS" download>SHA256SUMS</a> for inspection or separate use. They retain existing published images; the new template is a documentation material. Old 0.1.0 candidate files remain for existing links.

For a source build, see [Build from Source](/guide/source-installation). Retain existing Core data and secret configuration. Initialization env fills missing values and does not overwrite persistent administrator/model settings.

## Core Compose Demo

<!-- core-compose-demo:start -->

This optional Demo deploys **Core only** through Compose 2.24+. The CLI uses the same interactive Docker run as the default path. Use one Core example at a time: both listen on 7171/7172. If switching from the default example, stop that Core normally first. Demo data is in `/var/lib/piwork/core`, separate from `/var/lib/piwork/quickstart/core`.

After downloading and verifying the installer, run these commands on the Linux Core host. Create and edit the Compose-specific configuration; if you already have a valid `core.env`, retain it and skip this block:

```sh
(
    set -eu
    test ! -e core.env
    cp core.env.example core.env
    chmod 600 core.env
    ${EDITOR:-vi} core.env
)
```

Fill the same five initialization fields, with a password of at least 12 characters. Keep the Compose template's single-quote syntax to preserve literal `$` and spaces; escape a literal single quote as documented by Compose. Do not use `core.run.env` or source either file. A custom model Base URL must be HTTPS and reachable from Work containers.

Create fresh private directories, then start Core and wait for complete readiness. These directory commands are for a new root-owned installation; retain existing installation ownership and permissions.

```sh
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core-exchange
test -S /var/run/docker.sock
```

```sh
docker compose \
    --env-file release.env \
    --env-file core.env \
    -f compose.core.yaml \
    up -d --wait --wait-timeout 600 core
```

Read the image references in the host terminal:

```sh
PIWORK_CORE_IMAGE=$(
    sed -n '/^PIWORK_CORE_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CORE_IMAGE=//p' release.env
)
PIWORK_CLI_IMAGE=$(
    sed -n '/^PIWORK_CLI_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CLI_IMAGE=//p' release.env
)
test -n "$PIWORK_CORE_IMAGE" && test -n "$PIWORK_CLI_IMAGE"
```

Enter the same terminal CLI:

```sh
docker run --rm --init -it \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    --entrypoint /bin/sh \
    "$PIWORK_CLI_IMAGE" -i
```

Inside the CLI container, wait for complete readiness, then log in with the Demo account and create a Work:

```sh
timeout 600 curl \
    --fail --silent --show-error \
    --output /dev/null --max-time 3 \
    --retry 120 --retry-delay 5 --retry-all-errors \
    "${PIWORK_CORE_URL}/readyz?profile=docker-delivery"
```

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

Use the actual creation `workId`:

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

Exit with `exit`. For Core status, shutdown, and recovery, see [terminal operations](/guide/installation#terminal-operations) and the [upstream operations manual](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.md).

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

For the default Docker run Core, use a host terminal in the installation directory to diagnose readiness or startup failures:

```sh
docker exec piwork-core-quickstart piwork-serve --json status
docker logs --tail 100 piwork-core-quickstart
```

Fix missing/invalid initialization values, socket access, image availability, or occupied ports before proceeding. A healthy process is not full delivery readiness. Readiness does not call the model; a failed model reply needs the existing runtime/model diagnostics. Once persistent administrator/model values exist, editing the initial env does not overwrite them; use the existing operator commands in the full manual.

If a Work operation is accepted but its wait times out or is interrupted, use the returned operation ID. If a chat stream disconnects, retain its Work/Run ID and last sequence. Run these **inside the CLI container** with the actual values; they observe the original request rather than submit a new one:

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

`--wait` on Work operations observes for up to 120 seconds. An Operation or Run ID alone is not a successful result. Ctrl+C during chat requests cancellation under the existing CLI contract. Continue an existing conversation with `chat WORK_ID --session SESSION_ID --message 'Hello again, Piwork!'` using the original session ID.

Use `exit` to leave the CLI; its named state volume retains credentials and stopping CLI does not stop Work. To return, reread the image references if using a new host terminal and execute the same CLI Docker run, then wait for Core readiness. No extra login is needed while the saved credential remains valid for that Core.

To shut down the default Core normally, execute on the host and confirm exit code zero:

```sh
(
    set -eu
    docker stop --time 60 piwork-core-quickstart
    test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
)
```

The managed Work containers stop; their data, history and desired running state remain. A failed exit is not confirmed shutdown: retain its logs and investigate. Restart the same container, retaining its data:

```sh
docker start piwork-core-quickstart
```

For the Core Compose Demo, shut down with:

```sh
docker compose \
    --env-file release.env \
    --env-file core.env \
    -f compose.core.yaml \
    stop core
```

Use the Demo's original `up -d --wait --wait-timeout 600 core` to restart. Check the original Core container's exit status as shown in the advanced shutdown section. Do not use `down -v`, remove data, or globally prune resources. For file import/export or custom CA files, use the optional exchange storage in the full operations manual; the first conversation needs only the CLI credential volume.

### Windows or remote Linux clients

Windows Docker Desktop must use Linux containers. On the Windows client, in the verified installer directory, set the actual reachable Linux Core HTTP/HTTPS origin and start an interactive CLI. The Linux same-host host-gateway option is omitted:

```powershell
$PIWORK_CLI_IMAGE = (
    Get-Content .\release.env |
        Where-Object { $_ -match '^PIWORK_CLI_IMAGE=.+@sha256:[0-9a-f]{64}$' }
).Substring('PIWORK_CLI_IMAGE='.Length)
$PIWORK_CORE_URL = Read-Host 'Reachable Linux Core HTTP/HTTPS origin'
docker run --rm --init -it `
    --env "PIWORK_CORE_URL=$PIWORK_CORE_URL" `
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client `
    --entrypoint /bin/sh `
    "$PIWORK_CLI_IMAGE" -i
if ($LASTEXITCODE -ne 0) { throw 'CLI container failed' }
```

Once inside the container, execute the same readiness wait, terminal login, Work creation and chat commands as above. Another Linux client uses the same Docker run with its reachable Core URL. HTTPS retains certificate verification; see the full guide for a custom CA. Model endpoints are reached from Linux Work containers, not from the client's network.

Terminal validation evidence is tracked separately in [Docker Quick Start acceptance](https://github.com/pphboy/piwork/blob/main/docs/docker-quickstart-acceptance.md); it does not replace the existing Windows/Desktop evidence.

<!-- terminal-operations:end -->
