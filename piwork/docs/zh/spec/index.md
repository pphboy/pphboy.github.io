# 规范

这些页面面向开发者，总结当前 Piwork 实现，依据源码项目已有规范编写，不另行定义 API 或包格式。

当前交付为 [Piwork 0.0.2 Preview](https://github.com/pphboy/piwork/releases/tag/v0.0.2)，包含 Web base 与直接模型管理。五角色镜像已发布并匿名拉取/执行核验，固定身份见[发行清单](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/release-manifest.json)。干净构建源码为 `fb4f577da3b4d0008b97a59103b84efefbf9b508`，输入摘要为 `512ec778b2671454ce1e66ceb11893f4f3ff908286ec2ae4947fd24fda100f37`；发行 tag 另包含发布材料更新，不改写镜像构建身份。Web base 保留独立[已发布记录](/piwork/install/0.0.2-fb4f577da3b4-512ec778b267/web-base-release.json)。Windows 原生客户端继续以实验性程序交付，完整正式验收未完成；实际范围见 Release 附件 preview-verification.md。旧下载目录保留历史归属。

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
