# 开始使用

Piwork 有两个入口：**Core** 在 Linux Docker 主机上管理 Work；**CLI / Desktop** 连接 Core，并在浏览器中提供操作界面。Core 还负责管理 Agent、Service 和辅助容器。

第一次使用，建议在同一台 Linux 电脑上运行 Core 和 Desktop。执行 AI 任务还需要受支持的模型服务和 API Key。

1. [安装并配置 Core](/zh/guide/installation)。
2. [启动 Desktop、登录并创建 Work](/zh/guide/quick-start)。
3. [运行、导出和导入第一个 Work](/zh/guide/first-work)。

已有可用的 Core？直接阅读[快速开始](/zh/guide/quick-start)。

## 第一次体验

创建 Work，启动它的 Harness，让它生成一个文件，再通过 Desktop 查看。停止并导出 Work，导入为一个独立副本，继续使用其中的文件和历史。

想尝试应用工作空间，可以阅读 [Kanban Work 演示说明](/zh/demo/kanban)。

## 当前支持范围

Core 运行在一台 Linux 主机上。Docker 镜像当前面向 `linux/amd64`。CLI 容器可以在 Linux 上运行，也可以在 Windows Docker Desktop 的 Linux 容器模式下运行；浏览器与 CLI 必须在同一台电脑上。

WSL2 用户需要能访问 Docker Engine Unix socket 的 Linux 环境。当前交付记录没有单独验证 WSL2 Core；已记录的起点是 Linux 主机。

第一版官网使用已有的 `0.1.0` Docker 候选镜像集。[规范概览](/zh/spec/)记录了核对的源码版本和实验性行为。
