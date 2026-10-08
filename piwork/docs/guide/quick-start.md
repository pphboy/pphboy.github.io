# Quick Start

## Try Core and CLI with Docker

<!-- docker-quickstart:start -->

This example uses one Linux computer with a local rootful Docker Engine 28+ and `linux/amd64` images. Prepare a model provider, model ID, and API key; the model endpoint must be reachable from Work containers. Complete each step before continuing. If a command fails, stop and resolve it using the [terminal troubleshooting guide](/guide/installation#terminal-operations).

**1. Download and verify the installer.**

Run these commands in your host terminal, starting in a new directory:

```sh
(
    set -eu
    mkdir piwork-preview-0.0.1 || exit
    cd piwork-preview-0.0.1 || exit
    PIWORK_RELEASE_URL=https://github.com/pphboy/piwork/releases/download/v0.0.1
    curl --fail --location \
        --output piwork-docker-0.0.1.tar.gz \
        "$PIWORK_RELEASE_URL/piwork-docker-0.0.1.tar.gz" || exit
    curl --fail --location \
        --output piwork-docker-0.0.1.tar.gz.sha256 \
        "$PIWORK_RELEASE_URL/piwork-docker-0.0.1.tar.gz.sha256" || exit
    sha256sum --check --strict piwork-docker-0.0.1.tar.gz.sha256 || exit
    tar -xzf piwork-docker-0.0.1.tar.gz || exit
    cd piwork-docker || exit
    sha256sum --check --strict SHA256SUMS || exit
) && cd piwork-preview-0.0.1/piwork-docker
```

**2. Configure and start Core.**

In the extracted installer directory, create a private `core.run.env`. New installers provide the run template; the fallback creates the same blank configuration for the published `0.0.1` installer:

```sh
(
    set -eu
    test ! -e core.run.env
    if [ -f core.run.env.example ]; then
        cp core.run.env.example core.run.env
    else
        cat > core.run.env <<'EOF'
# Docker run only. Enter raw values without surrounding syntax quotes; do not source.
# Administrator password: at least 12 characters. Keep this file private (0600).
PIWORK_ADMIN_ACCOUNT=
PIWORK_ADMIN_PASSWORD=
PIWORK_MODEL_PROVIDER=
PIWORK_MODEL=
PIWORK_API_KEY=
# Optional HTTPS endpoint reachable from Work containers; omit instead of leaving empty.
# PIWORK_MODEL_BASE_URL=https://your-model-endpoint.example/v1
EOF
    fi
    chmod 600 core.run.env
    ${EDITOR:-vi} core.run.env
)
```

Fill the five blank values. The administrator password must be at least **12 characters**. Enter raw values without adding surrounding syntax quotes; do not source this file or reuse the Compose-only `core.env` format. For a custom model endpoint, uncomment the HTTPS `PIWORK_MODEL_BASE_URL` example and replace it with an address reachable from Work containers. Omit it when using the provider's default.

Read the fixed image references from the verified `release.env` in the same host terminal:

```sh
PIWORK_CORE_IMAGE=$(
    sed -n '/^PIWORK_CORE_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CORE_IMAGE=//p' release.env
)
PIWORK_CLI_IMAGE=$(
    sed -n '/^PIWORK_CLI_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CLI_IMAGE=//p' release.env
)
test -n "$PIWORK_CORE_IMAGE" && test -n "$PIWORK_CLI_IMAGE"
```

Start Core. Docker creates its data bind directory, and Core makes a new empty installation private. Keep the same absolute path on both sides of the mount. Core listens on `7171` and `7172` and uses the existing authenticated HTTP/control interfaces; remote HTTPS setup is covered in the installation guide.

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --user 0:0 \
    --network host \
    --env-file release.env \
    --env-file core.run.env \
    --env DOCKER_HOST=unix:///var/run/docker.sock \
    --env DOCKER_CONTEXT= \
    --env PIWORK_DATA_DIR=/var/lib/piwork/quickstart/core \
    --env PIWORK_CORE_URL=http://127.0.0.1:7171 \
    --env PIWORK_LISTEN=0.0.0.0:7171 \
    --env PIWORK_AGENT_GRPC_LISTEN=0.0.0.0:7172 \
    --env PIWORK_AGENT_GRPC_ADVERTISE=piwork-core:7172 \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    --stop-timeout 60 \
    "$PIWORK_CORE_IMAGE" serve --allow-insecure-remote
```

Core automatically prepares the Agent and helper images. Its installation data persists in `/var/lib/piwork/quickstart/core`; Work data is managed by Core.

**3. Enter the CLI container.**

Run this in the same host terminal. It opens an interactive shell; the named state volume retains your login between containers:

```sh
docker run --rm --init -it \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    --entrypoint /bin/sh \
    "$PIWORK_CLI_IMAGE" -i
```

**4. Log in, create a Work, and receive a reply.**

Run the remaining commands **inside the CLI container**. First wait up to ten minutes for Core and its dependencies to be ready:

```sh
timeout 600 curl \
    --fail --silent --show-error \
    --output /dev/null --max-time 3 \
    --retry 120 --retry-delay 5 --retry-all-errors \
    "${PIWORK_CORE_URL}/readyz?profile=docker-delivery"
```

After the wait succeeds, replace `ACCOUNT` with the account configured in `core.run.env`. Login prompts for a hidden password. Creating a Work starts it automatically; `--wait` observes that operation until it succeeds:

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

Replace `WORK_ID` with the actual `workId` in the creation result, then send your first message:

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

The model reply appears in the terminal. Use `exit` to leave the container; the login volume and Work remain. Run the same CLI container command to return. If a Work operation or chat stream is interrupted, recover using its original ID as described in the [terminal operations guide](/guide/installation#terminal-operations).

<!-- docker-quickstart:end -->

Prefer Compose for Core deployment? See the optional [Core Compose Demo](/guide/installation#core-compose-demo); its CLI entry is the same terminal command. Compose 2.24+ is only needed for that Demo or advanced Compose setups. For Windows Docker clients and remote Linux Core addresses, see the [Docker installation guide](/guide/installation#terminal-operations).

<details>
<summary>Use the native CLI (connect to an existing Core)</summary>

<!-- native-quickstart:start -->

Download the [Linux Core / Console / CLI bundle](https://github.com/pphboy/piwork/releases/download/v0.0.1/piwork-linux-amd64-0.0.1.tar.gz) or [experimental Windows CLI bundle](https://github.com/pphboy/piwork/releases/download/v0.0.1/piwork-cli-windows-amd64-0.0.1.zip). Verify the release SHA256 before extracting; the Linux CLI is in `bin/`.

Use an already configured, ready Core, such as the Core started above. In the directory containing the executable, replace `CORE_URL` with its address (`http://127.0.0.1:7171` for the same Linux computer) and `ACCOUNT` with your account. Login prompts for a hidden password. On Windows PowerShell, replace `./piwork-cli` with `.\piwork-cli.exe`.

```sh
./piwork-cli --core CORE_URL login --account ACCOUNT
./piwork-cli work create --name 'My Work' --wait
```

Use the actual `workId` returned by creation:

```sh
./piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

More commands are in the [CLI guide](https://github.com/pphboy/piwork/blob/main/docs/user-cli.md); see [CLI delivery](https://github.com/pphboy/piwork/blob/main/docs/cli-platforms.md) for platform details.

<!-- native-quickstart:end -->

</details>

[Continue with your first Work](/guide/first-work).
