# Quick Start

## 一键启动 Piwork

<!-- docker-quickstart:start -->

Linux x86-64、rootful Docker Engine 28+。运行一个容器即可提供工作台、管理和首次设置，无需环境变量或客户端 CLI：

本版固定镜像包含直接访问与网页配置流程。

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --stop-timeout 60 \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    docker.io/pphboy/piwork-core:0.0.10-024c864cb667-99aec1718558
```

在本机或另一台电脑直接打开 `http://服务器IP:17891`，使用服务器实际 IP。空安装会显示创建管理员；已有账号时正常登录，无需终端授权链接。

浏览器创建管理员时输入密码及确认密码，随后正常登录进入 Admin 的 **Quick setup**（`/admin/setup`）。按两步引导填写模型 ID、API 类型、Base URL 和 API Key，或选择已保存模型，点击 **Save and continue**，顺序保存模型并绑定 CoreRuntime。准备页面会自动更新；全部依赖显示 Ready 后，点击 **Open workbench** 进入 Piwork。Agent 镜像随服务端版本内置并自动使用，无需也不能手填、选择或高级覆盖。模型 Test 是显式可选操作；保存不自动调用模型。打开工作台创建 Work，然后聊天、管理文件或打开 Service。后续从 Admin **Overview → Quick setup** 返回配置；顶栏 **Workbench** 可随时返回工作台，准备区的完成按钮仍需等待全部 Ready。已保存的账号、模型和 Work 在重启后保留。

同一进程提供两个 HTTP 服务：UI 默认 `0.0.0.0:17891`，Core 默认 `0.0.0.0:17871`。浏览器只连接 UI，所有文件、事件及 `/services/<workId>/<serviceId>/<port>/` 使用同一入口；后端固定通过 loopback HTTP 连接 Core。外部 Linux CLI 直接连接服务器 Core 端口。仅使用 --ui-port/--core-port 改端口。UI 接受本机实际 IPv4、localhost、回环和主机名，校验 Host、Origin 与 CSRF，不信任 Forwarded；切换地址需独立登录。只提供 HTTP，不提供 HTTPS、域名或反向代理配置。内部 Agent 保留容器可达的 7172 mTLS 回连。用户 Service 不发布宿主端口，模型端点须从 Work 网络可达。

托管 Service 与工作台同源，须视为可信应用；其脚本可使用当前用户的 UI 权限。应用须支持动态 Service URL 前缀；旧根路径应用不会自动改写源码、镜像或包。Service 支持响应 Cookie 的服务端登录、Basic/Bearer、HTTP、SSE 和 WebSocket。响应 Cookie 按浏览器会话及 Service 保存在服务器，HTTP 入口不转发 Secure Cookie。依赖 document.cookie/Cookie Store 读写（如脚本读取 CSRF Cookie）的应用不保证透明兼容；脚本写入浏览器 Cookie 也不保证同 IP 跨 Service 隔离，且不会转发上游。不支持硬编码 .work URL、跨站 SSO 或上游 HTTPS 的透明适配。应用 CSP/X-Frame-Options 保留；禁止嵌入时使用新标签页。

可选 [Compose](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml)（2.24+）和 [单机示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md) 同样直接进入网页；CLI 是高级可选工具。运行与恢复见 [安装手册](/zh/guide/installation.html#terminal-operations)。

<!-- docker-quickstart:end -->

<details>
<summary>构建并使用原生 Linux 应用</summary>

<!-- native-quickstart:start -->

先按[开发入口](/zh/guide/source-installation.html)构建当前源码，再从仓库根运行；发行程序也可离开源码目录使用。原生程序仅支持 Linux x86-64。

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

<!-- native-quickstart:end -->

</details>
