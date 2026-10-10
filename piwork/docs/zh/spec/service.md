# Service 规范

## 当前行为

Service 是持久保存、归属特定 Work 的应用定义。Core 创建容器、管理启用状态、检查就绪，并在恢复后协调生命周期。

Harness 通过原生 `piwork-service-mcp` 进程和经过身份验证的 Work 专属控制通道访问 Core。Core 检查资源归属、运行身份、策略和配额。用户应用在 Work 的私有 Docker 网络中运行。

## 当前定义和工具

创建 Service 时声明名称、镜像、命令、可选环境变量、工作目录、工作空间访问、端口、就绪和资源设置。准确的必填字段、默认值和嵌套限制见现有 [MCP JSON schemas](https://github.com/pphboy/piwork/blob/main/internal/servicemcp/tools.json)，不要用猜测的 Docker Compose 格式替代。

当前 MCP 工具包括：

| 工具 | 用途 |
| --- | --- |
| `deployment_context` | 查看可用部署上下文。 |
| `service_create`、`service_update` | 声明或修改 Service。 |
| `service_list`、`service_get`、`service_logs` | 观察 Services。 |
| `service_start`、`service_stop`、`service_restart`、`service_retry`、`service_remove` | 管理生命周期。 |
| `operation_get` | 检查已接受的操作。 |

工具以 `work-services__` 命名空间提供给模型，并受工具策略约束。修改请求需要 `idempotencyKey`，操作完成前会先返回持久接受结果。保留原始 Service ID 和 Operation ID，供后续检查。

## 内存政策

应用 Service 容器不设置 Piwork 内存上限，也不预留 Service 内存。省略的 `memoryBytes` 规范化为零，合法历史正数仅保留兼容数据，不恢复限制；负数、非整数和不安全整数仍非法。当前投影返回 `memoryLimitMode=unlimited`，部署上下文返回 `serviceMemoryPolicy=unlimited` 和 `defaultServiceMemoryBytes=0`。

Work/宿主内存核算排除历史 Service 预留，包括配置与导入路径。Agent/helper 内存政策以及原子的 CPU、服务数和卷数准入继续有效。受管恢复替换旧受限 Service 容器并保留身份与 workspace，实际可用内存由宿主及外层部署决定。

默认 base、单 HTTP 入口、离线工具、持久化与版本自动采用见 [Web 开发指南](/zh/guide/web-development.html)。

## 网络和存储

已声明的 HTTP 端口可以通过 Desktop 的认证应用网关访问。容器不会获得任意公网主机端口暴露。平台凭据与应用 cookies 和应用授权保持独立。

授权后，Services 可以把共享工作空间挂载到 `/var/data/workspace`。希望携带的应用数据存放在托管存储中。删除 Service 会保留共享工作空间文件；这些文件不是可丢弃的容器数据。

停止 Work 会保留 Service 定义和启用意图。启动 Work 会恢复已启用的 Services。单独停止 Service，会关闭该意图，直到显式再次启动。

## 实验性和未来方向

实验性 brain 的 Service 能力契约增加结构化观察、状态版本、操作身份和验证。应用必须实现契约才能参与；普通网页应用不会自动成为可验证操作端点。

未来可能有更多能力类型适合 Service 概念。当前运行契约是受管理的应用容器。

权威来源：[work-services 规范](https://github.com/pphboy/piwork/blob/main/openspec/specs/work-services/spec.md)、[Service MCP 指南](https://github.com/pphboy/piwork/blob/main/docs/service-mcp.md)和[应用访问指南](https://github.com/pphboy/piwork/blob/main/docs/service-access.md)。
