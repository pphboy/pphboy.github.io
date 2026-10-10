# Web 开发

使用可复用的 `pphboy/piwork-web-base` 环境，在 Work 内开发 Web 应用。采用当前默认 Brain 的新应用使用 **FastAPI + React + TypeScript + Vite**；你也可以指定其他技术栈或派生自己的镜像。

Harness 在 Agent 容器中编辑 Work 共享工作空间，Core 以独立 Service 运行应用。基础镜像提供工具链、锁定的离线依赖和通用命令；应用源码与数据属于 Work。

## 开发第一个应用

完成[快速开始](/zh/guide/quick-start.html)后，在 CLI 容器中向已有 Work 发送任务：

```sh
piwork-cli chat WORK_ID \
    --message '使用默认 Web base 开发任务看板，持久保存数据，部署为 Service，并验证实际运行的应用。'
```

将 `WORK_ID` 替换为实际 ID。默认部署 Skill 初始化可写应用、维护其 Spec，并通过已有 Service 工具部署和验证。已有应用目标会在任何覆盖写入前被拒绝；维护应用时读取并修改实际文件。

在 Desktop 的 Service 条目打开已声明的 Web 端口。自然语言任务启动开发，完成与否仍以实际 Service、Operation 和业务结果为准。

## 修改后无需手动刷新

继续让同一 Work 修改应用。交付包括必要的测试、检查、构建、Service 更新或重启，以及实际运行版本和受影响业务结果的验证。

标准模板在页面可见时每五秒检查就绪版本，并在恢复可见或连接时立即检查。页面自动采用新前端，恢复支持保存的非秘密草稿与当前路径；仅后端修改和普通 Agent Action 通过重读业务查询更新界面。显式开发模式支持 React Fast Refresh 与后端重载。

版本绑定对应源码、锁文件和实际镜像环境，因此仅升级基础环境也会让已打开页面采用新产物。失败构建、相同版本和断线不会造成循环刷新。该能力由模板提供；既有应用或第三方页面需要自己的更新支持。

应用版本读取不启动额外 Agent Run，也不 Apply 脑包。

## 环境与运行方式

已发布基础镜像支持 `linux/amd64`，固定 Python 3.13.16、Node 24.21.0、FastAPI 0.143.0、React 19.3.0、TypeScript 7.0.2、Vite 8.3.4 和 sqlite3 CLI 3.40.1。完整依赖与校验以[上游环境和锁文件](https://github.com/pphboy/piwork/tree/main/deploy/images/web-base)为准。

```text
docker.io/pphboy/piwork-web-base:0.1.0-03395d0810f7-bbb24bdd0167-dirty@sha256:e83902fb568e97b2d01d488ce7c9c3d15f373ab58b46e041337baa832b8cfb81
```

默认 Service 显式运行 `/usr/local/bin/piwork-web`，参数为 `["run", "--app", "/var/data/workspace/apps/<service-name>"]`。FastAPI 通过单个声明的 HTTP **8080** 端口提供构建后的前端、API、应用交互接口和健康检查。Core 授予 workspace 访问并注入受管交互身份，单独启动容器不会取得该身份。

| 命令 | 用途 |
| --- | --- |
| `piwork-web prepare` | 从锁定离线缓存准备应用目录内的依赖。 |
| `piwork-web check` | 执行隔离的前后端测试和类型检查。 |
| `piwork-web build` | 发布匹配已检查源码与环境的前端产物。 |
| `piwork-web serve` | 提供已检查的应用。 |
| `piwork-web run` | 准备、检查、构建并运行。 |
| `piwork-web dev` | 显式运行前后端开发模式。 |

这些命令在应用容器中执行，默认 Skill 选择相应 Service 命令并检查结果。标准依赖集合支持离线；新增依赖需要匹配的锁定制品或派生镜像。

## 持久文件与 sqlite3

源码、锁文件、可写依赖和构建结果位于 `apps/<service-name>`，业务数据位于 `data/<service-name>`。Agent 和 Service 沿用共享文件身份，Service 根文件系统保持只读。重启或替换 Service 不重新初始化模板，也不清空业务数据。

已发布的 Agent 和 Web base 都提供真正的 sqlite3 命令。AI 的 bash 在 **Agent** 中运行，并遵守 Work 工具策略。工作站模板的授权只读检查可使用：

```sh
sqlite3 -readonly -json /var/data/workspace/data/workstation/workstation.sqlite 'SELECT name FROM sqlite_master WHERE type="table";'
```

其他应用自行选择数据库名。普通业务修改仍遵守 Action/Query 契约，Core/history/Memory 等平台受管数据库不属于此应用操作路径。Core 和 CLI 宿主无需安装 Python、Node 或 sqlite3。

## 资源政策与升级

应用 Service **不设置 Piwork 内存上限，也不预留 Service 内存**。CPU、服务/卷数量及 Agent/helper 内存政策继续有效，实际可用内存由宿主与外层环境决定。旧 Service `memoryBytes` 值仅保留兼容历史，零表示无限制。

按正常关闭、启动流程升级 Core，受管恢复会替换旧受限 Service 容器并保留 workspace。既有 Work 保持捕获的 Brain 和 Agent 镜像；采用新指导或 Agent 工具需要正常包更新、镜像选择和显式 Apply。Core 升级不覆盖管理员默认选择，也不转换已有应用。

## 维护或扩展基础镜像

长期维护源是 **Piwork 仓库的 `deploy/images/web-base/`**。DockerHub 保存发布制品；运行中的 Work 或脑包引用不是环境构建源。

| 位置 | 职责 |
| --- | --- |
| `deploy/images/web-base/` | Dockerfile、环境、锁文件、工具和双语手册。 |
| `scripts/` 与 `Makefile` | 构建、验证和独立发布入口。 |
| `internal/coreassets/piwork-brain/` | 部署指导、模板和固定镜像引用。 |
| `dist/web-base/` | 被忽略的本地候选和验证产物。 |

下游可用固定 tag 和 digest 执行 `FROM`，在镜像构建时安装锁定依赖，并以 `10001:10001` 运行。Work 本身不因此取得 Docker build 或 socket 权限。

具体命令、派生与发行维护见[基础镜像手册](https://github.com/pphboy/piwork/blob/main/deploy/images/web-base/README.zh-CN.md)，已验证范围见[验收记录](https://github.com/pphboy/piwork/blob/main/docs/web-base-acceptance.md)。
