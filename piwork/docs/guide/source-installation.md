# Build from Source

Use the unified application image and browser onboarding in [Quick Start](/guide/quick-start.html) by default. Developers need Go 1.25.5, Node 24, npm, Git, Make and Bash to build. The server runs on Linux with a local Docker Engine. CLI is optional.

```sh
npm ci
make build
./dist/go/piwork --no-open
```

Open the printed IP address and private first-time setup link. Create the administrator with password confirmation, sign in to Admin → Quick setup, choose or enter a model and select Save and continue. Open the workbench once all components are Ready. The release Agent image is embedded and supplied automatically, without an image input or advanced override. Use `--data-dir` for persistence and `--public-origin` for an explicit public origin; expose both the main site and Service port range. See `./dist/go/piwork --help`. Running the built server needs no Node, Go or Docker CLI.

[Docker release builds](https://github.com/pphboy/piwork/blob/main/openspec/specs/docker-delivery/spec.md)
