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
    docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

On this computer or another computer, open `http://SERVER_IP:17891` using the server’s actual IP. An empty installation shows Create administrator; an initialized installation shows normal sign-in. No terminal authorization link is required.

Create the administrator with a password and matching confirmation, then sign in to **Quick setup** in Admin (`/admin/setup`). Follow the two-step guide: enter the model ID, API type, Base URL and API Key, or choose a saved model, then select **Save and continue**. This saves the model and binds CoreRuntime in sequence. The preparation page updates automatically; when all required components are Ready, select **Open workbench** to enter Piwork. The Agent image is embedded with the server release and supplied automatically; it has no input, selector or advanced override. Model Test is explicit and optional; saving does not call the model. Open the workbench to create a Work, chat, manage files or open Services. Return through Admin **Overview → Quick setup** to change configuration. The topbar **Workbench** link remains available while preparation finishes; the completion action waits for all components. Saved accounts, models and Works survive restart.

One process serves two HTTP listeners: UI defaults to `0.0.0.0:17891`, Core to `0.0.0.0:17871`. Browsers use only UI, including files, events and `/services/<workId>/<serviceId>/<port>/`; the backend calls Core over fixed loopback HTTP. External Linux CLI connects directly to the server Core port. Change ports only with --ui-port/--core-port. UI accepts actual local IPv4 addresses, localhost, loopback and the machine hostname, validates Host, Origin and CSRF, and ignores Forwarded. Each address needs its own login. HTTP only; no HTTPS, custom domain or reverse proxy configuration. Internal Agent callbacks retain container-reachable mTLS on 7172. User Services publish no host ports. Model endpoints must be reachable from Work networks.

Hosted Services share the workbench origin and must be trusted: scripts can use the current user’s UI permissions. Apps must support a dynamic Service URL prefix; old root-path apps, images and packages are not rewritten automatically. Services support server-side login using response Cookies, Basic/Bearer, HTTP, SSE and WebSocket. Response Cookies stay on the server, partitioned by browser session and Service; Secure Cookies are not forwarded through the HTTP entry. Apps that read/write document.cookie or Cookie Store (including script-read CSRF Cookies) are not guaranteed to work transparently. Script-written browser Cookies are not isolated across Services on the same IP and are never forwarded upstream. Hard-coded .work URLs, cross-site SSO and upstream HTTPS are outside transparent support. Application CSP/X-Frame-Options remain intact; open an application tab when embedding is denied.

Optional [Compose](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml) (2.24+) and the [single-host example](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md) open the same web application. CLI is an optional advanced tool. See the [operations guide](/guide/installation.html#terminal-operations) for recovery.

<!-- docker-quickstart:end -->

<details>
<summary>Build and use the native Linux application</summary>

<!-- native-quickstart:start -->

[Build the current source](/guide/source-installation.html), then run from the repository root. Released programs also work outside the checkout. Native programs support Linux x86-64 only.

```sh
./dist/go/piwork-core
```

Core includes administration, the workbench and first-time setup. Its only startup settings are `--ui-port` (17891), `--core-port` (17871), and `--data-dir` (piwork/server under the user configuration directory). `--help` and `--version` only display information. Ports must be distinct, within 1–65535 and different from internal RPC 7172. Relative data paths resolve from the working directory.

```sh
./dist/go/piwork-core --ui-port 17991 --core-port 17971 --data-dir /var/lib/piwork/custom/core
```

Choose one startup command. Open the printed HTTP URL, create the administrator, then configure models and runtime in Admin Quick setup. On a headless server, open that address manually. Ctrl+C stops this installation’s managed Works while preserving data, history and desired state; restart with the same data path.

The Linux native client starts Desktop by default and connects to an existing Core. Select another Desktop port when the local Core UI already uses 17891. The client requires no Docker and does not start or stop Core.

```sh
./dist/go/piwork-cli --core http://127.0.0.1:17871 desktop --port 17901 --no-open
```

Open `http://desktop.localhost:17901/` locally. Desktop shares user credentials with terminal commands but has its own default Core preference. Business commands select --core, PIWORK_CORE_URL, saved credentials, then the local default. Closing the browser or CLI does not stop Works. Windows browsers can also access the Linux Core UI.

<!-- native-quickstart:end -->

</details>
