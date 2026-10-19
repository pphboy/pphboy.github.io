# Quick Start

## 一键启动 Piwork

<!-- docker-quickstart:start -->

Linux x86-64、rootful Docker Engine 28+。运行一个容器即可提供工作台、管理和首次设置，无需环境变量或客户端 CLI：

```sh
docker run --detach --init \
    --name piwork-core-quickstart \
    --network host \
    --restart unless-stopped \
    --stop-timeout 60 \
    --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
    --volume /var/lib/piwork/quickstart/core:/var/lib/piwork/quickstart/core \
    docker.io/pphboy/piwork-core:0.0.7-62f2868cb8e2-d69916b52829-dirty
```

打开终端输出中的访问地址。后台启动时，在服务器查看首次设置链接；该链接授权创建首管理员，十分钟后过期，请勿分享：

```sh
docker logs piwork-core-quickstart
```

链接过期时取得新链接（仅安装维护者可执行）：

```sh
docker exec piwork-core-quickstart piwork-serve --data-dir /var/lib/piwork/quickstart/core setup link
```

浏览器创建管理员时输入密码及确认密码，随后正常登录进入 Admin 的 **Quick setup**（`/admin/setup`）。按两步引导填写模型 ID、API 类型、Base URL 和 API Key，或选择已保存模型，点击 **Save and continue**，顺序保存模型并绑定 CoreRuntime。准备页面会自动更新；全部依赖显示 Ready 后，点击 **Open workbench** 进入 Piwork。Agent 镜像随服务端版本内置并自动使用，无需也不能手填、选择或高级覆盖。模型 Test 是显式可选操作；保存不自动调用模型。打开工作台创建 Work，然后聊天、管理文件或打开 Service。后续从 Admin **Overview → Quick setup** 返回配置；顶栏 **Workbench** 可随时返回工作台，准备区的完成按钮仍需等待全部 Ready。已保存的账号、模型和 Work 在重启后保留。

服务端默认监听 `0.0.0.0:7171`；本机或远程电脑通过实际非回环 IP 打开 `http://服务器IP:7171`。局域网即可使用，无需公网地址。主站放行 TCP 7171，Service 入口另需 TCP 17891–17954（可用 `--service-ports` 修改）；7172 是内部 Agent RPC，不向浏览器开放。端口由 Piwork 代理，不是用户容器直出。只开放主站时工作台仍可使用，Service 入口会不可达。无需域名、DNS 或本机代理。HTTP 不加密；不可信网络请显式配置 HTTPS，并同时放行/代理主站与全部 Service 端口。

Service 支持响应 Cookie 的服务端登录、Basic/Bearer、HTTP、SSE 和 WebSocket。响应 Cookie 按浏览器会话及 Service 保存在服务器，Secure Cookie 仅通过 HTTPS 入口发送。依赖 document.cookie/Cookie Store 读写（如脚本读取 CSRF Cookie）的应用不保证透明兼容；脚本写入浏览器 Cookie 也不保证同 IP 跨 Service 隔离，且不会转发上游。不支持硬编码 .work URL、跨站 SSO 或上游 HTTPS 的透明适配。应用 CSP/X-Frame-Options 保留；禁止嵌入时使用新标签页。

可选 [Compose](/piwork/install/0.0.7-62f2868cb8e2-d69916b52829-dirty/docker-compose.yml)（2.24+）和 [单机示例](https://github.com/pphboy/piwork/blob/main/examples/single-host/README.zh-CN.md) 同样直接进入网页；CLI 是高级可选工具。运行与恢复见 [安装手册](/zh/guide/installation.html#terminal-operations)。

<!-- docker-quickstart:end -->

<details>
<summary>构建并使用原生 Linux 应用</summary>

<!-- native-quickstart:start -->

上方 Docker 镜像已包含统一入口。完成下方源码构建后，从任意目录启动 Linux 程序：

```sh
./dist/go/piwork --no-open
```

默认数据目录为用户配置目录下 `piwork/server`，监听 `0.0.0.0:7171`；使用终端给出的实际 IP 链接。`--data-dir`、`--listen`、`--public-origin`、`--service-ports` 和 TLS 参数见 `--help`。首次设置链接只给安装维护者。Agent 镜像随服务端版本内置并自动使用，不提供手填或覆盖；网页创建管理员后配置模型。`piwork setup link` 可轮换过期证明。退出主程序会按 Core 关闭契约停止受管 Work；关闭网页不会。

`piwork-cli` 保留独立 Windows/Linux 命令行与本机 Desktop；`piwork-console` 仅为旧独立管理入口，不属于默认启动依赖。历史 [0.0.7 Linux 发布包](https://github.com/pphboy/piwork/releases/download/v0.0.7/piwork-linux-amd64-0.0.7.tar.gz) 与 [实验性 Windows CLI 0.0.5](https://github.com/pphboy/piwork/releases/download/v0.0.5/piwork-cli-windows-amd64-0.0.5.exe) 不包含本次统一服务端入口。

<!-- native-quickstart:end -->

</details>
