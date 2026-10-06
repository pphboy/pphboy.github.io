# 第一个 Work

先尝试一个会生成持久文件的小任务，这样可以直接看到 Work 保存什么，以及导出后能带走什么。

## 创建并运行

在 Desktop 中创建 `My First Work`，启动并打开 **Chat**。可以尝试这条指令：

> 在工作空间中创建 welcome.md。简短介绍这个 Work 和当前可用的文件，然后重新读取文件，说明你验证了什么。

打开 **Files**，检查 `welcome.md`。这只是任务示例，不保证模型一定完成；继续前请确认实际文件。共享工作空间路径是 `/var/data/workspace`。

Harness 使用模型和工具执行任务。构建应用时，它还可以通过 Work 专属工具声明 [Service](/zh/concepts/service)。可以接着尝试 [Kanban 演示说明](/zh/demo/kanban)。

## 导出并继续

1. 停止 Work，等待状态变为已停止。
2. 使用 Desktop 的导出流程下载 `.work` 文件。
3. 使用包检查流程检查归档。
4. 在当前 Core 或兼容的第二个 Core 中，以新名称导入。
5. 启动导入的 Work，检查文件和保留的对话历史。

导出包含持久文件、历史、配置、Services、Skills、Pi Packages 和固定镜像，不包含活进程的内存状态。Piwork 管理的模型 API Key 需要在目标端单独提供；你保存在文件或历史中的密钥仍会包含在归档中。

## 在 CLI 容器中执行同样的流程

以下 Bash 函数只是本地快捷方式，实际执行的是 Compose 容器中的 `piwork-cli`。在安装目录中定义：

```bash
piwork_cli() {
  docker compose --env-file release.env --env-file client.env \
    -f compose.cli.yaml exec cli piwork-cli "$@"
}
```

登录并创建 Work。`login` 会提示输入密码，无需把密码放在命令参数中：

```bash
piwork_cli login --account admin
piwork_cli work create --name 'My First Work' --wait
piwork_cli work list
```

将下面的 `WORK_ID` 替换为返回的实际 ID。创建和启动是两个独立操作。

```bash
piwork_cli work start WORK_ID --wait
piwork_cli chat WORK_ID --message 'Create welcome.md in the workspace and read it back.'
piwork_cli work service list WORK_ID
piwork_cli work stop WORK_ID --wait
piwork_cli work export WORK_ID --output /exchange/first-work.work
piwork_cli work package inspect /exchange/first-work.work
```

导出目标文件不能已经存在。将归档保存到本机：

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml cp cli:/exchange/first-work.work ./first-work.work
```

在第二个实例上，把归档复制到客户端安装目录，并先登录该客户端所配置的目标 Core。将文件复制到已运行的 CLI 容器中，再导入：

```bash
docker compose --env-file release.env --env-file client.env \
  -f compose.cli.yaml cp ./first-work.work cli:/exchange/incoming.work
piwork_cli work import /exchange/incoming.work --name 'Continued Work' --wait
piwork_cli work list
piwork_cli work start IMPORTED_WORK_ID --wait
```

将 `IMPORTED_WORK_ID` 替换为新 ID。导入会创建独立且已停止的 Work，不会自动恢复执行。

## 操作中断时

保留返回的 Operation ID，提交下一次操作前先检查：

```bash
piwork_cli operation show OPERATION_ID
```

客户端断开不会取消已接受的操作。如果导出下载中断，用原始 Snapshot ID 重试，并指定新的输出路径：

```bash
piwork_cli work snapshot download SNAPSHOT_ID --output /exchange/retried.work
```

可携带性和格式限制见 [Work 规范](/zh/spec/work)。
