# Quick Start

## Try Core and CLI with Docker

<!-- docker-quickstart:start -->

### Core

Use Linux x86-64 with Docker Engine 28+. The host environment must already contain `PIWORK_ADMIN_ACCOUNT`, `PIWORK_ADMIN_PASSWORD` (at least 12 characters), `PIWORK_MODEL_PROVIDER`, `PIWORK_MODEL`, and `PIWORK_API_KEY`. Optional `PIWORK_MODEL_BASE_URL` uses HTTPS reachable from Work containers; leave it unset when unused.

Run Core in the host terminal. The image includes release defaults and automatically prepares the Agent and helpers:

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --stop-timeout 60 \
    --env PIWORK_ADMIN_ACCOUNT \
    --env PIWORK_ADMIN_PASSWORD \
    --env PIWORK_MODEL_PROVIDER \
    --env PIWORK_MODEL \
    --env PIWORK_API_KEY \
    --env PIWORK_MODEL_BASE_URL \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    docker.io/pphboy/piwork-core:0.0.2-fb4f577da3b4-512ec778b267
```

Core can also be deployed alone with [Core-only docker-compose.yml](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/docker-compose.yml) (Compose 2.24+); CLI keeps its independent Docker command. Stop the previous Core before switching deployment methods, retaining the same data directory. For an optional combined setup, see [Single-host deployment](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md).

### CLI

Run CLI independently against an existing Core; no Core initialization variables are needed. This command connects to Core on the same host; replace `PIWORK_CORE_URL` for another Core. It waits for full readiness and opens a terminal:

```sh
docker run --rm --init --interactive --tty \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    docker.io/pphboy/piwork-cli:0.0.2-fb4f577da3b4-512ec778b267
```

Run the following **inside the CLI container**. Replace `ACCOUNT` with your account; login prompts for a hidden password. Creating a Work starts it automatically:

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

Replace `WORK_ID` with the actual `workId` returned by creation, then send your first message:

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

The reply appears in the terminal. Use `exit` to leave; the same CLI startup command reuses credentials and exiting the CLI does not stop Work. For failed readiness or interrupted observation, use the [terminal operations guide](/guide/installation.html#terminal-operations) to inspect status or recover the original Operation/Run without resubmitting.

<!-- docker-quickstart:end -->

<details>
<summary>Use the native CLI (connect to an existing Core)</summary>

<!-- native-quickstart:start -->

Download the [Linux Core / Console / CLI bundle](https://github.com/pphboy/piwork/releases/download/v0.0.2/piwork-linux-amd64-0.0.2.tar.gz) or [experimental Windows CLI executable](https://github.com/pphboy/piwork/releases/download/v0.0.2/piwork-cli-windows-amd64-0.0.2.exe). Verify the release SHA256. Extract the Linux bundle to find the CLI in `bin/`; save the Windows executable as `piwork-cli.exe`. Full Windows native acceptance remains pending.

Use an already configured, ready Core, compatible with your native CLI version. In the directory containing the executable, replace `CORE_URL` with its address (`http://127.0.0.1:7171` for the same Linux computer) and `ACCOUNT` with your account. Login prompts for a hidden password. On Windows PowerShell, replace `./piwork-cli` with `.\piwork-cli.exe`.

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
