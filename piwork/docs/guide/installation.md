# Installation and Deployment

Complete guide for deploying and managing Piwork in production or development environments.

## Quick Links

- **New to Piwork?** Start with [Quick Start](/guide/quick-start.html)
- **Need the latest version?** Visit [Downloads](/guide/downloads.html)
- **Building from source?** See [Build from Source](/guide/source-installation.html)

## Deployment Options

### 1. Docker Run (Recommended for testing)

The simplest way to get started:

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/core:/var/lib/piwork/core \
    docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

[Full Quick Start guide](/guide/quick-start.html)

### 2. Docker Compose (Recommended for production)

For declarative configuration and easy management:

**Core-only setup:**

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558 \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

Download: [docker-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml)

**With optional CLI:**

Download: [single-host-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/single-host-compose.yml)

See [Single-host deployment example](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.md)

### 3. Native Build

For development or custom deployments:

- [Build from Source](/guide/source-installation.html) - Complete build instructions

## Network Configuration

### HTTP Listeners

Piwork Core runs two HTTP services:

| Service | Default Port | Usage |
|---------|-------------|-------|
| **UI** | `0.0.0.0:17891` | Browser access (workbench, admin, files, events, Service proxy) |
| **Core API** | `0.0.0.0:17871` | Internal backend and external CLI access |

- **Browsers** connect only to the UI port
- **Backend** uses loopback HTTP to reach Core API
- **External Linux CLI** connects directly to Core API port
- **Internal Agent** uses mTLS on port 7172 (container-reachable only)

### Changing Ports

Use command-line flags to customize ports:

```sh
docker run ... docker.io/pphboy/piwork-core:VERSION \
    --ui-port 8080 \
    --core-port 8081
```

### Access Control

- UI accepts: actual local IPv4 addresses, localhost, loopback, and machine hostname
- Validates: Host, Origin, and CSRF tokens
- **Each address requires separate login**
- HTTP only (no HTTPS, custom domain, or reverse proxy support)
- Model endpoints must be reachable from Work networks

## Service Proxy Configuration

Piwork hosts user Services under the workbench origin at `/services/<workId>/<serviceId>/<port>/`.

### Requirements for Services

- **Must support dynamic URL prefix** (old root-path apps are not rewritten)
- **Must be trusted** (scripts can access current user's UI permissions)

### Supported Features

✅ Server-side login (response Cookies, Basic/Bearer)  
✅ HTTP, SSE, WebSocket  
✅ Response Cookies (server-side, partitioned by session and Service)  
✅ Application CSP/X-Frame-Options (preserved)

### Limitations

❌ Script-read/written Cookies (document.cookie, Cookie Store) - not transparent  
❌ Secure Cookies through HTTP entry - not forwarded  
❌ Cookie isolation across Services on same IP - not guaranteed  
❌ Hard-coded `.work` URLs, cross-site SSO, upstream HTTPS - not supported

**Workaround:** Open an application tab when embedding is denied.

## Health and Readiness

Process health and runtime readiness are separate:

```sh
# Health check (available immediately)
curl --fail http://127.0.0.1:17891/healthz

# Readiness check (ready after setup completes)
curl --fail http://127.0.0.1:17891/readyz

# View logs
docker logs --tail 100 piwork-core-quickstart
```

## Initial Setup

After starting Piwork for the first time:

1. Open `http://YOUR_SERVER_IP:17891` in your browser
2. Create administrator account (password confirmation in browser)
3. Configure AI model in **Admin → Quick setup**
4. Wait for runtime preparation to complete

**No business environment variables required** for default setup.

### Optional Test Bootstrap

For automated testing, use paired environment variables:

```sh
docker run ... \
    -e PIWORK_ADMIN_ACCOUNT=admin \
    -e PIWORK_ADMIN_PASSWORD=your_password \
    docker.io/pphboy/piwork-core:VERSION
```

**Note:** Only initializes the first administrator on an empty installation. Existing accounts are retained.

## CLI Usage

For Linux clients connecting to a remote Core:

```sh
# Configure Core address
export PIWORK_CORE_URL=http://SERVER_IP:17871

# Login (password entered interactively)
piwork-cli login --account ACCOUNT

# Create Work
piwork-cli work create --name 'My Work' --wait

# Send chat message
piwork-cli chat WORK_ID --message 'Hello, Piwork!'

# View operation details
piwork-cli operation show OPERATION_ID

# Watch run progress
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

Files and packages use local client paths (no exchange volume).

## Lifecycle Management

### Stopping Piwork

Normal shutdown stops all managed Works and preserves state:

```sh
# Docker run
docker stop --time 60 piwork-core-quickstart

# Docker Compose
docker compose -f docker-compose.yml stop core
```

**Preserved on shutdown:**
- Identities and credentials
- Conversation history
- Work volumes and state
- Configuration

**Note:** Closing browser or CLI does not stop Core or Works.

### Starting Piwork

```sh
# Docker run
docker start piwork-core-quickstart

# Docker Compose
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

### Verifying Exit Status

```sh
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
```

## Backup and Upgrade

### Backup

1. Stop Core normally
2. Back up Core data directory: `/var/lib/piwork/core`
3. Back up Work volumes (if stored separately)
4. Keep image references and manifests for rollback

**Important:** Work exports are not installation backups. Export requires stopped Works; import creates stopped Works that must be started explicitly.

### Upgrade

1. Stop all running Works
2. Stop Core normally
3. Take consistent backup
4. Pull new image: `docker pull docker.io/pphboy/piwork-core:NEW_VERSION`
5. Update container/compose with new image
6. Start Core
7. Verify runtime preparation completes

### Rollback

- Retain prior image references
- Only roll back with compatible formats
- Restore from backup if needed

**Warning:** Do not use `docker compose down -v` or global prune commands.

## Troubleshooting

### Port Conflicts

If ports 17891 or 17871 are in use:

```sh
# Check what's using the port
lsof -i :17891
lsof -i :17871

# Stop conflicting installations
docker stop piwork-core-quickstart
```

### Permission Errors

Piwork requires access to Docker socket:

```sh
# Verify Docker socket mount
docker inspect piwork-core-quickstart | grep docker.sock

# Check Docker daemon is running
systemctl status docker
```

### Works Not Starting

1. Check Core logs: `docker logs piwork-core-quickstart`
2. Verify runtime preparation completed
3. Check model configuration in Admin
4. Ensure model endpoint is reachable

### Data Directory Issues

Ensure `/var/lib/piwork/core` is writable:

```sh
sudo mkdir -p /var/lib/piwork/core
sudo chown $(id -u):$(id -g) /var/lib/piwork/core
```

## Advanced Topics

### Credentials and Security

- **Operator credentials** (admin) are separate from user CLI credentials
- Admin has control permissions but not automatic read access to user Work content
- Use CLI for user-level operations

### Multi-Host Considerations

For distributed deployments:

- Core must run on Linux x86-64
- Browsers can connect from Linux or Windows
- CLI connects to Core API port (17871)
- No domain, DNS, or WSL required for remote browsers

### Legacy Installations

For older versions (0.0.1, release.env, templates):

See [versioned upstream guide](https://github.com/pphboy/piwork/releases)

## Next Steps

- [Create Your First Work](/guide/first-work.html)
- [Configure AI Models](/guide/ai-models.html)
- [Web Development Guide](/guide/web-development.html)
- [View Product Demo](/demo/product-demo.html)
