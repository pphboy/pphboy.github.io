# 快速开始

## 使用 Docker 试用 Core 和 CLI

<!-- docker-quickstart:start -->

本例在同一台 Linux 电脑运行，要求本机 rootful Docker Engine 28+ 和 `linux/amd64` 镜像。准备模型提供方、模型 ID 和 API key；模型服务须从 Work 容器可达。完成每一步后再继续；命令失败时先停下，按[终端故障处理](/zh/guide/installation#terminal-operations)解决问题。

**1. 下载并校验安装包。**

在宿主机终端执行，从新的目录开始：

```sh
(
    set -eu
    mkdir piwork-preview-0.0.1 || exit
    cd piwork-preview-0.0.1 || exit
    PIWORK_RELEASE_URL=https://github.com/pphboy/piwork/releases/download/v0.0.1
    curl --fail --location \
        --output piwork-docker-0.0.1.tar.gz \
        "$PIWORK_RELEASE_URL/piwork-docker-0.0.1.tar.gz" || exit
    curl --fail --location \
        --output piwork-docker-0.0.1.tar.gz.sha256 \
        "$PIWORK_RELEASE_URL/piwork-docker-0.0.1.tar.gz.sha256" || exit
    sha256sum --check --strict piwork-docker-0.0.1.tar.gz.sha256 || exit
    tar -xzf piwork-docker-0.0.1.tar.gz || exit
    cd piwork-docker || exit
    sha256sum --check --strict SHA256SUMS || exit
) && cd piwork-preview-0.0.1/piwork-docker
```

**2. 配置并启动 Core。**

在解压后的安装目录创建私有 `core.run.env`。新版安装包提供 run 模板；缺少该模板的已发行 `0.0.1` 安装包使用下面的空白配置分支：

```sh
(
    set -eu
    test ! -e core.run.env
    if [ -f core.run.env.example ]; then
        cp core.run.env.example core.run.env
    else
        cat > core.run.env <<'EOF'
# Docker run only. Enter raw values without surrounding syntax quotes; do not source.
# Administrator password: at least 12 characters. Keep this file private (0600).
PIWORK_ADMIN_ACCOUNT=
PIWORK_ADMIN_PASSWORD=
PIWORK_MODEL_PROVIDER=
PIWORK_MODEL=
PIWORK_API_KEY=
# Optional HTTPS endpoint reachable from Work containers; omit instead of leaving empty.
# PIWORK_MODEL_BASE_URL=https://your-model-endpoint.example/v1
EOF
    fi
    chmod 600 core.run.env
    ${EDITOR:-vi} core.run.env
)
```

填写五个空白值，管理员密码至少 **12 位**。直接填写原始值，不要为了配置语法在值外加引号，不要 source 此文件，也不要混用 Compose 专用的 `core.env` 格式。自定义模型地址时，取消 HTTPS `PIWORK_MODEL_BASE_URL` 示例的注释，填写 Work 容器可达的地址；使用提供方默认地址时保持省略。

在同一个宿主机终端，从已校验的 `release.env` 读取固定镜像引用：

```sh
PIWORK_CORE_IMAGE=$(
    sed -n '/^PIWORK_CORE_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CORE_IMAGE=//p' release.env
)
PIWORK_CLI_IMAGE=$(
    sed -n '/^PIWORK_CLI_IMAGE=.*@sha256:[0-9a-f]\{64\}$/s/^PIWORK_CLI_IMAGE=//p' release.env
)
test -n "$PIWORK_CORE_IMAGE" && test -n "$PIWORK_CLI_IMAGE"
```

启动 Core。Docker 创建数据挂载目录，Core 将新的空安装设为私有；两端挂载必须使用相同绝对路径。Core 监听 `7171`、`7172`，沿用已有认证的 HTTP 与控制接口；远程 HTTPS 部署见安装手册。

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --user 0:0 \
    --network host \
    --env-file release.env \
    --env-file core.run.env \
    --env DOCKER_HOST=unix:///var/run/docker.sock \
    --env DOCKER_CONTEXT= \
    --env PIWORK_DATA_DIR=/var/lib/piwork/quickstart/core \
    --env PIWORK_CORE_URL=http://127.0.0.1:7171 \
    --env PIWORK_LISTEN=0.0.0.0:7171 \
    --env PIWORK_AGENT_GRPC_LISTEN=0.0.0.0:7172 \
    --env PIWORK_AGENT_GRPC_ADVERTISE=piwork-core:7172 \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    --stop-timeout 60 \
    "$PIWORK_CORE_IMAGE" serve --allow-insecure-remote
```

Core 自动准备 Agent 和 helper 镜像。安装数据保存在 `/var/lib/piwork/quickstart/core`，Work 数据由 Core 管理。

**3. 进入 CLI 容器。**

在同一个宿主机终端执行。命令进入交互 shell，状态卷会跨容器保留登录凭证：

```sh
docker run --rm --init -it \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    --entrypoint /bin/sh \
    "$PIWORK_CLI_IMAGE" -i
```

**4. 登录、创建 Work 并收到回复。**

以下命令都在 **CLI 容器内**执行。先等待 Core 和依赖完整就绪，最多等待十分钟：

```sh
timeout 600 curl \
    --fail --silent --show-error \
    --output /dev/null --max-time 3 \
    --retry 120 --retry-delay 5 --retry-all-errors \
    "${PIWORK_CORE_URL}/readyz?profile=docker-delivery"
```

等待成功后，将 `ACCOUNT` 替换为 `core.run.env` 中配置的账号。登录时隐藏输入密码。创建 Work 会自动启动，`--wait` 等待该操作成功：

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

将 `WORK_ID` 替换为创建结果中实际的 `workId`，发送第一条消息：

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

模型回复直接显示在终端。用 `exit` 退出容器，登录卷和 Work 会保留；再次执行相同的 CLI 容器启动命令即可进入。Work 操作或消息流中断时，按[终端操作手册](/zh/guide/installation#terminal-operations)使用原 ID 恢复。

<!-- docker-quickstart:end -->

使用 Compose 部署 Core 可参考可选的 [Core Compose Demo](/zh/guide/installation#core-compose-demo)，CLI 仍使用同一终端入口。只有该 Demo 或高级 Compose 部署需要 Compose 2.24+。Windows Docker 客户端和远程 Linux Core 地址见 [Docker 安装手册](/zh/guide/installation#terminal-operations)。

<details>
<summary>使用原生 CLI（连接已有 Core）</summary>

<!-- native-quickstart:start -->

下载 [Linux Core / Console / CLI 包](https://github.com/pphboy/piwork/releases/download/v0.0.1/piwork-linux-amd64-0.0.1.tar.gz)或 [Windows CLI 实验性包](https://github.com/pphboy/piwork/releases/download/v0.0.1/piwork-cli-windows-amd64-0.0.1.zip)。先核对发行 SHA256 再解压；Linux CLI 位于 `bin/`。

连接已经配置完成且就绪的 Core，例如上面启动的 Core。在可执行文件所在目录，将 `CORE_URL` 替换为其地址（同机 Linux 为 `http://127.0.0.1:7171`），将 `ACCOUNT` 替换为账号；登录时隐藏输入密码。Windows PowerShell 将 `./piwork-cli` 替换为 `.\piwork-cli.exe`。

```sh
./piwork-cli --core CORE_URL login --account ACCOUNT
./piwork-cli work create --name 'My Work' --wait
```

将创建结果中的实际 `workId` 用于下一条命令：

```sh
./piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

更多命令见[用户 CLI 手册](https://github.com/pphboy/piwork/blob/main/docs/user-cli.md)，平台说明见 [CLI 平台交付](https://github.com/pphboy/piwork/blob/main/docs/cli-platforms.md)。

<!-- native-quickstart:end -->

</details>

[继续使用第一个 Work](/zh/guide/first-work)。
