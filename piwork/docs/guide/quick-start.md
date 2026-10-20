# Quick Start

## Start Piwork with one command

<!-- docker-quickstart:start -->

Use Linux x86-64 and rootful Docker Engine 28+. One container serves the workbench, administration and first-time setup, with no environment variables or client CLI required:

This published image includes direct browser entry and web setup.

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --stop-timeout 60 \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    docker.io/pphboy/piwork-core:0.0.9-0901cf119dc1-0e1261f05b9d
```

On this computer or another computer, open `http://SERVER_IP:17891` using the server’s actual IP. An empty installation shows Create administrator; an initialized installation shows normal sign-in. No terminal authorization link is required.

Create the administrator with a password and matching confirmation, then sign in to **Quick setup** in Admin (`/admin/setup`). Follow the two-step guide: enter the model ID, API type, Base URL and API Key, or choose a saved model, then select **Save and continue**. This saves the model and binds CoreRuntime in sequence. The preparation page updates automatically; when all required components are Ready, select **Open workbench** to enter Piwork. The Agent image is embedded with the server release and supplied automatically; it has no input, selector or advanced override. Model Test is explicit and optional; saving does not call the model. Open the workbench to create a Work, chat, manage files or open Services. Return through Admin **Overview → Quick setup** to change configuration. The topbar **Workbench** link remains available while preparation finishes; the completion action waits for all components. Saved accounts, models and Works survive restart.

One command starts two independent HTTP services in one process: ControlPlane defaults to `0.0.0.0:17891`, Core to `127.0.0.1:17871`. Browsers use the actual LAN IP on 17891 for all UI, files, events and `/services/<workId>/<serviceId>/<port>/`, without DNS or extra Service ports. The backend and CLI/operator call Core directly. Remote or bridge CLI requires explicit `--core-listen 0.0.0.0:17871` (or a reachable interface) and the appropriate network access; loopback is not reachable from a bridge container. Preserve container-reachable 7172 for internal Agent mTLS RPC, not browser access. User Services publish no host ports. HTTPS proxies must forward every path, SSE and WebSocket on the same origin; use a trusted TLS termination entry for Core if required.

Hosted Services share the workbench origin and must be trusted: scripts can use the current user’s UI permissions. Apps must support a dynamic Service URL prefix; old root-path apps, images and packages are not rewritten automatically. Services support server-side login using response Cookies, Basic/Bearer, HTTP, SSE and WebSocket. Response Cookies stay on the server, partitioned by browser session and Service; Secure Cookies are sent only through HTTPS entries. Apps that read/write document.cookie or Cookie Store (including script-read CSRF Cookies) are not guaranteed to work transparently. Script-written browser Cookies are not isolated across Services on the same IP and are never forwarded upstream. Hard-coded .work URLs, cross-site SSO and upstream HTTPS are outside transparent support. Application CSP/X-Frame-Options remain intact; open an application tab when embedding is denied.

Optional [Compose](/piwork/install/0.0.9-0901cf119dc1-0e1261f05b9d/docker-compose.yml) (2.24+) and the [single-host example](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md) open the same web application. CLI is an optional advanced tool. See the [operations guide](/guide/installation.html#terminal-operations) for recovery.

<!-- docker-quickstart:end -->

<details>
<summary>Build and use the native Linux application</summary>

<!-- native-quickstart:start -->

The Docker images already include the unified entry. To run it natively, [build the current source](/guide/source-installation.html), then start the Linux program from the repository root; the built executable also works outside the checkout:

```sh
./dist/go/piwork --no-open
```

Data defaults to `piwork/server` in the user configuration directory and the listener to `0.0.0.0:17891`; use the actual IP link printed in the terminal. See `--help` for `--data-dir`, `--listen`, `--public-origin`, `--core-listen` and TLS options.

Open the actual IP address to create the administrator and sign in, with no extra link check. The Agent image is embedded with the server release and used automatically, with no image input or override; create the administrator and configure the model in the browser.

Retain the same `--data-dir` when using a custom data directory. Exiting this program stops managed Works under the Core shutdown contract; closing a browser does not.

If ControlPlane already occupies 17891 on this host, select `--port 17901` for independent Desktop; there is no automatic port change. CLI defaults to Core `http://127.0.0.1:17871`; explicit addresses and saved credentials take precedence and old addresses are not migrated. For an independent client built from this source, run `piwork-cli desktop --no-open` and open `http://desktop.localhost:17891/` in a browser on this computer (use the printed port if customized). The ordinary browser session is established automatically; a saved CLI login is reused, otherwise sign in normally. `piwork-cli desktop open --no-open` is an optional address lookup that issues no authorization. Refresh, a new browser and cleared Cookies all use the same address. A CLI container must publish the local loopback port and retain its state volume; open the printed address in the host browser, without requiring `docker exec ... desktop open`. Desktop and CLI share Core credentials; signing out clears that shared login, while closing the browser does not stop Works.

`piwork-cli` retains its independent Windows/Linux terminal and local Desktop modes; `piwork-console` is a standalone administrator entry and is not required for default startup. The historical [0.0.7 Linux bundle](https://github.com/pphboy/piwork/releases/download/v0.0.7/piwork-linux-amd64-0.0.7.tar.gz) and [experimental Windows CLI 0.0.5](https://github.com/pphboy/piwork/releases/download/v0.0.5/piwork-cli-windows-amd64-0.0.5.exe) do not contain the unified server entry.

<!-- native-quickstart:end -->

</details>
