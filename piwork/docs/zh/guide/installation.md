# 安装与部署

默认试用见 [Quick Start](/zh/guide/quick-start.html)。统一应用直接提供网页、管理和首次引导；可下载 [docker-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml)；默认不需要业务环境变量，浏览器完成管理员与模型配置。当前状态：published。

## 平台与持久化

同一进程提供两个 HTTP 服务：UI 默认 `0.0.0.0:17891`，Core 默认 `0.0.0.0:17871`。浏览器只连接 UI，所有文件、事件及 `/services/<workId>/<serviceId>/<port>/` 使用同一入口；后端固定通过 loopback HTTP 连接 Core。外部 Linux CLI 直接连接服务器 Core 端口。仅使用 --ui-port/--core-port 改端口。UI 接受本机实际 IPv4、localhost、回环和主机名，校验 Host、Origin 与 CSRF，不信任 Forwarded；切换地址需独立登录。只提供 HTTP，不提供 HTTPS、域名或反向代理配置。内部 Agent 保留容器可达的 7172 mTLS 回连。用户 Service 不发布宿主端口，模型端点须从 Work 网络可达。

可选 CLI 单机示例见 [单机部署示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md)。可单独下载 [示例 Compose](/piwork/install/0.0.10-024c864cb667-99aec1718558/single-host-compose.yml)。

## Core Compose Demo

<!-- core-compose-demo:start -->

可选 Compose Demo 使用独立数据目录 `/var/lib/piwork/core`，正常停止占用相同端口的安装后再启动。模型和管理员仍在网页设置。

```sh
PIWORK_CORE_IMAGE=docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558 \
    docker compose -f compose.core.yaml up --detach --wait --wait-timeout 600 core
```

<!-- core-compose-demo:end -->

## Terminal operations

<!-- terminal-operations:start -->

进程健康与运行环境就绪分开：未完成网页初始化时 /healthz 可用，/readyz 尚未就绪。用户、模型、运行环境和依赖准备在内嵌 Admin 完成；operator 凭证和受保护管理 API 保留，用户 CLI 不读取 operator 凭证。

```sh
curl --fail http://127.0.0.1:17891/healthz
docker logs --tail 100 piwork-core-quickstart
```

同一进程提供两个 HTTP 服务：UI 默认 `0.0.0.0:17891`，Core 默认 `0.0.0.0:17871`。浏览器只连接 UI，所有文件、事件及 `/services/<workId>/<serviceId>/<port>/` 使用同一入口；后端固定通过 loopback HTTP 连接 Core。外部 Linux CLI 直接连接服务器 Core 端口。仅使用 --ui-port/--core-port 改端口。UI 接受本机实际 IPv4、localhost、回环和主机名，校验 Host、Origin 与 CSRF，不信任 Forwarded；切换地址需独立登录。只提供 HTTP，不提供 HTTPS、域名或反向代理配置。内部 Agent 保留容器可达的 7172 mTLS 回连。用户 Service 不发布宿主端口，模型端点须从 Work 网络可达。

托管 Service 与工作台同源，须视为可信应用；其脚本可使用当前用户的 UI 权限。应用须支持动态 Service URL 前缀；旧根路径应用不会自动改写源码、镜像或包。Service 支持响应 Cookie 的服务端登录、Basic/Bearer、HTTP、SSE 和 WebSocket。响应 Cookie 按浏览器会话及 Service 保存在服务器，HTTP 入口不转发 Secure Cookie。依赖 document.cookie/Cookie Store 读写（如脚本读取 CSRF Cookie）的应用不保证透明兼容；脚本写入浏览器 Cookie 也不保证同 IP 跨 Service 隔离，且不会转发上游。不支持硬编码 .work URL、跨站 SSO 或上游 HTTPS 的透明适配。应用 CSP/X-Frame-Options 保留；禁止嵌入时使用新标签页。

可选测试初始化：仅 PIWORK_ADMIN_ACCOUNT 与 PIWORK_ADMIN_PASSWORD 成对有效时创建空安装首管理员；已有账号不被覆盖。默认安装无需业务环境变量，模型和镜像不从初始化 env 读取。

在 Linux 客户端终端指定已有 Core 的地址，密码交互输入。ACCOUNT、WORK_ID 来自网页账号和创建结果：

```sh
export PIWORK_CORE_URL=http://SERVER_IP:17871
piwork-cli login --account ACCOUNT
piwork-cli work create --name 'My Work' --wait
piwork-cli chat WORK_ID --message 'Hello, Piwork!'
```

未知修改先读回状态，用原 Operation/Run ID 恢复，不重复创建或发消息。文件和包直接使用客户端本地路径，无交换卷。

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
```

Core 正常关闭会停止本安装受管 Work，保留身份、历史、卷和运行意图。关闭网页或 CLI 不停止 Core 或 Work。

```sh
docker stop --time 60 piwork-core-quickstart
test "$(docker inspect --format '{{.State.ExitCode}}' piwork-core-quickstart)" = 0
docker start piwork-core-quickstart
```

```sh
docker compose -f docker-compose.yml stop core
docker compose -f docker-compose.yml up --detach --wait --wait-timeout 600 core
```

保留同一 Core 数据目录及匹配 Work 卷。升级先正常停止并备份一致数据；保留原镜像引用和清单，格式兼容时才可回退。不要使用 down -v 或全局 prune。Work 导出不是安装备份，导出前须 Stop，导入后显式 Start。

<!-- terminal-operations:end -->

## 高级与旧版本入口

源码与原生构建见 [源码安装](/zh/guide/source-installation.html)。旧 0.0.1 安装包、release.env、模板及 Desktop 说明保留在 [对应版本的上游手册](https://github.com/pphboy/piwork/releases)。本网站原有 install/0.0.1 与 install/0.1.0 地址保持旧版归属，不代表新镜像包含旧配置。
