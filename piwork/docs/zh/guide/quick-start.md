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
    docker.io/pphboy/piwork-core:0.0.9-0901cf119dc1-0e1261f05b9d
```

在本机或另一台电脑直接打开 `http://服务器IP:17891`，使用服务器实际 IP。空安装会显示创建管理员；已有账号时正常登录，无需终端授权链接。

浏览器创建管理员时输入密码及确认密码，随后正常登录进入 Admin 的 **Quick setup**（`/admin/setup`）。按两步引导填写模型 ID、API 类型、Base URL 和 API Key，或选择已保存模型，点击 **Save and continue**，顺序保存模型并绑定 CoreRuntime。准备页面会自动更新；全部依赖显示 Ready 后，点击 **Open workbench** 进入 Piwork。Agent 镜像随服务端版本内置并自动使用，无需也不能手填、选择或高级覆盖。模型 Test 是显式可选操作；保存不自动调用模型。打开工作台创建 Work，然后聊天、管理文件或打开 Service。后续从 Admin **Overview → Quick setup** 返回配置；顶栏 **Workbench** 可随时返回工作台，准备区的完成按钮仍需等待全部 Ready。已保存的账号、模型和 Work 在重启后保留。

一键启动在同一进程运行两个独立 HTTP 服务：ControlPlane 默认 `0.0.0.0:17891`，Core 默认 `127.0.0.1:17871`。浏览器通过实际局域网 IP 的 17891 使用全部 UI、文件、事件及 `/services/<workId>/<serviceId>/<port>/`，无需域名或额外 Service 端口。后端与 CLI/operator 直连 Core；远程或 bridge CLI 需显式配置 `--core-listen 0.0.0.0:17871`（或可达网卡）并放行相应网络，不能把 loopback 当成容器可达。7172 保留为容器可达的内部 Agent mTLS RPC，不是浏览器入口。用户 Service 不发布宿主端口。HTTPS 反向代理须转发同一 origin 的全部路径、SSE 与 WebSocket；Core TLS 如有需要由受信终止入口提供。

托管 Service 与工作台同源，须视为可信应用；其脚本可使用当前用户的 UI 权限。应用须支持动态 Service URL 前缀；旧根路径应用不会自动改写源码、镜像或包。Service 支持响应 Cookie 的服务端登录、Basic/Bearer、HTTP、SSE 和 WebSocket。响应 Cookie 按浏览器会话及 Service 保存在服务器，Secure Cookie 仅通过 HTTPS 入口发送。依赖 document.cookie/Cookie Store 读写（如脚本读取 CSRF Cookie）的应用不保证透明兼容；脚本写入浏览器 Cookie 也不保证同 IP 跨 Service 隔离，且不会转发上游。不支持硬编码 .work URL、跨站 SSO 或上游 HTTPS 的透明适配。应用 CSP/X-Frame-Options 保留；禁止嵌入时使用新标签页。

可选 [Compose](/piwork/install/0.0.9-0901cf119dc1-0e1261f05b9d/docker-compose.yml)（2.24+）和 [单机示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md) 同样直接进入网页；CLI 是高级可选工具。运行与恢复见 [安装手册](/zh/guide/installation.html#terminal-operations)。

<!-- docker-quickstart:end -->

<details>
<summary>构建并使用原生 Linux 应用</summary>

<!-- native-quickstart:start -->

Docker 镜像已包含统一入口。如需原生运行，先[构建当前源码](/zh/guide/source-installation.html)，再从仓库根目录启动 Linux 程序；构建后的可执行文件也可在源码目录外使用：

```sh
./dist/go/piwork --no-open
```

默认数据目录为用户配置目录下 `piwork/server`，监听 `0.0.0.0:17891`；使用终端给出的实际 IP 链接。`--data-dir`、`--listen`、`--public-origin`、`--core-listen` 和 TLS 参数见 `--help`。

直接打开实际 IP 地址创建管理员并正常登录，无需额外链接校验。Agent 镜像随服务端版本内置并自动使用，不提供手填或覆盖；网页创建管理员后配置模型。

使用自定义数据目录时保留相同的 `--data-dir`。退出主程序会按 Core 关闭契约停止受管 Work；关闭网页不会。

同机 ControlPlane 已占用 17891 时，独立 Desktop 使用 `--port 17901`；不会自动换端口。CLI 默认连接 Core `http://127.0.0.1:17871`，显式地址和已有凭据优先，旧地址不会自动迁移。当前源码构建的独立客户端使用 `piwork-cli desktop --no-open` 启动，在本机浏览器打开 `http://desktop.localhost:17891/`（自定义端口以输出为准）。普通浏览器会话自动建立；已有 CLI 登录会直接复用，否则正常登录。`piwork-cli desktop open --no-open` 仅是可选的地址查询，不签发授权；刷新、新浏览器或清 Cookie 均可直接使用相同地址。CLI 容器须发布本机回环端口并保留状态卷，在宿主机浏览器打开输出的地址，无需 `docker exec ... desktop open`。Desktop 与 CLI 共享 Core 凭据；退出登录会清理共享登录，关闭网页不停止 Work。

`piwork-cli` 保留独立 Windows/Linux 命令行与本机 Desktop；`piwork-console` 是独立管理入口，不属于默认启动依赖。历史 [0.0.7 Linux 发布包](https://github.com/pphboy/piwork/releases/download/v0.0.7/piwork-linux-amd64-0.0.7.tar.gz) 与 [实验性 Windows CLI 0.0.5](https://github.com/pphboy/piwork/releases/download/v0.0.5/piwork-cli-windows-amd64-0.0.5.exe) 不包含统一服务端入口。

<!-- native-quickstart:end -->

</details>
