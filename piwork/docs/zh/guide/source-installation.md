# 源码构建

默认使用 [Quick Start](/zh/guide/quick-start.html) 的统一应用镜像和网页引导。以下仅供开发者，构建需要 Go 1.25.5、Node 24、npm、Git、Make 与 Bash，服务端运行需要 Linux 和本机 Docker Engine。CLI 是可选客户端。

```sh
npm ci
make build
./dist/go/piwork --no-open
```

打开打印的实际 IP 地址及私有首次设置链接，创建管理员时确认两次密码，普通登录后进入 Admin → Quick setup，填写或选择模型并点击 Save and continue；等待全部组件 Ready 后打开工作台。Agent 镜像随服务端版本内置并自动使用，不提供手填或高级覆盖。`--data-dir` 指定持久目录，`--public-origin` 指定远程公开来源；主站和 Service 端口须同时可达。参数见 `./dist/go/piwork --help`。宿主运行不依赖 Node、Go 或 Docker CLI。

[Docker release builds](https://github.com/pphboy/piwork/blob/main/openspec/specs/docker-delivery/spec.md)
