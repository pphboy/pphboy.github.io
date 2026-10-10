# 安装与部署

默认试用见 [Quick Start](/zh/guide/quick-start.html)。Core、CLI 独立运行；Core 可下载 [docker-compose.yml](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/docker-compose.yml)；初始化来自已有宿主环境，不需要安装包、配置文件编辑或 Desktop。当前状态：published。

## 平台与持久化

Core 部署在 Linux x86-64、rootful Docker Engine 28+，使用同机 Unix socket、host 网络及 7171/7172。CLI 可用 Linux 或 Windows Docker Desktop 的 Linux 容器连接 Linux Core。Core Compose 和单机部署示例要求 2.24+；直接 Docker run 不要求 Compose。Core 同绝对路径 bind 与 CLI 用户状态卷保持分离，模型端点须从 Work 网络可达。

合并运行 Core 和 CLI 见 [单机部署示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md)。可单独下载 [示例 Compose](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/single-host-compose.yml)。

## Service 与模型升级

0.0.2 使用配套 Core、Console、Agent/helper 和 CLI；新模型流程与 Normal 依赖兼容 Agent，旧 Work 更换镜像仍需显式 Apply。升级前正常停止安装并备份 Core 数据、受管卷和私有配置，迁移后的 registry/nullable 历史不供旧二进制直接读取。见 [AI 模型](/zh/guide/ai-models.html)。应用 Service 不设置 Piwork 内存上限或内存预留，CPU/数量及 Agent/helper 内存政策仍有效；默认环境、sqlite3 与页面自动采用见 [Web 开发](/zh/guide/web-development.html)。

## Core Compose Demo

<!-- core-compose-demo:start -->

这是可选的高级 Core-only Demo，使用独立的 `/var/lib/piwork/core`，CLI 仍用同版 Docker 终端。与默认示例共用 7171/7172 端口，切换前先正常停止原 Core。宿主仍使用上面的初始化环境；新空目录由挂载和安全初始化创建，已有目录保留原所有者和权限。

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.2-fb4f577da3b4-512ec778b267 \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

在同一宿主运行下列 CLI 命令，然后在容器内按 Quick Start 登录这个 Demo 的账号、创建 Work 并聊天。就绪等待在镜像入口内完成：

```sh
docker run --rm --init --interactive --tty \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    docker.io/pphboy/piwork-cli:0.0.2-fb4f577da3b4-512ec778b267
```

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

宿主终端中检查默认 Docker run Core。完整就绪不同于进程健康；修正环境、socket、镜像或端口问题后重试 CLI：

```sh
docker exec piwork-core-quickstart piwork-serve --json status
docker logs --tail 100 piwork-core-quickstart
```

Core 使用单独的 Compose 部署时改用：

```sh
docker compose -f docker-compose.yml exec -T core piwork-serve --json status
docker compose -f docker-compose.yml logs --tail 100 core
```

下面在 CLI 容器内使用原返回值，恢复已经接受的 Operation/Run，不重复创建或发送消息：

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

`--wait` 观察预算为 120 秒。聊天的 Ctrl+C 按既有规则请求取消；继续会话使用原 `SESSION_ID`。登录凭证保存在独立卷，`exit` 和重建 CLI 不停止 Work；同样的 CLI 启动命令可以重新进入。合法初始化值变化不覆盖已保存的管理员或模型，修改使用既有 operator 命令。

正常停止默认 Core，并核对退出成功。受管 Work 停止，原 ID、历史、卷和运行意图保留；失败时保留日志，不宣称已确认关闭：

```sh
docker stop --time 60 piwork-core-quickstart
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
```

复用数据重新启动：

```sh
docker start piwork-core-quickstart
```

Compose 的停止/重启使用下面命令。常规操作不使用 `down -v` 或全局 prune。备份包括一致的 Core 目录和匹配的 Work 卷；只备份 SQLite 或镜像不能恢复完整 Work。升级/回退固定发行引用，保留旧 Compose 与清单，并先核对格式兼容。文件交换与自定义 CA 是可选高级步骤，首次聊天不需要交换卷。

```sh
docker compose -f docker-compose.yml stop core
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

Windows Docker Desktop 使用 Linux 容器，终端 CLI 连接可达的 Linux Core。PowerShell 中 `CORE_URL` 替换为实际地址；密码仍在容器内隐藏输入：

```powershell
docker run --rm --init --interactive --tty `
    --env PIWORK_CORE_URL=CORE_URL `
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client `
    docker.io/pphboy/piwork-cli:0.0.2-fb4f577da3b4-512ec778b267
if ($LASTEXITCODE -ne 0) { throw 'CLI container failed' }
```

远端 Linux 客户端同样替换 Core URL。HTTPS 保持证书验证；模型/MCP 地址须从 Core 的 Work 网络可达，CLI 的宿主别名不能替代它。

<!-- terminal-operations:end -->

## 高级与旧版本入口

源码与原生构建见 [源码安装](/zh/guide/source-installation.html)。旧 0.0.1 安装包、release.env、模板及 Desktop 说明保留在 [对应版本的上游手册](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.zh-CN.md#legacy-001-installer)。本网站原有 install/0.0.1 与 install/0.1.0 地址保持旧版归属，不代表新镜像包含旧配置。
