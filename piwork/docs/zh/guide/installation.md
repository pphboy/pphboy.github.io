# 安装与部署

默认试用见 [Quick Start](/zh/guide/quick-start.html)。统一应用直接提供网页、管理和首次引导；可下载 [docker-compose.yml](/piwork/install/0.0.8-fbf639bcbf43-c2a689377a51/docker-compose.yml)；默认不需要业务环境变量，浏览器完成管理员与模型配置。当前状态：published。

## 平台与持久化

Core 部署在 Linux x86-64、rootful Docker Engine 28+，使用同机 Unix socket 和 host 网络。主站 7171，Service 入口 17891–17954 须从客户端可达；7172 仅内部 Agent RPC。Linux/Windows 浏览器直接连接 Linux 服务端，CLI 是可选高级工具。Core Compose 和单机部署示例要求 2.24+；直接 Docker run 不要求 Compose。Core 同绝对路径 bind 与 CLI 用户状态卷保持分离，模型端点须从 Work 网络可达。

可选 CLI 单机示例见 [单机部署示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md)。可单独下载 [示例 Compose](/piwork/install/0.0.8-fbf639bcbf43-c2a689377a51/single-host-compose.yml)。

## Core Compose Demo

<!-- core-compose-demo:start -->

可选 Compose Demo 使用独立数据目录 `/var/lib/piwork/core`，正常停止占用相同端口的安装后再启动。模型和管理员仍在网页设置。

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.8-fbf639bcbf43-c2a689377a51 \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

进程健康与运行环境就绪分开：未创建管理员或模型时网页和 /healthz 正常，/readyz 尚未就绪。

```sh
docker exec piwork-core-quickstart piwork-serve --data-dir /var/lib/piwork/quickstart/core --json status
```

CoreRuntime 的 Agent 镜像由目标 Core 的发行版本固定；旧脚本移除 `config set --agent-image`，其他模型和 Key 参数不变。在线使用目标 Core 版本，离线初始化使用本地服务端内嵌值。升级后读取或启动保留原 Runtime；显式再次保存才采用当前发行引用，仅影响后续新 Work，已有 Work 保持不变。

```sh
docker exec --interactive --tty piwork-core-quickstart piwork-serve --data-dir /var/lib/piwork/quickstart/core config set --model-provider PROVIDER --model MODEL
```

服务端默认监听 `0.0.0.0:7171`；本机或远程电脑通过实际非回环 IP 打开 `http://服务器IP:7171`。局域网即可使用，无需公网地址。主站放行 TCP 7171，Service 入口另需 TCP 17891–17954（可用 `--service-ports` 修改）；7172 是内部 Agent RPC，不向浏览器开放。端口由 Piwork 代理，不是用户容器直出。只开放主站时工作台仍可使用，Service 入口会不可达。无需域名、DNS 或本机代理。HTTP 不加密；不可信网络请显式配置 HTTPS，并同时放行/代理主站与全部 Service 端口。

Service 支持响应 Cookie 的服务端登录、Basic/Bearer、HTTP、SSE 和 WebSocket。响应 Cookie 按浏览器会话及 Service 保存在服务器，Secure Cookie 仅通过 HTTPS 入口发送。依赖 document.cookie/Cookie Store 读写（如脚本读取 CSRF Cookie）的应用不保证透明兼容；脚本写入浏览器 Cookie 也不保证同 IP 跨 Service 隔离，且不会转发上游。不支持硬编码 .work URL、跨站 SSO 或上游 HTTPS 的透明适配。应用 CSP/X-Frame-Options 保留；禁止嵌入时使用新标签页。

端口与 Service 身份持久绑定，重启不把旧 origin 分配给另一个应用。入口池耗尽时维护者显式扩大范围并放行端口；旧授权不跨重启保留。

高级部署：`--public-origin` 指定精确公开来源（忽略客户端 Forwarded 头），`--tls-cert` / `--tls-key` 为所有入口提供 TLS。Key 文件须为私有权限。受信反向代理必须完整转发主站和每个独立 Service 端口，HTTPS 各入口须证书可信；只代理主站不足以使用 Service。模型端点须从 Work 网络可达。

可选测试初始化：仅 `PIWORK_ADMIN_ACCOUNT` 与 `PIWORK_ADMIN_PASSWORD` 成对有效时创建空安装的首管理员。示例合成值：`admin` / `synthetic-test-password`。已有账号不被覆盖；模型及 Agent/helper 的旧初始化环境变量已移除，持久模型继续使用。

可选 CLI 连接已经就绪的 Core，保留独立凭证卷；Windows/Linux 浏览器直接使用网页，无需 CLI。

```sh
docker run --rm --init --interactive --tty \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    docker.io/pphboy/piwork-cli:0.0.8-fbf639bcbf43-c2a689377a51
```

```sh
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
```

```sh
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

未知修改先读回状态，使用原 Operation/Run ID 恢复，不重复创建或发消息：

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

正常停止会停止本安装受管 Work，保留 ID、历史、卷和运行意图；关闭网页或 CLI 不停止 Work。

```sh
docker stop --time 60 piwork-core-quickstart
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
docker start piwork-core-quickstart
```

```sh
docker compose -f docker-compose.yml stop core
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

保留原数据目录及匹配 Work 卷，不使用 down -v 或全局 prune。升级前正常停止旧 Core，复用 `--data-dir`，用户和模型不要求重新输入。备份需要一致的 Core 数据及 Work 卷。

<!-- terminal-operations:end -->

## 高级与旧版本入口

源码与原生构建见 [源码安装](/zh/guide/source-installation.html)。旧 0.0.1 安装包、release.env、模板及 Desktop 说明保留在 [对应版本的上游手册](https://github.com/pphboy/piwork/blob/main/deploy/docker/README.zh-CN.md#legacy-001-installer)。本网站原有 install/0.0.1 与 install/0.1.0 地址保持旧版归属，不代表新镜像包含旧配置。
