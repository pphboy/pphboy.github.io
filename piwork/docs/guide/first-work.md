# Your First Work

Start by receiving a model reply in [Quick Start](/guide/quick-start). Reuse that Work here, without another create or start. Replace `WORK_ID` with its original creation ID. Commands run inside the CLI container.

## Write and read a file

```sh
piwork-cli chat WORK_ID \
    --message 'Create welcome.md in the workspace, read it back, and report what you verified.'
```

The model uses tools in `/var/data/workspace`. Ask it to report what it actually read and verified. A prompt does not guarantee completion; check the file before continuing. Core manages the Work workspace; the CLI login volume does not store these files.

For an application task, Work-scoped tools can create a [Service](/concepts/service). See the [Kanban Work](/demo/kanban) example.

## Add optional file exchange storage

Only add exchange storage for import, export or local-file operations. Exit the current CLI, read the fixed CLI image in the host installation directory, and enter a container with an exchange volume. It reuses the existing login state:

```sh
PIWORK_CLI_IMAGE=$(
    sed -n '/^PIWORK_CLI_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CLI_IMAGE=//p' release.env
)
test -n "$PIWORK_CLI_IMAGE"
```

```sh
docker run --rm --init -it \
    --name piwork-cli-files \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    --mount type=volume,src=piwork-quickstart-client-exchange,dst=/exchange \
    --entrypoint /bin/sh \
    "$PIWORK_CLI_IMAGE" -i
```

Keep this shell running so another host terminal can use docker cp. The exchange volume transports archives; it is not a backup of Work data. Remote clients use the reachable Core URL. Windows clients enter Linux containers as described in Installation and omit the Linux same-host host-gateway option.

## Stop, export and inspect

Inside the CLI container, stop the original Work before exporting. The destination file must not already exist:

```sh
piwork-cli work stop WORK_ID --wait
piwork-cli work export WORK_ID --output /exchange/first-work.work
piwork-cli work package inspect /exchange/first-work.work
```

In another host terminal, save the archive locally:

```sh
docker cp piwork-cli-files:/exchange/first-work.work ./first-work.work
```

The archive retains durable files, history, configuration, Services, Skills, Pi Packages and fixed images. It does not freeze a live process. The target supplies its own platform-managed model key; secrets saved in files or history can remain in the package.

## Import and continue

Use the same kind of CLI container logged in to the target Core; its name here is piwork-cli-files. First copy the archive on the target host:

```sh
docker cp ./first-work.work piwork-cli-files:/exchange/incoming.work
```

Back inside the target CLI container, import, then use the returned new Work ID for an explicit start:

```sh
piwork-cli work import /exchange/incoming.work --name 'Continued Work' --wait
piwork-cli work start IMPORTED_WORK_ID --wait
```

Import creates an independent stopped Work and does not start it automatically. Replace `IMPORTED_WORK_ID` with its actual ID and continue inspecting the retained file and history:

```sh
piwork-cli chat IMPORTED_WORK_ID \
    --message 'Read welcome.md from the workspace and summarize the retained files.'
```

## Recover after interruption

Use the original Operation, Run or Snapshot ID instead of submitting another mutation to query its result. Resume a disconnected chat stream with its Run ID and last sequence; choose a new nonexistent output path for a download retry:

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
piwork-cli work snapshot download SNAPSHOT_ID --output /exchange/retried.work
```

See the [Work Spec](/spec/work) for portability and format boundaries.
