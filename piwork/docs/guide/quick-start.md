# Quick Start

You need a configured, ready Core. If you do not have one, follow [Installation](/guide/installation) first. Run these commands from the directory containing the downloaded setup files, on your client computer.

## Start Desktop on Linux

```bash
cp client.env.example client.env
chmod 600 client.env
```

For Core on this computer, keep `PIWORK_CORE_URL=http://host.docker.internal:7171`. For a remote Core, replace it with that Core's reachable HTTP or HTTPS origin.

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml -f compose.cli.linux.yaml pull cli
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml -f compose.cli.linux.yaml \
  up -d --wait --wait-timeout 60 cli
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml exec -T cli piwork-cli desktop open --no-open
```

The Linux override adds the host gateway needed to reach a Core on this computer. Later `exec` commands select the already running container and do not need the override again.

## Start Desktop on Windows

Use Docker Desktop with Linux containers. Download the [setup files](/guide/installation#download-the-setup-files) into a new directory; WSL can run the download commands, or save the individual files through your browser. In PowerShell:

```powershell
Copy-Item .\client.env.example .\client.env
notepad .\client.env
```

Set `PIWORK_CORE_URL` to the reachable origin of your **Linux Core host**. Core is not deployed inside Windows Docker Desktop in the current supported setup.

```powershell
docker compose --env-file release.env --env-file client.env -f compose.cli.yaml pull cli
docker compose --env-file release.env --env-file client.env -f compose.cli.yaml up -d --wait --wait-timeout 60 cli
docker compose --env-file release.env --env-file client.env -f compose.cli.yaml exec -T cli piwork-cli desktop open --no-open
```

Do not add `compose.cli.linux.yaml` on Windows.

## Open the UI

Paste the **complete URL printed by `desktop open`** into a browser on the same computer. It contains a single-use local authorization ticket and expires after five minutes. A bare `http://localhost:17891` URL is not a replacement for this first authorization step.

Enter your reachable Core URL, account, and password. For a fresh installation, use the administrator account from `core.env`. The CLI stores Core credentials; the browser uses a local Desktop session.

To obtain another link, repeat:

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml exec -T cli piwork-cli desktop open --no-open
```

After restarting or recreating the CLI container, get a new link. Old local browser sessions are no longer valid.

## Create or import a Work

In Desktop, choose **New Work**, enter a name, then **Create Work** and wait for creation to finish. Open that Work and choose **Start Work**. Use **Chat** for the Harness, **Service** for applications, and **Files** for workspace files.

If someone gave you a `.work` file, use the import flow instead. Wait for import to finish, open the new Work, then start it explicitly. The target Core must already have a compatible model and credentials.

Continue with [Your First Work](/guide/first-work).
