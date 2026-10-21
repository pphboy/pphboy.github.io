# Build from Source

```sh
npm ci
make build
```

[Build the current source](https://github.com/pphboy/piwork/blob/main/AGENTS.md#构建与验证), then run from the repository root. Released programs also work outside the checkout. Native programs support Linux x86-64 only.

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

One process serves two HTTP listeners: UI defaults to `0.0.0.0:17891`, Core to `0.0.0.0:17871`. Browsers use only UI, including files, events and `/services/<workId>/<serviceId>/<port>/`; the backend calls Core over fixed loopback HTTP. External Linux CLI connects directly to the server Core port. Change ports only with --ui-port/--core-port. UI accepts actual local IPv4 addresses, localhost, loopback and the machine hostname, validates Host, Origin and CSRF, and ignores Forwarded. Each address needs its own login. HTTP only; no HTTPS, custom domain or reverse proxy configuration. Internal Agent callbacks retain container-reachable mTLS on 7172. User Services publish no host ports. Model endpoints must be reachable from Work networks.

[Docker release builds](https://github.com/pphboy/piwork/blob/main/openspec/specs/docker-delivery/spec.md)
