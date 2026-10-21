# Installation and Deployment

Use [Quick Start](/guide/quick-start.html) for the default trial. The unified application serves the workbench, administration and setup; optionally download [docker-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml); initialize the administrator and model in the browser without business environment variables. Current state: published.

## Platforms and persistence

One process serves two HTTP listeners: UI defaults to `0.0.0.0:17891`, Core to `0.0.0.0:17871`. Browsers use only UI, including files, events and `/services/<workId>/<serviceId>/<port>/`; the backend calls Core over fixed loopback HTTP. External Linux CLI connects directly to the server Core port. Change ports only with --ui-port/--core-port. UI accepts actual local IPv4 addresses, localhost, loopback and the machine hostname, validates Host, Origin and CSRF, and ignores Forwarded. Each address needs its own login. HTTP only; no HTTPS, custom domain or reverse proxy configuration. Internal Agent callbacks retain container-reachable mTLS on 7172. User Services publish no host ports. Model endpoints must be reachable from Work networks.

For an optional CLI setup, see [Single-host deployment](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md) and its [example Compose](/piwork/install/0.0.10-024c864cb667-99aec1718558/single-host-compose.yml).

## Core Compose Demo

<!-- core-compose-demo:start -->

The optional Compose demo uses its own `/var/lib/piwork/core` directory. Stop an installation using the same ports normally before starting. Set up the administrator and model in the browser.

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558 \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

Process health and runtime readiness are separate: /healthz is available before web setup finishes; /readyz remains unready. Manage users, models, runtime and dependency preparation in embedded Admin. Operator credentials and protected management APIs remain separate from user CLI credentials.

```sh
curl --fail http://127.0.0.1:17891/healthz
docker logs --tail 100 piwork-core-quickstart
```

One process serves two HTTP listeners: UI defaults to `0.0.0.0:17891`, Core to `0.0.0.0:17871`. Browsers use only UI, including files, events and `/services/<workId>/<serviceId>/<port>/`; the backend calls Core over fixed loopback HTTP. External Linux CLI connects directly to the server Core port. Change ports only with --ui-port/--core-port. UI accepts actual local IPv4 addresses, localhost, loopback and the machine hostname, validates Host, Origin and CSRF, and ignores Forwarded. Each address needs its own login. HTTP only; no HTTPS, custom domain or reverse proxy configuration. Internal Agent callbacks retain container-reachable mTLS on 7172. User Services publish no host ports. Model endpoints must be reachable from Work networks.

Hosted Services share the workbench origin and must be trusted: scripts can use the current user’s UI permissions. Apps must support a dynamic Service URL prefix; old root-path apps, images and packages are not rewritten automatically. Services support server-side login using response Cookies, Basic/Bearer, HTTP, SSE and WebSocket. Response Cookies stay on the server, partitioned by browser session and Service; Secure Cookies are not forwarded through the HTTP entry. Apps that read/write document.cookie or Cookie Store (including script-read CSRF Cookies) are not guaranteed to work transparently. Script-written browser Cookies are not isolated across Services on the same IP and are never forwarded upstream. Hard-coded .work URLs, cross-site SSO and upstream HTTPS are outside transparent support. Application CSP/X-Frame-Options remain intact; open an application tab when embedding is denied.

Optional test bootstrap: paired PIWORK_ADMIN_ACCOUNT and PIWORK_ADMIN_PASSWORD initialize only the first administrator on an empty installation. Existing accounts are retained. Default setup needs no business environment variables; model and image settings are not read from initialization env.

On the Linux client, select an existing Core address and enter the password interactively. ACCOUNT and WORK_ID come from your account and creation result:

```sh
export PIWORK_CORE_URL=http://SERVER_IP:17871
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

Read back unknown writes and recover original Operation/Run IDs without resubmitting. Files and packages use local client paths, with no exchange volume.

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

Normal Core shutdown stops this installation’s managed Works and preserves identities, history, volumes and desired state. Closing a browser or CLI does not stop Core or Works.

```sh
docker stop --time 60 piwork-core-quickstart
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
docker start piwork-core-quickstart
```

```sh
docker compose -f docker-compose.yml stop core
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

Retain the same Core directory and matching Work volumes. Stop normally and take a consistent backup before upgrading. Keep prior image references and manifests; roll back only with compatible formats. Do not use down -v or global prune. Work exports are not installation backups: Stop before export and explicitly Start after import.

<!-- terminal-operations:end -->

## Advanced and older-version entry points

For source/native builds, see [Build from Source](/guide/source-installation.html). The older 0.0.1 installer, release.env, templates and Desktop operations remain in the [versioned upstream guide](https://github.com/pphboy/piwork/releases). Existing install/0.0.1 and install/0.1.0 links retain their older provenance.
