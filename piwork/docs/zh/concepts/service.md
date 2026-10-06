# Service

**Service 提供 Work 中的实际能力**。当前实现中，它是由 Core 管理、具有持久定义的应用容器。

Service 可以运行网页应用、数据库、本地 API 或其他运行进程。Harness 内部的工具不会自动成为 Service；Service 是受管理的应用资源。

## 工作空间能做什么

在 Kanban Work 中，看板 Service 提供界面和 API，数据可以保存在共享工作空间中。Harness 可以检查文件、修改应用、声明 Service，并检查它是否就绪。

应用仍然需要实际实现。仅有 Service 名称或部署请求，不等于应用已经正常运行。

## Harness 如何操作 Services

Piwork 提供 Work 专属 Service 工具，支持创建、查看、更新、启动、停止、重启和读取日志。Core 执行 Docker 操作，并检查权限和配额。

Service 定义包含镜像、命令、环境变量、网络端口、工作空间访问和就绪检查。修改后，Harness 应使用返回的 Service ID 和 Operation ID 验证实际状态。

应用还可以为实验性 `piwork-brain` 包实现能力契约，以支持结构化查询和可验证操作。这需要额外的应用实现，并不是每个 HTTP 服务都自动具备的能力。

## 访问和持久化

Desktop 通过需要身份验证的本地应用入口提供已声明的 HTTP Services。从 Service 条目打开应用即可。

停止 Work 会停止运行容器，但保留 Service 定义和工作空间数据。启动 Work 会恢复已启用的 Services。单独停止一个 Service，会关闭它的运行意图，直到再次显式启动。

需要携带的应用数据应保存在 Work 托管存储中。容器临时层和外部数据库不会复制到 `.work` 归档。

当前定义和网络边界见 [Service 规范](/zh/spec/service)。
