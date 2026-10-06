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
      link: /zh/guide/installation
    - theme: alt
      text: GitHub
      link: https://github.com/pphboy/piwork
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

如果你能运行 Docker，就可以尝试 Piwork。你需要 Linux x86-64 Core 主机、Docker Engine 28+、Compose 2.24+ 和模型服务账号。客户端支持 Linux 和 Windows Docker Desktop。

[下载并配置 Docker 安装文件](/zh/guide/installation)，然后启动 Core：

```bash
docker compose --env-file release.env --env-file core.env \
  -f compose.core.yaml up -d --wait --wait-timeout 600 core
```

[打开 Desktop，运行第一个 Work](/zh/guide/quick-start)。问题和反馈可以提交到 [GitHub Discussions](https://github.com/pphboy/piwork/discussions)。
