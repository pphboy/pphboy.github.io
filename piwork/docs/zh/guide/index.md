# 开始使用

一个 Linux 应用提供 **Core**、网页工作台、**Admin** 管理和首次设置。其他 Linux 或 Windows 电脑直接通过服务器 IP 打开浏览器使用，CLI 是独立可选工具。

1. [一键启动](/zh/guide/quick-start.html)：运行一个 Docker 容器，通过私有设置链接创建管理员并确认密码，正常登录后在 **Admin → Quick setup** 填写或选择模型。
2. [安装与部署](/zh/guide/installation.html)：平台、端口、持久化、可选 Compose、故障处理及恢复。
3. [第一个 Work](/zh/guide/first-work.html)：等待准备完成，点击 **Open workbench** 后创建 Work，使用 Chat、Files 和 Service。

已有安装可直接打开工作台；管理员从 **Overview → Quick setup** 重新配置。**Save and continue** 顺序保存模型与 CoreRuntime，Test 显式可选，Agent 镜像由服务端发行版本固定，不需要填写。

需要开发应用？[Web 开发指南](/zh/guide/web-development.html)介绍默认环境、持久化和升级。模型协议、Key、Test 和 Thinking 见 [AI 模型](/zh/guide/ai-models.html)。

## 当前支持范围

镜像面向 Linux amd64；Core 使用 Linux rootful Docker Engine 28+ 和同机 Unix socket。网页工作台可从远程浏览器访问，无需域名、DNS、WSL 或客户端 CLI。主站默认 7171，Service 入口为 17891–17954，7172 仅供内部 Agent RPC。Compose 2.24+ 仅用于可选 Compose 部署。

[规范概览](/zh/spec/)记录源码及镜像来源；应用示例见 [Kanban Work](/zh/demo/kanban)。

<!-- docker-trial-route -->
[Quick Start](/zh/guide/quick-start.html) 使用统一应用与网页引导，CLI 可选；原生构建与管理员操作见独立导航。
<!-- docker-trial-route -->
