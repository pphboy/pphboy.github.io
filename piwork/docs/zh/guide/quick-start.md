# Quick Start

## 使用 Docker 试用 Core 和 CLI

<!-- docker-quickstart:start -->

### Core

使用 Linux x86-64 和 Docker Engine 28+。宿主环境中应已有 `PIWORK_ADMIN_ACCOUNT`、`PIWORK_ADMIN_PASSWORD`（至少 12 位）、`PIWORK_MODEL_PROVIDER`、`PIWORK_MODEL`、`PIWORK_API_KEY`。可选 `PIWORK_MODEL_BASE_URL` 使用 Work 可达的 HTTPS 地址；不用时保持未设置。

在宿主终端运行 Core。镜像自带发行默认值，并自动准备 Agent 和 helper：

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --stop-timeout 60 \
    --env PIWORK_ADMIN_ACCOUNT \
    --env PIWORK_ADMIN_PASSWORD \
    --env PIWORK_MODEL_PROVIDER \
    --env PIWORK_MODEL \
    --env PIWORK_API_KEY \
    --env PIWORK_MODEL_BASE_URL \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    docker.io/pphboy/piwork-core:0.0.1-fc409adc1a0b-808d890c6607-dirty
```

Core 也可用 [Core-only docker-compose.yml](/piwork/install/0.0.1-fc409adc1a0b-808d890c6607-dirty/docker-compose.yml) 单独部署（Compose 2.24+），CLI 仍使用自己的 Docker 命令。切换 Core 部署方式前先停止原容器，保留同一数据目录。Core 与 CLI 合并的可选方式见 [单机部署示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md)。

### CLI

CLI 独立运行，只需已有且可达的 Core，不需要 Core 初始化变量。下面连接同机 Core；连接其他 Core 时替换 `PIWORK_CORE_URL`。它等待完整就绪后进入终端：

```sh
docker run --rm --init --interactive --tty \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    docker.io/pphboy/piwork-cli:0.0.1-fc409adc1a0b-808d890c6607-dirty
```

下面的命令在 **CLI 容器内**执行。将 `ACCOUNT` 替换为你的账号；登录时隐藏密码输入。创建 Work 会自动启动它：

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

使用创建结果中的实际 `workId` 替换 `WORK_ID`，发送第一条消息：

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

回复直接显示在终端。用 `exit` 离开；同样的 CLI 启动命令会复用凭证，Work 不因 CLI 退出而停止。等待失败或观察中断时，按 [终端操作说明](/zh/guide/installation.html#terminal-operations) 查询状态或恢复原 Operation/Run，不重复提交。

<!-- docker-quickstart:end -->

<details>
<summary>使用原生 CLI（连接已有 Core）</summary>

<!-- native-quickstart:start -->

下载 [Linux Core / Console / CLI 包](https://github.com/pphboy/piwork/releases/download/v0.0.1/piwork-linux-amd64-0.0.1.tar.gz)或 [Windows CLI 实验性包](https://github.com/pphboy/piwork/releases/download/v0.0.1/piwork-cli-windows-amd64-0.0.1.zip)。先核对发行 SHA256 再解压；Linux CLI 位于 `bin/`。

连接已经配置完成且就绪的 Core，并与原生 CLI 版本兼容的 Core。在可执行文件所在目录，将 `CORE_URL` 替换为其地址（同机 Linux 为 `http://127.0.0.1:7171`），将 `ACCOUNT` 替换为账号；登录时隐藏输入密码。Windows PowerShell 将 `./piwork-cli` 替换为 `.\piwork-cli.exe`。

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
