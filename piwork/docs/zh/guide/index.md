# 开始使用

**Core** 在 Linux Docker 主机上管理 Work、Agent、Service 和数据；**CLI** 提供终端用户命令。首次试用在同一台 Linux 电脑完成，需要受支持的模型提供方和 API key。

1. [快速开始](/zh/guide/quick-start)：默认 Docker run，终端登录、创建 Work并收到回复；原生 CLI 是折叠选项。
2. [安装与部署](/zh/guide/installation)：环境要求、可选 Core Compose Demo、故障处理和恢复。
3. [第一个 Work](/zh/guide/first-work)：终端文件任务，以及停止、导出、导入和继续使用。

已有配置完成的 Core 时，直接使用快速开始中的 CLI 入口。

需要开发应用？[Web 开发指南](/zh/guide/web-development.html)介绍默认基础镜像、自动生效、sqlite3、持久化与升级。

配置模型请阅读 [AI 模型](/zh/guide/ai-models.html)：单表单添加、消息 Test、Runtime 默认选择及 Work/Thinking 升级边界。

## 当前支持范围

已发行 0.0.2 Preview 的镜像为 linux/amd64，Core 使用 Linux rootful Docker Engine 28+ 和本机 Unix socket。客户端支持 Linux 或 Windows Docker Desktop 的 Linux 容器模式，Windows 客户端连接 Linux Core。Compose 2.24+ 仅用于可选 Core Demo 或高级部署。

WSL2 用户须有可用的 Linux Engine Unix socket；具体测试环境与边界见[上游终端验收记录](https://github.com/pphboy/piwork/blob/main/docs/docker-quickstart-acceptance.md)。Desktop 仍作为独立用户入口提供，终端试用不依赖它。

[规范概览](/zh/spec/)记录源码与镜像来源，应用示例见 [Kanban Work](/zh/demo/kanban)。

<!-- docker-trial-route -->
[终端 Quick Start](/zh/guide/quick-start.html) 使用独立 Core/CLI 镜像，Core 可单独采用 Compose；合并方式见单机部署示例，原生构建与管理员操作见独立导航。
<!-- docker-trial-route -->
