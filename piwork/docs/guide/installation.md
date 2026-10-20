# Installation and Deployment

Use [Quick Start](/guide/quick-start.html) for the default trial. The unified application serves the workbench, administration and setup; optionally download [docker-compose.yml](/piwork/install/0.0.8-fbf639bcbf43-c2a689377a51/docker-compose.yml); initialize the administrator and model in the browser without business environment variables. Current state: published.

## Platforms and persistence

Core runs on Linux x86-64 with rootful Docker Engine 28+, its local Unix socket and host networking. Client-accessible ports are 7171 and the Service range 17891–17954; 7172 is internal Agent RPC. Linux/Windows browsers connect directly to the Linux server; CLI is optional. Core Compose and the single-host example require Compose 2.24+; direct Docker run does not. Core same-path binds and CLI credential storage remain separate, and model endpoints must be reachable from Work networks.

For an optional CLI setup, see [Single-host deployment](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md) and its [example Compose](/piwork/install/0.0.8-fbf639bcbf43-c2a689377a51/single-host-compose.yml).

## Core Compose Demo

<!-- core-compose-demo:start -->

The optional Compose demo uses its own `/var/lib/piwork/core` directory. Stop an installation using the same ports normally before starting. Set up the administrator and model in the browser.

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.8-fbf639bcbf43-c2a689377a51 \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

Process health and runtime readiness are separate: the web pages and /healthz work before administrator/model setup, while /readyz remains unready.

```sh
docker exec piwork-core-quickstart piwork-serve --data-dir /var/lib/piwork/quickstart/core --json status
```

CoreRuntime uses the target Core’s embedded release Agent image. Remove `--agent-image` from old `config set` scripts; other model and Key options stay the same. Online operations use the target Core version; offline initialization uses the local server release. Reading or starting after an upgrade preserves the saved Runtime. Explicitly saving adopts the current release for future Work; existing Work stays unchanged.

```sh
docker exec --interactive --tty piwork-core-quickstart piwork-serve --data-dir /var/lib/piwork/quickstart/core config set --model-provider PROVIDER --model MODEL
```

The server listens on `0.0.0.0:7171` by default. Local or remote computers open `http://SERVER_IP:7171` using its actual non-loopback IP. A local network is sufficient; no public IP is required. Allow TCP 7171 for the main site and TCP 17891–17954 for Service entries (override with `--service-ports`); 7172 is internal Agent RPC, not a browser port. Piwork proxies these ports; user containers are not published directly. Opening only the main port leaves the workbench usable but Services unreachable. No domain, DNS or local proxy is required. HTTP is unencrypted; configure HTTPS explicitly for untrusted networks and expose/proxy both the main site and every Service entry port.

Services support server-side login using response Cookies, Basic/Bearer, HTTP, SSE and WebSocket. Response Cookies stay on the server, partitioned by browser session and Service; Secure Cookies are sent only through HTTPS entries. Apps that read/write document.cookie or Cookie Store (including script-read CSRF Cookies) are not guaranteed to work transparently. Script-written browser Cookies are not isolated across Services on the same IP and are never forwarded upstream. Hard-coded .work URLs, cross-site SSO and upstream HTTPS are outside transparent support. Application CSP/X-Frame-Options remain intact; open an application tab when embedding is denied.

Ports remain pinned to their Service identities across restart, so another application cannot inherit an old origin. If the pool is full, the operator must explicitly enlarge the range and allow those ports. Grants expire on restart.

Advanced deployment: `--public-origin` sets the exact public origin (client Forwarded headers are ignored); `--tls-cert` / `--tls-key` serve TLS on all entries. The key must be private. A trusted reverse proxy must forward the main site and every independent Service port. HTTPS certificates must be trusted on each entry; proxying only the main site is insufficient. Model endpoints must be reachable from Work networks.

Optional test bootstrap: only the paired `PIWORK_ADMIN_ACCOUNT` and `PIWORK_ADMIN_PASSWORD` create the first administrator on an empty installation. Synthetic example values: `admin` / `synthetic-test-password`. Existing accounts are retained. Former model and Agent/helper initialization variables are removed; saved models remain usable.

Optional CLI connects to a ready Core and retains its separate credential volume. Windows/Linux browsers use the web application directly without CLI.

```sh
docker run --rm --init --interactive --tty \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    docker.io/pphboy/piwork-cli:0.0.8-fbf639bcbf43-c2a689377a51
```

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

Read back an unknown write before retrying. Recover the original Operation/Run IDs without creating or sending again:

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

Normal shutdown stops this installation’s managed Works and retains IDs, history, volumes and desired state. Closing the browser or CLI does not stop Works.

```sh
docker stop --time 60 piwork-core-quickstart
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
docker start piwork-core-quickstart
```

```sh
docker compose -f docker-compose.yml stop core
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

Retain the data directory and matching Work volumes; do not use down -v or global prune. Stop the old Core normally before upgrading and reuse `--data-dir`; users and saved models do not need re-entry. Backups need a consistent Core directory and matching Work volumes.

<!-- terminal-operations:end -->

## Advanced and older-version entry points

For source/native builds, see [Build from Source](/guide/source-installation.html). The older 0.0.1 installer, release.env, templates and Desktop operations remain in the [versioned upstream guide](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.md#legacy-001-installer). Existing install/0.0.1 and install/0.1.0 links retain their older provenance.
