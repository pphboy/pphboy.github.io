# 规范

这些页面面向开发者，总结当前 Piwork 实现，依据源码项目已有规范编写，不另行定义 API 或包格式。

当前统一 Linux 镜像组合使用固定发行标识 `0.0.7-62f2868cb8e2-d69916b52829-dirty`，包括 Core、可选 CLI、Agent、Files 和 Snapshots。Core 包含网页工作台、Admin 和首次引导。来源为 `62f2868cb8e24da3d08db7a7d6c00aabd6226cd4`，构建时 modified 为 true，输入 SHA256 为 `d69916b5282972c9a336745e4efc30b749fad531a42ed5aac3c8b4dcad4c38ff`；后续文档提交不改写这些实际构建身份。固定引用和可用状态见[发行清单](/piwork/install/0.0.7-62f2868cb8e2-d69916b52829-dirty/release-manifest.json)。Web base 的独立[发布记录](/piwork/install/0.0.7-62f2868cb8e2-d69916b52829-dirty/web-base-release.json)使用 NiceGUI，旧安装下载目录保持历史归属。

| 范围 | 本站文档 | 权威来源 |
| --- | --- | --- |
| 可携带 Work | [Work 规范](/zh/spec/work) | [包格式](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md)与 [portable-work](https://github.com/pphboy/piwork/blob/main/openspec/specs/portable-work/spec.md) |
| 受管理能力 | [Service 规范](/zh/spec/service) | [work-services](https://github.com/pphboy/piwork/blob/main/openspec/specs/work-services/spec.md)与 [MCP 工具](https://github.com/pphboy/piwork/blob/main/internal/servicemcp/tools.json) |
| 智能执行 | [Harness 规范](/zh/spec/harness) | [agent-conversation](https://github.com/pphboy/piwork/blob/main/openspec/specs/agent-conversation/spec.md)与 [piwork-brain](https://github.com/pphboy/piwork/blob/main/openspec/specs/piwork-brain/spec.md) |

## 状态标记

- **当前行为 / 格式：** 已实现的行为和源码契约。
- **实验性：** 已有实现，但契约和交互还在演进。
- **未来方向：** 产品目标，不是已实现的保证。

遇到不一致时，以当前实现为准。可以[提交 Issue](https://github.com/pphboy/piwork/issues)，附上命令、镜像版本和实际结果。

## 当前交付边界

Core 通过 Unix API 管理一台本地 Linux Docker Engine。统一应用面向 `linux/amd64` 和 Engine 28+，Linux/Windows 浏览器可远程连接；仅 Core Compose Demo 或高级 Compose 部署另需 Compose 2.24+。Go CLI 有 Windows 和 Linux 构建目标；尚未完成的原生 Windows 验收项见源码的 [CLI 平台指南](https://github.com/pphboy/piwork/blob/main/openspec/specs/cli-runtime-portability/spec.md)。

Work 需要就绪的运行镜像和模型配置。Core 关闭时会停止受管理的运行容器，并保留持久状态。关闭 Desktop 或 CLI 不会停止 Work。

<!-- docker-trial-route -->
[Quick Start](/zh/guide/quick-start.html) 使用统一应用与网页引导，CLI 可选；原生构建与管理员操作见独立导航。
<!-- docker-trial-route -->
