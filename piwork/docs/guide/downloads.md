# Downloads

Get the latest version of Piwork or browse previous releases.

## Latest Release: 0.0.10

Released: October 2024

### Docker Images (Recommended)

**Piwork Core** - All-in-one workbench, administration, and setup

```sh
docker pull docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

**Quick Start:**

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/core:/var/lib/piwork/core \
    docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

Then open `http://YOUR_SERVER_IP:17891` in your browser.

[View full Quick Start guide](/guide/quick-start.html)

### Configuration Files

For declarative deployment:

- [docker-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml) - Core-only setup
- [single-host-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/single-host-compose.yml) - With optional CLI

### Native Builds

For development or custom deployments:

- [Build from Source](/guide/source-installation.html) - Complete build instructions
- Linux CLI (amd64) - Included in Core image, or build separately

### Release Information

- [Release Notes](https://github.com/pphboy/piwork/releases/tag/v0.0.10)
- [All Releases](https://github.com/pphboy/piwork/releases)
- [Changelog](https://github.com/pphboy/piwork/blob/main/CHANGELOG.md)

## System Requirements

Before downloading, ensure your system meets these requirements:

| Requirement | Specification |
|-------------|---------------|
| **Operating System** | Linux x86-64 |
| **Container Runtime** | Docker Engine 28+ (rootful mode) |
| **Ports** | 17891 (UI), 17871 (Core API) |
| **Memory** | 2GB minimum, 4GB+ recommended |
| **Storage** | 10GB+ for images and workspaces |

## Previous Versions

| Version | Release Date | Docker Image | Notes |
|---------|--------------|--------------|-------|
| 0.0.10 | Oct 2024 | `pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558` | Latest stable |
| 0.0.9 | Oct 2024 | `pphboy/piwork-core:0.0.9-...` | [Notes](https://github.com/pphboy/piwork/releases/tag/v0.0.9) |

[View all releases on GitHub](https://github.com/pphboy/piwork/releases)

## Verification

All published images are verified and anonymously tested. Image digests are recorded in release notes for supply chain verification.

To verify your download:

```sh
docker inspect docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558 | grep Digest
```

## Upgrading

Upgrading between versions requires:

1. Stop all running Works
2. Pull the new image
3. Restart the Core container
4. Verify runtime preparation completes

See [Installation Guide](/guide/installation.html) for detailed upgrade procedures.

## Need Help?

- [Quick Start Guide](/guide/quick-start.html) - Get started in 5 minutes
- [Installation Guide](/guide/installation.html) - Detailed deployment instructions
- [GitHub Discussions](https://github.com/pphboy/piwork/discussions) - Community support
- [Report Issues](https://github.com/pphboy/piwork/issues) - Bug reports and feature requests
