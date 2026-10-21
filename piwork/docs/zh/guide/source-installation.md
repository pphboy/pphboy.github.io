# 源码构建

```sh
npm ci
make build
```

先按[开发入口](https://github.com/pphboy/piwork/blob/main/AGENTS.md#构建与验证)构建当前源码，再从仓库根运行；发行程序也可离开源码目录使用。原生程序仅支持 Linux x86-64。

```sh
./dist/go/piwork-core
```

Core 自带管理 UI、工作台和首次设置。只接受 `--ui-port`（17891）、`--core-port`（17871）、`--data-dir`（用户配置目录下 piwork/server）三项运行配置；`--help`、`--version` 仅查询信息。端口为 1–65535，必须不同且不能使用内部 RPC 7172。相对数据路径相对当前目录解析。

```sh
./dist/go/piwork-core --ui-port 17991 --core-port 17971 --data-dir /var/lib/piwork/custom/core
```

使用其中一种启动方式。打开输出的 HTTP URL 创建管理员，登录 Admin 的 Quick setup 配置模型和运行环境。无图形环境可手工打开该地址。Ctrl+C 正常关闭会停止本安装受管 Work，保留数据、历史和运行意图；重启复用相同数据路径。

Linux 原生客户端默认启动 Desktop，连接已有 Core；同机 UI 已占用 17891 时显式使用另一 Desktop 端口。客户端无需 Docker，不启动或停止 Core。

```sh
./dist/go/piwork-cli --core http://127.0.0.1:17871 desktop --port 17901 --no-open
```

在本机浏览器打开 `http://desktop.localhost:17901/`。Desktop 与用户命令共享凭据，Desktop 默认 Core 偏好独立；业务命令依次选择 --core、PIWORK_CORE_URL、已保存凭据、默认本机地址。关闭浏览器或 CLI 不停止 Work。Windows 浏览器也可直接连接 Linux Core UI。

同一进程提供两个 HTTP 服务：UI 默认 `0.0.0.0:17891`，Core 默认 `0.0.0.0:17871`。浏览器只连接 UI，所有文件、事件及 `/services/<workId>/<serviceId>/<port>/` 使用同一入口；后端固定通过 loopback HTTP 连接 Core。外部 Linux CLI 直接连接服务器 Core 端口。仅使用 --ui-port/--core-port 改端口。UI 接受本机实际 IPv4、localhost、回环和主机名，校验 Host、Origin 与 CSRF，不信任 Forwarded；切换地址需独立登录。只提供 HTTP，不提供 HTTPS、域名或反向代理配置。内部 Agent 保留容器可达的 7172 mTLS 回连。用户 Service 不发布宿主端口，模型端点须从 Work 网络可达。

[Docker release builds](https://github.com/pphboy/piwork/blob/main/openspec/specs/docker-delivery/spec.md)
