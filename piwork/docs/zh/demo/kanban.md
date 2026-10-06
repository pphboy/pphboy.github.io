# Kanban Work

第一个演示是 Kanban 工作空间：看板应用、数据、应用 Service，以及帮助构建和操作看板的 Harness。它展示完整可运行的工作空间如何被分享和继续使用。

::: info 演示状态
目前还没有公开的 Kanban `.work` 归档、录屏或截图。本页说明演示结构，以及如何用当前产品构建或导入看板。预构建的演示包尚未发布。
:::

## 包含什么？

| 部分 | 在演示中的作用 |
| --- | --- |
| 工作空间 | 托管存储中的应用源码和看板数据。 |
| Service | 运行看板网页和 API 的容器。 |
| Harness | 构建和操作看板所需的模型、工具、指令和历史。 |
| 配置 | 镜像、命令、已声明的 HTTP 端口、工作空间挂载和就绪检查。 |

一个应用 Service 就足以构建第一版看板。独立数据库 Service 可选；实际应用决定有哪些 Services。请检查 Service 列表，不要假设固定技术栈。

## 在 Piwork 中构建看板

[安装 Piwork](/zh/guide/installation)，打开 Desktop，创建并启动名为 `Kanban` 的 Work。在 Chat 中可以提出：

> 在共享工作空间中构建一个简单 Kanban 看板，包含 Todo、Doing 和 Done 三列。将数据持久化到托管工作空间。使用可用的 Work Service 工具将应用声明为 Service，包含 HTTP 端口和就绪检查。检查运行中的 Service，并说明你验证了什么。

这是一条给 Harness 的任务示例。结果取决于模型和环境；它不是安装命令，也不是经过验收的可下载演示。

在 Desktop 中打开 Service。添加卡片、移动卡片，然后重新加载应用，确认数据保留。通过 **Files** 检查应用文件。

## Harness 做什么

Harness 可以检查工作空间、编写应用、声明 Service、读取日志并验证运行状态。随后可以让它修改看板并检查结果。

如果看板实现了实验性 brain 的能力契约，还可以提供结构化查询和操作。这需要应用代码支持，普通 HTTP 访问不会自动提供这些能力。参见 [Harness 规范](/zh/spec/harness)。

## 验证可携带性

1. 创建一个容易识别的卡片，并确认已经保存。
2. 停止 Work，执行导出。
3. 保存并检查 `.work` 文件。
4. 导入到已配置自己模型的兼容第二个 Core。
5. 启动导入的 Work，打开看板 Service。
6. 确认卡片和文件存在，再继续修改看板。

具体命令见[第一个 Work](/zh/guide/first-work)。同样的流程也适用于可信演示发布者提供的归档。使用导入返回的新 ID，它代表一个新的 Work。

## 演示材料

录屏、截图和归档链接发布后会添加到这里。目前可以通过 [GitHub Discussions](https://github.com/pphboy/piwork/discussions)分享可复现的看板或报告问题。

<!-- 发布真实素材后，与英文页面同步更新；记录镜像版本、模型、Services、归档校验值和导入结果。 -->
