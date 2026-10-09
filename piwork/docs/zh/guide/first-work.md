# 第一个 Work

先按[快速开始](/zh/guide/quick-start)收到一次模型回复。以下复用已经创建的 Work，不再执行 create 或 start；将 `WORK_ID` 替换为原创建结果。命令在 CLI 容器内执行。

## 写入并读取文件

```sh
piwork-cli chat WORK_ID \
    --message 'Create welcome.md in the workspace, read it back, and report what you verified.'
```

模型通过工具在 `/var/data/workspace` 执行任务。让它报告实际读取和验证的结果；任务提示不保证模型一定完成，继续前应核对文件。Work 的共享工作空间由 Core 管理，CLI 的登录卷不保存这些文件。

应用任务可以通过 Work 专属工具创建 [Service](/zh/concepts/service)，示例见 [Kanban Work](/zh/demo/kanban)。

## 准备可选文件交换存储

仅导入、导出或读取本地文件时添加交换卷。退出当前 CLI，在宿主机安装目录读取固定 CLI 镜像，再进入带交换卷的容器；已有登录状态卷会复用：

```sh
docker run --rm --init --interactive --tty \
    --name piwork-cli-files \
    --add-host host.docker.internal:host-gateway \
    --env PIWORK_CORE_URL=http://host.docker.internal:7171 \
    --mount type=volume,src=piwork-quickstart-client-state,dst=/var/lib/piwork/client \
    --mount type=volume,src=piwork-quickstart-client-exchange,dst=/exchange \
    docker.io/pphboy/piwork-cli:0.0.1-fc409adc1a0b-808d890c6607-dirty
```

此 shell 保持运行，以便另一宿主机终端执行 docker cp。交换卷只搬运归档，不是 Work 数据备份。远程 Core 的 URL 应替换为实际可达地址；Windows 客户端按安装指南进入 Linux 容器，不使用 Linux 同机的 host-gateway 参数。

## 停止、导出并检查

在 CLI 容器内，停止原 Work 后导出；目标文件必须尚不存在：

```sh
piwork-cli work stop WORK_ID --wait
piwork-cli work export WORK_ID --output /exchange/first-work.work
piwork-cli work package inspect /exchange/first-work.work
```

在另一个宿主机终端，将归档保存到本机：

```sh
docker cp piwork-cli-files:/exchange/first-work.work ./first-work.work
```

归档保存持久文件、历史、配置、Service、Skill、Pi Package 和固定镜像，不冻结活进程。目标 Core 需要另行提供平台管理的模型 key；文件或历史中自行保存的秘密仍可能进入包。

## 导入并继续

在目标 Core 登录的同类 CLI 容器中操作；本例容器名为 piwork-cli-files。在目标宿主机先复制归档：

```sh
docker cp ./first-work.work piwork-cli-files:/exchange/incoming.work
```

回到目标 CLI 容器，先 import，再将返回的新 Work ID 用于显式 start：

```sh
piwork-cli work import /exchange/incoming.work --name 'Continued Work' --wait
piwork-cli work start IMPORTED_WORK_ID --wait
```

import 创建独立的 stopped Work，不会自动启动。将 `IMPORTED_WORK_ID` 替换为导入结果，可以继续检查原文件和历史：

```sh
piwork-cli chat IMPORTED_WORK_ID \
    --message 'Read welcome.md from the workspace and summarize the retained files.'
```

## 中断后恢复

使用原 Operation、Run 或 Snapshot ID，不通过重新提交 mutation 来查询结果。聊天断线后按原 Run 和最后序号恢复观察；下载中断时选择尚不存在的新输出路径：

```sh
piwork-cli operation show OPERATION_ID
piwork-cli run watch WORK_ID RUN_ID --after SEQUENCE
piwork-cli work snapshot download SNAPSHOT_ID --output /exchange/retried.work
```

可携带性与格式边界见 [Work 规范](/zh/spec/work)。
