# 规范

这些页面面向开发者，总结当前 Piwork 实现，依据源码项目已有规范编写，不另行定义 API 或包格式。

源码核对版本为 [`326837881f2a`](https://github.com/pphboy/piwork/tree/326837881f2a3561ae5911dab98a2248d758c2e0)，核对日期为 2026 年 10 月 6 日。安装指南使用已有的公开 `0.1.0` 候选 Docker 镜像集；固定引用和构建来源单独记录在<a href="/piwork/install/0.1.0/README.txt" download>安装元数据</a>中。源码与镜像交付有各自的版本。

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

Core 通过 Unix API 管理一台本地 Linux Docker Engine。Docker 交付面向 `linux/amd64`、Engine 28+ 和 Compose 2.24+。Go CLI 有 Windows 和 Linux 构建目标；尚未完成的原生 Windows 验收项见源码的 [CLI 平台指南](https://github.com/pphboy/piwork/blob/main/docs/cli-platforms.md)。

Work 需要就绪的运行镜像和模型配置。Core 关闭时会停止受管理的运行容器，并保留持久状态。关闭 Desktop 或 CLI 不会停止 Work。
