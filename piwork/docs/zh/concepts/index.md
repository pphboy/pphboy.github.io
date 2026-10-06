# 核心概念

Work 是你创建、运行和分享的单元。Services 提供实际能力。Harness 理解工作空间，通过工具和 Services 执行任务。

| 概念 | 具体例子 | 详细说明 |
| --- | --- | --- |
| Work | 保存源码、看板数据、应用和对话历史的 Kanban 工作空间。 | [Work](/zh/concepts/work) |
| Service | 运行看板网页和 API 的容器。 | [Service](/zh/concepts/service) |
| Harness | 使用模型和工具构建看板、检查状态并修改应用的智能层。 | [Harness](/zh/concepts/harness) |

## 三者的关系

**Work 包含** Services、数据、工具、配置和 Harness。**Harness 理解并操作**这些资源。**Core 管理** Work 的生命周期和 Docker 资源。**Desktop / CLI** 提供访问入口。

可携带的单元包括可运行的环境及其持久状态。对话是其中的一部分；分享 Work 时，应用、数据和用于继续工作的资源也能一起移动。

先了解 [Work](/zh/concepts/work)，再阅读 [Harness](/zh/concepts/harness)，可以理解为什么 Piwork 强调完整工作空间和可演进的智能层。
