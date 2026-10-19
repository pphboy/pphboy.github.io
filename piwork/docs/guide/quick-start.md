# Quick Start

## Start Piwork with one command

<!-- docker-quickstart:start -->

Use Linux x86-64 and rootful Docker Engine 28+. One container serves the workbench, administration and first-time setup, with no environment variables or client CLI required:

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --stop-timeout 60 \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    docker.io/pphboy/piwork-core:0.0.7-62f2868cb8e2-d69916b52829-dirty
```

Open the reported access address. For a detached container, retrieve the first-time setup link on the server. It authorizes creation of the first administrator and expires after ten minutes; keep it private:

```sh
docker logs piwork-core-quickstart
```

If it expires, retrieve a new link as the installation operator:

```sh
docker exec piwork-core-quickstart piwork-serve --data-dir /var/lib/piwork/quickstart/core setup link
```

Create the administrator with a password and matching confirmation, then sign in to **Quick setup** in Admin (`/admin/setup`). Follow the two-step guide: enter the model ID, API type, Base URL and API Key, or choose a saved model, then select **Save and continue**. This saves the model and binds CoreRuntime in sequence. The preparation page updates automatically; when all required components are Ready, select **Open workbench** to enter Piwork. The Agent image is embedded with the server release and supplied automatically; it has no input, selector or advanced override. Model Test is explicit and optional; saving does not call the model. Open the workbench to create a Work, chat, manage files or open Services. Return through Admin **Overview → Quick setup** to change configuration. The topbar **Workbench** link remains available while preparation finishes; the completion action waits for all components. Saved accounts, models and Works survive restart.

The server listens on `0.0.0.0:7171` by default. Local or remote computers open `http://SERVER_IP:7171` using its actual non-loopback IP. A local network is sufficient; no public IP is required. Allow TCP 7171 for the main site and TCP 17891–17954 for Service entries (override with `--service-ports`); 7172 is internal Agent RPC, not a browser port. Piwork proxies these ports; user containers are not published directly. Opening only the main port leaves the workbench usable but Services unreachable. No domain, DNS or local proxy is required. HTTP is unencrypted; configure HTTPS explicitly for untrusted networks and expose/proxy both the main site and every Service entry port.

Services support server-side login using response Cookies, Basic/Bearer, HTTP, SSE and WebSocket. Response Cookies stay on the server, partitioned by browser session and Service; Secure Cookies are sent only through HTTPS entries. Apps that read/write document.cookie or Cookie Store (including script-read CSRF Cookies) are not guaranteed to work transparently. Script-written browser Cookies are not isolated across Services on the same IP and are never forwarded upstream. Hard-coded .work URLs, cross-site SSO and upstream HTTPS are outside transparent support. Application CSP/X-Frame-Options remain intact; open an application tab when embedding is denied.

Optional [Compose](/piwork/install/0.0.7-62f2868cb8e2-d69916b52829-dirty/docker-compose.yml) (2.24+) and the [single-host example](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md) open the same web application. CLI is an optional advanced tool. See the [operations guide](/guide/installation.html#terminal-operations) for recovery.

<!-- docker-quickstart:end -->

<details>
<summary>Build and use the native Linux application</summary>

<!-- native-quickstart:start -->

The Docker images above include the unified entry. Build the current source, then start the native Linux program (the executable also works outside the checkout):

```sh
./dist/go/piwork --no-open
```

Data defaults to `piwork/server` in the user configuration directory and the listener to `0.0.0.0:7171`; use the actual IP link printed in the terminal. See `--help` for `--data-dir`, `--listen`, `--public-origin`, `--service-ports` and TLS options. Keep the first-time setup link private. The Agent image is embedded with the server release and used automatically, with no image input or override. Create the administrator and configure the model in the browser; `piwork setup link` rotates an expired proof. Exiting this program stops managed Works under the Core shutdown contract; closing a browser does not.

`piwork-cli` retains its independent Windows/Linux terminal and local Desktop modes. `piwork-console` remains the older standalone administrator entry and is not required for default startup. The historical [0.0.7 Linux bundle](https://github.com/pphboy/piwork/releases/download/v0.0.7/piwork-linux-amd64-0.0.7.tar.gz) and [experimental Windows CLI 0.0.5](https://github.com/pphboy/piwork/releases/download/v0.0.5/piwork-cli-windows-amd64-0.0.5.exe) do not contain this unified server entry.

<!-- native-quickstart:end -->

</details>
