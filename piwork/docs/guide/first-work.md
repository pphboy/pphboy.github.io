# Your First Work

Start with a small task that produces a persistent file. This makes it easy to see what a Work retains and what moves with it.

## Create and run

Create `My First Work` in Desktop, start it, and open **Chat**. Try this instruction:

> Create a file named welcome.md in the workspace. Write a short description of this Work and the files currently available. Read the file back and report what you verified.

Open **Files** and check `welcome.md`. The prompt is an example task, not a guaranteed result; confirm the actual file before continuing. Work files live in the shared workspace at `/var/data/workspace`.

The Harness uses models and tools to perform the task. For an application task, it can declare a [Service](/concepts/service) through its Work-scoped tools. Try that next in the [Kanban walkthrough](/demo/kanban).

## Export and continue

1. Stop the Work and wait for its stopped state.
2. Use Desktop's export flow to download a `.work` file.
3. Use the package inspection flow to check the archive.
4. Import it with a new name, on this Core or a compatible second Core.
5. Start the imported Work. Check the file and retained conversation history.

Export contains durable files, history, configuration, Services, Skills, Pi Packages, and fixed images. It does not freeze a live process. Model API keys managed by Piwork are supplied separately on the target. Secrets you saved in files or history remain in the archive.

## The same workflow from the CLI container

The following Bash function is a local shortcut for the real `piwork-cli` inside your running Compose container. Define it in the setup directory:

```bash
piwork_cli() {
  docker compose --env-file release.env --env-file client.env \
    -f compose.cli.yaml exec cli piwork-cli "$@"
}
```

Sign in and create a Work. `login` prompts for the password without placing it in command arguments:

```bash
piwork_cli login --account admin
piwork_cli work create --name 'My First Work' --wait
piwork_cli work list
```

Replace `WORK_ID` below with the actual ID from the result. Creation and starting are separate operations.

```bash
piwork_cli work start WORK_ID --wait
piwork_cli chat WORK_ID --message 'Create welcome.md in the workspace and read it back.'
piwork_cli work service list WORK_ID
piwork_cli work stop WORK_ID --wait
piwork_cli work export WORK_ID --output /exchange/first-work.work
piwork_cli work package inspect /exchange/first-work.work
```

The export destination must not already exist. Save the file on your host:

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml cp cli:/exchange/first-work.work ./first-work.work
```

For a second installation, copy the archive to that client's setup directory and sign in to its configured target Core first. Upload the file into the running CLI container and import it:

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml cp ./first-work.work cli:/exchange/incoming.work
piwork_cli work import /exchange/incoming.work --name 'Continued Work' --wait
piwork_cli work list
piwork_cli work start IMPORTED_WORK_ID --wait
```

Replace `IMPORTED_WORK_ID` with the new ID. Import creates an independent, stopped Work; it does not resume execution automatically.

## If an operation is interrupted

Keep the returned Operation ID and inspect it before submitting another action:

```bash
piwork_cli operation show OPERATION_ID
```

A client disconnect does not cancel an accepted operation. If an export download was interrupted, use its original Snapshot ID to retry the download into a new output path:

```bash
piwork_cli work snapshot download SNAPSHOT_ID --output /exchange/retried.work
```

See the [Work specification](/spec/work) for portability and format limits.
