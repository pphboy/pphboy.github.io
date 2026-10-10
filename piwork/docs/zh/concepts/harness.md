# Harness

**Harness 是 Work 的智能层**。它将模型执行、工具、工作空间上下文、对话和任务验证，连接到 Work 实际运行的环境。

每个 Work 都有自己的 Harness。聊天是它的一个入口；它还使用文件、Work 专属 Service 工具、Skills 和 Pi Packages，理解并操作整个工作空间。

## 当前能做什么

Piwork 在 Work 的 Agent 容器内运行基于 **Pi Agent SDK** 的 TypeScript Harness。它管理 Sessions 和 Runs，加载指令和工具，调用已配置的模型，并保存私有对话历史。

通过这些工具，它可以：

- 检查工作空间文件和可用 Services。
- 执行任务并操作应用数据。
- 构建或修改工作空间中的应用源码。
- 通过 Core 声明、操作和检查 Services。
- 使用 Work 专属指令、Skills 和扩展包。

例如，在 Kanban Work 中，可以让它检查看板存储、增加功能、重启相关 Service，再验证应用仍能使用。模型说“完成”不等于变更已经通过验证。

当前默认 Brain 为新 Web 应用选择固定的 FastAPI + React + TypeScript + Vite [Web base](/zh/guide/web-development.html)。修改应用后，它完成必要检查、构建和 Service 部署，再验证实际加载版本与业务结果。标准模板会自动更新已打开页面，单纯保存文件不代表完成交付。获准的 sqlite3 bash 在已预装命令的 Agent 中执行。

管理员在 Serve UI **AI models** 直接添加独立模型连接；Work Chat 选择获准模型。未知 Thinking 的自定义模型可用 **Normal** 发送，原有非空 Thinking 偏好需显式确认后再切换。完整配置、Test 与配套版本要求见 [AI 模型](/zh/guide/ai-models.html)。

## 为什么是“可演进的”？

Harness 的上下文属于 Work。随着工作空间发展，它的指令、Skills、工具和扩展包可以更适合这个环境。这些资源和历史会随 Work 一起导出。

当前**实验性 `piwork-brain` 包**提供结构化 Service 交互、任务证据、经过验证的经验，以及准备扩展包自身变更的受控路径。候选经验只有在关联任务成功验证后才生效。准备好的扩展包变更，需要用户显式 **Apply** 并执行行为检查；修改文件不会热更新正在运行的 Harness。

因此，演进有具体含义：调整操作某个工作空间所需的资源，同时保留可检查的配置、运行上下文和验证结果。

## 长期方向

目标是让 Harness 越来越适合特定 Work 和用户。这是产品方向，不是对无限制自动自我改进的承诺。当前行为取决于启用的扩展包、兼容镜像、可用工具和模型配置。

Harness 不能绕过 Core 的权限、配额和生命周期规则。导出持久上下文不会导出模型 API Key，也不会让接收方恢复正在执行的任务。

当前接口和实验性边界见 [Harness 规范](/zh/spec/harness)。
