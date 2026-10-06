# Installation

This guide runs Piwork with Docker. The setup files use the existing public `0.1.0` candidate images, fixed by digest. Core automatically prepares the Agent and helper images. You do not need Go, Node.js, or npm for this installation.

## Prerequisites

- A Linux x86-64 host with **Docker Engine 28+**, a rootful local Engine, and **Docker Compose 2.24+**.
- Access to `/var/run/docker.sock` and permission to create Core's data directories.
- Ports `7171` and `7172` available on the Core host; Desktop uses local port `17891`.
- Internet access to Docker Hub and a model provider, with an available model ID and API key.
- A current browser on the same computer as the CLI / Desktop container.

```bash
docker version
docker compose version
```

The supplied Core configuration uses Linux host networking and the Docker socket. Run it on a trusted host. Port `7171` is an authenticated HTTP endpoint; use a trusted local network or an existing HTTPS endpoint when connecting remotely. Port `7172` is for authenticated Work-to-Core communication and must be reachable from the Work's Docker bridge.

## Download the setup files

Run this in a new directory on the Linux Core host. If Core and Desktop run on separate computers, download the same files on the client too.

```bash
mkdir piwork-docker
cd piwork-docker
(
  set -eu
  for file in release.env compose.core.yaml compose.cli.yaml \
    compose.cli.linux.yaml core.env.example client.env.example README.txt SHA256SUMS; do
    curl --fail --location --remote-name \
      "https://pphboy.github.io/piwork/install/0.1.0/$file"
  done
  sha256sum --check SHA256SUMS
)
```

Individual downloads: <a href="/piwork/install/0.1.0/release.env" download>image references</a>, <a href="/piwork/install/0.1.0/compose.core.yaml" download>Core Compose</a>, <a href="/piwork/install/0.1.0/compose.cli.yaml" download>CLI Compose</a>, <a href="/piwork/install/0.1.0/compose.cli.linux.yaml" download>Linux client override</a>, <a href="/piwork/install/0.1.0/core.env.example" download>Core environment</a>, <a href="/piwork/install/0.1.0/client.env.example" download>client environment</a>, <a href="/piwork/install/0.1.0/README.txt" download>provenance</a>, and <a href="/piwork/install/0.1.0/SHA256SUMS" download>checksums</a>.

These are installation files, not a bundled offline image archive. GitHub Releases currently has no downloadable product release; this path uses the already published Docker images. For source builds, see [Build from Source](/guide/source-installation).

## Configure Core

```bash
cp core.env.example core.env
chmod 600 core.env
```

Open `core.env` in your editor. Fill in all five values:

| Variable | Value to supply |
| --- | --- |
| `PIWORK_ADMIN_ACCOUNT` | Your first administrator account name. |
| `PIWORK_ADMIN_PASSWORD` | A password for that account. |
| `PIWORK_MODEL_PROVIDER` | The provider supported by your Pi SDK configuration, such as `anthropic`. |
| `PIWORK_MODEL` | An actual available model ID from that provider. |
| `PIWORK_API_KEY` | Your provider API key. |

Keep secrets single-quoted in the Compose env file so `$` characters remain literal. Do not execute or `source` this file. Leave the optional model base URL absent to use the SDK default; a custom remote endpoint must be HTTPS and reachable from the Work network.

Keep `PIWORK_DATA_DIR=/var/lib/piwork/core` for this first setup. Core needs its data directory mounted at the **same absolute path** inside and outside the container.

```bash
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core-exchange
test -S /var/run/docker.sock
```

For a host enforcing SELinux, also follow the source project's [SELinux setup](https://github.com/pphboy/piwork/blob/main/docs/selinux.md) before starting Core.

## Start Core

```bash
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml pull core
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml up -d --wait --wait-timeout 600 core
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml exec -T core piwork-serve --json status
```

First startup pulls and verifies dependencies. Core being healthy does not yet mean it can run a Work. The Compose health check waits for the Docker delivery readiness profile, including the file and snapshot helpers.

If startup times out, inspect preparation status and logs, fix the reported configuration or network problem, and repeat the same `up` command:

```bash
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml logs --tail 100 core
```

Initialization values fill missing configuration only. Editing `core.env` does not replace an administrator or model configuration already saved by Core. Use the existing operator commands for later changes; see the [upstream Docker operations guide](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.zh-CN.md).

Continue with [Quick Start](/guide/quick-start) to open Desktop.
