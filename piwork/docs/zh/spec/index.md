# 规范

这些页面面向开发者，总结当前 Piwork 实现，依据源码项目已有规范编写，不另行定义 API 或包格式。

安装与快速开始已同步 Piwork `ea2f2a053b707760c1c98242f0f7ba15842efd12`（2026-10-09）。默认路径使用已发行的 [0.0.1 Preview](https://github.com/pphboy/piwork/releases/tag/v0.0.1)，镜像源码版本为 `20fb8334f1dce93bfa79cb6b5c86acf1cc460963`。固定引用、发行元数据与模板来源见<a href="/piwork/install/0.0.1/README.txt" download>安装元数据</a>。源码内容更新与镜像发行是独立步骤，本次同步没有构建或发布新镜像。

| 范围 | 本站文档 | 权威来源 |
| --- | --- | --- |
| 可携带 Work | [Work 规范](/zh/spec/work) | [包格式](https://github.com/pphboy/piwork/blob/main/docs/work-package-format.md)与 [portable-work](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md) |
| 受管理能力 | [Service 规范](/zh/spec/service) | [work-services](https://github.com/pphboy/piwork/blob/main/openspec/specs/work-services/spec.md)与 [MCP 工具](https://github.com/pphboy/piwork/blob/main/internal/servicemcp/tools.json) |
| 智能执行 | [Harness 规范](/zh/spec/harness) | [agent-conversation](https://github.com/pphboy/piwork/blob/main/openspec/specs/agent-conversation/spec.md)与 [piwork-brain](https://github.com/pphboy/piwork/blob/main/openspec/specs/piwork-brain/spec.md) |

## 状态标记

- **当前行为 / 格式：** 已实现的行为和源码契约。
- **实验性：** 已有实现，但契约和交互还在演进。
- **未来方向：** 产品目标，不是已实现的保证。

遇到不一致时，以当前实现为准。可以[提交 Issue](https://github.com/pphboy/piwork/issues)，附上命令、镜像版本和实际结果。

## 当前交付边界

Core 通过 Unix API 管理一台本地 Linux Docker Engine。Docker 交付面向 `linux/amd64` 和 Engine 28+；仅 Core Compose Demo 或高级 Compose 部署另需 Compose 2.24+。Go CLI 有 Windows 和 Linux 构建目标；尚未完成的原生 Windows 验收项见源码的 [CLI 平台指南](https://github.com/pphboy/piwork/blob/main/docs/cli-platforms.md)。

Work 需要就绪的运行镜像和模型配置。Core 关闭时会停止受管理的运行容器，并保留持久状态。关闭 Desktop 或 CLI 不会停止 Work。

<!-- docker-trial-route -->
[终端 Quick Start](/zh/guide/quick-start.html) 使用独立 Core/CLI 镜像，Core 可单独采用 Compose；合并方式见单机部署示例，原生构建与管理员操作见独立导航。
<!-- docker-trial-route -->
