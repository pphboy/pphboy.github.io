# Build from Source

Use this path to work with the current Piwork source instead of the published Docker image set. These commands follow the source project's [Core operations guide](https://github.com/pphboy/piwork/blob/main/docs/operations.md).

## Prerequisites

You need Linux, a local Docker Engine accessible to your user, **Go 1.25.5**, **Node.js 24**, npm, Git, Make, and Bash. The product repository uses npm for its own workspace; this documentation website uses pnpm.

## Build and start Core

In your first terminal:

```bash
git clone https://github.com/pphboy/piwork.git
cd piwork
npm ci
make build
make native-agent-images native-helper-images
export PIWORK_DATA_DIR="$PWD/.piwork-go-core"
export PIWORK_PACKAGE_HELPER_IMAGE=piwork-agentd:go-migration-production
export PIWORK_FILE_HELPER_IMAGE=piwork-file-helper:go-migration-acceptance
export PIWORK_SNAPSHOT_HELPER_IMAGE=piwork-snapshot-helper:go-migration-acceptance
./dist/go/piwork-serve serve --data-dir "$PIWORK_DATA_DIR" --listen 127.0.0.1:7171
```

Use a fresh data directory. The image tags above are the actual names produced by these build targets. Keep this terminal running.

## Initialize the installation

In a second terminal, enter the same repository directory:

```bash
export PIWORK_DATA_DIR="$PWD/.piwork-go-core"
export PIWORK_CORE_URL=http://127.0.0.1:7171
./dist/go/piwork-serve --core "$PIWORK_CORE_URL" --data-dir "$PIWORK_DATA_DIR" \
  admin bootstrap --account admin
read -r -p 'Model provider: ' PIWORK_MODEL_PROVIDER
read -r -p 'Model ID: ' PIWORK_MODEL_ID
./dist/go/piwork-serve --core "$PIWORK_CORE_URL" --data-dir "$PIWORK_DATA_DIR" \
  config set --agent-image piwork-agentd:go-migration-production \
  --model-provider "$PIWORK_MODEL_PROVIDER" --model "$PIWORK_MODEL_ID"
./dist/go/piwork-serve --core "$PIWORK_CORE_URL" --data-dir "$PIWORK_DATA_DIR" status
```

Bootstrap prompts for the administrator password; `config set` prompts for the model API key. For a custom provider endpoint, also supply `--model-base-url` with its actual HTTPS URL.

Wait until Core is ready, then start the native Desktop client:

```bash
./dist/go/piwork-cli --core "$PIWORK_CORE_URL" desktop
```

The browser opens on local port `17891`. Sign in to Core at `http://127.0.0.1:7171` and follow [Your First Work](/guide/first-work). The native binary accepts the same user commands as the CLI container.
