---
layout: home
hero:
  name: Piwork
  text: 可分享、可运行的 AI 工作空间
  tagline: 由可演进的 Harness 驱动。
  image:
    src: /logo.png
    alt: Piwork
  actions:
    - theme: brand
      text: 开始使用
      link: /zh/guide/quick-start
    - theme: alt
      text: GitHub
      link: https://github.com/pphboy/piwork
    - theme: alt
      text: 讨论社区
      link: https://github.com/pphboy/piwork/discussions
---

## Piwork 是什么？

Piwork 将可运行的 AI 工作空间封装成一个可携带的单元，称为 **Work**。应用、文件、对话历史和执行环境保存在一起；导出后，可以在另一个 Piwork 实例中继续使用。

| 概念 | 职责 |
| --- | --- |
| [Work](/zh/concepts/work) | **工作空间。** 保存环境和持久状态。 |
| [Service](/zh/concepts/service) | **能力。** 运行应用、API 或其他容器服务。 |
| [Harness](/zh/concepts/harness) | **智能层。** 通过模型、工具和工作空间专属指令理解并操作 Work。 |

Harness 可以帮助构建和修改它所在的工作空间。它的指令、Skills、扩展包和经过验证的经验，可以随着 Work 一起演进。

## 如何使用

**创建 → 运行 → 演进 → 导出 → 分享 → 导入 → 继续**

将已停止的 Work 导出为 `.work` 文件，在兼容的实例中导入，再手动启动。接收方需要配置自己的模型凭据。

## 演示：Kanban Work

看板、数据、应用 Service 和帮助构建及操作看板的 Harness，共同组成一个工作空间。[查看 Kanban 演示说明](/zh/demo/kanban)。可下载的演示包和录屏仍在准备中。

## 开始使用

[在终端试用 Core 和 CLI](/zh/guide/quick-start.html)：使用已有初始化环境，Core 和 CLI 各一条 Docker 命令，Core 也可单独下载 [docker-compose.yml](/piwork/install/0.0.1-fc409adc1a0b-808d890c6607-dirty/docker-compose.yml)。登录、创建 Work 后即可收到首条回复。镜像已发布并通过匿名拉取验证；Compose 下载入口将在本次官网更新后启用。

原生 CLI 保留为 Quick Start 的折叠替代入口。高级 Core-only Demo 见 [安装说明](/zh/guide/installation.html#core-compose-demo)。
