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
      text: 观看演示
      link: /zh/demo/product-demo.html
    - theme: alt
      text: GitHub
      link: https://github.com/pphboy/piwork
    - theme: alt
      text: 讨论社区
      link: https://github.com/pphboy/piwork/discussions
---

## 70 秒了解 Piwork

AI 创建真实的内容工作室，在保留已有灵感的基础上持续进化，再将整个 Work 迁移到另一套 Piwork 环境。[查看演示与录制说明](/zh/demo/product-demo.html)。

<ProductDemo />

## Piwork 是什么？

Piwork 将可运行的 AI 工作空间封装成一个可携带的单元，称为 **Work**。应用、文件、对话历史和执行环境保存在一起；导出后，可以在另一个 Piwork 实例中继续使用。

| 概念 | 职责 |
| --- | --- |
| [Work](/zh/concepts/work) | **工作空间。** 保存环境和持久状态。 |
| [Service](/zh/concepts/service) | **能力。** 运行应用、API 或其他容器服务。 |
| [Harness](/zh/concepts/harness) | **智能层。** 通过模型、工具和工作空间专属指令理解并操作 Work。 |

Harness 可以帮助构建和修改它所在的工作空间。它的指令、Skills、扩展包和经过验证的经验，可以随着 Work 一起演进。

默认 Web 开发使用可复用的 Python + NiceGUI + SQLite 环境。标准模板自动采用已部署的更新；使用与维护入口见 [Web 开发](/zh/guide/web-development.html)。

## 如何使用

**创建 → 运行 → 演进 → 导出 → 分享 → 导入 → 继续**

将已停止的 Work 导出为 `.work` 文件，在兼容的实例中导入，再手动启动。接收方需要配置自己的模型凭据。

## 示例：Kanban Work

看板、数据、应用 Service 和帮助构建及操作看板的 Harness，共同组成一个工作空间。[查看 Kanban 演示说明](/zh/demo/kanban)。该看板示例的可下载演示包和录屏仍在准备中。

## 开始使用

[一键启动 Piwork](/zh/guide/quick-start.html)：一个 Docker 容器，打开服务器 IP 的网页完成管理员、模型与 CoreRuntime 配置，直接使用完整工作台。无需 CLI、域名或初始化环境。可选 [docker-compose.yml](/piwork/install/0.0.10-024c864cb667-99aec1718558/docker-compose.yml)。当前状态 published；镜像已发布并完成匿名核验。
