# 安装与部署

首次试用请直接阅读[快速开始](/zh/guide/quick-start)，从已发行的 [0.0.1 Preview](https://github.com/pphboy/piwork/releases/tag/v0.0.1) 安装包开始。默认 Core 与 CLI 都使用 Docker run，全程在终端登录、创建 Work 和收到回复；Core 自动管理 Agent 和 helper。

## 前置条件

- Linux x86-64 Core 主机，本机 rootful Docker Engine 28+ 和 Unix socket。
- Core 主机的 7171、7172 可用；Work 网络能访问模型服务，需要提供方、模型 ID 和 API key。
- CLI 支持 Linux 或 Windows Docker Desktop 的 Linux 容器模式。Windows 客户端连接可达的 Linux Core。
- 选择下面的 Core Compose Demo 时，另需 Compose 2.24+。

安装不需要 Go、Node.js 或 npm。Core 安装目录在宿主与容器使用同一绝对路径；HTTP 7171 沿用用户认证，远程部署可接已有 HTTPS 入口。

## 安装文件

快速开始的下载命令会校验压缩包及内部清单。安装包不包含离线镜像；后续镜像拉取需要网络。已发行包缺少新 run 模板时，快速开始提供相同空白配置，不需要寻找新发行包。

本站也保存供查看或单独使用的<a href="/piwork/install/0.0.1/release.env" download>镜像引用</a>、<a href="/piwork/install/0.0.1/release-manifest.json" download>发行元数据</a>、<a href="/piwork/install/0.0.1/core.run.env.example" download>run 空白模板</a>、<a href="/piwork/install/0.0.1/compose.core.yaml" download>Core Compose</a>、<a href="/piwork/install/0.0.1/core.env.example" download>Compose 空白模板</a>、<a href="/piwork/install/0.0.1/README.txt" download>来源说明</a>与 <a href="/piwork/install/0.0.1/SHA256SUMS" download>SHA256SUMS</a>。它们使用既有已发行镜像，新模板是文档材料。旧 0.1.0 候选文件保留用于已有链接。

需要源码版本时，参见[从源码构建](/zh/guide/source-installation)。已有正确的 Core 数据和秘密配置时保留它们，初始化 env 只填补缺失值，不覆盖持久管理员或模型。

## Core Compose Demo

<!-- core-compose-demo:start -->

此可选 Demo 使用 Compose 2.24+ **仅部署 Core**，CLI 复用默认路径的交互 Docker run。两个 Core 示例二选一，都会监听 7171/7172；从默认示例切换时，先正常停止它的 Core。Demo 数据位于 `/var/lib/piwork/core`，与默认的 `/var/lib/piwork/quickstart/core` 分开。

下载并校验安装包后，在 Linux Core 宿主机执行。创建并编辑 Compose 专用配置；已有合法 `core.env` 时保留它并跳过这个代码块：

```sh
(
    set -eu
    test ! -e core.env
    cp core.env.example core.env
    chmod 600 core.env
    ${EDITOR:-vi} core.env
)
```

填写同样的五项初始化信息，密码至少 12 位。按 Compose 模板保留单引号语法，使 `$`、空格等保持原值；值内实际单引号按 Compose 规则转义。不要使用 `core.run.env`，也不要 source 任一配置文件。自定义模型 Base URL 须为 Work 容器可达的 HTTPS 地址。

创建新的私有目录，再启动 Core 并等待完整就绪。目录创建命令仅用于新的 root 所有安装，已有安装须保留原归属和权限：

```sh
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core
sudo install -d -m 0700 -o 0 -g 0 /var/lib/piwork/core-exchange
test -S /var/run/docker.sock
```

```sh
docker compose \
    --env-file release.env \
    --env-file core.env \
    -f compose.core.yaml \
    up -d --wait --wait-timeout 600 core
```

在宿主机终端读取镜像引用：

```sh
PIWORK_CORE_IMAGE=$(
    sed -n '/^PIWORK_CORE_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CORE_IMAGE=//p' release.env
)
PIWORK_CLI_IMAGE=$(
    sed -n '/^PIWORK_CLI_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CLI_IMAGE=//p' release.env
)
test -n "$PIWORK_CORE_IMAGE" && test -n "$PIWORK_CLI_IMAGE"
```

进入同一个终端 CLI：

```sh
docker run --rm --init -it \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    --entrypoint /bin/sh \
    "$PIWORK_CLI_IMAGE" -i
```

在 CLI 容器内等待完整就绪，再用 Demo 的账号登录并创建 Work：

```sh
timeout 600 curl \
    --fail --silent --show-error \
    --output /dev/null --max-time 3 \
    --retry 120 --retry-delay 5 --retry-all-errors \
    "${PIWORK_CORE_URL}/readyz?profile=docker-delivery"
```

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

使用创建结果中的实际 `workId`：

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

用 `exit` 退出。Core 状态、关闭和恢复见[终端操作](/zh/guide/installation#terminal-operations)及[上游完整安装手册](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.zh-CN.md)。

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

默认 Docker run Core 就绪或启动失败时，在安装目录的宿主机终端查询：

```sh
docker exec piwork-core-quickstart piwork-serve --json status
docker logs --tail 100 piwork-core-quickstart
```

先修正缺项/非法初始化值、socket 访问、镜像可取得性或端口占用，再继续。进程健康不代表完整交付就绪。就绪探针不调用模型；模型回复失败使用已有 runtime/模型诊断。已有持久管理员或模型值时，修改初始化 env 不会覆盖它们，修改方式见完整手册中的 operator 命令。

Work 操作已接受但等待超时/中断时，使用返回的 Operation ID；聊天流断开时，保留 Work/Run ID 和最后序号。在 **CLI 容器内**将下面占位符替换为实际值，查询原请求，不重新提交：

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

Work 操作的 `--wait` 最多观察 120 秒，仅得到 Operation 或 Run ID 不算成功。聊天时 Ctrl+C 按现有 CLI 契约请求取消。继续原对话可用 `chat WORK_ID --session SESSION_ID --message 'Hello again, Piwork!'`，其中 Session ID 来自原结果。

用 `exit` 退出 CLI；命名状态卷保留凭证，退出 CLI 不停止 Work。重新进入时，在新的宿主机终端先读取镜像变量，再执行同一个 CLI Docker run，并等待 Core 就绪；对应 Core 的凭证仍有效时无需再次登录。

正常关闭默认 Core 时，在宿主机执行并确认退出码为零：

```sh
(
    set -eu
    docker stop --time 60 piwork-core-quickstart
    test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
)
```

受管 Work 运行容器会停止，数据、历史和持久运行意图保留。非零退出不算已确认正常关闭，应保留日志排查。重启同一 Core 容器，保留其数据：

```sh
docker start piwork-core-quickstart
```

Core Compose Demo 使用：

```sh
docker compose \
    --env-file release.env \
    --env-file core.env \
    -f compose.core.yaml \
    stop core
```

重启时复用 Demo 原来的 `up -d --wait --wait-timeout 600 core`，关闭结果按高级停机章节检查原 Core 容器的退出状态。不要使用 `down -v`、删除数据或全局 prune。导入/导出文件或自定义 CA 时再按完整操作手册使用可选交换存储；首次对话只需要 CLI 凭证卷。

### Windows 或远程 Linux 客户端

Windows Docker Desktop 必须使用 Linux 容器。在 Windows 客户端已校验的安装目录填写实际可达的 Linux Core HTTP/HTTPS origin，再进入交互 CLI；无需 Linux 同机的 host-gateway 参数：

```powershell
$PIWORK_CLI_IMAGE = (
    Get-Content .\release.env |
        Where-Object { $_ -match '^PIWORK_CLI_IMAGE=.+@sha256:[0-9a-f]{64}$' }
).Substring('PIWORK_CLI_IMAGE='.Length)
$PIWORK_CORE_URL = Read-Host 'Reachable Linux Core HTTP/HTTPS origin'
docker run --rm --init -it `
    --env "PIWORK_CORE_URL=$PIWORK_CORE_URL" `
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client `
    --entrypoint /bin/sh `
    "$PIWORK_CLI_IMAGE" -i
if ($LASTEXITCODE -ne 0) { throw 'CLI container failed' }
```

进入容器后，执行上面同样的就绪等待、终端登录、创建和聊天命令。另一台 Linux 客户端也使用同一 Docker run，将 Core URL 改为实际可达地址。HTTPS 保留证书校验，自定义 CA 见完整手册。模型服务由 Linux Work 容器访问，不能用客户端网络代替其可达性。

终端验证单独记录在 [Docker Quick Start 验收](https://github.com/pphboy/piwork/blob/main/docs/docker-quickstart-acceptance.md)，不替代已有 Windows/Desktop 证据。

<!-- terminal-operations:end -->
